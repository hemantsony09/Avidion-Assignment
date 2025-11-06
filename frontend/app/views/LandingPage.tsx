import { ArrowRight, Zap, Target, TrendingUp, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LandingPageProps {
  onClose: () => void;
}

export function LandingPage({ onClose }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all hover:scale-110"
      >
        <X size={24} />
      </button>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30 animate-fade-in">
            <span className="text-blue-300 text-sm font-medium">
             Campaign Manager by Avidion
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Transform Your
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Campaign Management
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Powerful tools to create, manage, and optimize your marketing campaigns.
            Reach your audience with precision and track results in real-time.
          </p>

          <div className="mb-20">
            <button
              onClick={handleGetStarted}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 mx-auto animate-bounce-subtle"
            >
              Get Started Free
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 hover:border-blue-400/50">
              <div className="bg-blue-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-slate-300">
                Deploy campaigns in minutes with our intuitive interface and powerful automation
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 hover:border-cyan-400/50">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Target className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Precise Targeting</h3>
              <p className="text-slate-300">
                Reach the right audience with advanced segmentation and targeting tools
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 hover:border-green-400/50">
              <div className="bg-green-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
              <p className="text-slate-300">
                Track performance metrics and optimize campaigns with live data insights
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.2s both;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
