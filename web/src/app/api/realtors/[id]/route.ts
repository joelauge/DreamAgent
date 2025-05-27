import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Realtor ID is required' },
        { status: 400 }
      );
    }

    // Fetch realtor details
    const { data: realtor, error: realtorError } = await supabase
      .from('public_realtors')
      .select('*')
      .eq('id', id)
      .single();

    if (realtorError) {
      if (realtorError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Realtor not found' },
          { status: 404 }
        );
      }
      console.error('Supabase error:', realtorError);
      return NextResponse.json(
        { error: 'Failed to fetch realtor', details: realtorError.message },
        { status: 500 }
      );
    }

    // Fetch testimonials for this realtor
    const { data: testimonials, error: testimonialsError } = await supabase
      .from('realtor_testimonials')
      .select('*')
      .eq('realtor_id', id)
      .order('is_featured', { ascending: false })
      .order('rating', { ascending: false })
      .order('display_order', { ascending: true });

    if (testimonialsError) {
      console.error('Error fetching testimonials:', testimonialsError);
      // Don't fail the request if testimonials fail, just log the error
    }

    // Fetch city information if city_id is available
    let cityInfo = null;
    if (realtor.city_id) {
      const { data: city, error: cityError } = await supabase
        .from('cities')
        .select('name, province, population, geo_coordinates, gmaps_url, notable_fact')
        .eq('id', realtor.city_id)
        .single();

      if (!cityError) {
        cityInfo = city;
      }
    }

    return NextResponse.json({
      data: {
        ...realtor,
        testimonials: testimonials || [],
        city_info: cityInfo
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Realtor ID is required' },
        { status: 400 }
      );
    }

    // Only allow updating certain fields for security
    const allowedFields = [
      'bio',
      'tagline',
      'website_url',
      'social_links',
      'specializations',
      'years_experience'
    ];

    const updateData: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Add updated timestamp
    updateData.updated_at = new Date().toISOString();

    const { data: updatedRealtor, error } = await supabase
      .from('realtors')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update realtor', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: updatedRealtor,
      message: 'Realtor updated successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 