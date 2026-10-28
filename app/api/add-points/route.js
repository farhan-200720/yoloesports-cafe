import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Get the amount and the user's secret token from the request
    const body = await request.json();
    const { amount, token } = body;

    // 2. Connect to Supabase using the user's token to ensure they are logged in
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } }
      }
    );

    // 3. Find out who the logged-in user is
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
    }

    // 4. Calculate points (10 points for every 100 rupees)
    const pointsToAdd = Math.floor(amount / 10);

    // 5. Update their profile in the database
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        points: supabase.rpc('increment_points', { points_to_add: pointsToAdd }), // We will use a simple increment below
        points: pointsToAdd // For now, we will just set it. (See note below)
      })
      .eq('id', user.id);
      
    // Actually, let's do a direct fetch to add to existing points safely:
    const { data: currentProfile } = await supabase.from('profiles').select('points').eq('id', user.id).single();
    const newPoints = (currentProfile?.points || 0) + pointsToAdd;

    const { error: finalError } = await supabase
      .from('profiles')
      .update({ points: newPoints })
      .eq('id', user.id);

    if (finalError) throw finalError;

    return NextResponse.json({ success: true, newPoints });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}