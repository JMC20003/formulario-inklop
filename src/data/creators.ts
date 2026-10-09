export interface Creator {
  id: string;
  name: string;
  handle: string;
  category: string;
  avatar: string;
  verified?: boolean;
  votes: number;
}

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'frunarex',
    name: 'Frunarex',
    handle: '@frunarex',
    category: 'Entretenimiento & Streaming',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 4289,
  },
  {
    id: 'gigiOsan',
    name: 'Gigi Osan',
    handle: '@gigiOsan',
    category: 'Lifestyle & Moda',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 3950,
  },
  {
    id: 'gabrielagarcia',
    name: 'Gabriela García',
    handle: '@gabrielagarcia',
    category: 'Beauty & Maquillaje',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 3610,
  },
  {
    id: 'blanca',
    name: 'Blanca',
    handle: '@blanca',
    category: 'Lifestyle & Viajes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 3420,
  },
  {
    id: 'aliciagatitos',
    name: 'Alicia Gatitos',
    handle: '@aliciagatitos',
    category: 'Gaming & Variedad',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 3105,
  },
  {
    id: 'josias_enma',
    name: 'Josiás & Enma',
    handle: '@josias_enma',
    category: 'Parejas & Vlogs',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 2890,
  },
  {
    id: 'gabriela.time2',
    name: 'Gabriela Time2',
    handle: '@gabriela.time2',
    category: 'Fitness & Gym',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 2540,
  },
  {
    id: 'elissaul',
    name: 'Eliss Aul',
    handle: '@elissaul',
    category: 'Música & Entretenimiento',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 2315,
  },
  {
    id: 'valeeasenjo',
    name: 'Vale Esenjo',
    handle: '@valeeasenjo',
    category: 'Inconnect & Comunidad',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 2180,
  },
  {
    id: 'evelin',
    name: 'Evelin',
    handle: '@evelin',
    category: 'Beauty & Estilo de Vida',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 1980,
  },
];
