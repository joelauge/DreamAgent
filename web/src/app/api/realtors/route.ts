import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const city = searchParams.get('city');
    const province = searchParams.get('province');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const featured = searchParams.get('featured');
    const specialization = searchParams.get('specialization');
    const sortBy = searchParams.get('sortBy') || 'performance'; // performance, name, experience
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build the query
    let query = supabase
      .from('public_realtors')
      .select('*');

    // Apply filters
    if (city) {
      query = query.ilike('primary_city', `%${city}%`);
    }

    if (province) {
      query = query.ilike('primary_province', `%${province}%`);
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (specialization) {
      query = query.contains('specializations', [specialization]);
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        query = query.order('display_name', { ascending: sortOrder === 'asc' });
        break;
      case 'experience':
        query = query.order('years_experience', { ascending: sortOrder === 'asc' });
        break;
      case 'performance':
      default:
        query = query
          .order('is_featured', { ascending: false })
          .order('total_volume', { ascending: false })
          .order('client_satisfaction_rating', { ascending: false });
        break;
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: realtors, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch realtors', details: error.message },
        { status: 500 }
      );
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('public_realtors')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      data: realtors,
      pagination: {
        total: totalCount || 0,
        limit,
        offset,
        hasMore: (offset + limit) < (totalCount || 0)
      },
      filters: {
        city,
        province,
        featured,
        specialization,
        sortBy,
        sortOrder
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