import React from 'react';
import { X, ChevronRight } from 'lucide-react';

interface OffCanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onProductSelect: (product: string) => void;
}

const products = [
  "Book Printing",
  "Business Cards",
  "Letterhead & Envelopes",
  "Flyers & Leaflets",
  "Brochures",
  "Posters",
  "Wedding Invitations",
  "Menu Cards",
  "Restaurant Takeaway Packaging",
  "Labels & Stickers",
  "File/Folder Printing",
  "ID Cards",
  "Sign Boards",
  "Flex & Banners",
  "Packaging Boxes",
  "Promotional Items",
  "Calendars",
  "Catalogues",
  "Receipt Books"
];

const OffCanvasMenu: React.FC<OffCanvasMenuProps> = ({ isOpen, onClose, isDark, onProductSelect }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[120] transition-opacity duration-500 bg-black/60 backdrop-blur-sm ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-[130] transition-transform duration-500 ease-in-out transform shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isDark ? 'bg-black border-l border-zinc-800' : 'bg-white border-l border-slate-200'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-zinc-800' : 'border-slate-100'}`}>
            <div className="flex flex-col">
              <span className={`text-xs font-black uppercase tracking-[0.3em] opacity-50 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Catalogue
              </span>
              <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Our Services
              </h3>
            </div>
            <button 
              onClick={onClose}
              className={`p-2 rounded-xl border transition-all active:scale-90 ${
                isDark ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-white hover:text-black' : 'bg-slate-50 border-slate-200 text-slate-950 hover:bg-black hover:text-white'
              }`}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Product List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => onProductSelect(product)}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 group text-left ${
                  isDark 
                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' 
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold text-sm tracking-wide">{product}</span>
                <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </button>
            ))}
          </div>
        </div>
      </aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? '#27272a' : '#e2e8f0'};
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default OffCanvasMenu;
