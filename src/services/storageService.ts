import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../lib/firebase';

export const uploadImageToStorage = async (path: string, file: Blob | File): Promise<string> => {
  const fallbackToBase64 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  try {
    if (!storage) throw new Error('Firebase Storage não configurado.');

    const storageRef = ref(storage, `evaluations/${path}`);
    const uploadTask = uploadBytes(storageRef, file, {
      cacheControl: 'public,max-age=3600',
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout no upload do Firebase Storage')), 8000)
    );

    const snapshot = await Promise.race([uploadTask, timeoutPromise]);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.warn(`Upload em ${path} usando fallback local Base64:`, error);
    return await fallbackToBase64();
  }
};

export const deleteImageFromStorage = async (fileUrl: string) => {
  if (!storage || !fileUrl || !fileUrl.startsWith('http') || fileUrl.includes('base64')) return;

  try {
    if (fileUrl.includes('firebasestorage.googleapis.com') || fileUrl.includes('firebasestorage.app')) {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    }
  } catch (error) {
    console.warn('Falhou ao deletar imagem do Firebase Storage:', error);
  }
};
