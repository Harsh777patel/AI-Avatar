"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Check, ArrowRight, Download, Video, Loader2, LayoutDashboard, Settings, LogOut, Search, PlusCircle, History } from "lucide-react";
import axios from "axios";

const presetAvatars = [
  { id: '1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '2', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '3', url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '4', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200' },
];

export default function Dashboard() {
  const [selectedAvatarId, setSelectedAvatarId] = useState('1');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('create');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      setSelectedAvatarId('upload');
    }
  };

  const handleGenerate = async () => {
    if (!script) {
      alert("Please enter a script.");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append('script', script);
      
      if (selectedAvatarId === 'upload' && uploadedImage) {
        formData.append('photo', uploadedImage);
      } else {
        formData.append('presetAvatarId', selectedAvatarId);
      }

      const response = await axios.post('http://localhost:5000/api/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setGeneratedVideoUrl(response.data.data.videoUrl);
        alert("Video generated successfully via Anam API!");
      } else {
        alert("Failed to generate video.");
      }
    } catch (error) {
      console.error('Generation Error:', error);
      alert(error.response?.data?.error || "An error occurred during video generation. Please check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedVideoUrl) {
      const link = document.createElement("a");
      link.href = generatedVideoUrl;
      link.download = "ai-avatar-video.mp4";
      link.click();
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00c8f5] flex items-center justify-center text-white font-bold">A</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00c8f5] to-blue-600">
            Anam AI
          </span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('create')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'create' ? 'bg-[#00c8f5]/10 text-[#00c8f5] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <PlusCircle size={20} />
            Create Video
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'history' ? 'bg-[#00c8f5]/10 text-[#00c8f5] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <History size={20} />
            My Videos
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <LayoutDashboard size={20} />
            Analytics
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings size={20} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-2">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'create' ? 'Studio Dashboard' : 'My Videos'}
          </h1>
          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00c8f5]/50 focus:border-[#00c8f5] transition-all w-64"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-[#00c8f5] p-1 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00c8f5]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {activeTab === 'create' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200/60 p-6 md:p-10 relative z-10 backdrop-blur-xl bg-white/90">
                {generatedVideoUrl ? (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <div className="w-full max-w-2xl bg-black rounded-2xl overflow-hidden mb-8 shadow-2xl ring-1 ring-white/10 aspect-video relative group">
                      <video 
                        src={generatedVideoUrl} 
                        className="w-full h-full object-cover" 
                        controls 
                        autoPlay 
                      />
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <button 
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#00c8f5] to-blue-500 hover:shadow-lg hover:-translate-y-0.5 text-white font-semibold rounded-full transition-all duration-300"
                      >
                        <Download size={20} />
                        Download Video
                      </button>
                      <button 
                        onClick={() => {
                          setGeneratedVideoUrl(null);
                          setScript('');
                        }}
                        className="flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-full transition-all duration-300 shadow-sm"
                      >
                        Create another
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {/* Pick Avatar Section */}
                    <section>
                      <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <span className="bg-[#00c8f5]/10 text-[#00c8f5] w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                          Select Your Avatar
                        </h2>
                        <p className="text-gray-500 text-sm ml-10 mt-1">Upload a clear front-facing photo or choose a preset.</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-5 ml-10">
                        {/* Upload Button */}
                        <label className={`
                          relative flex flex-col items-center justify-center w-32 h-40 sm:w-36 sm:h-44 
                          rounded-2xl border-2 border-dashed bg-gray-50 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md
                          ${selectedAvatarId === 'upload' ? 'border-[#00c8f5] bg-blue-50/30 ring-4 ring-[#00c8f5]/20' : 'border-gray-300 hover:border-gray-400'}
                        `}>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                          />
                          {uploadedImage ? (
                            <img 
                              src={URL.createObjectURL(uploadedImage)} 
                              alt="Uploaded" 
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <>
                              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 text-[#00c8f5]">
                                <Camera size={24} />
                              </div>
                              <span className="text-sm font-semibold text-gray-600 text-center px-4">Upload Photo</span>
                            </>
                          )}
                          {selectedAvatarId === 'upload' && uploadedImage && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-[#00c8f5] text-white rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                              <Check size={14} strokeWidth={3} />
                            </div>
                          )}
                        </label>

                        {/* Preset Avatars */}
                        {presetAvatars.map((avatar) => (
                          <button
                            key={avatar.id}
                            onClick={() => setSelectedAvatarId(avatar.id)}
                            className={`
                              relative w-32 h-40 sm:w-36 sm:h-44 rounded-2xl overflow-hidden transition-all duration-300 flex-shrink-0
                              ${selectedAvatarId === avatar.id ? 'ring-4 ring-[#00c8f5] ring-offset-2 scale-105 shadow-lg' : 'hover:scale-105 hover:shadow-md grayscale-[0.3]'}
                            `}
                          >
                            <Image
                              src={avatar.url}
                              alt={`Avatar ${avatar.id}`}
                              fill
                              className="object-cover"
                              unoptimized
                              priority
                            />
                            {selectedAvatarId === avatar.id && (
                              <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-[#00c8f5] text-white rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                                <Check size={14} strokeWidth={3} />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </section>

                    <hr className="border-gray-100 ml-10" />

                    {/* Script Section */}
                    <section>
                      <div className="mb-6 flex justify-between items-end">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <span className="bg-[#00c8f5]/10 text-[#00c8f5] w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                          Write Your Script
                        </h2>
                        <span className="text-sm text-gray-400 font-medium">Auto-Language Detection</span>
                      </div>

                      <div className="relative ml-10">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00c8f5] to-purple-400 rounded-[24px] blur opacity-20 transition duration-1000 group-hover:opacity-30"></div>
                        <textarea
                          value={script}
                          onChange={(e) => setScript(e.target.value)}
                          placeholder="Hey there! I am your AI avatar generated via Anam API. How can I help you today?"
                          className="relative w-full h-48 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#00c8f5] focus:border-transparent outline-none text-gray-700 text-lg resize-none placeholder:text-gray-400 shadow-sm transition-all"
                        />
                      </div>
                    </section>

                    {/* Action */}
                    <div className="flex justify-end pt-4 mt-8 mr-2">
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !script}
                        className={`
                          flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300
                          ${!script ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-[#00c8f5] to-blue-500 hover:shadow-cyan-500/30 hover:-translate-y-1 text-white'}
                        `}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 size={24} className="animate-spin" />
                            Generating Avatar...
                          </>
                        ) : (
                          <>
                            <Video size={22} />
                            Generate Avatar
                            <ArrowRight size={20} strokeWidth={2.5} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="text-center py-20 animate-in fade-in">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No videos yet</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">Your generated videos will appear here. Create your first avatar video to see it here.</p>
              <button 
                onClick={() => setActiveTab('create')}
                className="px-6 py-3 bg-[#00c8f5] text-white font-semibold rounded-full hover:bg-cyan-500 transition-colors shadow-md"
              >
                Create Video
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
