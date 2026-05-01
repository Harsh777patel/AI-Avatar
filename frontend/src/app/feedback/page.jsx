'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/users/feedback');
      if (res.data.success) {
        setFeedbacks(res.data.feedbacks);
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
    } finally {
      setIsLoading(true);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to submit feedback');
      return;
    }
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/users/feedback', 
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setSubmitted(true);
        setRating(0);
        setComment('');
        fetchFeedbacks();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c8f5] to-blue-600 flex items-center justify-center text-white">✨</div>
          <span className="font-black text-xl tracking-tight">AI Avatar</span>
        </Link>
        <Link href="/dashboard" className="text-sm font-semibold text-gray-500 hover:text-[#00c8f5] transition-colors">
          Go to Dashboard →
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Form */}
          <div>
            <div className="mb-10">
              <h1 className="text-4xl font-black mb-4">Share your <span className="text-[#00c8f5]">feedback</span></h1>
              <p className="text-gray-500 leading-relaxed max-w-md">
                Your experience matters to us. Help us improve AI Avatar by sharing your thoughts and suggestions.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-100 rounded-3xl p-8 text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank you!</h2>
                <p className="text-gray-600 mb-8">Your feedback has been submitted successfully. We appreciate your time.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-[#00c8f5] text-white font-bold rounded-xl hover:bg-cyan-500 transition-all shadow-lg shadow-[#00c8f5]/20"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-in slide-in-from-top-2">
                    {error}
                  </div>
                )}

                {/* Rating */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">How would you rate us?</label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(s)}
                        className="transition-all duration-200 focus:outline-none"
                      >
                        <Star 
                          size={44} 
                          fill={(hoverRating || rating) >= s ? '#00c8f5' : 'transparent'} 
                          className={(hoverRating || rating) >= s ? 'text-[#00c8f5] scale-110' : 'text-gray-200'}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-xs font-bold text-[#00c8f5] mt-3">
                      {['Terrible', 'Poor', 'Average', 'Very Good', 'Amazing!'][rating - 1]}
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">Tell us more</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-gray-300" size={20} />
                    <textarea 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What do you like? What could be better?"
                      rows={6}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c8f5] focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#00c8f5] to-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-[#00c8f5]/20 hover:shadow-2xl hover:shadow-[#00c8f5]/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Feedback <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: List of Feedbacks */}
          <div className="lg:border-l lg:border-gray-100 lg:pl-16">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              Recent <span className="text-[#00c8f5]">Feedbacks</span>
              <span className="text-xs bg-gray-50 px-2 py-1 rounded-full text-gray-400">{feedbacks.length}</span>
            </h2>

            <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-4 scrollbar-hide">
              {isLoading ? (
                [1,2,3].map(i => (
                  <div key={i} className="animate-pulse flex flex-col gap-3 p-6 bg-gray-50 rounded-3xl">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-12 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))
              ) : feedbacks.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400">No feedbacks yet. Be the first!</p>
                </div>
              ) : (
                feedbacks.map((f) => (
                  <div key={f._id} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <User size={16} />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{f.userId?.name || 'Anonymous'}</span>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} fill={f.rating >= s ? '#00c8f5' : 'transparent'} className={f.rating >= s ? 'text-[#00c8f5]' : 'text-gray-200'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic leading-relaxed">"{f.comment}"</p>
                    <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-bold">
                      {new Date(f.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
