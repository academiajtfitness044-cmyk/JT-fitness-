import { Student, GeneratedImage, PhysicalEvaluation, DietPlan, WorkoutPlan, AIShapeAnalysis, CoachProfile } from '../types';
import { INITIAL_STUDENTS, INITIAL_GENERATED_IMAGES } from '../data/initialData';

const STUDENTS_KEY = 'protocolo_pap_students_v1';
const IMAGES_KEY = 'protocolo_pap_images_v1';
const ACTIVE_STUDENT_ID_KEY = 'protocolo_pap_active_student_id';
const COACH_PROFILE_KEY = 'protocolo_pap_coach_profile';

export const DEFAULT_COACH: CoachProfile = {
  name: 'Coach JT Fitness',
  specialty: 'Consultor Esportivo & Treinador',
  email: 'academiajtfitness044@gmail.com',
  phone: '(11) 99999-8888',
  cref: 'CREF 019283-G/SP',
  bio: 'Especialista em hipertrofia avançada, recomposição corporal acelerada e periodização de musculação na Academia JT Fitness.',
  avatarUrl: 'https://i.postimg.cc/PfQtzTps/Chat-GPT-Image-29-de-ago-de-2026-13-37-34.png',
};

export const StorageService = {
  // Students
  getStudents(): Student[] {
    try {
      const data = localStorage.getItem(STUDENTS_KEY);
      if (!data) {
        localStorage.setItem(STUDENTS_KEY, JSON.stringify(INITIAL_STUDENTS));
        return INITIAL_STUDENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_STUDENTS;
    }
  },

  saveStudents(students: Student[]): void {
    try {
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Error saving students to storage', e);
    }
  },

  getStudentById(id: string): Student | undefined {
    const students = this.getStudents();
    return students.find((s) => s.id === id);
  },

  saveStudent(student: Student): Student {
    const students = this.getStudents();
    const index = students.findIndex((s) => s.id === student.id);
    student.updatedAt = new Date().toISOString();

    if (index >= 0) {
      students[index] = student;
    } else {
      students.unshift(student);
    }
    this.saveStudents(students);
    return student;
  },

  deleteStudent(id: string): void {
    const students = this.getStudents().filter((s) => s.id !== id);
    this.saveStudents(students);
  },

  // Evaluations
  addEvaluation(studentId: string, evaluation: PhysicalEvaluation): Student | undefined {
    const student = this.getStudentById(studentId);
    if (!student) return undefined;

    student.evaluations = [evaluation, ...(student.evaluations || [])];
    return this.saveStudent(student);
  },

  updateEvaluation(studentId: string, evaluation: PhysicalEvaluation): Student | undefined {
    const student = this.getStudentById(studentId);
    if (!student) return undefined;

    const idx = (student.evaluations || []).findIndex((e) => e.id === evaluation.id);
    if (idx >= 0) {
      student.evaluations[idx] = evaluation;
      return this.saveStudent(student);
    }
    return student;
  },

  deleteEvaluation(studentId: string, evaluationId: string): Student | undefined {
    const student = this.getStudentById(studentId);
    if (!student) return undefined;

    student.evaluations = (student.evaluations || []).filter((e) => e.id !== evaluationId);
    return this.saveStudent(student);
  },

  // Diet
  updateDietPlan(studentId: string, dietPlan: DietPlan): Student | undefined {
    const student = this.getStudentById(studentId);
    if (!student) return undefined;

    student.dietPlan = dietPlan;
    return this.saveStudent(student);
  },

  // Workout
  updateWorkoutPlan(studentId: string, workoutPlan: WorkoutPlan): Student | undefined {
    const student = this.getStudentById(studentId);
    if (!student) return undefined;

    student.workoutPlan = workoutPlan;
    return this.saveStudent(student);
  },

  // AI Analyses
  addAIAnalysis(studentId: string, analysis: AIShapeAnalysis): Student | undefined {
    const student = this.getStudentById(studentId);
    if (!student) return undefined;

    student.aiAnalyses = [analysis, ...(student.aiAnalyses || [])];
    return this.saveStudent(student);
  },

  deleteAIAnalysis(studentId: string, analysisId: string): Student | undefined {
    const student = this.getStudentById(studentId);
    if (!student) return undefined;

    student.aiAnalyses = (student.aiAnalyses || []).filter((a) => a.id !== analysisId);
    return this.saveStudent(student);
  },

  // Generated Images
  getGeneratedImages(): GeneratedImage[] {
    try {
      const data = localStorage.getItem(IMAGES_KEY);
      if (!data) {
        localStorage.setItem(IMAGES_KEY, JSON.stringify(INITIAL_GENERATED_IMAGES));
        return INITIAL_GENERATED_IMAGES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_GENERATED_IMAGES;
    }
  },

  saveGeneratedImages(images: GeneratedImage[]): void {
    try {
      localStorage.setItem(IMAGES_KEY, JSON.stringify(images));
    } catch (e) {
      console.error('Error saving images to storage', e);
    }
  },

  addGeneratedImage(image: GeneratedImage): void {
    const images = this.getGeneratedImages();
    images.unshift(image);
    this.saveGeneratedImages(images);
  },

  deleteGeneratedImage(id: string): void {
    const images = this.getGeneratedImages().filter((img) => img.id !== id);
    this.saveGeneratedImages(images);
  },

  // Coach Profile
  getCoachProfile(): CoachProfile {
    try {
      const data = localStorage.getItem(COACH_PROFILE_KEY);
      return data ? JSON.parse(data) : DEFAULT_COACH;
    } catch {
      return DEFAULT_COACH;
    }
  },

  saveCoachProfile(profile: CoachProfile): void {
    localStorage.setItem(COACH_PROFILE_KEY, JSON.stringify(profile));
  },

  // Active Student for Portal login simulation
  getActiveStudentId(): string | null {
    return localStorage.getItem(ACTIVE_STUDENT_ID_KEY);
  },

  setActiveStudentId(id: string | null): void {
    if (id) {
      localStorage.setItem(ACTIVE_STUDENT_ID_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_STUDENT_ID_KEY);
    }
  },

  // Reset database to initial sample state
  resetToDefaults(): void {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem(IMAGES_KEY, JSON.stringify(INITIAL_GENERATED_IMAGES));
    localStorage.setItem(COACH_PROFILE_KEY, JSON.stringify(DEFAULT_COACH));
  },
};
