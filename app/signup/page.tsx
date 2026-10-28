'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(''); // NEW: Phone state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1. Create the account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // 2. If account created, save the phone number to the profiles table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ phone: phone })
          .eq('id', data.user.id);

        if (profileError) console.error("Error saving phone:", profileError);
      }
      setSuccess('Account created! Please check your email to confirm.');
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] p-4 pt-24">
      <div className="glass p-8 rounded-2xl w-full max-w-md border border-[#8b5cf6]/20">
        <h2 className="text-3xl font-black text-white mb-2 text-center uppercase">Join the Squad</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Create your YOLO account to earn Loyalty Points.</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Phone Number Input */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8b5cf6] transition-all"
              placeholder="+91 98765 43210"
              required 
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8b5cf6] transition-all"
              placeholder="gamer@yolo.com"
              required 
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8b5cf6] transition-all"
              placeholder="••••••••"
              required 
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center">{success}</p>}

          <button type="submit" className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-bold py-3 rounded-xl uppercase tracking-wider hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account? <a href="/login" className="text-[#8b5cf6] hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
}