"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Video, Mic, Zap, Globe, Shield, Star, ChevronDown, Check } from "lucide-react";

const FEATURES = [
  { icon: "🎬", title: "Script to Video", desc: "Type your script and our AI avatar delivers it with natural expressions, gestures, and perfect lip-sync." },
  { icon: "🎙️", title: "Real-time AI Assistant", desc: "Have a live face-to-face conversation with an AI avatar that responds intelligently in real time." },
  { icon: "🌍", title: "15+ Languages", desc: "Generate videos and have conversations in English, Hindi, Spanish, French, German, and more." },
  { icon: "⚡", title: "Instant Generation", desc: "No rendering wait. Your AI avatar video is ready in seconds, not hours." },
  { icon: "🎭", title: "Emotion Control", desc: "Set the tone — neutral, happy, calm, or expressive. Your avatar adapts to your content." },
  { icon: "📱", title: "Multi-Format Export", desc: "Export for YouTube (16:9), Reels (9:16), Square (1:1) — optimized for every platform." },
];

const STEPS = [
  { num: "01", title: "Sign up free", desc: "Create your account in under 30 seconds. No credit card needed." },
  { num: "02", title: "Choose your avatar", desc: "Pick from dozens of professional AI avatars or configure one to your liking." },
  { num: "03", title: "Write your script", desc: "Type what you want your avatar to say. Any language. Any tone." },
  { num: "04", title: "Generate & export", desc: "Hit generate. Download your studio-quality video instantly." },
];

const TESTIMONIALS = [
  { name: "Priya M.", role: "YouTuber", avatar: "P", text: "I used to spend hours recording and editing. Now I create professional videos in minutes. Absolutely game-changing!", rating: 5 },
  { name: "Rahul K.", role: "Corporate Trainer", avatar: "R", text: "The quality is incredible. My team couldn't believe these were AI-generated. Highly recommend for training content.", rating: 5 },
  { name: "Sarah J.", role: "Content Creator", avatar: "S", text: "The multi-language support is fantastic. I now publish content in 3 languages without hiring translators.", rating: 5 },
];

const STATS = [
  { value: "50K+", label: "Videos Created" },
  { value: "15+", label: "Languages" },
  { value: "98%", label: "Satisfaction" },
  { value: "< 30s", label: "Generation Time" },
];

