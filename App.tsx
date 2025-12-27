
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import OffCanvasMenu from './components/OffCanvasMenu';
import Footer from './components/Footer';
import OrderPage from './components/OrderPage';
import { 
  Search, 
  LayoutGrid, 
  Plus, 
  BookOpen, 
  Layers, 
  Bookmark, 
  FileText,
  CreditCard,
  Mail,
  Zap, 
  BookMarked,
  Image,
  Heart,
  Utensils,
  Package,
  Tag,
  Folder,
  Contact,
  Monitor,
  Type,
  Box,
  Gift,
  Calendar,
  Library,
  Receipt,
  ArrowRight,
  MessageCircle,
  Phone,
  MapPin,
  Send,
  ShoppingBag,
  Loader2,
  CheckCircle2
} from 'lucide-react';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'order' | 'products'>('home');
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [contactFormStatus, setContactFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // OFFICIAL CONFIGURATION
  const OFFICIAL_EMAIL = "mrrafay900@gmail.com";
  const FORMSPREE_ID = "mvzogowb"; 

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      setIsDark(e.detail.isDarkMode);
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    alert(`${productName} added to cart!`);
  };

  const handleNavigate = (view: 'home' | 'order' | 'products') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionId = (title: string) => title.toLowerCase().replace(/ & /g, '-').replace(/[\s\/]/g, '-');

  const scrollToSection = (id: string) => {
    if (currentView === 'order') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const themeStyles = {
    container: isDark ? 'bg-black' : 'bg-white',
    heading: isDark ? 'text-white' : 'text-slate-950',
    paragraph: isDark ? 'text-zinc-400' : 'text-slate-600',
    card: isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200',
    inputBg: isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200',
    inputText: isDark ? 'text-white placeholder-zinc-500' : 'text-slate-950 placeholder-slate-400',
    icon: isDark ? 'text-zinc-400' : 'text-slate-500',
    btnPrimary: isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800',
    btnSecondary: isDark ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-white hover:text-black' : 'bg-slate-50 border-slate-200 text-slate-950 hover:bg-black hover:text-white',
    dropdown: isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-950'
  };

  const productCategories = [
    {
      title: "Book Printing",
      products: [
        { id: "b1", name: "Premium Hardcover", desc: "Luxury finish with durable binding", icon: <BookOpen className="h-8 w-8" /> },
        { id: "b2", name: "Paperback Edition", desc: "Cost-effective, professional quality", icon: <Layers className="h-8 w-8" /> },
        { id: "b3", name: "Spiral Bound Manual", desc: "Perfect for training and reports", icon: <FileText className="h-8 w-8" /> },
        { id: "b4", name: "Custom Journal", desc: "Personalized covers and premium paper", icon: <Bookmark className="h-8 w-8" /> }
      ]
    },
    {
      title: "Business Cards",
      products: [
        { id: "bc1", name: "Matte Standard", desc: "Professional non-reflective finish", icon: <CreditCard className="h-8 w-8" /> },
        { id: "bc2", name: "Spot UV Luxury", desc: "High-gloss accents for premium impact", icon: <CreditCard className="h-8 w-8" /> },
        { id: "bc3", name: "Textured Linen", desc: "Elegant touch with classic texture", icon: <CreditCard className="h-8 w-8" /> },
        { id: "bc4", name: "Heavy Duty Plastic", desc: "Untearable and waterproof durability", icon: <CreditCard className="h-8 w-8" /> }
      ]
    },
    {
      title: "Letterhead & Envelopes",
      products: [
        { id: "le1", name: "Corporate Letterhead", desc: "Premium 100gsm laser-safe paper", icon: <Mail className="h-8 w-8" /> },
        { id: "le2", name: "DL Window Envelopes", desc: "Standard business mailing solution", icon: <Mail className="h-8 w-8" /> },
        { id: "le3", name: "Linen Stationery Set", desc: "Matching letterheads and envelopes", icon: <Mail className="h-8 w-8" /> },
        { id: "le4", name: "Custom C4 Pack", desc: "Large format for documents & folders", icon: <Mail className="h-8 w-8" /> }
      ]
    },
    {
      title: "Flyers & Leaflets",
      products: [
        { id: "fl1", name: "A5 Promotional", desc: "Double-sided glossy event flyers", icon: <Zap className="h-8 w-8" /> },
        { id: "fl2", name: "Tri-fold Menu", desc: "Ideal for restaurants and services", icon: <Layers className="h-8 w-8" /> },
        { id: "fl3", name: "Recycled DL", desc: "Eco-friendly marketing materials", icon: <Zap className="h-8 w-8" /> },
        { id: "fl4", name: "Door Hangers", desc: "Direct-to-customer marketing tools", icon: <Zap className="h-8 w-8" /> }
      ]
    },
    {
      title: "Brochures",
      products: [
        { id: "br1", name: "Product Catalogue", desc: "Stapled binding for multiple pages", icon: <BookMarked className="h-8 w-8" /> },
        { id: "br2", name: "Annual Report", desc: "Clean layout for corporate data", icon: <BookMarked className="h-8 w-8" /> },
        { id: "br3", name: "Glossy Z-Fold", desc: "Dynamic 6-panel informational guide", icon: <Layers className="h-8 w-8" /> },
        { id: "br4", name: "Landscape Premium", desc: "Unique orientation for creative brands", icon: <BookMarked className="h-8 w-8" /> }
      ]
    },
    {
      title: "Posters",
      products: [
        { id: "po1", name: "A3 Indoor Gloss", desc: "Vibrant colors for internal displays", icon: <Image className="h-8 w-8" /> },
        { id: "po2", name: "Large Format Outdoor", desc: "Weather-resistant vinyl printing", icon: <Image className="h-8 w-8" /> },
        { id: "po3", name: "Backlit Film", desc: "Ideal for lightbox advertising", icon: <Image className="h-8 w-8" /> },
        { id: "po4", name: "Architectural Plans", desc: "Precise line work on blueprint paper", icon: <Image className="h-8 w-8" /> }
      ]
    },
    {
      title: "Wedding Invitations",
      products: [
        { id: "wi1", name: "Foil Stamped", desc: "Gold or silver metallic detailing", icon: <Heart className="h-8 w-8" /> },
        { id: "wi2", name: "Laser Cut Elegance", desc: "Intricate patterns on luxury cardstock", icon: <Heart className="h-8 w-8" /> },
        { id: "wi3", name: "Vellum Overlay", desc: "Translucent layers for a soft touch", icon: <Heart className="h-8 w-8" /> },
        { id: "wi4", name: "Save The Date", desc: "The perfect start to your big day", icon: <Heart className="h-8 w-8" /> }
      ]
    },
    {
      title: "Menu Cards",
      products: [
        { id: "mc1", name: "Single Page Menu", desc: "Heavy cardstock with spill protection", icon: <Utensils className="h-8 w-8" /> },
        { id: "mc2", name: "Booklet Menu", desc: "Multi-page stitched dining guide", icon: <Utensils className="h-8 w-8" /> },
        { id: "mc3", name: "Table Tent", desc: "Self-standing promotional display", icon: <Utensils className="h-8 w-8" /> },
        { id: "mc4", name: "Laminated Menu", desc: "Maximum durability for busy cafes", icon: <Utensils className="h-8 w-8" /> }
      ]
    },
    {
      title: "Restaurant Takeaway Packaging",
      products: [
        { id: "tp1", name: "Paper Food Box", desc: "Grease-resistant eco-friendly boxes", icon: <Package className="h-8 w-8" /> },
        { id: "tp2", name: "Custom Paper Bags", desc: "Branded takeaway carrier bags", icon: <Package className="h-8 w-8" /> },
        { id: "tp3", name: "Napkin Printing", desc: "Subtle branding on quality napkins", icon: <Package className="h-8 w-8" /> },
        { id: "tp4", name: "Cup Sleeves", desc: "Insulated branding for hot drinks", icon: <Package className="h-8 w-8" /> }
      ]
    },
    {
      title: "Labels & Stickers",
      products: [
        { id: "ls1", name: "Product Labels", desc: "Roll-fed labels for retail items", icon: <Tag className="h-8 w-8" /> },
        { id: "ls2", name: "Die-Cut Stickers", desc: "Custom shapes for brand promotion", icon: <Tag className="h-8 w-8" /> },
        { id: "ls3", name: "Bumper Stickers", desc: "UV resistant outdoor vinyl stickers", icon: <Tag className="h-8 w-8" /> },
        { id: "ls4", name: "Clear Labels", desc: "Elegant transparent adhesive prints", icon: <Tag className="h-8 w-8" /> }
      ]
    },
    {
      title: "File/Folder Printing",
      products: [
        { id: "ff1", name: "Presentation Folder", desc: "Pocket folders with card slots", icon: <Folder className="h-8 w-8" /> },
        { id: "ff2", name: "Ring Binder Cover", desc: "Custom inserts for large binders", icon: <Folder className="h-8 w-8" /> },
        { id: "ff3", name: "Manilla Folders", desc: "Standard branded office filing", icon: <Folder className="h-8 w-8" /> },
        { id: "ff4", name: "Plastic Wallet", desc: "Durable branded document storage", icon: <Folder className="h-8 w-8" /> }
      ]
    },
    {
      title: "ID Cards",
      products: [
        { id: "id1", name: "Employee Badge", desc: "PVC cards with photo and data", icon: <Contact className="h-8 w-8" /> },
        { id: "id2", name: "Membership Card", desc: "High-quality cards with barcodes", icon: <Contact className="h-8 w-8" /> },
        { id: "id3", name: "Visitor Pass", desc: "Laminated passes with lanyards", icon: <Contact className="h-8 w-8" /> },
        { id: "id4", name: "Proximity Card", desc: "Smart cards for secure access", icon: <Contact className="h-8 w-8" /> }
      ]
    },
    {
      title: "Sign Boards",
      products: [
        { id: "sb1", name: "Foam Board Sign", desc: "Lightweight indoor event signage", icon: <Monitor className="h-8 w-8" /> },
        { id: "sb2", name: "Acrylic Plaque", desc: "Modern wall-mounted office signs", icon: <Monitor className="h-8 w-8" /> },
        { id: "sb3", name: "Metal Signage", desc: "Durable aluminum for outdoors", icon: <Monitor className="h-8 w-8" /> },
        { id: "sb4", name: "A-Frame Sign", desc: "Portable pavement marketing", icon: <Monitor className="h-8 w-8" /> }
      ]
    },
    {
      title: "Flex & Banners",
      products: [
        { id: "fb1", name: "PVC Flex Banner", desc: "Large scale outdoor advertising", icon: <Type className="h-8 w-8" /> },
        { id: "fb2", name: "Pull-up Banner", desc: "Retractable stand for trade shows", icon: <Type className="h-8 w-8" /> },
        { id: "fb3", name: "Mesh Banner", desc: "Wind-resistant construction signs", icon: <Type className="h-8 w-8" /> },
        { id: "fb4", name: "Fabric Backdrop", desc: "Wrinkle-free stage backgrounds", icon: <Type className="h-8 w-8" /> }
      ]
    },
    {
      title: "Packaging Boxes",
      products: [
        { id: "pb1", name: "Product Box", desc: "Custom sized retail packaging", icon: <Box className="h-8 w-8" /> },
        { id: "pb2", name: "Shipping Carton", desc: "Heavy duty corrugated shipping", icon: <Box className="h-8 w-8" /> },
        { id: "pb3", name: "Gift Box", desc: "Luxury finish for high-end items", icon: <Box className="h-8 w-8" /> },
        { id: "pb4", name: "Mailing Box", desc: "Compact boxes for postal delivery", icon: <Box className="h-8 w-8" /> }
      ]
    },
    {
      title: "Promotional Items",
      products: [
        { id: "pi1", name: "Branded Pens", desc: "Classic laser-engraved pens", icon: <Gift className="h-8 w-8" /> },
        { id: "pi2", name: "Custom Mugs", desc: "Full-color sublimation printing", icon: <Gift className="h-8 w-8" /> },
        { id: "pi3", name: "Branded Tote Bag", desc: "Eco-friendly cotton carry bags", icon: <Gift className="h-8 w-8" /> },
        { id: "pi4", name: "USB Flash Drive", desc: "Useful tech with your logo", icon: <Gift className="h-8 w-8" /> }
      ]
    },
    {
      title: "Calendars",
      products: [
        { id: "ca1", name: "Wall Calendar", desc: "A3 spiral bound monthly view", icon: <Calendar className="h-8 w-8" /> },
        { id: "ca2", name: "Desk Calendar", desc: "Compact flip-chart for offices", icon: <Calendar className="h-8 w-8" /> },
        { id: "ca3", name: "Pocket Calendar", desc: "Laminated wallet-sized cards", icon: <Calendar className="h-8 w-8" /> },
        { id: "ca4", name: "Poster Calendar", desc: "Single sheet full year overview", icon: <Calendar className="h-8 w-8" /> }
      ]
    },
    {
      title: "Catalogues",
      products: [
        { id: "ct1", name: "Product Showcase", desc: "Perfect bound thick catalogues", icon: <Library className="h-8 w-8" /> },
        { id: "ct2", name: "Services Guide", desc: "Professional informative booklets", icon: <Library className="h-8 w-8" /> },
        { id: "ct3", name: "Lookbook", desc: "High-fashion aesthetic printing", icon: <Library className="h-8 w-8" /> },
        { id: "ct4", name: "Technical Manual", desc: "Detailed specs and instructions", icon: <Library className="h-8 w-8" /> }
      ]
    },
    {
      title: "Receipt Books",
      products: [
        { id: "rb1", name: "NCR Invoice Book", desc: "Duplicate or triplicate copies", icon: <Receipt className="h-8 w-8" /> },
        { id: "rb2", name: "Payment Voucher", desc: "Custom branded finance slips", icon: <Receipt className="h-8 w-8" /> },
        { id: "rb3", name: "Quotation Book", desc: "Professional field sales pads", icon: <Receipt className="h-8 w-8" /> },
        { id: "rb4", name: "Delivery Note", desc: "Proof of delivery tracking pads", icon: <Receipt className="h-8 w-8" /> }
      ]
    }
  ];

  const filteredCategories = productCategories.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormStatus('sending');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `New Contact Request from ${data.name}`
        })
      });

      if (response.ok) {
        setContactFormStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setContactFormStatus('idle'), 5000);
      } else {
        const errorData = await response.json();
        console.error('Formspree error details:', errorData);
        setContactFormStatus('error');
      }
    } catch (error) {
      console.error('Network submission error:', error);
      setContactFormStatus('error');
      setTimeout(() => setContactFormStatus('idle'), 3000);
    }
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-700 ${themeStyles.container}`}>
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <OffCanvasMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isDark={isDark}
        onProductSelect={(title) => scrollToSection(getSectionId(title))}
      />
      
      <main className="relative pt-20">
        
        {currentView === 'order' ? (
          <OrderPage isDark={isDark} />
        ) : (
          <>
            {/* HERO SECTION - ONLY ON HOME */}
            {currentView === 'home' && (
              <section className={`relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${themeStyles.container}`}>
                <div className="max-w-[1440px] mx-auto text-center space-y-12 animate-in fade-in slide-in-from-top-12 duration-1000">
                  <div className="space-y-8">
                    <h2 className={`text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] transition-colors duration-500 ${themeStyles.heading}`}>
                      We Print <br className="hidden md:block" /> Everything You Need
                    </h2>
                    <div className={`w-32 h-2.5 mx-auto rounded-full transition-colors duration-500 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
                  </div>
                  
                  <p className={`text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto transition-colors duration-500 ${themeStyles.paragraph}`}>
                    We design and print everything from books and business cards to sign boards, packaging, and wedding invitations.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                    <button 
                      onClick={() => handleNavigate('order')}
                      className={`group flex items-center gap-3 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 ${themeStyles.btnPrimary}`}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>Order Now</span>
                    </button>
                    <button 
                      onClick={() => scrollToSection('contact-us')}
                      className={`group flex items-center gap-3 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 ${themeStyles.btnSecondary}`}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Contact Us</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* SEARCH & DISCOVERY BAR - SHARED BETWEEN HOME & PRODUCTS */}
            <section className={`relative ${currentView === 'products' ? 'pt-32' : ''} pb-24 px-4 sm:px-6 lg:px-8`}>
              <div ref={searchContainerRef} className="max-w-3xl mx-auto relative flex flex-col sm:flex-row items-center gap-4 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <div className="relative flex-1 w-full group">
                  <Search className={`absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${themeStyles.icon}`} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(true);
                    }}
                    onFocus={() => setShowSearchResults(true)}
                    placeholder="What can we print for you today?"
                    className={`w-full pl-14 pr-6 py-5 rounded-2xl border-2 outline-none transition-all duration-300 font-medium text-lg ${themeStyles.inputBg} ${themeStyles.inputText} focus:border-current`}
                  />

                  {showSearchResults && searchQuery.trim() !== '' && (
                    <div className={`absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl border-2 shadow-2xl z-[50] max-h-80 overflow-y-auto ${themeStyles.dropdown}`}>
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((cat) => (
                          <button
                            key={cat.title}
                            onClick={() => scrollToSection(getSectionId(cat.title))}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                              isDark ? 'hover:bg-zinc-800' : 'hover:bg-slate-50'
                            }`}
                          >
                            <span className="font-bold">{cat.title}</span>
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 opacity-50 font-medium text-sm">No services matched your search...</div>
                      )}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className={`p-5 rounded-2xl border-2 transition-all active:scale-95 group ${themeStyles.inputBg}`}
                  title="Browse Catalogue"
                >
                  <LayoutGrid className={`h-6 w-6 transition-transform duration-300 group-hover:rotate-90 ${themeStyles.icon}`} />
                </button>
              </div>
            </section>

            {/* PRODUCT CATEGORIES CONTENT */}
            <div className="space-y-32 py-24">
              {currentView === 'home' ? (
                /* UNIFIED GRID FOR HOME PAGE (4 products per row on desktop) */
                <section className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
                   <div className="mb-12">
                      <h3 className={`text-3xl font-black uppercase tracking-[0.2em] transition-colors duration-500 ${themeStyles.heading}`}>
                        Our Featured Services
                      </h3>
                      <div className={`w-12 h-1.5 mt-3 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}></div>
                    </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productCategories.map((category) => {
                      const product = category.products[0];
                      const sectionId = getSectionId(category.title);
                      return (
                        <div 
                          key={category.title}
                          id={sectionId}
                          className={`group flex flex-col p-8 rounded-[2rem] border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] scroll-mt-24 ${themeStyles.card}`}
                        >
                          <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${isDark ? 'bg-zinc-800 text-white' : 'bg-slate-50 text-black'}`}>
                            {product.icon}
                          </div>
                          <h5 className={`text-xl font-black mb-2 transition-colors duration-500 ${themeStyles.heading}`}>
                            {category.title}
                          </h5>
                          <p className={`text-sm font-medium mb-10 transition-colors duration-500 ${themeStyles.paragraph}`}>
                            {product.desc}
                          </p>
                          <button 
                            onClick={() => handleAddToCart(product.name)}
                            className={`mt-auto flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${themeStyles.btnPrimary}`}
                          >
                            <Plus className="h-4 w-4" />
                            Add to Cart
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : (
                /* CATEGORIZED VIEW FOR PRODUCTS PAGE */
                productCategories.map((category) => {
                  const sectionId = getSectionId(category.title);
                  return (
                    <section 
                      key={category.title} 
                      id={sectionId}
                      className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto scroll-mt-24"
                    >
                      <div className="mb-12">
                        <h3 className={`text-3xl font-black uppercase tracking-[0.2em] transition-colors duration-500 ${themeStyles.heading}`}>
                          {category.title}
                        </h3>
                        <div className={`w-12 h-1.5 mt-3 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}></div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {category.products.map((product) => (
                          <div 
                            key={product.id}
                            className={`group flex flex-col p-8 rounded-[2rem] border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${themeStyles.card}`}
                          >
                            <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${isDark ? 'bg-zinc-800 text-white' : 'bg-slate-50 text-black'}`}>
                              {product.icon}
                            </div>
                            <h5 className={`text-xl font-black mb-2 transition-colors duration-500 ${themeStyles.heading}`}>
                              {product.name}
                            </h5>
                            <p className={`text-sm font-medium mb-10 transition-colors duration-500 ${themeStyles.paragraph}`}>
                              {product.desc}
                            </p>
                            <button 
                              onClick={() => handleAddToCart(product.name)}
                              className={`mt-auto flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${themeStyles.btnPrimary}`}
                            >
                              <Plus className="h-4 w-4" />
                              Add to Cart
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })
              )}
            </div>

            {/* CONTACT US SECTION - ONLY ON HOME */}
            {currentView === 'home' && (
              <section id="contact-us" className="py-32 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                  <div className="space-y-12">
                    <div className="space-y-4">
                      <h3 className={`text-4xl md:text-5xl font-black uppercase tracking-tight transition-colors duration-500 ${themeStyles.heading}`}>
                        Let's Talk <br />About Your Project
                      </h3>
                      <p className={`text-lg font-medium transition-colors duration-500 ${themeStyles.paragraph}`}>
                        Have a custom request or need a bulk quote? Our team is ready to help you bring your ideas to life.
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-start gap-6">
                        <div className={`p-4 rounded-2xl ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-slate-50 border border-slate-200'}`}>
                          <MapPin className={`h-6 w-6 ${themeStyles.icon}`} />
                        </div>
                        <div>
                          <h6 className={`font-black text-sm uppercase tracking-widest mb-1 ${themeStyles.heading}`}>Visit Us</h6>
                          <p className={`text-sm font-medium ${themeStyles.paragraph}`}>
                            Arambagh Rd, near fresco bakers street, Aram Bagh Burns Road, Karachi, 74400, Pakistan
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-6">
                        <div className={`p-4 rounded-2xl ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-slate-50 border border-slate-200'}`}>
                          <Phone className={`h-6 w-6 ${themeStyles.icon}`} />
                        </div>
                        <div>
                          <h6 className={`font-black text-sm uppercase tracking-widest mb-1 ${themeStyles.heading}`}>Call Us</h6>
                          <p className={`text-sm font-medium ${themeStyles.paragraph}`}>+92 332 3920344</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-6">
                        <div className={`p-4 rounded-2xl ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-slate-50 border border-slate-200'}`}>
                          <Mail className={`h-6 w-6 ${themeStyles.icon}`} />
                        </div>
                        <div>
                          <h6 className={`font-black text-sm uppercase tracking-widest mb-1 ${themeStyles.heading}`}>Email Us</h6>
                          <a href={`mailto:${OFFICIAL_EMAIL}`} className={`text-sm font-medium hover:underline transition-all ${themeStyles.paragraph}`}>
                            {OFFICIAL_EMAIL}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-8 md:p-12 rounded-[3rem] border-2 transition-all duration-500 ${themeStyles.card}`}>
                    {contactFormStatus === 'success' ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                          <CheckCircle2 className="h-10 w-10 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h4 className={`text-2xl font-black ${themeStyles.heading}`}>Message Sent!</h4>
                          <p className={`text-sm font-medium ${themeStyles.paragraph}`}>
                            Thank you for reaching out. We will get back to you at your email shortly.
                          </p>
                        </div>
                        <button 
                          onClick={() => setContactFormStatus('idle')}
                          className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border-2 transition-all ${isDark ? 'border-zinc-800 text-zinc-400 hover:text-white hover:border-white' : 'border-slate-200 text-slate-500 hover:text-black hover:border-black'}`}
                        >
                          Send Another
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className={`text-xs font-black uppercase tracking-[0.2em] ml-2 ${themeStyles.heading}`}>Name</label>
                            <input required name="name" type="text" placeholder="Your Name" className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all duration-300 font-medium ${themeStyles.inputBg} ${themeStyles.inputText} focus:border-current`} />
                          </div>
                          <div className="space-y-2">
                            <label className={`text-xs font-black uppercase tracking-[0.2em] ml-2 ${themeStyles.heading}`}>Email</label>
                            <input required name="email" type="email" placeholder="your@email.com" className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all duration-300 font-medium ${themeStyles.inputBg} ${themeStyles.inputText} focus:border-current`} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={`text-xs font-black uppercase tracking-[0.2em] ml-2 ${themeStyles.heading}`}>Phone Number</label>
                          <input required name="phone" type="tel" placeholder="+1 (555) 000-0000" className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all duration-300 font-medium ${themeStyles.inputBg} ${themeStyles.inputText} focus:border-current`} />
                        </div>
                        <div className="space-y-2">
                          <label className={`text-xs font-black uppercase tracking-[0.2em] ml-2 ${themeStyles.heading}`}>Message</label>
                          <textarea required name="message" rows={4} placeholder="How can we help with your printing needs?" className={`w-full px-6 py-4 rounded-2xl border-2 outline-none font-bold resize-none ${themeStyles.inputBg} ${themeStyles.inputText} focus:border-current`}></textarea>
                        </div>
                        <button 
                          disabled={contactFormStatus === 'sending'}
                          type="submit" 
                          className={`w-full flex items-center justify-center gap-3 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${themeStyles.btnPrimary}`}
                        >
                          {contactFormStatus === 'sending' ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </button>
                        {contactFormStatus === 'error' && (
                          <p className="text-rose-500 text-xs font-bold text-center animate-pulse">
                            Submission failed. Check your Formspree ID or internet connection.
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        <Footer isDark={isDark} onLinkClick={scrollToSection} />
      </main>
    </div>
  );
};

export default App;
