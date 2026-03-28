"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Check, ArrowRight, Download, Video, Loader2 } from "lucide-react";
import axios from "axios";

const presetAvatars = [
  { id: '1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '2', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '3', url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '4', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200' },
];

export default function Home() {
  const [selectedAvatarId, setSelectedAvatarId] = useState('1');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState(null);

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
      } else {
        alert("Failed to generate video: " + (response.data.error || "Unknown error"));
      }
    } catch (error) {
      console.error('Generation Error:', error);
      alert(error.response?.data?.error || "An error occurred during video generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    // In a real app we'd fetch the blob and trigger a download
    if (generatedVideoUrl) {
      const link = document.createElement("a");
      link.href = generatedVideoUrl;
      link.download = "ai-avatar-video.mp4";
      link.click();
    }
  };

  return (
    <div className="bg-gray-50 font-sans pb-24">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 text-center px-4">
        <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
           <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#00c8f5] opacity-10 rounded-full blur-3xl"></div>
           <div className="absolute top-20 right-0 w-96 h-96 bg-purple-400 opacity-10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Create professional <span className="text-[#00c8f5]">talking avatars</span> in seconds
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your photo, type your script in any language, and let our AI generate studio-quality videos instantly. No video editing skills required.
          </p>
        </div>
      </section>

      {/* Generator Tool Section */}
      <div className="w-full max-w-4xl mx-auto px-4 relative z-10">
        <main className="w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
          
          <div className="mb-10 text-center border-b border-gray-100 pb-8 rounded-t-3xl bg-gradient-to-r from-gray-50 to-white -mt-8 -mx-8 md:-mt-12 md:-mx-12 pt-8 md:pt-12">
            <h2 className="text-2xl font-bold text-gray-900">Try it out now</h2>
            <p className="text-sm text-gray-500 mt-1">Generate your first video for free</p>
          </div>

        {generatedVideoUrl ? (
          <div className="flex flex-col items-center animate-in fade-in duration-500">
            <div className="w-full max-w-lg aspect-video bg-black rounded-2xl overflow-hidden mb-8 shadow-lg ring-1 ring-gray-200">
              <video 
                src={generatedVideoUrl} 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-[#00c8f5] hover:bg-[#00b5dd] text-white font-semibold rounded-full transition-colors shadow-md"
              >
                <Download size={20} />
                Download Video
              </button>
              <button 
                onClick={() => setGeneratedVideoUrl(null)}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-full transition-colors"
              >
                Create another
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Pick an avatar */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pick an avatar</h2>
              
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {/* Upload Button */}
                <label className={`
                  relative flex flex-col items-center justify-center w-32 h-40 sm:w-36 sm:h-44 
                  rounded-3xl border-2 border-dashed bg-gray-50 cursor-pointer overflow-hidden transition-all
                  ${selectedAvatarId === 'upload' ? 'border-[#00c8f5] ring-4 ring-[#00c8f5]/20' : 'border-gray-300 hover:border-gray-400'}
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
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3 text-gray-600">
                        <Camera size={24} />
                      </div>
                      <span className="text-sm font-medium text-gray-500 text-center px-4">Upload your photo</span>
                    </>
                  )}
                  {selectedAvatarId === 'upload' && uploadedImage && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#00c8f5] text-white rounded-full flex items-center justify-center shadow-sm">
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
                      relative w-32 h-40 sm:w-36 sm:h-44 rounded-3xl overflow-hidden transition-all flex-shrink-0
                      ${selectedAvatarId === avatar.id ? 'ring-4 ring-[#00c8f5] outline outlline-2 outline-white ring-offset-2' : 'hover:opacity-90 grayscale-[0.2]'}
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
                      <div className="absolute top-2 right-2 z-10 w-7 h-7 bg-[#00c8f5] text-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Type your script */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Type your script</h2>
                <div className="hidden sm:flex items-center gap-2 bg-[#e0f7fa] px-4 py-1.5 rounded-full text-sm font-medium text-[#00838f]">
                  Type in any language
                  <div className="flex -space-x-1">
                     {/* Mock flags using emojis for simplicity */}
                     <span className="text-lg">🇺🇸</span>
                     <span className="text-lg">🇩🇪</span>
                     <span className="text-lg">🇪🇸</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-[#00c8f5] text-white flex items-center justify-center ml-1 font-bold leading-none pb-[2px]">
                    +
                  </div>
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={script}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      setScript(e.target.value);
                    }
                  }}
                  placeholder="Enter your script — your avatar will speak it naturally..."
                  className="w-full h-40 p-6 bg-[#f4f4f4] rounded-3xl border-0 focus:ring-2 focus:ring-[#00c8f5] outline-none text-gray-700 text-lg resize-none placeholder:text-gray-400"
                />
                <div className="absolute bottom-5 right-6 text-sm font-medium text-gray-500">
                  {script.length}/200 characters
                </div>
              </div>
            </section>

            {/* Action Bar */}
            <div className="flex justify-end pt-4 gap-4">
              <hr className="border-gray-200 mb-8 absolute left-0 w-full" style={{marginTop: '-24px', position: 'relative'}} />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !script}
                className={`
                  flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-lg shadow-md transition-all pt-3.5 pb-3.5
                  ${!script ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#00c8f5] hover:bg-[#00b5dd] text-gray-900'}
                `}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={24} className="animate-spin text-gray-900" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate video
                    <ArrowRight size={22} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
      </div>
    </div>
  );
}
