import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db as firestoreDb, stripUndefined } from '../lib/firebase';
import { doc, setDoc, getDocs, getDoc, collection, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { EXERCISE_DATABASE, Exercise } from '../data/exerciseDatabase';
import { get, set, del } from 'idb-keyval';
import { processWorkoutQueue, queueWorkoutUpdate } from '../lib/offlineSync';
import { ADMIN_EMAILS, isAdminEmail, getAdminDisplayName } from '../constants';

export const STUDENTS_STORAGE_KEY = 'benfica_fitness_students_v2';
export const STUDENTS_CACHE_KEY = 'offline_students_cache';
export const DELETED_STUDENT_IDS_KEY = 'benfica_deleted_student_ids';
export const DELETED_STUDENT_EMAILS_KEY = 'benfica_deleted_student_emails';

export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch {}
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function safelyParseWorkoutPlan(raw: any): WorkoutPlan | null {
  if (!raw) return null;
  let obj = raw;
  if (typeof obj === 'string') {
    try {
      obj = JSON.parse(obj);
    } catch {
      return null;
    }
  }
  if (!obj) return null;

  if (obj.plan_data) {
    if (typeof obj.plan_data === 'string') {
      try {
        obj = JSON.parse(obj.plan_data);
      } catch {}
    } else if (typeof obj.plan_data === 'object' && obj.plan_data !== null) {
      obj = obj.plan_data;
    }
  }

  if (typeof obj === 'string') {
    try {
      obj = JSON.parse(obj);
    } catch {
      return null;
    }
  }

  if (obj && (Array.isArray(obj.days) || obj.title)) {
    return {
      title: obj.title || 'Plano de Treino',
      objective: obj.objective || '',
      days: Array.isArray(obj.days) ? obj.days : [],
      observations: obj.observations || '',
      history: Array.isArray(obj.history) ? obj.history : [],
      updatedAt: obj.updatedAt || obj.updated_at || new Date().toISOString()
    };
  }
  return null;
}

export function selectBestWorkoutPlan(wp1: any, wp2: any): WorkoutPlan | null {
  const p1 = safelyParseWorkoutPlan(wp1);
  const p2 = safelyParseWorkoutPlan(wp2);

  if (!p1 && !p2) return null;
  if (!p1) return p2;
  if (!p2) return p1;

  const p1Count = p1.days?.reduce((acc: number, d: any) => acc + (Array.isArray(d.exercises) ? d.exercises.length : 0), 0) || 0;
  const p2Count = p2.days?.reduce((acc: number, d: any) => acc + (Array.isArray(d.exercises) ? d.exercises.length : 0), 0) || 0;

  const p1Time = p1.updatedAt ? new Date(p1.updatedAt).getTime() : 0;
  const p2Time = p2.updatedAt ? new Date(p2.updatedAt).getTime() : 0;

  if (p1Time > 0 || p2Time > 0) {
    if (p1Time > p2Time) return p1;
    if (p2Time > p1Time) return p2;
  }

  if (p1Count > p2Count) return p1;
  if (p2Count > p1Count) return p2;

  if (p1.days && p1.days.length > 0) return p1;
  if (p2.days && p2.days.length > 0) return p2;

  return p1 || p2 || null;
}

export function getDeletedStudentIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DELETED_STUDENT_IDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function getDeletedStudentEmails(): string[] {
  // E-mails NUNCA são permanentemente banidos. Um aluno excluído pode futuramente realizar um novo cadastro.
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(DELETED_STUDENT_EMAILS_KEY);
    } catch {}
  }
  return [];
}

export function addDeletedStudentLocally(id: string, _email?: string, _googleUid?: string) {
  if (typeof window === 'undefined' || !id) return;
  try {
    const currentIds = getDeletedStudentIds();
    if (!currentIds.includes(id)) {
      currentIds.push(id);
      localStorage.setItem(DELETED_STUDENT_IDS_KEY, JSON.stringify(currentIds));
    }
    // Garante que e-mails antigos não fiquem travando o navegador
    localStorage.removeItem(DELETED_STUDENT_EMAILS_KEY);
  } catch {}
}

export function removeDeletedStudentLocally(id: string, _email?: string) {
  if (typeof window === 'undefined') return;
  try {
    if (id) {
      const currentIds = getDeletedStudentIds().filter(i => i !== id);
      localStorage.setItem(DELETED_STUDENT_IDS_KEY, JSON.stringify(currentIds));
    }
    localStorage.removeItem(DELETED_STUDENT_EMAILS_KEY);
  } catch {}
}

export function isStudentDeletedLocally(id?: string, _email?: string, _googleUid?: string): boolean {
  if (_email && isAdminEmail(_email)) return true;
  if (!id) return false;
  const deletedIds = new Set(getDeletedStudentIds());
  return deletedIds.has(id);
}

