-- ====================================================================================
-- SUPABASE MIGRATION DATABASE SCRIPT
-- RUN THIS IN YOUR SUPABASE SQL EDITOR TO CREATE ALL THE APP TABLES
-- ====================================================================================

-- 0. APAGAR TABELAS ANTIGAS PARA EVITAR O ERRO "ALREADY EXISTS"
DROP TABLE IF EXISTS public.ai_analyses CASCADE;
DROP TABLE IF EXISTS public.diet_plans CASCADE;
DROP TABLE IF EXISTS public.workout_plans CASCADE;
DROP TABLE IF EXISTS public.evaluations CASCADE;
DROP TABLE IF EXISTS public.biometrics CASCADE;
DROP TABLE IF EXISTS public.students CASCADE;

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Students Table
CREATE TABLE public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    age INTEGER,
    gender VARCHAR(10),
    objective TEXT,
    activity_level TEXT,
    access_code TEXT UNIQUE NOT NULL,
    access_password TEXT,
    observations TEXT,
    feedback TEXT,
    profile_picture TEXT,
    anamnesis JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true
);

-- 3. Create Evaluations Table (Avaliações Físicas)
CREATE TABLE public.evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    eval_date TIMESTAMP WITH TIME ZONE NOT NULL,
    method VARCHAR(50) NOT NULL, -- 'protocol3', 'protocol7', 'bioimpedance'
    weight NUMERIC NOT NULL,
    height NUMERIC NOT NULL,
    metrics JSONB NOT NULL DEFAULT '{}'::jsonb, -- { bf, fatMass, leanMass, imc }
    folds JSONB DEFAULT '{}'::jsonb, -- { peitoral, abdominal, coxa, etc. }
    circumferences JSONB DEFAULT '{}'::jsonb, -- { chest, waist, abdomen, etc. }
    photos TEXT[] DEFAULT '{}' -- Array of Image URLs
);

-- 4. Create Diet Plans Table (Dietas)
CREATE TABLE public.diet_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    target_calories INTEGER,
    target_protein INTEGER,
    target_carbs INTEGER,
    target_fats INTEGER,
    water_intake_goal INTEGER,
    water_reminders TEXT[] DEFAULT '{}',
    current_water_intake INTEGER DEFAULT 0,
    meals JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of meal objects
    supplements JSONB DEFAULT '[]'::jsonb
);

-- 5. Create AI Analyses Table (Laudos de Inteligência Artificial)
CREATE TABLE public.ai_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    associated_evaluation_id UUID REFERENCES public.evaluations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    report TEXT NOT NULL,
    strong_points TEXT[] DEFAULT '{}',
    weak_points TEXT[] DEFAULT '{}',
    suggested_training_adjustments TEXT
);

-- 6. Create Workout Plans Table (Treinos)
CREATE TABLE public.workout_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT,
    objective TEXT,
    plan_data JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- ====================================================================================
-- RLS (Row Level Security) POLICIES
-- ====================================================================================

-- Habilitar a segurança em todas as tabelas
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 1. POLÍTICAS DA TABELA STUDENTS
-- ==========================================
-- Admin tem acesso total para Criar, Ler, Atualizar e Deletar qualquer aluno (substitua o e-mail pelo seu)
CREATE POLICY "Admins_Full_Access" 
ON public.students FOR ALL TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('academiajtfitness044@gmail.com', 'personaljoana.maia@gmail.com', 'patrickgerson04@gmail.com', 'benficafitness.app@gmail.com')
);

-- Permite que a chave pública (anon) consulte alunos para autenticação e portal
CREATE POLICY "Anon_Select_Students" 
ON public.students FOR SELECT TO anon 
USING (true);

-- Aluno autenticado pode visualizar seu próprio perfil
CREATE POLICY "Student_View_Self" 
ON public.students FOR SELECT TO authenticated 
USING (auth.uid() = id);

-- Aluno pode atualizar alguns campos do próprio perfil (ex: preencher anamnese e feedback)
CREATE POLICY "Student_Update_Self" 
ON public.students FOR UPDATE TO authenticated, anon 
USING (true);

