import { Student, GeneratedImage } from '../types';

export const INITIAL_STUDENTS: Student[] = [];

export const INITIAL_GENERATED_IMAGES: GeneratedImage[] = [
  {
    id: 'img-1',
    prompt: 'Atleta de alta performance com físico atlético esculpido, iluminação de estúdio cinematográfica dourada e neon preto, capa de revista fitness profissional, 8k ultra detalhado',
    type: 'create',
    aspectRatio: '1:1',
    style: 'Fitness Studio & Neon',
    resultImageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-08-22T14:00:00.000Z',
    category: 'Capa / Branding',
    tags: ['Atleta', 'Capa de Revista', 'Neon', 'Fitness'],
  },
  {
    id: 'img-2',
    prompt: 'Ficha técnica de treino moderna com visual cyberpunk dark gold, estética futurista de academia de alta tecnologia',
    type: 'create',
    aspectRatio: '16:9',
    style: 'Cyberpunk Gold',
    resultImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-08-22T15:30:00.000Z',
    category: 'Wallpaper / Treino',
    tags: ['Academia', 'Gold', 'Futurista'],
  },
  {
    id: 'img-3',
    prompt: 'Edição de foto de atleta com efeito de palco de fisiculturismo, luz de contorno dramática e realce de definição muscular',
    type: 'edit',
    aspectRatio: '3:4',
    style: 'Stage Lighting',
    originalImageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    resultImageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-08-23T10:15:00.000Z',
    category: 'Edição de Físico',
    tags: ['Antes e Depois', 'Iluminação', 'Definição'],
  },
];
