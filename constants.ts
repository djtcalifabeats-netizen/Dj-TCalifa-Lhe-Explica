
import { Category, Music } from './types';

export const INITIAL_MUSIC_DATA: Music[] = [
  {
    id: '1',
    title: 'Noite de Luanda',
    artist: 'Dj Malvado',
    category: Category.AFROHOUSE,
    coverUrl: 'https://picsum.photos/seed/music1/400/400',
    audioUrl: '', // In a real app, these would be valid file paths
    downloads: 1250,
    plays: 5000,
    isFeatured: true,
    createdAt: Date.now() - 1000000,
  },
  {
    id: '2',
    title: 'Semba dos Nossos',
    artist: 'Bonga',
    category: Category.SEMBA,
    coverUrl: 'https://picsum.photos/seed/music2/400/400',
    audioUrl: '',
    downloads: 890,
    plays: 3200,
    isFeatured: true,
    createdAt: Date.now() - 2000000,
  },
  {
    id: '3',
    title: 'Flow Angolano',
    artist: 'NGA',
    category: Category.RAP,
    coverUrl: 'https://picsum.photos/seed/music3/400/400',
    audioUrl: '',
    downloads: 4500,
    plays: 12000,
    isFeatured: true,
    createdAt: Date.now() - 500000,
  }
];
