import React, { useState, useRef } from 'react';
import { 
  Package, 
  CheckCircle2, 
  Loader2,
  Send,
  User,
  Mail,
  MapPin,
  MessageSquare,
  Maximize,
  Layout,
  Upload,
  File,
  X,
  Plus,
  FileText
} from 'lucide-react';

interface OrderPageProps {
  isDark: boolean;
}

const OrderPage: React.FC<OrderPageProps> = ({ isDark }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const FORMSPREE_ID = "mvzogowb";

  const themeStyles = {
    container: isDark ? 'bg-black' : 'bg-white',
    heading: isDark ? 'text-white' : 'text-slate-950',
    paragraph: isDark ? 'text-zinc-400' : 'text-slate-600',
    card: isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200',
    input: isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400',
    btnPrimary: isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800',
    accentText: isDark ? 'text-zinc-500' : 'text-slate-400',
    label: isDark ? 'text-zinc-400' : 'text-slate-500',
    uploadZone: isDark ? 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600' : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setSelectedFile(null);
        e.currentTarget.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`min-h-screen py-32 px-4 flex items-center justify-center transition-colors duration-500 ${themeStyles.container}`}>
        <div className={`max-w-md w-full p-12 rounded-[3rem] border-2 text-center space-y-8 animate-in fade-in zoom-in-95 duration-700 ${themeStyles.card}`}>
          <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-4">
            <h2 className={`text-3xl font-black ${themeStyles.heading}`}>Order Received!</h2>
            <p className={`text-base font-medium leading-relaxed ${themeStyles.paragraph}`}>
              Your details have been shared successfully. Our team will contact you shortly via WhatsApp or Email to confirm your order details and provide further instructions.
            </p>
          </div>
          <button 
            onClick={() => setStatus('idle')}
            className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 ${themeStyles.btnPrimary}`}
          >
            Share Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${themeStyles.container}`}>
      <div className="max-w-[1100px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20 animate-in fade-in slide-in-from-top-8 duration-700">
          <h1 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase ${themeStyles.heading}`}>
            Enter Order Details
          </h1>
          <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto ${themeStyles.paragraph}`}>
            Provide your information manually below. You can also optionally upload an old design to help us understand your requirements better.
          </p>
        </div>

        {/* Form Container */}
        <div className={`p-8 md:p-12 rounded-[3rem] border-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 ${themeStyles.card}`}>
          <form onSubmit={handleSubmit} className="space-y-12" encType="multipart/form-data">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Personal Info */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}>1</div>
                  <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${themeStyles.heading}`}>Your Information</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${themeStyles.label}`}>Full Name</label>
                    <div className="relative">
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${themeStyles.accentText}`} />
                      <input required name="fullName" type="text" placeholder="John Doe" className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold transition-all ${themeStyles.input} focus:border-current`} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${themeStyles.label}`}>Email Address</label>
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${themeStyles.accentText}`} />
                      <input required name="email" type="email" placeholder="john@example.com" className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold transition-all ${themeStyles.input} focus:border-current`} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${themeStyles.label}`}>Location</label>
                    <div className="relative">
                      <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${themeStyles.accentText}`} />
                      <input required name="location" type="text" placeholder="City, Area" className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold transition-all ${themeStyles.input} focus:border-current`} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${themeStyles.label}`}>WhatsApp Number</label>
                    <div className="relative">
                      <MessageSquare className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${themeStyles.accentText}`} />
                      <input required name="whatsapp" type="tel" placeholder="+92 300 1234567" className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold transition-all ${themeStyles.input} focus:border-current`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}>2</div>
                  <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${themeStyles.heading}`}>Order Requirements</h3>
                </div>
                
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${themeStyles.label}`}>Product Name</label>
                  <div className="relative">
                    <Package className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${themeStyles.accentText}`} />
                    <input required name="productName" type="text" placeholder="e.g. Premium Business Cards" className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold transition-all ${themeStyles.input} focus:border-current`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${themeStyles.label}`}>Product Design</label>
                    <div className="relative">
                      <Layout className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${themeStyles.accentText}`} />
                      <input required name="productDesign" type="text" placeholder="e.g. Minimalist Gold Foil" className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold transition-all ${themeStyles.input} focus:border-current`} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${themeStyles.label}`}>Product Size</label>
                    <div className="relative">
                      <Maximize className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${themeStyles.accentText}`} />
                      <input required name="productSize" type="text" placeholder="e.g. 3.5 x 2 inches" className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold transition-all ${themeStyles.input} focus:border-current`} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${themeStyles.label}`}>Product Description</label>
                  <div className="relative">
                    <FileText className={`absolute left-4 top-5 h-5 w-5 ${themeStyles.accentText}`} />
                    <textarea required name="productDescription" rows={2} placeholder="Briefly describe what you need..." className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold transition-all resize-none ${themeStyles.input} focus:border-current`}></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional File Upload */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}>3</div>
                <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${themeStyles.heading}`}>Old Design (Optional)</h3>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-[2.5rem] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4 ${themeStyles.uploadZone}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  name="oldDesignFile"
                  onChange={handleFileChange}
                  className="hidden" 
                  accept="image/*,.pdf,.ai,.psd"
                />
                
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      <File className="h-10 w-10" />
                    </div>
                    <div className="space-y-1">
                      <p className={`font-black text-lg ${themeStyles.heading}`}>{selectedFile.name}</p>
                      <p className={`text-xs font-bold ${themeStyles.paragraph}`}>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(); }}
                      className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:underline"
                    >
                      <X className="h-3 w-3" />
                      Remove File
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-400' : 'border-slate-200 bg-white text-slate-400'}`}>
                      <Upload className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <p className={`font-black text-xl tracking-tight ${themeStyles.heading}`}>Click or Drag to Upload</p>
                      <p className={`text-sm font-medium ${themeStyles.paragraph}`}>Images, PDF, AI or PSD files supported (Optional)</p>
                    </div>
                    <div className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? 'border-zinc-800 text-zinc-500 group-hover:text-white group-hover:border-white' : 'border-slate-200 text-slate-400 group-hover:text-black group-hover:border-black'}`}>
                      Select File
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="pt-8">
              <button 
                disabled={status === 'sending'}
                type="submit" 
                className={`w-full flex items-center justify-center gap-4 py-8 rounded-[2rem] font-black text-lg uppercase tracking-[0.25em] transition-all active:scale-95 shadow-2xl disabled:opacity-50 ${themeStyles.btnPrimary}`}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Sharing...
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6" />
                    Share Details
                  </>
                )}
              </button>
              
              <p className={`text-center mt-6 text-[11px] font-bold tracking-wide ${themeStyles.paragraph}`}>
                By clicking "Share Details", your information will be securely sent to mrrafay900@gmail.com for processing.
              </p>
            </div>
            
            {status === 'error' && (
              <p className="text-rose-500 text-xs font-black text-center animate-pulse uppercase tracking-widest">
                Upload failed. Please check your connection and try sharing again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
