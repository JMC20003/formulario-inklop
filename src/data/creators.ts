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
    id: 'ibai',
    name: 'Ibai Llanos',
    handle: '@ibaillanos',
    category: 'Entretenimiento & Streaming',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 4289,
  },
  {
    id: 'rivers',
    name: 'Rivers GG (Samy Rivera)',
    handle: '@samyrivera',
    category: 'Gaming & Variedad',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 3950,
  },
  {
    id: 'mariana',
    name: 'El Mariana',
    handle: '@elmariana',
    category: 'Comedia & Gaming',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 3610,
  },
  {
    id: 'auron',
    name: 'AuronPlay',
    handle: '@auronplay',
    category: 'Humor & Streaming',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 3420,
  },
  {
    id: 'luisito',
    name: 'Luisito Comunica',
    handle: '@luisitocomunica',
    category: 'Viajes & Estilo de Vida',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 3105,
  },
  {
    id: 'kenia',
    name: 'Kenia Os',
    handle: '@keniaos',
    category: 'Música & Moda',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 2890,
  },
  {
    id: 'spreen',
    name: 'Spreen',
    handle: '@elspreen',
    category: 'Gaming & Entretenimiento',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 2540,
  },
  {
    id: 'arigameplays',
    name: 'Ari Gameplays',
    handle: '@arigameplays',
    category: 'Gaming & Lifestyle',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 2315,
  },
  {
    id: 'rubius',
    name: 'Rubius',
    handle: '@elrubius',
    category: 'Gaming & Cultura Geek',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 2180,
  },
  {
    id: 'juansguarnizo',
    name: 'JuanSGuarnizo',
    handle: '@juansguarnizo',
    category: 'Roleplay & Streaming',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    votes: 1980,
  },
];