-- ==========================================
-- 2. POLÍTICAS DA TABELA EVALUATIONS
-- ==========================================
CREATE POLICY "Admins_Full_Access_Evaluations" 
ON public.evaluations FOR ALL TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('academiajtfitness044@gmail.com', 'personaljoana.maia@gmail.com', 'patrickgerson04@gmail.com', 'benficafitness.app@gmail.com')
);

-- Permite que a chave pública (anon) consulte avaliações para o portal do aluno
CREATE POLICY "Anon_Select_Evaluations" 
ON public.evaluations FOR SELECT TO anon 
USING (true);

CREATE POLICY "Student_View_Own_Evaluations" 
ON public.evaluations FOR SELECT TO authenticated 
USING (student_id = auth.uid());

-- ==========================================
-- 3. POLÍTICAS DA TABELA DIET PLANS
-- ==========================================
CREATE POLICY "Admins_Full_Access_Diets" 
ON public.diet_plans FOR ALL TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('academiajtfitness044@gmail.com', 'personaljoana.maia@gmail.com', 'patrickgerson04@gmail.com', 'benficafitness.app@gmail.com')
);

-- Permite que a chave pública (anon) consulte dietas para o portal do aluno
CREATE POLICY "Anon_Select_Diets" 
ON public.diet_plans FOR SELECT TO anon 
USING (true);

CREATE POLICY "Anon_Update_Diets" 
ON public.diet_plans FOR UPDATE TO anon, authenticated 
USING (true);

CREATE POLICY "Student_View_Own_Diets" 
ON public.diet_plans FOR SELECT TO authenticated 
USING (student_id = auth.uid());

-- ==========================================
-- 4. POLÍTICAS DA TABELA AI ANALYSES
-- ==========================================
CREATE POLICY "Admins_Full_Access_AI" 
ON public.ai_analyses FOR ALL TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('academiajtfitness044@gmail.com', 'personaljoana.maia@gmail.com', 'patrickgerson04@gmail.com', 'benficafitness.app@gmail.com')
);

CREATE POLICY "Anon_Select_AI" 
ON public.ai_analyses FOR SELECT TO anon 
USING (true);

CREATE POLICY "Student_View_Own_AI" 
ON public.ai_analyses FOR SELECT TO authenticated 
USING (student_id = auth.uid());

-- ==========================================
-- 5. POLÍTICAS DA TABELA WORKOUT PLANS
-- ==========================================
CREATE POLICY "Admins_Full_Access_Workouts" 
ON public.workout_plans FOR ALL TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('academiajtfitness044@gmail.com', 'personaljoana.maia@gmail.com', 'patrickgerson04@gmail.com', 'benficafitness.app@gmail.com')
);

CREATE POLICY "Anon_Select_Workouts" 
ON public.workout_plans FOR SELECT TO anon, authenticated 
USING (true);

CREATE POLICY "Student_View_Own_Workouts" 
ON public.workout_plans FOR SELECT TO authenticated 
USING (student_id = auth.uid());

-- Permissões de exclusão de alunos para o painel de administração (anon e authenticated)
CREATE POLICY "Anon_Delete_Students" ON public.students FOR DELETE TO anon, authenticated USING (true);
CREATE POLICY "Anon_Delete_Evaluations" ON public.evaluations FOR DELETE TO anon, authenticated USING (true);
CREATE POLICY "Anon_Delete_Diet_Plans" ON public.diet_plans FOR DELETE TO anon, authenticated USING (true);
CREATE POLICY "Anon_Delete_AI_Analyses" ON public.ai_analyses FOR DELETE TO anon, authenticated USING (true);
CREATE POLICY "Anon_Delete_Workout_Plans" ON public.workout_plans FOR DELETE TO anon, authenticated USING (true);