export function getLocalStudentsSync(): Student[] {
  if (typeof window === 'undefined') return [];
  const deletedIds = new Set(getDeletedStudentIds());
  const found: Student[] = [];
  const keys = [
    STUDENTS_STORAGE_KEY,
    'jt_fitness_students_v2',
    'protocolo_pap_students_v1',
    'students_list',
    'protocolo_pap_students'
  ];
  for (const k of keys) {
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          for (const s of parsed) {
            if (s && s.id && !deletedIds.has(s.id) && !isAdminEmail(s.email)) {
              const nameLower = (s.name || '').toLowerCase();
              if (!(nameLower.includes('joana') && nameLower.includes('maia'))) {
                found.push(s);
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn(`Failed to read ${k} students:`, e);
    }
  }
  return mergeStudentLists([], found);
}

export function persistStudentsLocally(studentsList: Student[]) {
  if (typeof window === 'undefined') return;
  const deletedIds = new Set(getDeletedStudentIds());
  const deletedEmails = new Set(getDeletedStudentEmails());
  const sanitizedList = studentsList.filter(s => {
    if (!s || !s.id) return false;
    const email = (s.email || '').toLowerCase().trim();
    const nameLower = (s.name || '').toLowerCase().trim();
    const uid = (s as any).googleUid;
    if (deletedIds.has(s.id)) return false;
    if (uid && deletedIds.has(uid)) return false;
    if (email && deletedEmails.has(email)) return false;
    if (isAdminEmail(email)) return false;
    if (nameLower.includes('joana') && nameLower.includes('maia')) return false;
    return true;
  });

  try {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(sanitizedList));
  } catch (e) {
    console.warn("LocalStorage save warning:", e);
  }
  try {
    set(STUDENTS_CACHE_KEY, sanitizedList).catch((err) => {
      console.warn("IndexedDB cache save warning:", err);
    });
  } catch (e) {
    console.warn("IndexedDB dispatch warning:", e);
  }
}

export function mergeStudentLists(priorityList: Student[], fallbackList: Student[]): Student[] {
  const deletedIds = new Set(getDeletedStudentIds());
  const deletedEmails = new Set(getDeletedStudentEmails());
  const map = new Map<string, Student>();
  const emailMap = new Map<string, string>();
  const codeMap = new Map<string, string>();

  const findExistingKey = (st: Student): string | null => {
    if (st.id && map.has(st.id)) return st.id;
    const email = (st.email || '').toLowerCase().trim();
    if (email && emailMap.has(email)) return emailMap.get(email)!;
    const code = (st.accessCode || '').toUpperCase().trim();
    if (code && codeMap.has(code)) return codeMap.get(code)!;
    return null;
  };

  const registerKeys = (st: Student, key: string) => {
    map.set(key, st);
    const email = (st.email || '').toLowerCase().trim();
    if (email) emailMap.set(email, key);
    const code = (st.accessCode || '').toUpperCase().trim();
    if (code) codeMap.set(code, key);
  };

  const processStudent = (st: Student) => {
    if (!st || !st.id) return;
    const email = (st.email || '').toLowerCase().trim();
    const nameLower = (st.name || '').toLowerCase().trim();
    const uid = (st as any).googleUid;
    if (deletedIds.has(st.id) || (uid && deletedIds.has(uid)) || (email && deletedEmails.has(email))) {
      return;
    }
    if (isAdminEmail(email)) return;
    if (nameLower.includes('joana') && nameLower.includes('maia')) return;
    const existingKey = findExistingKey(st);
    if (existingKey) {
      const existing = map.get(existingKey)!;
      const merged: Student = {
        ...existing,
        ...st,
        id: existing.id || st.id,
        email: st.email || existing.email,
        accessCode: st.accessCode || existing.accessCode,
        evaluations: (st.evaluations && st.evaluations.length > 0) ? st.evaluations : (existing.evaluations || []),
        dietPlan: st.dietPlan || existing.dietPlan || null,
        workoutPlan: selectBestWorkoutPlan(st.workoutPlan, existing.workoutPlan),
        aiAnalyses: (st.aiAnalyses && st.aiAnalyses.length > 0) ? st.aiAnalyses : (existing.aiAnalyses || []),
        anamnesis: (st.anamnesis && Object.keys(st.anamnesis).length > 0) ? st.anamnesis : (existing.anamnesis || {}),
      };
      registerKeys(merged, existingKey);
    } else {
      registerKeys(st, st.id);
    }
  };

  for (const st of fallbackList) processStudent(st);
  for (const st of priorityList) processStudent(st);

  return Array.from(map.values());
}

// Helper to save or update student in Cloud (Firebase Firestore)
export async function saveStudentToFirestore(student: Student) {
  if (!student || !student.id) {
    console.warn("[Firestore Sync] ⚠️ Tentativa de salvar aluno nulo ou sem ID abortada.");
    return;
  }

  const sEmail = (student.email || '').toLowerCase().trim();
  const sName = (student.name || '').toLowerCase().trim();
  if (isAdminEmail(sEmail) || (sName.includes('joana') && sName.includes('maia'))) {
    console.warn("[Firestore Sync] ⛔ Impossível salvar administradora como aluna. Apagando do banco...");
    try {
      await deleteDoc(doc(firestoreDb, 'students', student.id)).catch(() => {});
    } catch {}
    return;
  }

  const firestoreData = stripUndefined({
    id: student.id,
    name: student.name || 'Aluno',
    age: Number(student.age) || null,
    gender: student.gender || 'M',
    activityLevel: Number(student.activityLevel) || 1.2,
    objective: student.objective || 'Saúde',
    email: sEmail,
    phone: student.phone || '',
    profilePicture: student.profilePicture || '',
    accessCode: (student.accessCode || '').toUpperCase().trim(),
    accessPassword: (student.accessPassword || '').trim(),
    isActive: student.isActive !== false,
    observations: student.observations || '',
    feedback: student.feedback || '',
    anamnesis: student.anamnesis || {},
    dietPlan: student.dietPlan || null,
    workoutPlan: student.workoutPlan || null,
    evaluations: student.evaluations || [],
    aiAnalyses: student.aiAnalyses || [],
    googleUid: (student as any).googleUid || '',
    updatedAt: new Date().toISOString()
  });

  await setDoc(doc(firestoreDb, 'students', student.id), firestoreData, { merge: true });
  console.log(`[Firestore Sync] ✅ Aluno "${student.name}" gravado com sucesso no Firestore.`);
}

function mapDocToStudent(docSnap: any, deletedIds: Set<string>): Student | null {
  const d = docSnap.data ? docSnap.data() : docSnap;
  const studentId = d?.id || docSnap.id;
  if (!d || !studentId) return null;

  const docEmail = (d.email || '').toLowerCase().trim();
  const docName = (d.name || '').toLowerCase().trim();
  if (isAdminEmail(docEmail) || (docName.includes('joana') && docName.includes('maia'))) {
    try {
      deleteDoc(doc(firestoreDb, 'students', studentId)).catch(() => {});
      if (docSnap.id && docSnap.id !== studentId) {
        deleteDoc(doc(firestoreDb, 'students', docSnap.id)).catch(() => {});
      }
    } catch {}
    return null;
  }

  if (deletedIds.has(studentId) || (docSnap.id && deletedIds.has(docSnap.id))) {
    return null;
  }

  const mapped: Student & { googleUid?: string } = {
    id: studentId,
    name: d.name || 'Aluno',
    age: d.age ?? 25,
    gender: d.gender || 'M',
    activityLevel: (Number(d.activityLevel || d.activity_level) || 1.2) as ActivityLevel,
    objective: d.objective || 'Saúde',
    email: d.email || '',
    phone: d.phone || '',
    profilePicture: d.profilePicture || d.photo_url || '',
    accessCode: d.accessCode || d.access_code || '',
    accessPassword: d.accessPassword || d.access_password || '',
    isActive: d.isActive !== false && d.status !== 'inactive',
    observations: d.observations || '',
    feedback: d.feedback || '',
    anamnesis: d.anamnesis || {},
    dietPlan: d.dietPlan || null,
    workoutPlan: safelyParseWorkoutPlan(d.workoutPlan) || null,
    evaluations: Array.isArray(d.evaluations) ? d.evaluations : [],
    aiAnalyses: Array.isArray(d.aiAnalyses) ? d.aiAnalyses : []
  };
  if (d.googleUid) {
    mapped.googleUid = d.googleUid;
  }
  return mapped;
}

let isSyncingStudents = false;
async function syncStudents(
  _adminEmail: string | null,
  setStudents: any,
  setLoading: any,
  setMealTemplates?: React.Dispatch<React.SetStateAction<MealTemplate[]>>
) {
  if (isSyncingStudents) return;
  isSyncingStudents = true;
  try {
    // 1. Synchronously & Asynchronously grab local stores (LocalStorage + IndexedDB)
    const localStudents = getLocalStudentsSync();
    let idbStudents: Student[] = [];
    try {
      const cached = await get(STUDENTS_CACHE_KEY);
      if (Array.isArray(cached) && cached.length > 0) {
        idbStudents = cached;
      }
    } catch (cacheErr) {
      console.warn("Notice reading IDB cache:", cacheErr);
    }

    // 1b. Fetch deleted_students from Firestore (Apenas IDs de registros antigos para sincronização)
    const deletedIds = new Set(getDeletedStudentIds());
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(DELETED_STUDENT_EMAILS_KEY);
      }
      const delSnap = await getDocs(collection(firestoreDb, 'deleted_students'));
      delSnap.forEach(d => {
        const data = d.data();
        if (d.id && !d.id.includes('@')) deletedIds.add(d.id);
        if (data.id && !data.id.includes('@')) deletedIds.add(data.id);
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem(DELETED_STUDENT_IDS_KEY, JSON.stringify(Array.from(deletedIds)));
      }
    } catch (delFsErr) {
      console.warn("Deleted students sync notice:", delFsErr);
    }

    // Process any offline queued workout updates first
    try {
      await processWorkoutQueue();
    } catch {}

    // 2. Fetch from Firestore (Primary Cloud Database)
    let firestoreStudents: Student[] = [];
    let firestoreFetchOk = false;
    try {
      const fsSnap = await getDocs(collection(firestoreDb, 'students'));
      firestoreFetchOk = true;
      fsSnap.forEach(docSnap => {
        const mapped = mapDocToStudent(docSnap, deletedIds);
        if (mapped) {
          firestoreStudents.push(mapped);
        }
      });
      console.log(`[Firestore Sync] 📥 Carregados ${firestoreStudents.length} alunos do Firestore.`);
    } catch (fsErr) {
      console.warn("Firestore sync notice:", fsErr);
    }

    // 2b. Sync mealTemplates from Firestore if setter provided
    if (setMealTemplates) {
      try {
        const mtSnap = await getDocs(collection(firestoreDb, 'mealTemplates'));
        const templates: MealTemplate[] = [];
        mtSnap.forEach(docSnap => {
          const d = docSnap.data();
          if (d) {
            templates.push({
              id: d.id || docSnap.id,
              name: d.name || 'Modelo de Refeição',
              foods: Array.isArray(d.foods) ? d.foods : [],
              observations: d.observations || '',
              isReadyMeal: Boolean(d.isReadyMeal),
            });
          }
        });
        setMealTemplates(templates);
      } catch (mtErr) {
        console.warn("Meal templates Firestore sync notice:", mtErr);
      }
    }

    const combinedLocal = mergeStudentLists(idbStudents, localStudents);
    const finalStudents = firestoreFetchOk
      ? mergeStudentLists(firestoreStudents, combinedLocal)
      : combinedLocal;

    // Background push any purely local records not yet in Firestore
    if (firestoreFetchOk) {
      for (const locSt of combinedLocal) {
        if (locSt && locSt.id && !deletedIds.has(locSt.id) && !firestoreStudents.some(f => f.id === locSt.id)) {
          saveStudentToFirestore(locSt).catch(err => console.warn("Background push for local student notice:", err));
        }
      }
    }

    setStudents(finalStudents);
    persistStudentsLocally(finalStudents);
    console.log(`[Firestore Sync] ✅ Sincronização concluída. Total de alunos: ${finalStudents.length} (Nuvem: ${firestoreStudents.length}, Cache Local: ${combinedLocal.length})`);
  } catch (err) {
    console.warn("[Firestore Sync] ⚠️ Aviso durante a sincronização de alunos:", err);
  } finally {
    isSyncingStudents = false;
    setLoading(false);
  }
}

