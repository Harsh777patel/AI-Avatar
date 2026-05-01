"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Video, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';

// ── Forgot Password Modal ───────────────────────────────────────────────────────
function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState('email'); // email | otp | reset | done
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally { setLoading(false); }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/verify-otp', { email, otp });
      setStep('reset');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
    } finally { setLoading(false); }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
    setError(''); setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/reset-password', { email, otp, newPassword });
      setStep('done');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backdropFilter:'blur(8px)', background:'rgba(0,0,0,0.5)'}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">✕</button>

        {step === 'done' ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">✅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Password Reset!</h3>
            <p className="text-gray-500 mb-6">Your password has been updated successfully.</p>
            <button onClick={onClose} className="w-full py-3 bg-[#00c8f5] text-white font-bold rounded-xl hover:bg-[#00b5dd] transition-all">
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-[#00c8f5]/10 rounded-xl flex items-center justify-center text-[#00c8f5]">🔐</div>
                <h3 className="text-xl font-bold text-gray-800">
                  {step === 'email' ? 'Forgot Password' : step === 'otp' ? 'Enter OTP' : 'New Password'}
                </h3>
              </div>
              <p className="text-sm text-gray-500 ml-13">
                {step === 'email' && "We'll send a 6-digit OTP to your email."}
                {step === 'otp' && `OTP sent to ${email}. Check your inbox.`}
                {step === 'reset' && 'Choose a strong new password.'}
              </p>
              {/* Step indicator */}
              <div className="flex gap-2 mt-4">
                {['email','otp','reset'].map((s,i) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${
                    ['email','otp','reset'].indexOf(step) >= i ? 'bg-[#00c8f5]' : 'bg-gray-200'
                  }`} />
                ))}
              </div>
            </div>

            {error && <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm mb-4 font-medium">{error}</div>}

            {step === 'email' && (
              <form onSubmit={sendOtp} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c8f5] text-sm" />
                </div>
                <button disabled={loading} className="w-full py-3 bg-[#00c8f5] text-white font-bold rounded-xl hover:bg-[#00b5dd] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? '⏳ Sending...' : <><span>Send OTP</span><ArrowRight size={16}/></>}
                </button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={verifyOtp} className="space-y-4">
                <input type="text" required value={otp} onChange={e => setOtp(e.target.value.replace(/\D/,'').slice(0,6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00c8f5] text-center text-2xl font-bold tracking-widest"
                  maxLength={6} />
                <button disabled={loading || otp.length < 6} className="w-full py-3 bg-[#00c8f5] text-white font-bold rounded-xl hover:bg-[#00b5dd] transition-all disabled:opacity-60">
                  {loading ? '⏳ Verifying...' : 'Verify OTP'}
                </button>
                <button type="button" onClick={() => { setStep('email'); setOtp(''); }} className="w-full text-sm text-gray-500 hover:text-gray-700">
                  ← Change email
                </button>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={resetPassword} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type={showPass ? 'text' : 'password'} required value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c8f5] text-sm" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c8f5] text-sm" />
                </div>
                <button disabled={loading} className="w-full py-3 bg-[#00c8f5] text-white font-bold rounded-xl hover:bg-[#00b5dd] transition-all disabled:opacity-60">
                  {loading ? '⏳ Resetting...' : '🔐 Reset Password'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Login Page ──────────────────────────────────────────────────────────────────
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
      <div className="min-h-screen bg-gradient-to-br from-[#f0fbff] via-white to-[#e8f4ff] flex items-center justify-center p-4">

        {/* Decorative blobs */}
        <div className="fixed top-0 left-0 w-96 h-96 bg-[#00c8f5]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#00c8f5]/10 border border-white/60 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#00c8f5] via-blue-500 to-[#00c8f5]" />

            <div className="p-8 md:p-10">
              {/* Logo */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00c8f5] to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00c8f5]/30 mb-4">
                  <Video size={32} />
                </div>
                <h1 className="text-3xl font-black text-gray-900">Welcome back</h1>
                <p className="text-gray-500 mt-1 text-sm">Sign in to your AI Avatar account</p>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
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
                      placeholder="Enter your password"
                      className="w-full pl-11 pr-11 py-3.5 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00c8f5] transition-all text-sm bg-gray-50/50" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                  </div>
                </div>

                {/* Forgot link */}
                <div className="flex justify-end">
                  <button type="button" onClick={() => setShowForgot(true)}
                    className="text-sm font-semibold text-[#00c8f5] hover:text-[#00b5dd] transition-colors">
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#00c8f5] to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-[#00c8f5]/30 hover:shadow-xl hover:shadow-[#00c8f5]/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0 flex items-center justify-center gap-2">
                  {loading ? (
                    <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                  ) : (
                    <><span>Sign in</span> <ArrowRight size={18}/></>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">New here?</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <Link href="/signup"
                className="block w-full py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl text-center hover:border-[#00c8f5] hover:text-[#00c8f5] transition-all text-sm">
                Create an account →
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in, you agree to our <span className="text-[#00c8f5] cursor-pointer">Terms of Service</span>
          </p>
        </div>
      </div>
    </>
  );
}
