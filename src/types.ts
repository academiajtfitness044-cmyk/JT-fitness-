export type Gender = 'M' | 'F';

export type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;

export type EvaluationMethod = 'protocol3' | 'protocol7' | 'bioimpedance' | 'circumference' | 'pollock7' | 'pollock3' | 'durnin4' | string;

export interface Skinfolds {
  peitoral?: number;
  abdominal?: number;
  coxa?: number;
  triceps?: number;
  subescapular?: number;
  suprailiaca?: number;
  axilarMedia?: number;
  axilar?: number;
  triciptal?: number;
  bicipital?: number;
  panturrilha?: number;
}

export interface Circumferences {
  neck?: number;
  shoulder?: number;
  chest?: number;
  armRightRelaxed?: number;
  armLeftRelaxed?: number;
  armRightContracted?: number;
  armLeftContracted?: number;
  rightArm?: number;
  leftArm?: number;
  forearmRight?: number;
  forearmLeft?: number;
  waist?: number;
  abdomen?: number;
  hip?: number;
  thighRightProximal?: number;
  thighLeftProximal?: number;
  thighRightMedial?: number;
  thighLeftMedial?: number;
  rightThigh?: number;
  leftThigh?: number;
  calfRight?: number;
  calfLeft?: number;
  rightCalf?: number;
  leftCalf?: number;
}

export interface EvaluationMetrics {
  bf: number; // % body fat
  fatMass: number; // kg
  leanMass: number; // kg
  imc: number;
  tmb: number; // Taxa metabólica basal (kcal)
  get: number; // Gasto energético total (kcal)
  idealWeightMin?: number;
  idealWeightMax?: number;
  classification?: string;
  waistToHipRatio?: number;
}

export interface BioimpedanceData {
  visceralFat?: number;
  bodyWater?: number;
  boneMass?: number;
  metabolicAge?: number;
  muscleMass?: number;
  fatMassPercentage?: number;
  subcutaneousFat?: number;
}

export interface PhysicalEvaluation {
  id: string;
  studentId: string;
  evalDate?: string; // ISO date
  date?: string; // ISO date fallback
  method: EvaluationMethod;
  weight: number; // kg
  height: number; // cm
  metrics: EvaluationMetrics;
  folds?: Skinfolds;
  circumferences?: Circumferences;
  bioimpedance?: BioimpedanceData;
  photos?: string[]; // image URLs (Front, Back, Side)
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FoodItem {
  id: string;
  foodId?: string;
  name: string;
  portion?: string;
  portionGrams?: number;
  quantity?: number;
  unit?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat?: number;
  fats?: number;
  fibers?: number;
  category?: string;
  substitutions?: string[];
  suggestedSubstitutions?: string[];
  checked?: boolean;
}

// Alias for MealItem
export type MealItem = FoodItem;

export interface Meal {
  id: string;
  name: string;
  time: string;
  items?: FoodItem[];
  foods?: FoodItem[];
  notes?: string;
  isCompleted?: boolean;
}

export interface Supplement {
  id?: string;
  name: string;
  dosage: string;
  timing: string;
  notes?: string;
  isCompleted?: boolean;
}

export interface DietPlan {
  id: string;
  studentId: string;
  targetCalories: number;
  targetProtein?: number;
  proteinGrams?: number;
  targetCarbs?: number;
  carbsGrams?: number;
  targetFats?: number;
  fatGrams?: number;
  waterIntakeGoal?: number; // in mL
  waterTargetMl?: number; // in mL
  currentWaterIntake?: number; // in mL
  waterReminders?: string[];
  meals: Meal[];
  supplements: Supplement[];
  notes?: string;
  updatedAt: string;
}

export interface ExerciseItem {
  id: string;
  exerciseId?: string;
  name: string;
  muscleGroup?: string;
  targetMuscle?: string;
  sets: number;
  reps: string;
  load?: string;
  weightKg?: number;
  restSeconds: number;
  rpe?: number; // 1-10
  advancedTechnique?: string;
  videoUrl?: string;
  gifUrl?: string;
  mediaType?: 'video' | 'gif';
  instructions?: string;
  tips?: string;
  notes?: string;
  completed?: boolean;
}

export type WorkoutExercise = ExerciseItem;
export type Exercise = ExerciseItem;

export interface WorkoutDay {
  id: string;
  name?: string;
  dayName?: string;
  dayOfWeek?: string;
  focus?: string;
  exercises: ExerciseItem[];
}

export interface WorkoutPlan {
  id: string;
  studentId: string;
  title: string;
  objective?: string;
  focus?: string;
  division: string; // e.g. "ABC", "ABCD", "Push/Pull/Legs"
  frequency?: string;
  days: WorkoutDay[];
  notes?: string;
  updatedAt: string;
}

export interface AIShapeAnalysis {
  id: string;
  studentId: string;
  associatedEvaluationId?: string;
  createdAt: string;
  report: string;
  score?: number; // 1-100 overall physique rating
  strongPoints: string[];
  weakPoints: string[];
  suggestedTrainingAdjustments: string;
  suggestedDietAdjustments?: string;
  photosEvaluated?: string[];
}

export interface Anamnesis {
  medicalHistory?: string;
  injuriesOrPains?: string;
  medications?: string;
  dietRestrictions?: string;
  routineNotes?: string;
  sleepHours?: number;
  stressLevel?: 'Baixo' | 'Médio' | 'Alto' | string;
  trainingExperience?: string;
  motivation?: string;
  supplementsUsed?: string;
}

export interface Student {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  age?: number;
  gender?: Gender;
  objective?: string;
  activityLevel?: ActivityLevel;
  accessCode?: string;
  accessPassword?: string;
  observations?: string;
  feedback?: string;
  profilePicture?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  anamnesis?: Anamnesis;
  evaluations?: PhysicalEvaluation[];
  dietPlan?: DietPlan;
  workoutPlan?: WorkoutPlan;
  aiAnalyses?: AIShapeAnalysis[];
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  negativePrompt?: string;
  type: 'create' | 'edit';
  aspectRatio: '1:1' | '9:16' | '16:9' | '4:3' | '3:4';
  style?: string;
  originalImageUrl?: string;
  resultImageUrl: string;
  createdAt: string;
  category?: string;
  tags?: string[];
  associatedStudentId?: string;
}

export interface ExerciseLibraryItem {
  id: string;
  name: string;
  category: string;
  equipment: string;
  targetMuscles: string[];
  videoUrl?: string;
  instructions: string[] | string;
  tips: string;
}

export interface CoachProfile {
  name: string;
  cref: string;
  specialty?: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl?: string;
}
