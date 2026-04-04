"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Video, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setError(''); setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/users/signup', { name, email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally { setLoading(false); }
  };

  const features = [
    'Generate AI avatar videos in seconds',
    'Real-time AI conversation assistant',
    '15+ languages supported',
    'Studio-quality video output',
  ];

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-400'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fbff] via-white to-[#e8f4ff] flex items-center justify-center p-4">

      {/* Decorative blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-[#00c8f5]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Left — Features */}
        <div className="hidden lg:flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00c8f5] to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Video size={24} />
              </div>
              <span className="text-2xl font-black text-gray-900">AI Avatar</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 leading-tight mb-3">
              Create your <span className="text-[#00c8f5]">AI-powered</span> avatar today
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Join thousands of creators making professional videos without cameras or studios.
            </p>
          </div>

          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/80 shadow-sm">
                <CheckCircle size={20} className="text-[#00c8f5] shrink-0" />
                <span className="text-gray-700 font-medium">{f}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#00c8f5]/10 to-blue-500/10 rounded-2xl p-6 border border-[#00c8f5]/20">
            <p className="text-gray-600 italic text-sm leading-relaxed">
              "AI Avatar helped me create professional training videos in minutes. Absolutely game-changing for our team."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00c8f5] to-blue-500 flex items-center justify-center text-white font-bold text-sm">R</div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Rahul S.</p>
                <p className="text-xs text-gray-500">Content Creator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#00c8f5]/10 border border-white/60 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#00c8f5] via-blue-500 to-[#00c8f5]" />

          <div className="p-8 md:p-10">
            <div className="mb-7">
              <h1 className="text-2xl font-black text-gray-900">Create your account</h1>
              <p className="text-gray-500 text-sm mt-1">Free forever. No credit card required.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-5 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name */}
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00c8f5] transition-colors" size={18} />
                  <input type="text" required value={name} onChange={e => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00c8f5] transition-all text-sm bg-gray-50/50" />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00c8f5] transition-colors" size={18} />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00c8f5] transition-all text-sm bg-gray-50/50" />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00c8f5] transition-colors" size={18} />
                  <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-11 pr-11 py-3.5 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00c8f5] transition-all text-sm bg-gray-50/50" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                {password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1,2,3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <span className={`text-xs font-semibold ${passwordStrength === 3 ? 'text-green-500' : passwordStrength === 2 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {strengthLabels[passwordStrength]}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00c8f5] transition-colors" size={18} />
                  <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm bg-gray-50/50 ${
                      confirmPassword && confirmPassword !== password ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#00c8f5]'
                    }`} />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#00c8f5] to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-[#00c8f5]/30 hover:shadow-xl hover:shadow-[#00c8f5]/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0 flex items-center justify-center gap-2 mt-2">
                {loading ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
                ) : (
                  <><span>Create account</span><ArrowRight size={18}/></>
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">Already have an account?</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <Link href="/login"
              className="block w-full py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl text-center hover:border-[#00c8f5] hover:text-[#00c8f5] transition-all text-sm">
              Sign in instead →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
