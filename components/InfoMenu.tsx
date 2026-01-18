
import React, { useState } from 'react';
import { searchMusicInfo } from '../services/geminiService';
import { GroundingSource } from '../types';

const InfoMenu: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string, sources: GroundingSource[] } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    const data = await searchMusicInfo(query);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-black text-white">Centro de Informação</h2>
        <p className="text-slate-400 mt-2">Saiba tudo sobre seus artistas e gêneros favoritos com busca inteligente.</p>
      </header>

      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-xl">
        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Pesquise sobre um artista ou estilo musical (ex: História do Kuduro)"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            )}
            Consultar
          </button>
        </form>

        {loading && (
          <div className="space-y-4">
            <div className="h-4 bg-slate-700 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-slate-700 animate-pulse rounded w-1/2" />
            <div className="h-4 bg-slate-700 animate-pulse rounded w-full" />
          </div>
        )}

        {result && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none text-slate-300 mb-8 leading-relaxed whitespace-pre-wrap">
              {result.text}
            </div>
            
            {result.sources.length > 0 && (
              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Fontes Consultadas</h4>
                <div className="flex flex-wrap gap-3">
                  {result.sources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-xs text-blue-400 hover:border-blue-500 transition-all flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {source.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!result && !loading && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-slate-500">Faça uma busca para obter informações geradas por IA com base em dados reais do Google.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoMenu;