-- Função RPC para exclusão permanente em cascata
CREATE OR REPLACE FUNCTION public.delete_student_cascade(p_student_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.evaluations WHERE student_id::text = p_student_id;
  DELETE FROM public.diet_plans WHERE student_id::text = p_student_id;
  DELETE FROM public.ai_analyses WHERE student_id::text = p_student_id;
  DELETE FROM public.workout_plans WHERE student_id::text = p_student_id;
  DELETE FROM public.students WHERE id::text = p_student_id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.delete_student_cascade(TEXT) TO anon, authenticated;

-- ====================================================================================
-- 5. FUNCTION PARA LOGIN DO ALUNO (Bypasses RLS)
-- Permite que o aluno faça login com e-mail e senha e retorna todas as informações dele
-- ====================================================================================
CREATE OR REPLACE FUNCTION public.student_login(p_email TEXT, p_password TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_student record;
  v_result json;
BEGIN
  -- Busca o aluno por e-mail ou por código de acesso
  SELECT * INTO v_student FROM public.students 
  WHERE (
    lower(trim(COALESCE(email, ''))) = lower(trim(p_email)) 
    OR upper(trim(COALESCE(access_code, ''))) = upper(trim(p_email))
    OR upper(replace(trim(COALESCE(access_code, '')), ' ', '')) = upper(replace(trim(p_email), ' ', ''))
  ) 
  AND (
    trim(COALESCE(access_password, '')) = trim(p_password)
    OR lower(trim(COALESCE(access_password, ''))) = lower(trim(p_password))
    OR upper(trim(COALESCE(access_code, ''))) = upper(trim(p_password))
    OR trim(COALESCE(access_password, '')) = ''
  )
  LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Constrói o objeto JSON com os dados do aluno e suas relações
  SELECT json_build_object(
    'student', row_to_json(v_student),
    'evaluations', COALESCE((SELECT json_agg(row_to_json(e.*)) FROM public.evaluations e WHERE e.student_id = v_student.id), '[]'::json),
    'diet_plans', COALESCE((SELECT json_agg(row_to_json(d.*)) FROM public.diet_plans d WHERE d.student_id = v_student.id), '[]'::json),
    'workout_plans', COALESCE((SELECT json_agg(row_to_json(w.*)) FROM public.workout_plans w WHERE w.student_id = v_student.id), '[]'::json),
    'ai_analyses', COALESCE((SELECT json_agg(row_to_json(a.*)) FROM public.ai_analyses a WHERE a.student_id = v_student.id), '[]'::json)
  ) INTO v_result;

  RETURN v_result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.student_login(TEXT, TEXT) TO anon, authenticated;

-- ====================================================================================
-- 6. FUNCTIONS PARA UPDATE DO ALUNO (Bypasses RLS)
-- Permite que o aluno atualize seus dados (feedback, anamnese) usando id e senha
-- ====================================================================================

CREATE OR REPLACE FUNCTION public.student_update_feedback(p_student_id UUID, p_password TEXT, p_feedback TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.students WHERE id = p_student_id AND access_password = p_password) THEN
    UPDATE public.students SET feedback = p_feedback, updated_at = NOW() WHERE id = p_student_id;
    RETURN true;
  END IF;
  RETURN false;
END;
$$;

CREATE OR REPLACE FUNCTION public.student_update_anamnesis(p_student_id UUID, p_password TEXT, p_anamnesis JSONB)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.students WHERE id = p_student_id AND access_password = p_password) THEN
    UPDATE public.students SET anamnesis = p_anamnesis, updated_at = NOW() WHERE id = p_student_id;
    RETURN true;
  END IF;
  RETURN false;
END;
$$;

-- ====================================================================================
-- 7. CONFIGURAÇÃO DE BUCKETS DE STORAGE (FOTOS)
-- Execute este bloco no Supabase SQL Editor para criar o bucket 'evaluations'
-- e habilitar o upload/download público de fotos dos alunos e avaliações.
-- ====================================================================================

-- Criar o bucket de storage se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('evaluations', 'evaluations', true)
ON CONFLICT (id) DO NOTHING;

-- Remover políticas antigas para evitar duplicidade
DROP POLICY IF EXISTS "Public Select Evaluations" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Insert Evaluations" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Evaluations" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Evaluations" ON storage.objects;

-- Criar políticas de acesso e manipulação de arquivos no bucket 'evaluations'
CREATE POLICY "Public Select Evaluations"
ON storage.objects FOR SELECT
USING (bucket_id = 'evaluations');

CREATE POLICY "Authenticated Insert Evaluations"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'evaluations');

CREATE POLICY "Authenticated Update Evaluations"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'evaluations');

CREATE POLICY "Authenticated Delete Evaluations"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'evaluations');

