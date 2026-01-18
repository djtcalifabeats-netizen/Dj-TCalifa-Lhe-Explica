
import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  isAdminMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onSelectCategory, isAdminMode }) => {
  const categories = Object.values(Category);

  return (
    <aside className="w-64 bg-slate-900 h-screen sticky top-0 border-r border-slate-800 p-6 flex flex-col hidden lg:flex">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-blue-500 tracking-tighter">RANGEL<span className="text-white">ONLINE</span></h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Premium Music Portal</p>
      </div>

      <nav className="flex-1 space-y-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
            activeCategory === null ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          Explorar Tudo
        </button>
        
        <div className="pt-4 pb-2">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Categorias</p>
        </div>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <p className="text-[10px] text-slate-500 text-center">© 2024 RANGELONLINE<br/>Todos os direitos reservados.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