export type Gender = 'M' | 'F';
export type Objective = 'Emagrecimento' | 'Hipertrofia' | 'Manutenção' | 'Definição' | 'Saúde' | 'Performance';
export type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;
export type EvaluationMethod = 'pollock7' | 'pollock3' | 'durnin4' | 'bioimpedance' | 'photo_only';

export interface Circumferences {
  shoulder?: number;
  chest?: number;
  waist?: number;
  abdomen?: number;
  hip?: number;
  rightArm?: number;
  leftArm?: number;
  rightThigh?: number;
  leftThigh?: number;
  rightCalf?: number;
  leftCalf?: number;
}

export interface PhysicalEvaluation {
  id: string;
  date: string;
  method: EvaluationMethod;
  weight: number;
  height: number;
  folds: {
    peitoral?: number;
    axilar?: number;
    triciptal?: number;
    subescapular?: number;
    abdominal?: number;
    suprailiaca?: number;
    coxa?: number;
    bicipital?: number;
  };
  circumferences?: Circumferences;
  bioimpedance?: {
    bf?: number;
    visceralFat?: number;
  };
  photos?: string[];
  metrics: {
    imc: number;
    bf: number;
    leanMass: number;
    fatMass: number;
  };
}

export interface Food {
  id: string;
  name: string;
  quantity: number; // in grams
  kcals: number;
  protein: number;
  carbs: number;
  fats: number;
  kitchenMeasure?: string;
}

export interface Meal {
  id: string;
  name: string;
  time?: string;
  foods: Food[];
  observations?: string;
  isReadyMeal?: boolean;
}

