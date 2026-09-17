import React, { useState } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            <span className="font-bold text-lg">A</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">AdVantage</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#" className="hover:text-white transition-colors">Offers</a>
          <a href="#" className="hover:text-white transition-colors">Categories</a>
          <a href="#" className="hover:text-white transition-colors">Businesses</a>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="hidden sm:block text-sm font-medium text-neutral-300 hover:text-white transition-colors">Log In</button>
          <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Sign Up
          </button>
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-neutral-900 border-b border-white/10 z-40 px-4 py-4 flex flex-col gap-4 shadow-xl">
          <a href="#" className="text-neutral-300 hover:text-white font-medium py-2">Offers</a>
          <a href="#" className="text-neutral-300 hover:text-white font-medium py-2">Categories</a>
          <a href="#" className="text-neutral-300 hover:text-white font-medium py-2">Businesses</a>
          <div className="h-px bg-white/10 my-2"></div>
          <button className="text-left text-neutral-300 hover:text-white font-medium py-2">Log In</button>
        </div>
      )}

      <main className="px-4 sm:px-8 py-12 sm:py-20 max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 px-2">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Discover the Best <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Deals & Offers
            </span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Your AI-powered marketplace for exclusive discounts, tailored specifically to your interests and location.
          </p>
          
          <div className="max-w-2xl mx-auto mt-6 sm:mt-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-neutral-900 rounded-2xl p-2 border border-white/10 gap-2 sm:gap-0">
              <input 
                type="text" 
                placeholder="Search offers, businesses..." 
                className="w-full bg-transparent px-4 py-3 outline-none text-white placeholder-neutral-500"
              />
              <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-semibold transition-colors w-full sm:w-auto">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold">Categories</h2>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {["Technology", "Education", "Food", "Travel", "Fashion", "Healthcare", "Finance", "Local Services"].map((cat) => (
              <button key={cat} className="px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-neutral-900 border border-white/5 hover:border-indigo-500/50 hover:bg-neutral-800 transition-all whitespace-nowrap text-sm font-medium text-neutral-300 hover:text-white">
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Trending Offers */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              🔥 Trending
            </h2>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group rounded-2xl sm:rounded-3xl bg-neutral-900 border border-white/5 overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1">
                <div className="h-40 sm:h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 relative">
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-green-400 border border-white/10">
                    30% OFF
                  </div>
                </div>
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-indigo-400">Education</p>
                    <h3 className="text-base sm:text-lg font-bold">Python Masterclass 2026</h3>
                    <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2">Start your Python journey with a beginner-friendly course and save 30% for a limited time.</p>
                  </div>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>📍 Bengaluru</span>
                    </div>
                    <button className="text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-3 sm:px-4 py-2 rounded-lg transition-colors">
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
