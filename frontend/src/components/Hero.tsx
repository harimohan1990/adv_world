import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-[128px] pointer-events-none animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-brand-purple/30 text-brand-purple text-sm font-medium mb-8">
          <Zap className="w-4 h-4" />
          <span>AI-Powered Marketplace</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          The future of <br className="hidden md:block" />
          <span className="gradient-text">intelligent advertising.</span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
          Connect your brand with the right audience using advanced AI targeting. 
          Launch campaigns and distribute offers seamlessly.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-pink transition-all duration-300 text-white px-8 py-4 rounded-full text-lg font-medium shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:-translate-y-1">
            Start Advertising
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#trending" className="inline-flex items-center justify-center gap-2 glass hover:bg-white/5 transition-colors text-white px-8 py-4 rounded-full text-lg font-medium">
            Explore Offers
          </a>
        </div>
      </div>
    </div>
  );
}