export interface Supplement {
  id: string;
  name: string;
  dosage: string; // Ex: "2 scoops (30g)", "1 cápsula"
  time?: string;  // Ex: "Pós-treino", "Ao acordar"
  kcals: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietPlan {
  targetCalories: number;
  targetProtein: number; // grams
  targetCarbs: number;   // grams
  targetFats: number;    // grams
  meals: Meal[];
  supplements?: Supplement[];
  waterIntakeGoal?: number; // in ml
  waterReminders?: string[]; // list of times like "08:00"
  currentWaterIntake?: number; // in ml (persisted progress)
  history?: {
    date: string;
    targetCalories: number;
    targetProtein: number;
    targetCarbs: number;
    targetFats: number;
    meals: Meal[];
  }[];
}

export interface Anamnesis {
  medicalHistory?: string;
  medications?: string;
  injuries?: string;
  lifestyle?: string;
  sleepQuality?: string;
  digestion?: string;
  dietaryPreferences?: string;
  allergies?: string;
  lastUpdated?: string;
}

export interface WorkoutExercise {
  id: string; // internal id for the day list
  exerciseId: string; // from EXERCISE_DATABASE
  sets: number;
  reps: string;
  rest: string;
  method?: string; // e.g. "Rest Pause", "Drop Set"
  observations?: string;
  load?: string; // "20kg", "10 placas"
  loadHistory?: { date: string; load: string }[];
  mediaType?: 'video' | 'gif';
  gifUrl?: string;
  videoUrl?: string;
}

export interface WorkoutDay {
  id: string;
  name: string; // e.g. "Treino A - Dorsal e Bíceps"
  exercises: WorkoutExercise[];
  observations?: string;
}

export interface WorkoutPlan {
  id?: string;
  title: string;
  objective: string;
  days: WorkoutDay[];
  observations?: string;
  startDate?: string;
  endDate?: string;
  updatedAt?: string;
  history?: {
    id: string;
    date: string;
    title: string;
    objective: string;
    days: WorkoutDay[];
    observations?: string;
  }[];
}

export interface AIShapeAnalysis {
  id: string;
  date: string;
  report: string;
  weakPoints: string[];
  strongPoints: string[];
  suggestedTrainingAdjustments: string;
  associatedEvaluationId: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  objective: Objective;
  email?: string;
  phone?: string;
  evaluations: PhysicalEvaluation[];
  dietPlan?: DietPlan;
  workoutPlan?: WorkoutPlan;
  anamnesis?: Anamnesis;
  aiAnalyses?: AIShapeAnalysis[];
  observations?: string;
  feedback?: string;
  profilePicture?: string;
  accessCode: string;
  accessPassword?: string;
  isActive?: boolean;
}

export interface MealTemplate {
  id: string;
  name: string;
  foods: Food[];
  observations?: string;
  isReadyMeal?: boolean;
}

interface AppContextType {
  students: Student[];
  mealTemplates: MealTemplate[];
  loadingDb: boolean;
  authLoading: boolean;
  user: any | null;
  setUser: (user: any) => void;
  exercises: Exercise[];
  exercisesLoading: boolean;
  syncExercises: () => Promise<void>;
  addStudent: (student: Omit<Student, 'id' | 'accessCode'>) => Promise<string>;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  addEvaluation: (studentId: string, evalData: Omit<PhysicalEvaluation, 'id' | 'metrics'> & { id?: string }) => void;
  updateEvaluation: (studentId: string, evaluationId: string, updates: Partial<PhysicalEvaluation>) => void;
  deleteEvaluation: (studentId: string, evaluationId: string) => Promise<void>;
  deleteAllEvaluations: (studentId: string) => Promise<void>;
  updateDietPlan: (studentId: string, dietPlan: DietPlan) => void;
  deleteDietPlan: (studentId: string) => Promise<void>;
  updateWorkoutPlan: (studentId: string, workoutPlan: WorkoutPlan) => void;
  deleteStudent: (id: string) => void;
  clearAllStudents: () => Promise<void>;
  addMealTemplate: (template: Omit<MealTemplate, 'id'>) => void;
  deleteMealTemplate: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper for initial mock data
const INITIAL_STUDENTS: Student[] = [];

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Synchronously initialize from local storage to prevent any empty-state flash or startup race conditions
  const [students, setStudents] = useState<Student[]>(() => getLocalStudentsSync());
  const [mealTemplates, setMealTemplates] = useState<MealTemplate[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUserState] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('benfica_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setUser = (newUser: any) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('benfica_admin_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('benfica_admin_user');
    }
  };
  const [exercises, setExercises] = useState<Exercise[]>(EXERCISE_DATABASE);
  const [exercisesLoading, setExercisesLoading] = useState(false);

  const syncExercises = async () => {
    setExercisesLoading(true);
    try {
      setExercises(EXERCISE_DATABASE);
    } catch (e) {
      console.error(e);
    } finally {
      setExercisesLoading(false);
    }
  };

  useEffect(() => {
    syncExercises();
    // Always load student data and meal templates from Firestore/cache on startup
    syncStudents(user?.email || '', setStudents, setLoadingDb, setMealTemplates);

    // 1. Real-time Firestore Live Listener for instant database updates without manual pulling
    const unsubscribeFirestoreLive = onSnapshot(
      collection(firestoreDb, 'students'),
      (snapshot) => {
        try {
          const deletedIds = new Set(getDeletedStudentIds());
          const removedIds = new Set(
            snapshot
              .docChanges()
              .filter((c) => c.type === 'removed')
              .map((c) => c.doc.id)
          );
          const liveList: Student[] = [];

          snapshot.forEach((docSnap) => {
            const mapped = mapDocToStudent(docSnap, deletedIds);
            if (mapped) {
              liveList.push(mapped);
            }
          });

          if (!snapshot.metadata.fromCache || liveList.length > 0) {
            setStudents((prev) => {
              const liveMap = new Map<string, Student>();
              liveList.forEach((st) => liveMap.set(st.id, st));

              // Keep purely offline/local items not yet removed if server cache is empty; otherwise trust Firestore docs
              const remainingLocal = snapshot.metadata.fromCache
                ? prev.filter(
                    (p) =>
                      !liveMap.has(p.id) &&
                      !removedIds.has(p.id) &&
                      !deletedIds.has(p.id)
                  )
                : [];

              const merged = [...liveList, ...remainingLocal];
              persistStudentsLocally(merged);
              return merged;
            });
            setLoadingDb(false);
          }
        } catch (err) {
          console.warn('[Firestore Live] Notice parsing snapshot:', err);
        }
      },
      (err) => {
        console.warn('[Firestore Live] Snapshot listener error:', err);
      }
    );

    // 1b. Real-time Firestore Live Listener for Meal Templates
    const unsubscribeMealTemplates = onSnapshot(
      collection(firestoreDb, 'mealTemplates'),
      (snapshot) => {
        try {
          const templates: MealTemplate[] = [];
          snapshot.forEach((docSnap) => {
            const d = docSnap.data();
            if (d) {
              templates.push({
                id: d.id || docSnap.id,
                name: d.name || 'Modelo de Refeição',
                foods: Array.isArray(d.foods) ? d.foods : [],
                observations: d.observations || '',
                isReadyMeal: Boolean(d.isReadyMeal),
              });
            }
          });
          setMealTemplates(templates);
        } catch (err) {
          console.warn('[Firestore Live] MealTemplates listener notice:', err);
        }
      },
      (err) => {
        console.warn('[Firestore Live] MealTemplates snapshot error:', err);
      }
    );

    // 2. Auto-sync immediately when app becomes visible, window gains focus or network goes online
    const handleReactivation = () => {
      if (document.visibilityState === 'visible' || navigator.onLine) {
        syncStudents(user?.email || '', setStudents, setLoadingDb, setMealTemplates);
      }
    };
    window.addEventListener('focus', handleReactivation);
    document.addEventListener('visibilitychange', handleReactivation);
    window.addEventListener('online', handleReactivation);

    const handleUserSession = (currentUser: any) => {
      if (currentUser) {
        setUser(currentUser);
        syncStudents(currentUser.email || '', setStudents, setLoadingDb, setMealTemplates);
        const userEmail = (currentUser.email || '').toLowerCase().trim();
        if (userEmail && isAdminEmail(userEmail)) {
          localStorage.setItem('admin_login_active', 'true');
          localStorage.setItem('benfica_preferred_mode', 'admin');
          if (typeof window !== 'undefined') {
            localStorage.removeItem('benfica_student_pwa_installed');
            localStorage.removeItem('student_auth');
            const url = new URL(window.location.href);
            if (url.searchParams.has('student') || url.searchParams.has('portal') || url.searchParams.has('portal_only')) {
              url.searchParams.delete('student');
              url.searchParams.delete('portal');
              url.searchParams.delete('portal_only');
              url.searchParams.set('admin', 'true');
              window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
            }
          }
        }
      }
    };

    // Check Firebase Redirect result on startup
    getRedirectResult(auth)
      .then((res) => {
        if (res?.user) {
          const userEmailClean = (res.user.email || '').toLowerCase().trim();
          const isAdmin = isAdminEmail(userEmailClean);
          const adminNames = getAdminDisplayName(userEmailClean, res.user.displayName || undefined);
          const u = {
            email: res.user.email || (isAdmin ? userEmailClean : ''),
            user_metadata: { full_name: res.user.displayName || (isAdmin ? adminNames.fullName : 'Aluno JT Fitness') },
            displayName: res.user.displayName || (isAdmin ? adminNames.displayName : 'Aluno JT Fitness'),
            photoURL: res.user.photoURL,
            uid: res.user.uid,
          };
          handleUserSession(u);
        }
      })
      .catch((err) => {
        console.warn('Firebase getRedirectResult notice:', err);
      });

    const unsubscribeFirebase = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userEmailClean = (firebaseUser.email || '').toLowerCase().trim();
        const isAdmin = isAdminEmail(userEmailClean);
        const adminNames = getAdminDisplayName(userEmailClean, firebaseUser.displayName || undefined);
        const u = {
          email: firebaseUser.email || (isAdmin ? userEmailClean : ''),
          user_metadata: { full_name: firebaseUser.displayName || (isAdmin ? adminNames.fullName : 'Aluno JT Fitness') },
          displayName: firebaseUser.displayName || (isAdmin ? adminNames.displayName : 'Aluno JT Fitness'),
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        handleUserSession(u);
      }
      setAuthLoading(false);
    });

