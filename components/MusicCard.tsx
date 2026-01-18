
import React from 'react';
import { Music } from '../types';

interface MusicCardProps {
  music: Music;
  onPlay: (music: Music) => void;
  onDownload: (music: Music) => void;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

const MusicCard: React.FC<MusicCardProps> = ({ music, onPlay, onDownload, isAdmin, onDelete }) => {
  return (
    <div className="group relative bg-slate-800/40 rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={music.coverUrl || 'https://picsum.photos/400/400'} 
          alt={music.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            onClick={() => onPlay(music)}
            className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-blue-400 border border-blue-500/20 uppercase">
          {music.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-white truncate text-sm" title={music.title}>{music.title}</h3>
        <p className="text-slate-400 text-xs truncate mb-4">{music.artist}</p>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center text-[10px] text-slate-500 gap-2">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              {music.downloads}
            </span>
          </div>
          
          <button 
            onClick={() => onDownload(music)}
            className="text-[10px] font-bold bg-slate-700 hover:bg-blue-600 text-white px-3 py-1.5 rounded transition-colors uppercase tracking-wider"
          >
            Download
          </button>
        </div>

        {isAdmin && (
          <button 
            onClick={() => onDelete?.(music.id)}
            className="mt-3 w-full text-[10px] py-1 text-red-400 hover:text-red-300 border border-red-900/30 hover:bg-red-900/20 rounded transition-all uppercase font-bold"
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
};

export default MusicCard;
