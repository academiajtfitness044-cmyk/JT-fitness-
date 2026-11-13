-- ==============================================================================
-- ACADEMIA BENFICA FITNESS - SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- ==============================================================================
-- Execute este script no SQL Editor do seu Dashboard Supabase (https://app.supabase.com)
-- para provisionar todas as tabelas, tipos de dados e políticas de segurança (RLS).
-- ==============================================================================

-- Habilita extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE ALUNOS (students)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    age NUMERIC,
    gender TEXT,
    height NUMERIC,
    weight NUMERIC,
    activity_level NUMERIC,
    objective TEXT,
    email TEXT,
    phone TEXT,
    photo_url TEXT,
    profile_picture TEXT,
    access_code TEXT UNIQUE,
    access_password TEXT,
    status TEXT DEFAULT 'active',
    is_active BOOLEAN DEFAULT true,
    observations TEXT,
    anamnesis JSONB DEFAULT '{}'::jsonb,
    feedback TEXT
);

-- Migrações idetempontes caso a tabela já existisse com menos colunas
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS profile_picture TEXT;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS anamnesis JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS feedback TEXT;

-- 2. TABELA DE AVALIAÇÕES FÍSICAS (evaluations)
CREATE TABLE IF NOT EXISTS public.evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    eval_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    method TEXT DEFAULT 'pollock7',
    weight NUMERIC,
    height NUMERIC,
    metrics JSONB DEFAULT '{}'::jsonb, -- { imc, bf, leanMass, fatMass }
    folds JSONB DEFAULT '{}'::jsonb,   -- { peitoral, abdominal, coxa, triceps, etc }
    circumferences JSONB DEFAULT '{}'::jsonb, -- { braco, cintura, quadril, etc }
    photos TEXT[] DEFAULT ARRAY[]::TEXT[]     -- URLs das fotos salvas no Supabase Storage
);

-- 3. TABELA DE TREINOS (workout_plans)
CREATE TABLE IF NOT EXISTS public.workout_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    plan_data JSONB NOT NULL -- { division: 'ABC', days: [{ name: 'Treino A', exercises: [...] }] }
);

-- 4. TABELA DE ANÁLISES / RELATÓRIOS (ai_analyses)
CREATE TABLE IF NOT EXISTS public.ai_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    evaluation_id UUID REFERENCES public.evaluations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    analysis_text TEXT NOT NULL
);

-- 5. POLÍTICAS DE ACESSO (RLS - Row Level Security)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso Livre Alunos" ON public.students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Avaliações" ON public.evaluations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Treinos" ON public.workout_plans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Análises" ON public.ai_analyses FOR ALL USING (true) WITH CHECK (true);

-- 6. STORAGE BUCKETS (Opcional - Criação de Buckets Públicos para Fotos de Avaliação e Alunos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('evaluations', 'evaluations', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage para upload e leitura livre
CREATE POLICY "Fotos Publicas Leitura" ON storage.objects FOR SELECT USING (bucket_id IN ('evaluations', 'photos'));
CREATE POLICY "Fotos Publicas Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('evaluations', 'photos'));
CREATE POLICY "Fotos Publicas Atualizacao" ON storage.objects FOR UPDATE USING (bucket_id IN ('evaluations', 'photos'));
CREATE POLICY "Fotos Publicas Delecao" ON storage.objects FOR DELETE USING (bucket_id IN ('evaluations', 'photos'));
