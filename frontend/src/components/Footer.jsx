import React from 'react';
import Link from 'next/link';
import { Video, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pb-8 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-[#00c8f5] text-white p-1.5 rounded-lg">
                <Video size={20} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900">
                AI Avatar
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Create studio-quality talking avatars in seconds using artificial intelligence.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-[#00c8f5] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#00c8f5] transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-[#00c8f5] transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/features" className="hover:text-[#00c8f5] transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-[#00c8f5] transition-colors">Pricing</Link></li>
              <li><Link href="/use-cases" className="hover:text-[#00c8f5] transition-colors">Use Cases</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/blog" className="hover:text-[#00c8f5] transition-colors">Blog</Link></li>
              <li><Link href="/help" className="hover:text-[#00c8f5] transition-colors">Help Center</Link></li>
              <li><Link href="/api" className="hover:text-[#00c8f5] transition-colors">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-[#00c8f5] transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-[#00c8f5] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-[#00c8f5] transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} AI Avatar. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
