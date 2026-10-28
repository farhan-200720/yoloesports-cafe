'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] p-4 pt-24">
      <div className="glass p-8 rounded-2xl w-full max-w-md border border-[#8b5cf6]/20">
        <h2 className="text-3xl font-black text-white mb-2 text-center uppercase">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Log in to check your Loyalty Points.</p>

        <form onSubmit={handleLogin} className="space-y-4">
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

          <button type="submit" className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-bold py-3 rounded-xl uppercase tracking-wider hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          New here? <a href="/signup" className="text-[#8b5cf6] hover:underline">Create an Account</a>
        </p>
      </div>
    </div>
  );
}