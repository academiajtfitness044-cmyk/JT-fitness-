import { get, set } from 'idb-keyval';
import { doc, setDoc } from 'firebase/firestore';
import { db as firestoreDb, stripUndefined } from './firebase';

export async function queueWorkoutUpdate(studentId: string, workoutPlan: any) {
  const queue = (await get('offline_workout_queue')) || {};
  queue[studentId] = workoutPlan;
  await set('offline_workout_queue', queue);
}

export async function processWorkoutQueue(_legacyClient?: any) {
  try {
    const queue = (await get('offline_workout_queue')) || {};
    const studentIds = Object.keys(queue);

    if (studentIds.length === 0) return;

    let processedAny = false;

    for (const studentId of studentIds) {
      const workoutPlan = queue[studentId];
      if (!workoutPlan) continue;

      try {
        await setDoc(
          doc(firestoreDb, 'students', studentId),
          stripUndefined({
            workoutPlan,
            updatedAt: new Date().toISOString(),
          }),
          { merge: true }
        );
        delete queue[studentId];
        processedAny = true;
      } catch (err) {
        console.warn(`[OfflineSync] Não foi possível sincronizar treino do aluno ${studentId} ainda:`, err);
      }
    }

    if (processedAny) {
      await set('offline_workout_queue', queue);
    }
  } catch (err) {
    // silently fail
  }
}
