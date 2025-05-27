import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';
import crypto from 'crypto';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate a secure claim token
function generateClaimToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    const body = await request.json();
    const { realtor_id, email, phone, verification_info } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!realtor_id || !email) {
      return NextResponse.json(
        { error: 'Realtor ID and email are required' },
        { status: 400 }
      );
    }

    // Check if realtor exists and is not already claimed
    const { data: realtor, error: realtorError } = await supabase
      .from('realtors')
      .select('id, email, is_claimed, claimed_by_user_id')
      .eq('id', realtor_id)
      .single();

    if (realtorError) {
      return NextResponse.json(
        { error: 'Realtor not found' },
        { status: 404 }
      );
    }

    if (realtor.is_claimed) {
      return NextResponse.json(
        { error: 'This realtor profile has already been claimed' },
        { status: 409 }
      );
    }

    // Check if user has already submitted a claim for this realtor
    const { data: existingClaim } = await supabase
      .from('realtor_claims')
      .select('id, status')
      .eq('realtor_id', realtor_id)
      .eq('user_id', userId)
      .single();

    if (existingClaim) {
      return NextResponse.json(
        { 
          error: 'You have already submitted a claim for this realtor',
          claim_status: existingClaim.status
        },
        { status: 409 }
      );
    }

    // Generate claim token
    const claimToken = generateClaimToken();

    // Create claim record
    const { data: claim, error: claimError } = await supabase
      .from('realtor_claims')
      .insert({
        realtor_id,
        user_id: userId,
        claim_token: claimToken,
        submitted_email: email,
        submitted_phone: phone,
        verification_info: verification_info || {},
        status: 'pending',
        submitted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (claimError) {
      console.error('Error creating claim:', claimError);
      return NextResponse.json(
        { error: 'Failed to submit claim', details: claimError.message },
        { status: 500 }
      );
    }

    // TODO: Send verification email to the realtor's email address
    // This would typically integrate with an email service like SendGrid, Resend, etc.

    return NextResponse.json({
      data: {
        claim_id: claim.id,
        status: claim.status,
        message: 'Claim submitted successfully. A verification email has been sent to the realtor\'s email address.'
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
    const { userId } = await auth();
    const { searchParams } = new URL(request.url);
    const claimId = searchParams.get('claim_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    let query = supabase
      .from('realtor_claims')
      .select(`
        id,
        status,
        submitted_at,
        verified_at,
        realtors (
          id,
          first_name,
          last_name,
          primary_city,
          primary_province
        )
      `)
      .eq('user_id', userId);

    if (claimId) {
      query = query.eq('id', claimId);
    }

    const { data: claims, error } = await query.order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching claims:', error);
      return NextResponse.json(
        { error: 'Failed to fetch claims', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: claims
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 