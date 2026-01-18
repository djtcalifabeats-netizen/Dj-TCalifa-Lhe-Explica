
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MusicCard from './components/MusicCard';
import AdminPanel from './components/AdminPanel';
import InfoMenu from './components/InfoMenu';
import { Music, Category } from './types';
import { INITIAL_MUSIC_DATA } from './constants';

const App: React.FC = () => {
  const [musics, setMusics] = useState<Music[]>(() => {
    const saved = localStorage.getItem('rangelonline_musics');
    return saved ? JSON.parse(saved) : INITIAL_MUSIC_DATA;
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [view, setView] = useState<'home' | 'info' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlaying, setCurrentPlaying] = useState<Music | null>(null);

  useEffect(() => {
    localStorage.setItem('rangelonline_musics', JSON.stringify(musics));
  }, [musics]);

  const filteredMusics = useMemo(() => {
    return musics.filter(m => {
      const matchesCategory = activeCategory ? m.category === activeCategory : true;
      const matchesSearch = searchQuery 
        ? m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          m.artist.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [musics, activeCategory, searchQuery]);

  const featuredMusics = useMemo(() => musics.filter(m => m.isFeatured), [musics]);
  const mostPlayed = useMemo(() => [...musics].sort((a, b) => b.plays - a.plays).slice(0, 5), [musics]);

  const handleAddMusic = (newMusic: Omit<Music, 'id' | 'downloads' | 'plays' | 'createdAt'>) => {
    const music: Music = {
      ...newMusic,
      id: Date.now().toString(),
      downloads: 0,
      plays: 0,
      createdAt: Date.now()
    };
    setMusics(prev => [music, ...prev]);
  };

  const handleDeleteMusic = (id: string) => {
    if (confirm('Tem certeza que deseja remover esta música?')) {
      setMusics(prev => prev.filter(m => m.id !== id));
    }
  };

  const handlePlay = (music: Music) => {
    setCurrentPlaying(music);
    setMusics(prev => prev.map(m => m.id === music.id ? { ...m, plays: m.plays + 1 } : m));
  };

  const handleDownload = (music: Music) => {
    // Simulated download
    alert(`Iniciando download gratuito: ${music.title} - ${music.artist}`);
    setMusics(prev => prev.map(m => m.id === music.id ? { ...m, downloads: m.downloads + 1 } : m));
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar 
        activeCategory={activeCategory} 
        onSelectCategory={(cat) => { setActiveCategory(cat); setView('home'); }} 
        isAdminMode={view === 'admin'}
      />

      <main className="flex-1 flex flex-col relative">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Pesquisar músicas, artistas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <button 
              onClick={() => setView('home')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${view === 'home' ? 'text-white bg-blue-600 shadow-lg shadow-blue-900/30' : 'text-slate-400 hover:text-white'}`}
            >
              Músicas
            </button>
            <button 
              onClick={() => setView('info')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${view === 'info' ? 'text-white bg-blue-600 shadow-lg shadow-blue-900/30' : 'text-slate-400 hover:text-white'}`}
            >
              Informação
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${view === 'admin' ? 'text-white bg-emerald-600 shadow-lg shadow-emerald-900/30' : 'text-slate-400 hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Admin
            </button>
          </nav>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-24">
          {view === 'home' && (
            <div className="p-6 lg:p-10 space-y-12">
              {/* Featured Section */}
              {!activeCategory && !searchQuery && featuredMusics.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-3">
                      <span className="w-8 h-1 bg-blue-600 rounded-full" />
                      Destaques da Semana
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {featuredMusics.map(m => (
                      <MusicCard key={m.id} music={m} onPlay={handlePlay} onDownload={handleDownload} />
                    ))}
                  </div>
                </section>
              )}

              {/* Browse Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-3">
                    <span className="w-8 h-1 bg-blue-600 rounded-full" />
                    {activeCategory || (searchQuery ? `Resultados para: "${searchQuery}"` : 'Todas as Músicas')}
                  </h2>
                  <span className="text-xs font-bold text-slate-500">{filteredMusics.length} músicas encontradas</span>
                </div>
                
                {filteredMusics.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredMusics.map(m => (
                      <MusicCard key={m.id} music={m} onPlay={handlePlay} onDownload={handleDownload} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
                    <p className="text-slate-500">Nenhuma música encontrada nesta categoria.</p>
                  </div>
                )}
              </section>

              {/* Rankings / Most Played */}
              {!activeCategory && !searchQuery && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-3">
                      <span className="w-8 h-1 bg-blue-600 rounded-full" />
                      Mais Ouvidas
                    </h2>
                  </div>
                  <div className="bg-slate-800/20 rounded-3xl border border-slate-700/50 overflow-hidden">
                    {mostPlayed.map((m, idx) => (
                      <div 
                        key={m.id} 
                        className="flex items-center justify-between p-4 hover:bg-slate-800/40 transition-colors border-b border-slate-800/50 last:border-none group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-black text-slate-700 group-hover:text-blue-500 transition-colors w-6">0{idx + 1}</span>
                          <img src={m.coverUrl} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <h4 className="font-bold text-sm text-white">{m.title}</h4>
                            <p className="text-xs text-slate-500">{m.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="hidden md:block">
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Plays</span>
                            <p className="text-xs text-slate-400 font-bold">{m.plays.toLocaleString()}</p>
                          </div>
                          <button 
                            onClick={() => handlePlay(m)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 group-hover:bg-blue-600 text-white transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {view === 'info' && <InfoMenu />}
          
          {view === 'admin' && (
            <AdminPanel 
              onAddMusic={handleAddMusic} 
              musics={musics} 
              onDeleteMusic={handleDeleteMusic} 
            />
          )}
        </div>

        {/* Global Player Bar */}
        {currentPlaying && (
          <div className="fixed bottom-0 left-0 lg:left-64 right-0 h-24 bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 px-6 flex items-center justify-between z-50">
            <div className="flex items-center gap-4 w-1/3">
              <img src={currentPlaying.coverUrl} className="w-14 h-14 rounded-lg object-cover shadow-lg shadow-black" />
              <div className="overflow-hidden">
                <h4 className="font-bold text-sm text-white truncate">{currentPlaying.title}</h4>
                <p className="text-xs text-slate-500 truncate">{currentPlaying.artist}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="flex items-center gap-6">
                <button className="text-slate-500 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" /></svg></button>
                <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                </button>
                <button className="text-slate-500 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.599 7.2A1 1 0 005 8v8a1 1 0 001.599.8l5.334-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.599.8l5.334-4z" /></svg></button>
              </div>
              <div className="w-full max-w-md h-1 bg-slate-800 rounded-full relative group cursor-pointer">
                <div className="absolute inset-0 bg-blue-600 rounded-full w-1/3 group-hover:bg-blue-400 transition-colors" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-6 w-1/3">
              <button 
                onClick={() => handleDownload(currentPlaying)}
                className="flex items-center gap-2 text-[10px] font-black bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 transition-colors"
              >
                DOWNLOAD GRÁTIS
              </button>
              <button onClick={() => setCurrentPlaying(null)} className="text-slate-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
