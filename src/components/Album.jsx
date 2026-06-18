import React, { useState } from 'react';
import { Image as ImageIcon, Eye, X } from 'lucide-react';

// I-import ang iyong mga larawan mula sa src/assets folder
import img1 from '../assets/p1.jpg'; 
import img2 from '../assets/p2.jpg';
import img3 from '../assets/p3.jpg';
import img4 from '../assets/p4.jpg';
import img5 from '../assets/p5.jpg';
import img6 from '../assets/p6.jpg';

export default function Album() {
  // State para sa kasalukuyang naka-pop up na larawan
  const [selectedImg, setSelectedImg] = useState(null);

  const galleryItems = [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
    { id: 4, img: img4 },
    { id: 5, img: img5 },
    { id: 6, img: img6 }
  ];

  return (
    <section id="album" className="py-24 bg-black border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-zinc-600 block mb-2">// VISUAL_ARCHIVES</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              INSIDE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">WARZONE</span>
            </h2>
          </div>
          <div className="text-zinc-500 font-mono text-xs flex items-center gap-2 border border-zinc-900 p-3 bg-zinc-950/50 self-start md:self-auto">
            <ImageIcon className="w-4 h-4 text-yellow-400" />
            <span>TOTAL_RENDERED: {galleryItems.length} SNAPSHOTS</span>
          </div>
        </div>

        {/* BRUTALIST ALBUM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImg(item.img)} // Bubuksan ang pop-up kapag kinlik ang buong card
              className="group bg-zinc-950 border border-zinc-900 hover:border-yellow-400 transition-colors p-3 rounded-none flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 border border-zinc-900">
                <img 
                  src={item.img} 
                  alt={`Gym Snapshot ${item.id}`}
                  className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                />
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-yellow-400 text-black px-3 py-1.5 font-mono text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> VIEW_HD
                  </div>
                </div>
              </div>

              {/* Photo Data (ID Only) */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-900/50 font-mono w-full">
                <span className="text-[10px] text-zinc-600 tracking-wider">// SNAPSHOT_INDEX</span>
                <span className="text-[10px] text-zinc-500 font-bold group-hover:text-yellow-400 transition-colors">
                  [0{item.id}]
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX POP-UP MODAL */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setSelectedImg(null)} // Isasara ang pop-up kapag kinlik ang background overlay
        >
          {/* Close Button - Technical Codeframe Style */}
          <button 
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 text-zinc-400 hover:text-yellow-400 font-mono text-xs tracking-widest flex items-center gap-2 bg-zinc-950 border border-zinc-900 px-4 py-2 hover:border-yellow-400 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>CLOSE_VIEW</span>
          </button>

          {/* Ang Mismong Larawan (Original Ratio at may Box Border) */}
          <div 
            className="relative max-w-5xl max-h-[80vh] bg-zinc-950 p-2 border border-zinc-800"
            onClick={(e) => e.stopPropagation()} // Pinipigilan nitong magsara kapag mismong picture ang kinlik
          >
            <img 
              src={selectedImg} 
              alt="Gym HD View" 
              className="max-w-full max-h-[75vh] object-contain rounded-none select-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}