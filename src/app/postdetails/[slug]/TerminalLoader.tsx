// app/postdetails/[slug]/loading.tsx
'use client';

import { useEffect, useState } from 'react';

export default function TerminalLoader() {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Fetching post content...",
    "Processing markdown...",
    "Rendering components...",
    "Almost there..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
<div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50 font-mono">
  <div className="w-full max-w-md p-6 bg-white rounded-lg border border-gray-200 shadow-lg">
    <div className="flex items-center space-x-2 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-400"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
      <div className="w-3 h-3 rounded-full bg-green-400"></div>
      <span className="text-gray-600 ml-2 text-sm">devscrbe-loader</span>
    </div>
    
    <div className="text-blue-600 mb-1">$ loading post...</div>
    <div className="text-gray-800 flex items-center">
      {texts[textIndex]}
      <span className="ml-1 animate-pulse text-gray-600">|</span>
    </div>
    
    <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse" style={{ width: `${(textIndex + 1) * 25}%` }}></div>
    </div>
  </div>
</div>
  );
}