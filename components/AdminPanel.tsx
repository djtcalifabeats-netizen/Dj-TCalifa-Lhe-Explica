
import React, { useState } from 'react';
import { Category, Music } from '../types';

interface AdminPanelProps {
  onAddMusic: (music: Omit<Music, 'id' | 'downloads' | 'plays' | 'createdAt'>) => void;
  musics: Music[];
  onDeleteMusic: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddMusic, musics, onDeleteMusic }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    category: Category.AFROHOUSE,
    coverUrl: '',
    audioUrl: '',
    isFeatured: false
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'coverUrl' | 'audioUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you'd upload to S3/Firebase. 
    // Here we simulate with local FileReader (for covers only due to memory constraints)
    if (field === 'coverUrl') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      // For audio, we just store a fake placeholder since base64 audio would crash local storage easily
      setFormData(prev => ({ ...prev, [field]: 'blob:fake-audio-file' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.artist) return;
    
    onAddMusic(formData);
    setFormData({
      title: '',
      artist: '',
      category: Category.AFROHOUSE,
      coverUrl: '',
      audioUrl: '',
      isFeatured: false
    });
    alert('Música adicionada com sucesso!');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-black text-white">Painel do Administrador</h2>
        <p className="text-slate-400 mt-2">Gerencie sua biblioteca de músicas e uploads.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Novo Upload
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Título da Música</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-blue-500 outline-none"
                placeholder="Ex: Noite de Luanda"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Artista</label>
              <input 
                type="text" 
                value={formData.artist}
                onChange={e => setFormData(prev => ({...prev, artist: e.target.value}))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-blue-500 outline-none"
                placeholder="Ex: Dj Malvado"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Categoria</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData(prev => ({...prev, category: e.target.value as Category}))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-blue-500 outline-none"
                >
                  {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex items-center mt-6">
                <input 
                  type="checkbox" 
                  id="featured"
                  checked={formData.isFeatured}
                  onChange={e => setFormData(prev => ({...prev, isFeatured: e.target.checked}))}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm text-slate-300">Destaque?</label>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Capa da Música</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => handleFileChange(e, 'coverUrl')}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-xs focus:border-blue-500 outline-none file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
              {formData.coverUrl && <img src={formData.coverUrl} className="mt-2 w-16 h-16 rounded object-cover" />}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Ficheiro Áudio (MP3)</label>
              <input 
                type="file" 
                accept="audio/*"
                onChange={e => handleFileChange(e, 'audioUrl')}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-xs focus:border-blue-500 outline-none file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/40"
            >
              Publicar Música
            </button>
          </form>
        </section>

        <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col max-h-[600px]">
          <h3 className="text-lg font-bold mb-6">Músicas Atuais ({musics.length})</h3>
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {musics.map(m => (
              <div key={m.id} className="bg-slate-900 p-3 rounded-lg flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <img src={m.coverUrl || 'https://picsum.photos/100/100'} className="w-10 h-10 rounded object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white truncate w-32">{m.title}</h4>
                    <p className="text-[10px] text-slate-500">{m.artist}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onDeleteMusic(m.id)}
                  className="text-red-500 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
