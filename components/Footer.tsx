import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
  onLinkClick: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ isDark, onLinkClick }) => {
  const [subStatus, setSubStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const OFFICIAL_EMAIL = "mrrafay900@gmail.com";
  // Updated Formspree ID from user's confirmed snippet
  const FORMSPREE_ID = "mvzogowb"; 

  const themeStyles = {
    footer: isDark ? 'bg-black border-zinc-800' : 'bg-white border-slate-200',
    text: isDark ? 'text-zinc-400' : 'text-slate-600',
    heading: isDark ? 'text-white' : 'text-slate-950',
    input: isDark ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-950 placeholder-slate-400',
    btn: isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800',
    iconBtn: isDark ? 'hover:bg-zinc-900 text-zinc-400 hover:text-white' : 'hover:bg-slate-50 text-slate-500 hover:text-black',
    logoBox: isDark ? 'bg-white text-black' : 'bg-black text-white'
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStatus('sending');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          _subject: "New Newsletter Subscription Request"
        })
      });

      if (response.ok) {
        setSubStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSubStatus('idle'), 5000);
      } else {
        setSubStatus('error');
        setTimeout(() => setSubStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubStatus('error');
      setTimeout(() => setSubStatus('idle'), 3000);
    }
  };

  return (
    <footer className={`pt-24 pb-12 border-t transition-colors duration-500 ${themeStyles.footer}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Company Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg font-black text-lg ${themeStyles.logoBox}`}>
                RP
              </div>
              <span className={`text-xl font-black tracking-tighter uppercase ${themeStyles.heading}`}>Rafeem Printer</span>
            </div>
            <p className={`text-sm font-medium leading-relaxed max-w-xs ${themeStyles.text}`}>
              Your premium destination for high-quality printing solutions. From business branding to personal memories, we print it all with precision and care.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className={`text-xs font-black uppercase tracking-[0.3em] ${themeStyles.heading}`}>Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Our Services', id: 'book-printing' },
                { label: 'Business Cards', id: 'business-cards' },
                { label: 'Packaging', id: 'packaging-boxes' },
                { label: 'Contact Support', id: 'contact-us' }
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => onLinkClick(link.id)}
                    className={`text-sm font-bold transition-all hover:translate-x-1 ${themeStyles.text} hover:text-current`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h4 className={`text-xs font-black uppercase tracking-[0.3em] ${themeStyles.heading}`}>Contact Details</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className={`h-5 w-5 mt-0.5 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
                <span className={`text-sm font-medium ${themeStyles.text}`}>
                  Arambagh Rd, near fresco bakers street, Aram Bagh Burns Road, Karachi, 74400, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className={`h-5 w-5 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
                <span className={`text-sm font-medium ${themeStyles.text}`}>+92 332 3920344</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className={`h-5 w-5 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
                <a href={`mailto:${OFFICIAL_EMAIL}`} className={`text-sm font-medium hover:underline transition-all ${themeStyles.text}`}>
                  {OFFICIAL_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className={`text-xs font-black uppercase tracking-[0.3em] ${themeStyles.heading}`}>Newsletter</h4>
            <p className={`text-sm font-medium ${themeStyles.text}`}>Stay updated with our latest print designs and exclusive offers. All requests delivered to {OFFICIAL_EMAIL}.</p>
            
            {subStatus === 'success' ? (
              <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className={`text-xs font-bold ${themeStyles.heading}`}>Subscription Confirmed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input 
                    required
                    name="email"
                    type="email" 
                    placeholder="Enter your email"
                    className={`w-full px-5 py-3.5 rounded-xl border-2 outline-none text-sm font-medium transition-all ${themeStyles.input} focus:border-current`}
                  />
                </div>
                <button 
                  disabled={subStatus === 'sending'}
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg disabled:opacity-50 ${themeStyles.btn}`}
                >
                  {subStatus === 'sending' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {subStatus === 'sending' ? 'Subscribing...' : 'Subscribe'}
                </button>
                {subStatus === 'error' && (
                  <p className="text-rose-500 text-[10px] font-bold text-center">Failed to subscribe. Please try again.</p>
                )}
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-12 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${isDark ? 'border-zinc-900' : 'border-slate-100'}`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${themeStyles.text}`}>
            © 2024 Rafeem Printer Lab. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <button className={`text-[10px] font-black uppercase tracking-[0.2em] ${themeStyles.text} hover:text-current`}>Privacy Policy</button>
            <button className={`text-[10px] font-black uppercase tracking-[0.2em] ${themeStyles.text} hover:text-current`}>Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
