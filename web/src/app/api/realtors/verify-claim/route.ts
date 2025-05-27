import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find the claim by token
    const { data: claim, error: claimError } = await supabase
      .from('realtor_claims')
      .select(`
        id,
        realtor_id,
        user_id,
        status,
        submitted_at,
        realtors (
          id,
          first_name,
          last_name,
          email,
          is_claimed
        )
      `)
      .eq('claim_token', token)
      .eq('status', 'pending')
      .single();

    if (claimError || !claim) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 404 }
      );
    }

    // Check if the realtor is already claimed
    if (claim.realtors[0]?.is_claimed) {
      return NextResponse.json(
        { error: 'This realtor profile has already been claimed by another user' },
        { status: 409 }
      );
    }

    // Check if token is not too old (e.g., 7 days)
    const submittedAt = new Date(claim.submitted_at);
    const now = new Date();
    const daysDiff = (now.getTime() - submittedAt.getTime()) / (1000 * 3600 * 24);
    
    if (daysDiff > 7) {
      return NextResponse.json(
        { error: 'Verification token has expired. Please submit a new claim.' },
        { status: 410 }
      );
    }

    // Start a transaction to update both tables
    const { error: updateError } = await supabase.rpc('verify_realtor_claim', {
      p_claim_id: claim.id,
      p_realtor_id: claim.realtor_id,
      p_user_id: claim.user_id
    });

    if (updateError) {
      console.error('Error verifying claim:', updateError);
      return NextResponse.json(
        { error: 'Failed to verify claim', details: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: {
        message: 'Claim verified successfully! You now have control of this realtor profile.',
        realtor: {
          id: claim.realtors[0]?.id,
          name: `${claim.realtors[0]?.first_name} ${claim.realtors[0]?.last_name}`
        }
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find the claim by token (for preview/validation)
    const { data: claim, error: claimError } = await supabase
      .from('realtor_claims')
      .select(`
        id,
        status,
        submitted_at,
        realtors (
          id,
          first_name,
          last_name,
          primary_city,
          primary_province,
          is_claimed
        )
      `)
      .eq('claim_token', token)
      .single();

    if (claimError || !claim) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (claim.status === 'verified') {
      return NextResponse.json(
        { 
          error: 'This claim has already been verified',
          status: 'already_verified'
        },
        { status: 409 }
      );
    }

    // Check if token is expired
    const submittedAt = new Date(claim.submitted_at);
    const now = new Date();
    const daysDiff = (now.getTime() - submittedAt.getTime()) / (1000 * 3600 * 24);
    
    if (daysDiff > 7) {
      return NextResponse.json(
        { 
          error: 'Verification token has expired',
          status: 'expired'
        },
        { status: 410 }
      );
    }

    // Check if realtor is already claimed
    if (claim.realtors[0]?.is_claimed) {
      return NextResponse.json(
        { 
          error: 'This realtor profile has already been claimed',
          status: 'already_claimed'
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      data: {
        claim_id: claim.id,
        status: claim.status,
        realtor: {
          id: claim.realtors[0]?.id,
          name: `${claim.realtors[0]?.first_name} ${claim.realtors[0]?.last_name}`,
          location: `${claim.realtors[0]?.primary_city}, ${claim.realtors[0]?.primary_province}`
        },
        submitted_at: claim.submitted_at,
        expires_in_days: Math.max(0, 7 - Math.floor(daysDiff))
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 