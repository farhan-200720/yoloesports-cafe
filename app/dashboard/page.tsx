'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({ points: 0, hours_played: 0 }); // Default to 0
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      // 1. Check if logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        
        // 2. Fetch their points from the database
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (data) {
          setProfile(data);
        }
        // If no data is found, it just keeps the default 0 points instead of getting stuck!
      }
    };
    getData();
  }, [router]);

  // Only show loading screen if we don't even know who the user is yet
  if (!user) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center text-white">
        <p className="text-xl animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase mb-2">Gamer Profile</h1>
        <p className="text-gray-400 mb-10">Welcome back to YOLO Esports.</p>
        
        <div className="glass p-8 rounded-2xl border border-[#8b5cf6]/20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] flex items-center justify-center text-2xl font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Logged in as</p>
              <p className="text-xl font-bold text-white">{user.email}</p>
                 <p className="text-sm text-gray-400 mt-1">📱 {profile.phone || 'No phone number'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loyalty Points Card */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-gray-400 text-sm uppercase mb-2 tracking-wider">Loyalty Points</h3>
              <p className="text-5xl font-black text-[#d946ef]">{profile.points}</p>
              <p className="text-xs text-gray-500 mt-2">Earn 10 points for every ₹100 spent!</p>
            </div>
            
            {/* Hours Played Card */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-gray-400 text-sm uppercase mb-2 tracking-wider">Total Hours Played</h3>
              <p className="text-5xl font-black text-[#8b5cf6]">{profile.hours_played}</p>
              <p className="text-xs text-gray-500 mt-2">Keep grinding to reach the next tier!</p>
            </div>
          </div>

          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/');
            }}
            className="mt-8 text-red-400 hover:text-red-300 text-sm uppercase tracking-wider font-bold"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}