function AnimatedCounter({ value }) {
  return <span className="font-black text-4xl md:text-5xl text-white">{value}</span>;
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* ── Hero Section ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f9ff] via-white to-[#f0f4ff]" />
        {/* Decorative orbs */}
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-[#00c8f5]/15 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#00c8f5]/10 border border-[#00c8f5]/20 px-4 py-2 rounded-full mb-6">
              <Zap size={14} className="text-[#00c8f5]" />
              <span className="text-sm font-semibold text-[#00c8f5]">Powered by Anam AI</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              Create
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00c8f5] to-blue-600">
                AI Avatar
              </span>
              Videos Instantly
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed mb-8 max-w-lg">
              Transform your scripts into studio-quality videos with lifelike AI avatars. No camera. No studio. No limits.
            </p>

            <div className="flex flex-wrap gap-4">
              {isLoggedIn ? (
                <>
                  <Link href="/script-studio"
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00c8f5] to-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-[#00c8f5]/30 hover:shadow-2xl hover:shadow-[#00c8f5]/40 hover:-translate-y-1 transition-all duration-300">
                    <Video size={20} /> Script Studio <ArrowRight size={18} />
                  </Link>
                  <Link href="/virtual-assistant"
                    className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-[#00c8f5] hover:text-[#00c8f5] transition-all duration-300 shadow-sm">
                    <Mic size={20} /> AI Assistant
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/signup"
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00c8f5] to-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-[#00c8f5]/30 hover:shadow-2xl hover:shadow-[#00c8f5]/40 hover:-translate-y-1 transition-all duration-300">
                    Get started free <ArrowRight size={18} />
                  </Link>
                  <Link href="/login"
                    className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-[#00c8f5] hover:text-[#00c8f5] transition-all duration-300 shadow-sm">
                    Sign in
                  </Link>
                </>
              )}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {['A','B','C','D'].map((l, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${
                    ['bg-[#00c8f5]','bg-blue-500','bg-purple-500','bg-green-500'][i]
                  }`}>{l}</div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 text-sm">{'★★★★★'}</div>
                <p className="text-xs text-gray-500 mt-0.5">Loved by 50,000+ creators</p>
              </div>
            </div>
          </div>

          {/* Right — Video Preview Card */}
          <div className="relative">
            {/* Main video card */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Actual video */}
              <div className="aspect-video bg-black relative overflow-hidden">
               <video
  src="/videoplayback.mp4"
  controls
  className="w-full h-full object-cover"
/>
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Live badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-xs font-semibold">AI Avatar Demo</span>
                </div>
              </div>

              {/* Bottom info bar */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800">Script Studio</p>
                  <p className="text-sm text-gray-500">Avatar video generation</p>
                </div>
                <Link href={isLoggedIn ? "/script-studio" : "/signup"}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#00c8f5] text-white font-semibold rounded-xl text-sm hover:bg-[#00b5dd] transition-colors">
                  Try now <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-xs font-bold text-gray-800">Instant</p>
                <p className="text-xs text-gray-500">Generation</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <div>
                <p className="text-xs font-bold text-gray-800">15+ Languages</p>
                <p className="text-xs text-gray-500">Multilingual</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <p className="text-xs text-gray-400">Scroll to explore</p>
          <ChevronDown size={20} className="text-gray-400" />
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#00c8f5] to-blue-600 py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter value={stat.value} />
              <p className="text-white/80 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#00c8f5]/10 px-4 py-2 rounded-full mb-4">
              <Zap size={14} className="text-[#00c8f5]" />
              <span className="text-sm font-semibold text-[#00c8f5]">Everything you need</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Powerful features for<br />
              <span className="text-[#00c8f5]">modern creators</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              From script to screen in seconds. No technical skills required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-[#00c8f5]/10 border border-transparent hover:border-[#00c8f5]/20 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How it <span className="text-[#00c8f5]">works</span>
            </h2>
            <p className="text-xl text-gray-500">Four simple steps to your first AI avatar video</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-[#00c8f5]/40 to-transparent z-10" />
                )}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#00c8f5]/30 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#00c8f5] to-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-lg mb-4 shadow-lg shadow-[#00c8f5]/30">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two Products Section ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Two powerful <span className="text-[#00c8f5]">tools</span>
            </h2>
            <p className="text-xl text-gray-500">Choose the experience that fits your need</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Script Studio */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-[#00c8f5]/5 to-blue-500/10 rounded-3xl border border-[#00c8f5]/20 p-8 hover:shadow-2xl hover:shadow-[#00c8f5]/20 transition-all duration-500">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00c8f5]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00c8f5] to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-xl shadow-[#00c8f5]/30">
                  📝
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3">Script Studio</h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Write your script, select an avatar and voice, and generate a professional video. Export in 16:9, 9:16, or 1:1 format.
                </p>
                <ul className="space-y-2 mb-8">
                  {['50+ AI avatars', 'Multi-language TTS', 'Emotion controls', 'HD video export'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-[#00c8f5]" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href={isLoggedIn ? "/script-studio" : "/signup"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00c8f5] to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00c8f5]/30 hover:-translate-y-0.5 transition-all">
                  Open Script Studio <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500/5 to-[#00c8f5]/10 rounded-3xl border border-purple-200 p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
              <div className="absolute top-0 left-0 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-[#00c8f5] rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-xl shadow-purple-500/30">
                  🤖
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3">AI Assistant</h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Have a real-time face-to-face conversation with an AI avatar. Ask questions, get tutored, practice interviews, or just chat.
                </p>
                <ul className="space-y-2 mb-8">
                  {['Real-time conversation', '7 assistant roles', 'Voice & text input', 'Live captions'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-purple-500" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href={isLoggedIn ? "/virtual-assistant" : "/signup"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-[#00c8f5] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all">
                  Launch AI Assistant <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Loved by <span className="text-[#00c8f5]">creators</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex text-yellow-400 mb-4">{'★'.repeat(t.rating)}</div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00c8f5] to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00c8f5] via-blue-500 to-purple-600" />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Start creating today.<br />It's 100% free.
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            Join 50,000+ creators who are already making professional AI avatar videos. No credit card required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={isLoggedIn ? "/dashboard" : "/signup"}
              className="flex items-center gap-2 px-10 py-5 bg-white text-[#00c8f5] font-black rounded-2xl text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              {isLoggedIn ? 'Go to Dashboard' : 'Get started free'} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#00c8f5] rounded-xl flex items-center justify-center text-white">
                <Video size={18} />
              </div>
              <span className="text-xl font-black text-white">AI Avatar</span>
            </div>
            <div className="flex gap-8">
              {[['Features', '#features'], ['Login', '/login'], ['Sign Up', '/signup'], ['Dashboard', '/dashboard'], ['Feedback', '/feedback']].map(([label, href]) => (
                <Link key={label} href={href} className="text-sm hover:text-[#00c8f5] transition-colors">{label}</Link>
              ))}
            </div>
            <p className="text-sm">© 2026 AI Avatar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
