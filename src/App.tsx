/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, Download, Search, Library, Sun } from 'lucide-react';

interface Book {
  title: string;
  author: string;
  class: string;
  pdf: string;
  spine: {
    bg: string;
    text: string;
    w: number;
    h: number;
    font: string;
    weight: number;
    rotation?: number;
    variant?: 'default' | 'bordered' | 'icon' | 'number' | 'large-number';
    number?: string;
  };
}

const BOOKS: Book[] = [
  {
    "title": "In AI we trust",
    "author": "Helga Nowotny",
    "class": "History of Ai",
    "pdf": "https://your-pdf-link.com/in-ai-we-trust.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 45, "h": 400, "font": "'Unbounded', sans-serif", "weight": 700 }
  },
  {
    "title": "Algospeak",
    "author": "Adam Aleksic",
    "class": "Text as outcome",
    "pdf": "https://your-pdf-link.com/algospeak.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 38, "h": 360, "font": "'Space Mono', monospace", "weight": 700, "variant": "bordered", "number": "01" }
  },
  {
    "title": "The Work of Art",
    "author": "Walter Benjamin",
    "class": "Text as outcome",
    "pdf": "https://web.mit.edu/allanmc/www/benjamin.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 55, "h": 440, "font": "'DM Serif Display', serif", "weight": 400, "rotation": -3 }
  },
  {
    "title": "Reproduction",
    "author": "Marshall McLuhan",
    "class": "Text as outcome",
    "pdf": "https://your-pdf-link.com/reproduction.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 48, "h": 380, "font": "'Unbounded', sans-serif", "weight": 900 }
  },
  {
    "title": "Patently Untrue",
    "author": "Bruce Sterling",
    "class": "Text as outcome",
    "pdf": "https://your-pdf-link.com/patently-untrue.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 65, "h": 480, "font": "'Space Mono', monospace", "weight": 700, "variant": "icon" }
  },
  {
    "title": "In the Flow",
    "author": "Boris Groys",
    "class": "History of Ai",
    "pdf": "https://your-pdf-link.com/in-the-flow.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 42, "h": 370, "font": "'Unbounded', sans-serif", "weight": 700, "rotation": 5 }
  },
  {
    "title": "L'Intelligence artificielle",
    "author": "Éric Sadin",
    "class": "Text as outcome",
    "pdf": "https://your-pdf-link.com/intelligence-artificielle.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 50, "h": 420, "font": "'Unbounded', sans-serif", "weight": 900, "variant": "bordered", "number": "24" }
  },
  {
    "title": "In Defense of the Poor Image",
    "author": "Hito Steyerl",
    "class": "Text as outcome",
    "pdf": "http://worker01.e-flux.com/pdf/article_94.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 35, "h": 340, "font": "'Space Mono', monospace", "weight": 700 }
  },
  {
    "title": "Says Who?",
    "author": "Anne Curzan",
    "class": "Text as outcome",
    "pdf": "https://your-pdf-link.com/says-who.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 58, "h": 410, "font": "'Unbounded', sans-serif", "weight": 700, "variant": "icon" }
  },
  {
    "title": "Technodiversity",
    "author": "Yuk Hui",
    "class": "History of Ai",
    "pdf": "https://www.technodiversity.org/white-paper",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 38, "h": 460, "font": "'Space Mono', monospace", "weight": 700, "rotation": -8 }
  },
  {
    "title": "Context Rot",
    "author": "Chroma Report",
    "class": "Text as outcome",
    "pdf": "https://research.trychroma.com/context-rot",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 42, "h": 390, "font": "'Unbounded', sans-serif", "weight": 900, "variant": "bordered", "number": "LLM" }
  },
  {
    "title": "Your Brain on ChatGPT",
    "author": "MIT Research Team",
    "class": "Text as outcome",
    "pdf": "https://arxiv.org/pdf/2506.08872v1",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 60, "h": 450, "font": "'Space Mono', monospace", "weight": 700, "rotation": 12 }
  },
  {
    "title": "DOT — LINE — SHAPE",
    "author": "Elena Rossi",
    "class": "Typography",
    "pdf": "https://your-pdf-link.com/dot-line-shape.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 45, "h": 380, "font": "'Space Mono', monospace", "weight": 700, "rotation": -5 }
  },
  {
    "title": "GRAPHIC FEST",
    "author": "Dr. Aris Thorne",
    "class": "AI Ethics",
    "pdf": "https://your-pdf-link.com/graphic-fest.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 50, "h": 420, "font": "'Unbounded', sans-serif", "weight": 900 }
  },
  {
    "title": "YOU ARE HERE",
    "author": "Sarah Jenkins",
    "class": "UX Research",
    "pdf": "https://your-pdf-link.com/you-are-here.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 55, "h": 440, "font": "'Unbounded', sans-serif", "weight": 700, "variant": "bordered", "number": "2" }
  },
  {
    "title": "GRAPHITE",
    "author": "Marcus Vane",
    "class": "Motion Design",
    "pdf": "https://your-pdf-link.com/graphite.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 58, "h": 410, "font": "'Unbounded', sans-serif", "weight": 900 }
  },
  {
    "title": "NEW FOLK ART",
    "author": "Kaito Nakamura",
    "class": "Brand Identity",
    "pdf": "https://your-pdf-link.com/new-folk-art.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 60, "h": 430, "font": "'Unbounded', sans-serif", "weight": 700, "variant": "icon" }
  },
  {
    "title": "PALETTE mini PASTEL",
    "author": "Amara Okoro",
    "class": "Service Design",
    "pdf": "https://your-pdf-link.com/palette-mini-pastel.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 120, "h": 340, "font": "'Space Mono', monospace", "weight": 700, "variant": "large-number", "number": "5" }
  },
  {
    "title": "GOOD BY DESIGN",
    "author": "Leo Sterling",
    "class": "Generative Art",
    "pdf": "https://your-pdf-link.com/good-by-design.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 48, "h": 450, "font": "'Unbounded', sans-serif", "weight": 900, "rotation": 15 }
  },
  {
    "title": "NEURAL NETWORKS",
    "author": "Victor Chen",
    "class": "AI Architecture",
    "pdf": "https://your-pdf-link.com/neural-networks.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 42, "h": 390, "font": "'Space Mono', monospace", "weight": 700, "rotation": -2 }
  },
  {
    "title": "TYPE AS IMAGE",
    "author": "Lara Croft",
    "class": "Typography II",
    "pdf": "https://your-pdf-link.com/type-as-image.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 45, "h": 410, "font": "'Unbounded', sans-serif", "weight": 700, "variant": "bordered", "number": "12" }
  },
  {
    "title": "VOID SPACE",
    "author": "Zaha Hadid",
    "class": "Spatial Design",
    "pdf": "https://your-pdf-link.com/void-space.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 65, "h": 460, "font": "'DM Serif Display', serif", "weight": 400 }
  },
  {
    "title": "ALGORITHMIC ART",
    "author": "Casey Reas",
    "class": "Creative Coding",
    "pdf": "https://your-pdf-link.com/algorithmic-art.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 45, "h": 370, "font": "'Space Mono', monospace", "weight": 700, "variant": "icon" }
  },
  {
    "title": "FUTURE CITIES",
    "author": "Bjarke Ingels",
    "class": "Urbanism",
    "pdf": "https://your-pdf-link.com/future-cities.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 60, "h": 430, "font": "'Unbounded', sans-serif", "weight": 900, "rotation": 8 }
  },
  {
    "title": "BIO DESIGN",
    "author": "Neri Oxman",
    "class": "Material Science",
    "pdf": "https://your-pdf-link.com/bio-design.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 50, "h": 400, "font": "'Unbounded', sans-serif", "weight": 700, "variant": "bordered", "number": "01" }
  },
  {
    "title": "DATA POETICS",
    "author": "Giorgia Lupi",
    "class": "Data Viz",
    "pdf": "https://your-pdf-link.com/data-poetics.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 38, "h": 350, "font": "'Space Mono', monospace", "weight": 700 }
  },
  {
    "title": "THE NEW NORMAL",
    "author": "Benjamin Bratton",
    "class": "Design Theory",
    "pdf": "https://your-pdf-link.com/the-new-normal.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 55, "h": 440, "font": "'Unbounded', sans-serif", "weight": 900, "rotation": -10 }
  },
  {
    "title": "NEURAL DREAMS",
    "author": "Refik Anadol",
    "class": "Data Art",
    "pdf": "https://your-pdf-link.com/neural-dreams.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 48, "h": 410, "font": "'Unbounded', sans-serif", "weight": 900, "rotation": 5 }
  },
  {
    "title": "POST-HUMAN DESIGN",
    "author": "Rosie Braidotti",
    "class": "Philosophy",
    "pdf": "https://your-pdf-link.com/post-human.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 42, "h": 380, "font": "'Space Mono', monospace", "weight": 700, "variant": "bordered", "number": "08" }
  },
  {
    "title": "GLITCH AESTHETICS",
    "author": "Rosa Menkman",
    "class": "Media Theory",
    "pdf": "https://your-pdf-link.com/glitch.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 35, "h": 360, "font": "'Unbounded', sans-serif", "weight": 700, "variant": "icon" }
  },
  {
    "title": "SPECULATIVE EVERYTHING",
    "author": "Dunne & Raby",
    "class": "Critical Design",
    "pdf": "https://your-pdf-link.com/speculative.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 50, "h": 430, "font": "'DM Serif Display', serif", "weight": 400, "rotation": -12 }
  },
  {
    "title": "DESIGN OF EVERYDAY THINGS",
    "author": "Don Norman",
    "class": "Cognitive Science",
    "pdf": "https://your-pdf-link.com/don-norman.pdf",
    "spine": { "bg": "#FFFFFF", "text": "#0000FF", "w": 58, "h": 400, "font": "'Unbounded', sans-serif", "weight": 900 }
  }
];

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingTags, setIsDraggingTags] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startXTags, setStartXTags] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [scrollLeftStateTags, setScrollLeftStateTags] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  const categories = Array.from(new Set(BOOKS.map(b => b.class))).sort();

  const filteredBooks = BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.class.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || book.class === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollContainerRef.current;
    const tagsEl = tagsContainerRef.current;

    const setupWheel = (element: HTMLDivElement | null) => {
      if (!element) return () => {};
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          element.scrollLeft += e.deltaY * 1.5;
        }
      };
      element.addEventListener('wheel', onWheel, { passive: false });
      return () => element.removeEventListener('wheel', onWheel);
    };

    const cleanupWheel = setupWheel(el);
    const cleanupTagsWheel = setupWheel(tagsEl);

    const handleScroll = () => {
      if (el) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          setScrollProgress(el.scrollLeft / maxScroll);
        }
      }
    };

    if (el) el.addEventListener('scroll', handleScroll);

    return () => {
      cleanupWheel();
      cleanupTagsWheel();
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingTags(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scrollContainerRef.current) {
      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
    }
    
    if (isDraggingTags && tagsContainerRef.current) {
      e.preventDefault();
      const x = e.pageX - tagsContainerRef.current.offsetLeft;
      const walk = (x - startXTags) * 2;
      tagsContainerRef.current.scrollLeft = scrollLeftStateTags - walk;
    }
  };

  const handleMouseDownTags = (e: React.MouseEvent) => {
    if (!tagsContainerRef.current) return;
    setIsDraggingTags(true);
    setStartXTags(e.pageX - tagsContainerRef.current.offsetLeft);
    setScrollLeftStateTags(tagsContainerRef.current.scrollLeft);
  };

  return (
    <div className="min-h-screen bg-[#0000FF] text-white font-sans selection:bg-white selection:text-[#0000FF] flex flex-col">
      {/* Header */}
      <header className="px-6 py-12 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 shrink-0">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-7xl font-unbounded font-black tracking-tighter uppercase leading-none">
            MAIAD<br />Library
          </h1>
          <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.3em] opacity-80">Digital Archive for Design & AI</p>
        </motion.div>
        
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-full md:w-72"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 opacity-60" />
          <input 
            type="text"
            placeholder="SEARCH ARCHIVE..."
            className="w-full bg-white/10 border border-white/20 rounded-none py-3 pl-10 pr-6 text-[10px] font-mono focus:outline-none focus:bg-white/20 transition-all placeholder:text-white/40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </header>

      {/* Main Content - Horizontal Slider */}
      <main className="flex-1 flex flex-col items-center w-full relative pb-20">
        {/* Category Filters / Keywords */}
        <div className="w-full px-6 md:px-12 py-12 z-20 flex flex-col items-center gap-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40 mb-2">Filter by Category</div>
          <div 
            ref={tagsContainerRef}
            onMouseDown={handleMouseDownTags}
            onMouseLeave={() => setIsDraggingTags(false)}
            onMouseUp={() => setIsDraggingTags(false)}
            onMouseMove={handleMouseMove}
            className={`flex flex-nowrap gap-2 overflow-x-auto no-scrollbar w-full max-w-5xl pb-2 select-none ${isDraggingTags ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 text-[9px] font-mono uppercase tracking-widest transition-all border rounded-full flex-shrink-0 ${!selectedCategory ? 'bg-white text-[#0000FF] border-white shadow-lg' : 'bg-transparent text-white border-white/20 hover:border-white/60'}`}
            >
              All Archive
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-[9px] font-mono uppercase tracking-widest transition-all border rounded-full flex-shrink-0 ${selectedCategory === cat ? 'bg-white text-[#0000FF] border-white shadow-lg' : 'bg-transparent text-white border-white/20 hover:border-white/60'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex items-end gap-1 md:gap-4 w-full px-12 md:px-24 overflow-x-auto no-scrollbar select-none min-h-[550px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex items-end gap-1 md:gap-6 pb-4 pointer-events-none min-w-max">
            {filteredBooks.map((book, idx) => (
              <motion.div
                key={book.title}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  rotate: book.spine.rotation || 0,
                }}
                whileHover={{ 
                  scale: 1.15, 
                  zIndex: 50,
                  y: -20,
                  transition: { duration: 0.2 }
                }}
                transition={{ 
                  delay: idx * 0.05, 
                  type: "spring", 
                  stiffness: 70,
                  damping: 15
                }}
                onClick={(e) => {
                  // Prevent click if dragging
                  if (isDragging) return;
                  setSelectedBook(book);
                }}
                className="pointer-events-auto relative shadow-2xl origin-bottom flex-shrink-0"
                style={{
                  width: book.spine.w,
                  height: book.spine.h,
                  backgroundColor: book.spine.bg,
                  color: book.spine.text,
                }}
              >
                {/* Spine Content */}
                <div className="absolute inset-0 flex flex-col items-center py-6 px-1">
                  <div className="flex-1 flex items-center justify-center w-full">
                    {book.spine.variant === 'bordered' ? (
                      <div className="flex flex-col items-center gap-4 h-full w-full py-4">
                        <div className="border-2 border-current rounded-full px-2 py-8 flex items-center justify-center">
                          <span className="writing-vertical-rl uppercase font-black text-sm tracking-tighter whitespace-nowrap">
                            {book.title}
                          </span>
                        </div>
                        <div className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center font-black text-xs">
                          {book.spine.number}
                        </div>
                        <div className="border-2 border-current rounded-full px-2 py-4 flex items-center justify-center">
                          <span className="writing-vertical-rl uppercase font-bold text-[8px] tracking-tighter whitespace-nowrap">
                            {book.class}
                          </span>
                        </div>
                      </div>
                    ) : book.spine.variant === 'icon' ? (
                      <div className="flex flex-col items-center justify-between h-full py-4">
                        <Sun className="w-6 h-6 fill-current" />
                        <span className="writing-vertical-rl uppercase font-black text-xl tracking-tighter whitespace-nowrap">
                          {book.title}
                        </span>
                        <Sun className="w-6 h-6 fill-current" />
                      </div>
                    ) : book.spine.variant === 'large-number' ? (
                      <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="flex flex-col items-center text-[8px] font-mono uppercase tracking-widest leading-tight">
                          <span>Palette</span>
                          <span>Mini</span>
                          <span>Pastel</span>
                        </div>
                        <span className="text-9xl font-black leading-none">{book.spine.number}</span>
                      </div>
                    ) : (
                      <span 
                        className="writing-vertical-rl uppercase font-black text-xl tracking-tighter whitespace-nowrap px-2"
                        style={{ 
                          fontFamily: book.spine.font,
                          fontWeight: book.spine.weight
                        }}
                      >
                        {book.title}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto pt-4 border-t border-current/10 w-full flex justify-center px-1 overflow-hidden">
                    <span className="text-[8px] font-mono font-bold tracking-tighter opacity-80 uppercase truncate">
                      {book.author}
                    </span>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <div className="absolute inset-0 shadow-[inset_-1px_0_5px_rgba(0,0,0,0.05)] pointer-events-none" />
              </motion.div>
            ))}
          </div>
          
          {filteredBooks.length === 0 && (
            <div className="w-full text-center py-20 opacity-60 font-mono text-sm uppercase tracking-[0.5em]">
              Archive Empty
            </div>
          )}
        </div>
      </main>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-crosshair"
            />
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-5xl bg-white text-[#0000FF] rounded-none overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
            >
              {/* Close Button - Fixed Position in Modal */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBook(null);
                }}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-3 bg-[#0000FF] text-white hover:bg-black transition-colors rounded-none flex items-center justify-center group"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Left: Visual */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-[#0000FF]">
                <motion.div 
                  initial={{ rotateY: -30, x: -50 }}
                  animate={{ rotateY: 0, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="w-64 h-[400px] md:w-72 md:h-[450px] bg-white shadow-2xl relative flex flex-col items-center py-12 px-4 perspective-1000"
                >
                   <span className="writing-vertical-rl uppercase font-black text-3xl md:text-4xl tracking-tighter whitespace-nowrap">
                    {selectedBook.title}
                  </span>
                  <div className="mt-auto text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">
                    {selectedBook.author}
                  </div>
                  {/* Page Edge Effect */}
                  <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-l from-black/5 to-transparent" />
                </motion.div>
              </div>

              {/* Right: Info */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white">
                <div className="space-y-8 md:space-y-12">
                  <div>
                    <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] opacity-60 mb-4">{selectedBook.class}</p>
                    <h3 className="text-4xl md:text-6xl font-unbounded font-black tracking-tighter uppercase leading-none break-words">{selectedBook.title}</h3>
                    <p className="text-lg md:text-xl font-mono mt-4 opacity-80">BY {selectedBook.author.toUpperCase()}</p>
                  </div>

                  <div className="space-y-6 text-sm leading-relaxed font-medium">
                    <p>
                      THIS PUBLICATION IS PART OF THE MAIAD CURATED COLLECTION. 
                      EXPLORING THE BOUNDARIES OF GRAPHIC DESIGN, TYPOGRAPHY, AND 
                      ALGORITHMIC CREATIVITY.
                    </p>
                    <p className="opacity-60 text-xs">
                      FIRST PUBLISHED: 2026<br />
                      ARCHIVE REF: LIB-{selectedBook.title.slice(0,3).toUpperCase()}-09X
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a 
                      href={selectedBook.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#0000FF] text-white px-8 py-4 font-unbounded font-black text-xs uppercase hover:bg-black transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      ACCESS ARCHIVE
                    </a>
                    <button className="flex items-center justify-center gap-3 border-2 border-[#0000FF] px-8 py-4 font-unbounded font-black text-xs uppercase hover:bg-[#0000FF] hover:text-white transition-all">
                      <Download className="w-4 h-4" />
                      COLLECT
                    </button>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#0000FF]/10 flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest opacity-40">
                  <span>MAIAD DIGITAL ARCHIVE</span>
                  <span>© 2026</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="px-6 py-20 md:px-12 border-t border-white/10 mt-40 flex flex-col md:flex-row justify-between gap-12 relative z-10">
        <div className="max-w-xl">
          <h4 className="text-2xl font-unbounded font-black uppercase mb-6">MAIAD ARCHIVE</h4>
          <p className="text-xs font-mono leading-relaxed opacity-60 uppercase tracking-widest">
            A RADICAL REPOSITORY FOR THE FUTURE OF DESIGN. 
            BUILT ON THE INTERSECTION OF HUMAN INTUITION AND MACHINE INTELLIGENCE.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-20 text-[10px] font-mono uppercase tracking-[0.2em]">
          <div className="space-y-4">
            <p className="font-black opacity-100">COLLECTIONS</p>
            <p className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">Brutalist</p>
            <p className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">Generative</p>
            <p className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">Speculative</p>
          </div>
          <div className="space-y-4">
            <p className="font-black opacity-100">SYSTEM</p>
            <p className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">Status</p>
            <p className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">API</p>
            <p className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">Legal</p>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .writing-vertical-rl {
          writing-mode: vertical-rl;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}} />
    </div>
  );
}