    return () => {
      unsubscribeFirebase();
      unsubscribeFirestoreLive();
      unsubscribeMealTemplates();
      window.removeEventListener('focus', handleReactivation);
      document.removeEventListener('visibilitychange', handleReactivation);
      window.removeEventListener('online', handleReactivation);
    };
  }, []);

  const addMealTemplate = async (templateData: Omit<MealTemplate, 'id'>) => {
    const newId = generateUUID();
    const template: MealTemplate = { ...templateData, id: newId };
    setMealTemplates(prev => [...prev, template]);
    try {
      await setDoc(doc(firestoreDb, 'mealTemplates', newId), stripUndefined(template), { merge: true });
    } catch (e) {
      console.warn('[Firestore Sync] Aviso ao salvar modelo de refeição:', e);
    }
  };

  const deleteMealTemplate = async (id: string) => {
    setMealTemplates(prev => prev.filter(t => t.id !== id));
    try {
      await deleteDoc(doc(firestoreDb, 'mealTemplates', id));
    } catch (e) {
      console.warn('[Firestore Sync] Aviso ao excluir modelo de refeição:', e);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id' | 'accessCode'>): Promise<string> => {
    try {
      console.log("[AppContext:addStudent] 🚀 Iniciando processo de adição de aluno:", {
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        objective: studentData.objective,
        gender: studentData.gender,
        age: studentData.age
      });

      const newId = generateUUID();
      const cleanEmail = (studentData.email || '').toLowerCase().trim();

      // Remove de qualquer blacklist anterior caso esteja sendo re-cadastrado
      removeDeletedStudentLocally(newId, cleanEmail);
      try {
        await deleteDoc(doc(firestoreDb, 'deleted_students', newId)).catch(() => {});
        if (cleanEmail) {
          await deleteDoc(doc(firestoreDb, 'deleted_students', cleanEmail)).catch(() => {});
        }
        if ((studentData as any).googleUid) {
          await deleteDoc(doc(firestoreDb, 'deleted_students', (studentData as any).googleUid)).catch(() => {});
        }
      } catch {}

      const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newStudent: Student = {
        ...studentData,
        id: newId,
        accessCode: accessCode,
        isActive: true,
        evaluations: studentData.evaluations || [],
      };

      console.log(`[AppContext:addStudent] 🆔 Aluno instanciado com ID: ${newId} e Código: ${accessCode}`);
      
      // 1. Immediately update in-memory state and both caches (LocalStorage + IDB)
      setStudents(prev => {
        const next = [...prev.filter(s => s.id !== newId && (cleanEmail ? (s.email || '').toLowerCase().trim() !== cleanEmail : true)), newStudent];
        persistStudentsLocally(next);
        console.log(`[AppContext:addStudent] 💾 Estado React e caches (LocalStorage + IndexedDB) atualizados com sucesso. Total de alunos em memória: ${next.length}`);
        return next;
      });

      // 2. Synchronously write to localStorage right now to ensure persistence before any async hops
      if (typeof window !== 'undefined') {
        try {
          const current = getLocalStudentsSync();
          const next = [...current.filter(s => s.id !== newId && (cleanEmail ? (s.email || '').toLowerCase().trim() !== cleanEmail : true)), newStudent];
          persistStudentsLocally(next);
          console.log(`[AppContext:addStudent] 🔒 Escrita síncrona no LocalStorage confirmada. Total: ${next.length} alunos.`);
        } catch (e) {
          console.warn("[AppContext:addStudent] Aviso ao persistir no LocalStorage:", e);
        }
      }

      // 3. Persist directly to Firebase Firestore (Nuvem em Tempo Real)
      try {
        await saveStudentToFirestore(newStudent);
      } catch (fsErr) {
        console.warn("[AppContext:addStudent] Aviso ao gravar no Firestore (aluno mantido localmente):", fsErr);
      }

      return newId;
    } catch (e) {
      console.error("[AppContext:addStudent] ❌ Falha crítica ao adicionar aluno: ", e);
      throw e;
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      console.log(`[AppContext:updateStudent] 📝 Solicitada atualização para o aluno ID: ${id}. Campos:`, Object.keys(updates));
      let updatedStudentObj: Student | null = null;

      setStudents(prev => {
        const student = prev.find(s => s.id === id);
        if (!student) {
          console.warn(`[AppContext:updateStudent] ⚠️ Aluno ID ${id} não encontrado no estado atual.`);
          return prev;
        }
        const updated = { ...student, ...updates };
        updatedStudentObj = updated;
        const next = prev.map(s => s.id === id ? updated : s);
        persistStudentsLocally(next);
        console.log(`[AppContext:updateStudent] 💾 Estado local e caches atualizados com sucesso para "${updated.name}" (ID: ${id})`);
        return next;
      });

      if (updatedStudentObj) {
        try {
          await saveStudentToFirestore(updatedStudentObj);
          console.log(`[AppContext:updateStudent] ✅ Aluno "${(updatedStudentObj as Student).name}" atualizado no Firestore.`);
        } catch (fsErr) {
          console.warn("[AppContext:updateStudent] ⚠️ Aviso ao atualizar no Firestore (mantido localmente):", fsErr);
        }
      }
    } catch (e: any) {
      console.error("Failed to update student: ", e);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      console.log(`[AppContext:deleteStudent] 🗑️ Excluindo aluno id=${id} DEFINITIVAMENTE em todas as plataformas...`);
      
      // Busca dados completos do aluno antes de deletar
      const localCurrent = getLocalStudentsSync();
      const stToDelete = students.find(s => s.id === id) || localCurrent.find(s => s.id === id);
      const targetEmail = (stToDelete?.email || '').toLowerCase().trim();
      const targetUid = (stToDelete as any)?.googleUid || '';
      const targetName = stToDelete?.name || 'Aluno';

      // 1. Registra no blacklist local e IndexedDB imediatamente
      addDeletedStudentLocally(id, targetEmail, targetUid);

      // 2. Atualiza estado React e limpa storage local / IndexedDB
      setStudents(prev => {
        const next = prev.filter(s => s.id !== id && (!targetEmail || (s.email || '').toLowerCase().trim() !== targetEmail));
        persistStudentsLocally(next);
        return next;
      });

      // 3. Limpeza rigorosa de todos os caches do navegador
      try {
        const localKeys = [
          "jt_fitness_students_v2",
          "benfica_fitness_students_v2",
          "offline_students",
          "protocolo_pap_students_v1",
          "students_list",
        ];
        localKeys.forEach((k) => {
          try {
            const raw = localStorage.getItem(k);
            if (raw) {
              const list = JSON.parse(raw);
              if (Array.isArray(list)) {
                const filtered = list.filter((s: any) => s && s.id !== id && (!targetEmail || (s.email || '').toLowerCase().trim() !== targetEmail));
                localStorage.setItem(k, JSON.stringify(filtered));
              }
            }
          } catch {}
        });

        const studentAuth = localStorage.getItem("student_auth");
        if (studentAuth) {
          try {
            const parsed = JSON.parse(studentAuth);
            if (parsed.studentId === id || (targetEmail && (parsed.email || '').toLowerCase().trim() === targetEmail)) {
              localStorage.removeItem("student_auth");
              localStorage.removeItem("last_google_student_email");
              localStorage.removeItem("benfica_preferred_mode");
            }
          } catch {}
        }

        const lastGoogle = localStorage.getItem("last_google_student_email");
        if (lastGoogle && targetEmail && lastGoogle.toLowerCase().trim() === targetEmail) {
          localStorage.removeItem("last_google_student_email");
        }

        const offlineStudent = await get("offline_current_student");
        if (offlineStudent && (offlineStudent.id === id || (targetEmail && (offlineStudent.email || '').toLowerCase().trim() === targetEmail))) {
          await del("offline_current_student");
        }
      } catch (cacheCleanErr) {
        console.warn("[AppContext:deleteStudent] Aviso ao limpar caches locais:", cacheCleanErr);
      }

      // 4. EXCLUSÃO DEFINITIVA NO FIREBASE FIRESTORE (Nuvem em Tempo Real)
      try {
        // 4a. Exclui documento direto do aluno por ID
        await deleteDoc(doc(firestoreDb, 'students', id)).catch(() => {});

        // 4b. Exclui documento direto do aluno por googleUid se houver
        if (targetUid) {
          await deleteDoc(doc(firestoreDb, 'students', targetUid)).catch(() => {});
        }

        // 4c. Exclui todos os documentos na coleção 'students' que possuem este e-mail
        if (targetEmail) {
          try {
            const qEmail = query(collection(firestoreDb, 'students'), where('email', '==', targetEmail));
            const emailSnap = await getDocs(qEmail);
            for (const d of emailSnap.docs) {
              await deleteDoc(d.ref).catch(() => {});
            }
          } catch {}
        }

        // 4d. Exclui todos os documentos na coleção 'students' que possuem este googleUid
        if (targetUid) {
          try {
            const qUid = query(collection(firestoreDb, 'students'), where('googleUid', '==', targetUid));
            const uidSnap = await getDocs(qUid);
            for (const d of uidSnap.docs) {
              await deleteDoc(d.ref).catch(() => {});
            }
          } catch {}
        }

        // 4e. Grava registro de exclusão APENAS do ID na coleção 'deleted_students' do Firestore
        // (Apenas para evitar ressuscitar o registro antigo do cache de outros dispositivos).
        // NUNCA bloqueia o e-mail nem o Google UID, pois o aluno é livre para se cadastrar novamente no futuro!
        const tombstone = {
          id,
          name: targetName,
          deletedAt: new Date().toISOString()
        };
        await setDoc(doc(firestoreDb, 'deleted_students', id), tombstone, { merge: true }).catch(() => {});
        if (targetEmail) {
          await deleteDoc(doc(firestoreDb, 'deleted_students', targetEmail)).catch(() => {});
        }
        if (targetUid) {
          await deleteDoc(doc(firestoreDb, 'deleted_students', targetUid)).catch(() => {});
        }

        console.log(`[AppContext:deleteStudent] ✅ Aluno id=${id} (${targetEmail}) excluído com sucesso.`);
      } catch (fsDelErr) {
        console.warn("[AppContext:deleteStudent] Aviso ao excluir do Firestore:", fsDelErr);
      }
    } catch (e) {
      console.error("[AppContext:deleteStudent] Falha crítica ao deletar aluno: ", e);
      throw e;
    }
  };

  const clearAllStudents = async () => {
    try {
      // 1. Clear Firestore students collection
      try {
        const fsSnap = await getDocs(collection(firestoreDb, 'students'));
        await Promise.all(fsSnap.docs.map((docSnap) => deleteDoc(docSnap.ref).catch(() => {})));
      } catch (dbErr) {
        console.warn("Firestore batch clear notice:", dbErr);
      }

      // 2. Clear state and caches
      setStudents([]);
      persistStudentsLocally([]);
      try {
        localStorage.removeItem(STUDENTS_STORAGE_KEY);
        localStorage.removeItem('protocolo_pap_students_v1');
        localStorage.removeItem('protocolo_pap_active_student_id');
      } catch {}
    } catch (e) {
      console.error("Failed to clear all students:", e);
      throw e;
    }
  };

  const addEvaluation = async (studentId: string, evalData: Omit<PhysicalEvaluation, 'id' | 'metrics'> & { id?: string }) => {
    // Avoid stale closure if called immediately after addStudent
    let s = students.find(st => st.id === studentId);
    if (!s) {
      const localSts = getLocalStudentsSync();
      s = localSts.find(st => st.id === studentId);
    }

    let age = 25;
    let gender: 'M' | 'F' = 'M';
    let existingEvals: PhysicalEvaluation[] = s?.evaluations || [];

    if (!s) {
      try {
        const docSnap = await getDoc(doc(firestoreDb, 'students', studentId));
        if (docSnap.exists()) {
          const d = docSnap.data();
          age = d.age || 25;
          gender = (d.gender as 'M' | 'F') || 'M';
          if (Array.isArray(d.evaluations)) existingEvals = d.evaluations;
        }
      } catch {}
    } else {
      age = s.age || 25;
      gender = s.gender || 'M';
    }

    const { weight, height, method, bioimpedance } = evalData;
    const folds = evalData.folds || {};
    const circumferences = evalData.circumferences || {};

    let bf = 0;
    
    if (method === 'bioimpedance') {
      bf = bioimpedance?.bf || 0;
    } else if (method === 'pollock7') {
      const sumFolds = (folds.peitoral || 0) + (folds.axilar || 0) + (folds.triciptal || 0) +
                       (folds.subescapular || 0) + (folds.abdominal || 0) + (folds.suprailiaca || 0) + (folds.coxa || 0);
      let bd = gender === 'M'
        ? 1.112 - (0.00043499 * sumFolds) + (0.00000055 * sumFolds * sumFolds) - (0.00028826 * age)
        : 1.097 - (0.00046971 * sumFolds) + (0.00000056 * sumFolds * sumFolds) - (0.00012828 * age);
      bf = (4.95 / bd - 4.50) * 100;
    } else if (method === 'pollock3') {
      const sumFolds = gender === 'M'
        ? (folds.peitoral || 0) + (folds.abdominal || 0) + (folds.coxa || 0)
        : (folds.triciptal || 0) + (folds.suprailiaca || 0) + (folds.coxa || 0);
      let bd = gender === 'M'
        ? 1.109380 - (0.0008267 * sumFolds) + (0.0000016 * sumFolds * sumFolds) - (0.0002574 * age)
        : 1.0994921 - (0.0009929 * sumFolds) + (0.0000023 * sumFolds * sumFolds) - (0.0001392 * age);
      bf = (4.95 / bd - 4.50) * 100;
    } else if (method === 'durnin4') {
      const sumFolds = (folds.bicipital || 0) + (folds.triciptal || 0) + (folds.subescapular || 0) + (folds.suprailiaca || 0);
      const logSum = Math.log10(sumFolds || 1);
      let c = 0, m = 0;
      if (gender === 'M') {
        if (age < 30) { c = 1.1620; m = 0.0630; }
        else if (age < 40) { c = 1.1422; m = 0.0544; }
        else if (age < 50) { c = 1.1620; m = 0.0700; }
        else { c = 1.1715; m = 0.0779; }
      } else {
        if (age < 30) { c = 1.1549; m = 0.0678; }
        else if (age < 40) { c = 1.1423; m = 0.0632; }
        else if (age < 50) { c = 1.1333; m = 0.0612; }
        else { c = 1.1339; m = 0.0645; }
      }
      let bd = c - (m * logSum);
      bf = (4.95 / bd - 4.50) * 100;
    } else if (method === 'photo_only') {
      bf = 0;
    }

    if (method !== 'photo_only') {
      bf = Math.max(3, Math.min(bf, 60));
    }

    const imc = weight / (height * height);
    const fatMass = weight * (bf / 100);
    const leanMass = weight - fatMass;

    const newEval: PhysicalEvaluation = {
      ...evalData,
      id: evalData.id || generateUUID(),
      metrics: {
        imc: Number(imc.toFixed(1)),
        bf: Number(bf.toFixed(2)),
        leanMass: Number(leanMass.toFixed(1)),
        fatMass: Number(fatMass.toFixed(1)),
      }
    };

    const nextEvaluations = [...existingEvals.filter(e => e.id !== newEval.id), newEval];

    // 1. Immediately update state and both local storages
    setStudents(prev => {
      const newStudents = prev.map(st => {
        if (st.id === studentId) {
          return {
            ...st,
            evaluations: [...(st.evaluations || []).filter(e => e.id !== newEval.id), newEval]
          };
        }
        return st;
      });
      persistStudentsLocally(newStudents);
      console.log(`[AppContext:addEvaluation] 💾 Avaliação salva no estado React e persistida localmente. Aluno ID: ${studentId}, Avaliação ID: ${newEval.id}`);
      return newStudents;
    });

    // 2. Persist updated evaluations array directly in Firebase Firestore
    try {
      await setDoc(
        doc(firestoreDb, 'students', studentId),
        stripUndefined({
          evaluations: nextEvaluations,
          updatedAt: new Date().toISOString()
        }),
        { merge: true }
      );
      console.log(`[AppContext:addEvaluation] ✅ Avaliação salva com sucesso no Firestore. Aluno ID: ${studentId}`);
    } catch (e) {
      console.warn("[AppContext:addEvaluation] ⚠️ Aviso ao gravar avaliação no Firestore (salva localmente):", e);
    }
  };

  const updateEvaluation = async (studentId: string, evaluationId: string, updates: Partial<PhysicalEvaluation>) => {
    let evalToUpdate: PhysicalEvaluation | undefined;

    let s = students.find(st => st.id === studentId);
    if (!s) {
      const localSts = getLocalStudentsSync();
      s = localSts.find(st => st.id === studentId);
    }

    if (s) {
      evalToUpdate = s.evaluations?.find(e => e.id === evaluationId);
    }

    if (!evalToUpdate) return;
    const updatedEval = { ...evalToUpdate, ...updates };
    const nextEvaluations = (s?.evaluations || []).map(e => e.id === evaluationId ? updatedEval : e);

    setStudents(prev => {
      const newStudents = prev.map(st => {
        if (st.id === studentId) {
          const evals = st.evaluations || [];
          const exists = evals.some(e => e.id === evaluationId);
          if (exists) {
            return {
              ...st,
              evaluations: evals.map(e => e.id === evaluationId ? updatedEval : e)
            };
          }
        }
        return st;
      });
      persistStudentsLocally(newStudents);
      return newStudents;
    });

    try {
      await setDoc(
        doc(firestoreDb, 'students', studentId),
        stripUndefined({
          evaluations: nextEvaluations,
          updatedAt: new Date().toISOString()
        }),
        { merge: true }
      );
      console.log(`[AppContext:updateEvaluation] ✅ Avaliação atualizada no Firestore. ID: ${evaluationId}`);
    } catch (e) {
      console.warn("Firestore update evaluation notice:", e);
    }
  };

  const deleteEvaluation = async (studentId: string, evaluationId: string) => {
    try {
      const currentStudent = students.find(s => s.id === studentId) || getLocalStudentsSync().find(s => s.id === studentId);
      const nextEvaluations = (currentStudent?.evaluations || []).filter(e => e.id !== evaluationId);

      setStudents(prev => {
        const next = prev.map(s => {
          if (s.id === studentId) {
            return { ...s, evaluations: (s.evaluations || []).filter(e => e.id !== evaluationId) };
          }
          return s;
        });
        persistStudentsLocally(next);
        return next;
      });

      try {
        await setDoc(
          doc(firestoreDb, 'students', studentId),
          stripUndefined({
            evaluations: nextEvaluations,
            updatedAt: new Date().toISOString()
          }),
          { merge: true }
        );
      } catch (dbErr) {
        console.warn("Delete evaluation from Firestore notice:", dbErr);
      }
    } catch (e) {
      console.error("Failed to process delete evaluation:", e);
      throw e;
    }
  };

  const deleteAllEvaluations = async (studentId: string) => {
    try {
      setStudents(prev => {
        const next = prev.map(s => {
          if (s.id === studentId) {
            return { ...s, evaluations: [] };
          }
          return s;
        });
        persistStudentsLocally(next);
        return next;
      });

      try {
        await setDoc(
          doc(firestoreDb, 'students', studentId),
          {
            evaluations: [],
            updatedAt: new Date().toISOString()
          },
          { merge: true }
        );
      } catch (dbErr) {
        console.warn("Delete all evaluations from Firestore notice:", dbErr);
      }
    } catch (e) {
      console.error("Failed to process delete all evaluations:", e);
      throw e;
    }
  };

  const updateDietPlan = async (studentId: string, dietPlan: DietPlan) => {
    let finalUpdatedStudent: Student | null = null;
    setStudents(prev => {
      const s = prev.find(st => st.id === studentId);
      if (!s) return prev;
      const updatedStudent = { ...s, dietPlan };
      finalUpdatedStudent = updatedStudent;
      const next = prev.map(st => st.id === studentId ? updatedStudent : st);
      persistStudentsLocally(next);
      return next;
    });

    if (finalUpdatedStudent) {
      saveStudentToFirestore(finalUpdatedStudent as Student).catch(e => console.warn("Firestore save diet plan notice:", e));
    } else {
      try {
        await setDoc(
          doc(firestoreDb, 'students', studentId),
          stripUndefined({
            dietPlan,
            updatedAt: new Date().toISOString()
          }),
          { merge: true }
        );
      } catch (e) {
        console.warn("Firestore update diet plan notice (saved locally):", e);
      }
    }
  };

  const deleteDietPlan = async (studentId: string) => {
    let finalUpdatedStudent: Student | null = null;
    setStudents(prev => {
      const s = prev.find(st => st.id === studentId);
      if (!s) return prev;
      const updatedStudent = { ...s, dietPlan: undefined };
      finalUpdatedStudent = updatedStudent;
      const next = prev.map(st => st.id === studentId ? updatedStudent : st);
      persistStudentsLocally(next);
      return next;
    });

    try {
      await setDoc(
        doc(firestoreDb, 'students', studentId),
        {
          dietPlan: null,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
    } catch (e) {
      console.warn("Firestore delete diet plan notice:", e);
    }

    if (finalUpdatedStudent) {
      saveStudentToFirestore(finalUpdatedStudent as Student).catch(e => console.warn("Firestore save delete diet plan notice:", e));
    }
  };

  const updateWorkoutPlan = async (studentId: string, workoutPlan: WorkoutPlan) => {
    let finalUpdatedStudent: Student | null = null;
    const stampedWorkoutPlan: WorkoutPlan = {
      ...workoutPlan,
      updatedAt: new Date().toISOString()
    };

    setStudents(prev => {
      const targetClean = (studentId || '').trim();
      const s = prev.find(st => 
        st.id === targetClean ||
        (st.email && targetClean.includes('@') && st.email.toLowerCase().trim() === targetClean.toLowerCase()) ||
        (st.accessCode && st.accessCode.toUpperCase().trim() === targetClean.toUpperCase())
      );
      if (!s) return prev;

      let listBackup = s.workoutPlan?.history || [];
      if (s.workoutPlan && s.workoutPlan.days && s.workoutPlan.days.length > 0) {
        const lastBackup = listBackup[0];
        const isDifferentFromLast = !lastBackup || JSON.stringify(lastBackup.days) !== JSON.stringify(s.workoutPlan.days);
        
        if (isDifferentFromLast) {
          const backupItem = {
            id: Math.random().toString(36).substring(2, 9) + '-' + Date.now(),
            date: new Date().toISOString(),
            title: s.workoutPlan.title || `Treino - ${s.name}`,
            objective: s.workoutPlan.objective || '',
            days: JSON.parse(JSON.stringify(s.workoutPlan.days)),
            observations: s.workoutPlan.observations || ''
          };
          listBackup = [backupItem, ...listBackup].slice(0, 15);
        }
      }

      const finalWorkoutPlan: WorkoutPlan = {
        ...stampedWorkoutPlan,
        history: listBackup
      };

      const updatedStudent = { ...s, workoutPlan: finalWorkoutPlan };
      finalUpdatedStudent = updatedStudent;
      const next = prev.map(st => (st.id === s.id || (st.email && s.email && st.email.toLowerCase() === s.email.toLowerCase())) ? updatedStudent : st);
      persistStudentsLocally(next);
      return next;
    });

    if (finalUpdatedStudent) {
      const targetStudent = finalUpdatedStudent as Student;

      import('idb-keyval').then(({ set, get }) => {
        get('offline_current_student').then(std => {
           if(std && (std.id === targetStudent.id || (std.email && targetStudent.email && std.email.toLowerCase() === targetStudent.email.toLowerCase()))) {
             set('offline_current_student', targetStudent).catch(()=>{})
           }
        }).catch(()=>{});
      });

      try {
        await saveStudentToFirestore(targetStudent);
      } catch (dbErr: any) {
        console.warn("Firestore save workout plan failed, queueing offline:", dbErr);
        await queueWorkoutUpdate(targetStudent.id, targetStudent.workoutPlan as WorkoutPlan);
      }
    }
  };

  if (authLoading && !user) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Carregando painel de acesso...</div>;
  }

  return (
    <AppContext.Provider value={{ 
      students, 
      mealTemplates,
      loadingDb,
      authLoading,
      user,
      setUser,
      exercises,
      exercisesLoading,
      syncExercises,
      addStudent, 
      updateStudent, 
      addEvaluation, 
      updateEvaluation,
      deleteEvaluation,
      deleteAllEvaluations,
      updateDietPlan, 
      deleteDietPlan,
      updateWorkoutPlan,
      deleteStudent,
      clearAllStudents,
      addMealTemplate,
      deleteMealTemplate 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
