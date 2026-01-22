'use client';

import { useState, useEffect } from 'react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // 导航栏高度偏移
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#FFD400] border-b-4 border-black shadow-[0_8px_0_#111] pixel-border"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-end h-20">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="font-bold text-sm md:text-base text-black hover:bg-white transition-all px-4 py-2 bg-white border-2 border-black shadow-[0_4px_0_#111] rounded-lg active:translate-y-1 pixel-text"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('token')}
              className="font-black text-lg md:text-xl text-black hover:opacity-90 transition-opacity pixel-text px-6 py-3 bg-[#FFD400] border-4 border-black shadow-[0_8px_0_#111] rounded-xl active:translate-y-1 transform hover:scale-105"
            >
              $BTroll
            </button>
            <button
              onClick={() => scrollToSection('laboratory')}
              className="font-bold text-sm md:text-base text-black hover:bg-white transition-all px-4 py-2 bg-white border-2 border-black shadow-[0_4px_0_#111] rounded-lg active:translate-y-1 pixel-text"
            >
              BTroll Game
            </button>
            <button
              onClick={() => scrollToSection('mbti')}
              className="font-bold text-sm md:text-base text-black hover:bg-white transition-all px-4 py-2 bg-white border-2 border-black shadow-[0_4px_0_#111] rounded-lg active:translate-y-1 pixel-text"
            >
              MBTI Test
            </button>
            <a
              href="https://x.com/BTroll_bsc"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 md:ml-4 font-bold text-sm md:text-base text-black hover:bg-white transition-all px-4 py-2 bg-white border-2 border-black shadow-[0_4px_0_#111] rounded-lg active:translate-y-1 pixel-text flex items-center gap-2"
              aria-label="Follow us on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="hidden md:inline">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
