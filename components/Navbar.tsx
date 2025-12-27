import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  MessageCircle, 
  Sun, 
  Moon, 
  Menu,
  X,
  Home,
  Box
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'order' | 'products';
  onNavigate: (view: 'home' | 'order' | 'products') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDarkMode: nextMode } }));
  };

  const themeStyles = {
    nav: isDarkMode 
      ? `bg-black/80 border-zinc-800 text-white ${scrolled ? 'backdrop-blur-xl border-b shadow-2xl' : 'border-transparent'}`
      : `bg-white/80 border-slate-200 text-slate-900 ${scrolled ? 'backdrop-blur-xl border-b shadow-lg shadow-slate-200/20' : 'border-transparent'}`,
    
    themeSecondaryBtn: isDarkMode
      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-white hover:text-black hover:border-white'
      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-black hover:text-white hover:border-black',
    
    primaryBtn: isDarkMode
      ? 'bg-white text-black hover:bg-zinc-200'
      : 'bg-black text-white hover:bg-zinc-800',
    
    logoBox: isDarkMode ? 'bg-white text-black' : 'bg-black text-white',
    accentText: isDarkMode ? 'text-zinc-400' : 'text-slate-500'
  };

  const staticBtnStyle = 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-white hover:text-black hover:border-white';

  const handleWhatsApp = () => {
    window.open('https://wa.me/923000000000', '_blank');
  };

  const handleMap = () => {
    window.open('https://maps.app.goo.gl/CRDUrSneCzc5kJUX7', '_blank');
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 h-24 flex items-center ${themeStyles.nav}`}>
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* LEFT: MAP BUTTON */}
          <div className="flex-1 flex justify-start">
            <button 
              onClick={handleMap}
              className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${staticBtnStyle}`}
            >
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </button>
            <button 
              onClick={handleMap}
              className={`md:hidden p-3 rounded-full border transition-all duration-300 ${staticBtnStyle}`}
            >
              <MapPin className="h-5 w-5" />
            </button>
          </div>

          {/* CENTER: LOGO & BRAND NAME */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex-shrink-0 flex justify-center items-center group cursor-pointer select-none px-2"
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl font-black text-base sm:text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${themeStyles.logoBox}`}>
                RP
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm sm:text-xl md:text-2xl font-black tracking-tighter uppercase whitespace-nowrap">Rafeem Printer</span>
                <span className={`text-[8px] sm:text-[9px] font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase transition-colors duration-500 ${themeStyles.accentText}`}>
                  Premium Lab
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex-1 flex justify-end items-center gap-1.5 sm:gap-3">
            {/* Products Page Button */}
            <button 
              onClick={() => onNavigate('products')}
              className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${currentView === 'products' ? themeStyles.primaryBtn : staticBtnStyle}`}
            >
              <Box className="h-4 w-4" />
              <span>Products</span>
            </button>

            <button 
              onClick={handleWhatsApp}
              className={`hidden sm:flex p-3 rounded-full border transition-all duration-300 active:scale-90 ${staticBtnStyle}`}
              title="WhatsApp Support"
            >
              <MessageCircle className="h-5 w-5" />
            </button>

            <button 
              onClick={toggleTheme}
              className={`p-2.5 sm:p-3 rounded-full border transition-all duration-300 active:scale-90 ${themeStyles.themeSecondaryBtn}`}
              title="Toggle Appearance"
            >
              {isDarkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>

            {/* Contextual Action Button */}
            {currentView === 'order' ? (
              <button 
                onClick={() => onNavigate('home')}
                className={`hidden lg:flex items-center gap-2 px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 shadow-xl ${themeStyles.primaryBtn}`}
              >
                <Home className="h-4 w-4" />
                Rp Home
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('order')}
                className={`hidden lg:flex items-center gap-2 px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 shadow-xl ${themeStyles.primaryBtn}`}
              >
                Order Now
              </button>
            )}

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 sm:p-3 rounded-full border transition-all duration-300 ${themeStyles.themeSecondaryBtn}`}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <div 
        className={`lg:hidden fixed inset-0 top-24 z-[110] transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } ${isDarkMode ? 'bg-black/95 backdrop-blur-2xl' : 'bg-white/95 backdrop-blur-2xl'}`}
      >
        <div className="p-8 flex flex-col gap-6">
          <div className={`text-xs font-black uppercase tracking-[0.3em] mb-2 ${themeStyles.accentText}`}>
            Quick Actions
          </div>
          <button 
            onClick={() => {
              onNavigate('products');
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center justify-between p-5 rounded-2xl border font-bold transition-all duration-300 ${staticBtnStyle}`}
          >
            <div className="flex items-center gap-4">
              <Box className="h-6 w-6" />
              <span>Browse Products</span>
            </div>
          </button>
          <button 
            onClick={handleWhatsApp}
            className={`flex items-center justify-between p-5 rounded-2xl border font-bold transition-all duration-300 ${staticBtnStyle}`}
          >
            <div className="flex items-center gap-4">
              <MessageCircle className="h-6 w-6" />
              <span>WhatsApp Chat</span>
            </div>
          </button>
          <button 
            onClick={() => {
              onNavigate(currentView === 'order' ? 'home' : 'order');
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center justify-center p-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl transition-all duration-300 ${themeStyles.primaryBtn}`}
          >
            {currentView === 'order' ? 'Back to Home' : 'Start Your Order'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
