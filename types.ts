
export enum Category {
  AFROHOUSE = 'Afrohouse',
  KUDURO = 'Kuduro',
  ZOUK = 'Zouk',
  SEMBA = 'Semba',
  KIZOMBA = 'Kizomba',
  RAP = 'Rap',
  TRAP = 'Trap',
  DRILL = 'Drill',
  BOOMBAP = 'Boom Bap'
}

export interface Music {
  id: string;
  title: string;
  artist: string;
  category: Category;
  coverUrl: string;
  audioUrl: string; // Base64 or URL
  downloads: number;
  plays: number;
  isFeatured: boolean;
  createdAt: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}
