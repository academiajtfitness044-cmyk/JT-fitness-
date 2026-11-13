import { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Search,
  ArrowLeft,
  ArrowRight,
  Info,
  Camera,
  X,
  Image as ImageIcon,
  Download,
  User,
  TrendingUp,
  ClipboardList,
  Brain,
  Sparkles,
  Wand2,
  Loader2,
  Save,
  Send,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  FileText,
  Activity,
  Utensils,
  Share2,
  MessageSquare,
  LogOut,
  Trash2 as Trash,
  Link,
  Edit2,
  Copy,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { isAdminEmail } from "../constants";
import {
  useAppContext,
  Student,
  Objective,
  Gender,
  ActivityLevel,
  EvaluationMethod,
  Anamnesis,
  AIShapeAnalysis,
} from "../context/AppContext";
import { GoogleGenAI, Type } from "@google/genai";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  uploadImageToStorage,
  deleteImageFromStorage,
} from "../services/storageService";
import { SharePortalModal } from "../components/SharePortalModal";

// Simple helper to compress images before storing to remote Storage
export const compressImageToBlob = (
  file: File,
): Promise<{ url: string; blob: Blob }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ url: URL.createObjectURL(blob), blob });
            } else {
              reject(new Error("Falha ao gerar blob de canvas"));
            }
          },
          "image/jpeg",
          0.6,
        ); // Slightly lower quality in case it drops back to base64 it won't crash DB limits
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export function AlunosView() {
  const { students, addStudent, updateStudent, addEvaluation, updateEvaluation, deleteEvaluation, deleteAllEvaluations, deleteStudent } =
    useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showPhysicalEval, setShowPhysicalEval] = useState(false);
  const [showAddEval, setShowAddEval] = useState(false);
  const [showEditEval, setShowEditEval] = useState(false);
  const [editingEvalId, setEditingEvalId] = useState<string | null>(null);

  const [showSharePortalModal, setShowSharePortalModal] = useState(false);
  const [shareTargetStudent, setShareTargetStudent] = useState<Student | null>(null);

  const [photos, setPhotos] = useState<{ url: string; blob: Blob }[]>([]);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePicInputRef = useRef<HTMLInputElement>(null);

  const [chartTimeframe, setChartTimeframe] = useState<
    "3M" | "6M" | "1Y" | "ALL"
  >("ALL");

  const {
    register: registerStudent,
    handleSubmit: onStudentSubmit,
    reset: resetStudentForm,
    setValue: setStudentValue,
    setError: setStudentError,
    formState: { errors: studentErrors },
  } = useForm({
    defaultValues: {
      name: "",
      age: "",
      gender: "M" as Gender,
      activityLevel: "1.55",
      objective: "Hipertrofia" as Objective,
      email: "",
      phone: "",
      accessPassword: "",
      weight: "",
      height: "",
      shoulder: "",
      chest: "",
      waist: "",
      abdomen: "",
      hip: "",
      rightArm: "",
      leftArm: "",
      rightThigh: "",
      leftThigh: "",
      rightCalf: "",
      leftCalf: "",
      peitoral: "",
      axilar: "",
      triciptal: "",
      subescapular: "",
      abdominal: "",
      suprailiaca: "",
      coxa: "",
    },
  });

  const {
    register: registerEval,
    handleSubmit: onEvalSubmit,
    watch: watchEval,
    reset: resetEvalForm,
    setValue: setEvalValue,
    formState: { errors: evalErrors },
  } = useForm({
    defaultValues: {
      method: "pollock7" as EvaluationMethod,
      weight: "",
      height: "",
      peitoral: "",
      axilar: "",
      triciptal: "",
      subescapular: "",
      abdominal: "",
      suprailiaca: "",
      coxa: "",
      bicipital: "",
      shoulder: "",
      chest: "",
      waist: "",
      abdomen: "",
      hip: "",
      rightArm: "",
      leftArm: "",
      rightThigh: "",
      leftThigh: "",
      rightCalf: "",
      leftCalf: "",
      bf: "",
      visceralFat: "",
    },
  });

  const activeMethod = watchEval("method");

  // FASTEST Filter mechanism. (We replace heavy Fuse.js with a native low-level string loop for lightning speed UI performance)
  const filteredStudents = useMemo(() => {
    const validStudents = students.filter(
      (s) =>
        s &&
        !isAdminEmail(s.email) &&
        !(s.name && s.name.toLowerCase().includes("joana") && s.name.toLowerCase().includes("maia"))
    );
    if (!searchTerm) return validStudents;
    const lowerTerm = searchTerm.toLowerCase().trim();
    return validStudents.filter(
      (student) =>
        student &&
        (
          (student.name && student.name.toLowerCase().includes(lowerTerm)) ||
          (student.email && student.email.toLowerCase().includes(lowerTerm)) ||
          (student.phone && student.phone.includes(lowerTerm)) ||
          (student.accessCode && student.accessCode.toLowerCase().includes(lowerTerm))
        )
    );
  }, [students, searchTerm]);

  const [isAddingStudent, setIsAddingStudent] = useState(false);

  const handleAddStudent = async (data: any) => {
    if (isAdminEmail(data.email) || (data.name && data.name.toLowerCase().includes("joana") && data.name.toLowerCase().includes("maia"))) {
      setStudentError("email" as any, {
        type: "manual",
        message: "Este e-mail pertence à Administradora (Personal Joana Maia) e não pode ser cadastrado como aluno.",
      });
      return;
    }

    // Check for duplicate email
    const emailExists = students.some(
      (student) =>
        student.email &&
        data.email &&
        student.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (emailExists) {
      setStudentError("email" as any, {
        type: "manual",
        message: "Este e-mail já está cadastrado em outro aluno.",
      });
      return;
    }

    if (!data.accessPassword || data.accessPassword.length < 6) {
      setStudentError("accessPassword" as any, {
        type: "manual",
        message: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }

    setIsAddingStudent(true);

    try {
      const newStudentId = await addStudent({
        name: data.name.trim(),
        age: Number(data.age),
        gender: data.gender,
        activityLevel: Number(data.activityLevel) as ActivityLevel,
        objective: data.objective,
        email: (data.email || "").toLowerCase().trim(),
        phone: data.phone ? data.phone.trim() : "",
        accessPassword: data.accessPassword ? data.accessPassword.trim() : "", // saving only so the trainer can look it up later if requested
        evaluations: [],
      });

      if (data.weight && data.height) {
        await addEvaluation(newStudentId, {
          date: new Date().toISOString(),
          method: "pollock7",
          weight: Number(data.weight),
          height: Number(data.height),
          folds: {
            peitoral: Number(data.peitoral) || undefined,
            axilar: Number(data.axilar) || undefined,
            triciptal: Number(data.triciptal) || undefined,
            subescapular: Number(data.subescapular) || undefined,
            abdominal: Number(data.abdominal) || undefined,
            suprailiaca: Number(data.suprailiaca) || undefined,
            coxa: Number(data.coxa) || undefined,
          },
          circumferences: {
            shoulder: Number(data.shoulder) || undefined,
            chest: Number(data.chest) || undefined,
            waist: Number(data.waist) || undefined,
            abdomen: Number(data.abdomen) || undefined,
            hip: Number(data.hip) || undefined,
            rightArm: Number(data.rightArm) || undefined,
            leftArm: Number(data.leftArm) || undefined,
            rightThigh: Number(data.rightThigh) || undefined,
            leftThigh: Number(data.leftThigh) || undefined,
            rightCalf: Number(data.rightCalf) || undefined,
            leftCalf: Number(data.leftCalf) || undefined,
          },
        });
      }

      setShowAddStudent(false);
      resetStudentForm();
    } catch (error: any) {
      alert("Erro ao cadastrar aluno: " + (error.message || String(error)));
    } finally {
      setIsAddingStudent(false);
    }
  };

  const handleEditStudent = async (data: any) => {
    if (!selectedStudent) return;
    setIsAddingStudent(true);
    try {
      const updatedData = {
        name: data.name.trim(),
        age: Number(data.age),
        gender: data.gender,
        activityLevel: Number(data.activityLevel) as ActivityLevel,
        objective: data.objective,
        email: (data.email || "").toLowerCase().trim(),
        phone: data.phone ? data.phone.trim() : "",
        accessPassword: data.accessPassword ? data.accessPassword.trim() : "",
      };
      await updateStudent(selectedStudent.id, updatedData);
      setSelectedStudent({ ...selectedStudent, ...updatedData });
      setShowEditStudent(false);
    } catch (error: any) {
      alert("Erro ao atualizar aluno: " + (error.message || String(error)));
    } finally {
      setIsAddingStudent(false);
    }
  };

  const openEditStudentModal = () => {
    if (!selectedStudent) return;
    resetStudentForm({
      name: selectedStudent.name,
      age: String(selectedStudent.age),
      gender: selectedStudent.gender,
      activityLevel: String(selectedStudent.activityLevel),
      objective: selectedStudent.objective,
      email: selectedStudent.email || "",
      phone: selectedStudent.phone || "",
      accessPassword: selectedStudent.accessPassword || "",
    });
    setShowEditStudent(true);
  };

  const handlePhotoUpload = async (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;
    const compressedPhotos = await Promise.all(
      files.map((file) => compressImageToBlob(file)),
    );
    setPhotos((prev) => [...prev, ...compressedPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSwapPhotos = (evalId: string, idx1: number, idx2: number) => {
    if (!selectedStudent) return;
    const currentEvals = selectedStudent.evaluations || [];
    const updatedEvals = currentEvals.map((e) => {
      if (e.id === evalId) {
        const photosArr = [...(e.photos || [])];
        while (photosArr.length < 3) photosArr.push("");
        const temp = photosArr[idx1];
        photosArr[idx1] = photosArr[idx2];
        photosArr[idx2] = temp;
        return { ...e, photos: photosArr };
      }
      return e;
    });
    updateStudent(selectedStudent.id, { evaluations: updatedEvals });
    setSelectedStudent({ ...selectedStudent, evaluations: updatedEvals });
  };

  const handleUpdateEvaluationPhoto = async (
    evalId: string,
    photoIndex: number,
    newFile: File | null,
  ) => {
    if (!selectedStudent) return;

    setIsPhotoUploading(true);
    try {
      let newPhotoUrl = "";
      if (newFile) {
        // Compress and upload to storage immediately
        const { blob } = await compressImageToBlob(newFile);
        const path = `students/${selectedStudent.id}/evaluations/${evalId}/photo_${photoIndex}_${Date.now()}.jpg`;
        newPhotoUrl = await uploadImageToStorage(path, blob);
      }

      const currentEvals = selectedStudent.evaluations || [];
      const updatedEvals = currentEvals.map((e) => {
        if (e.id === evalId) {
          const photosArr = [...(e.photos || [])];
          while (photosArr.length < 3) photosArr.push(""); // Assure length is 3
          // Try tracking down the old photo so we can delete from storage
          const oldPhoto = photosArr[photoIndex];
          if (oldPhoto && oldPhoto.startsWith("http")) {
            deleteImageFromStorage(oldPhoto).catch((err) =>
              console.error("Could not delete old image:", err),
            );
          }
          photosArr[photoIndex] = newPhotoUrl;
          return { ...e, photos: photosArr };
        }
        return e;
      });

      // Fix: Use updateEvaluation instead of updateStudent which doesn't persist evaluations
      const currentEval = updatedEvals.find(e => e.id === evalId);
      if (currentEval) {
        await updateEvaluation(selectedStudent.id, evalId, { photos: currentEval.photos });
      }
      
      setSelectedStudent({ ...selectedStudent, evaluations: updatedEvals });
    } catch (e) {
      alert("Falha ao salvar a imagem. Tente novamente.");
    } finally {
      setIsPhotoUploading(false);
    }
  };

  const handleDeleteEvaluation = async (evalId: string) => {
    if (!selectedStudent) return;
    if (
      !window.confirm(
        "Tem certeza que deseja excluir esta avaliação definitivamente? Todos os dados, métricas e fotos serão apagados.",
      )
    )
      return;

    // Delete photos safely behind the scenes
    const evalToDelete = selectedStudent.evaluations.find(
      (e) => e.id === evalId,
    );
    if (evalToDelete?.photos) {
      evalToDelete.photos.forEach((photo) => {
        if (photo && photo.startsWith("http")) {
          deleteImageFromStorage(photo).catch(() => {});
        }
      });
    }

    try {
      await deleteEvaluation(selectedStudent.id, evalId);
    } catch (e) {
      console.error("Error deleting evaluation:", e);
      alert("Erro ao excluir avaliação.");
      return;
    }

    const updatedEvals = selectedStudent.evaluations.filter(
      (e) => e.id !== evalId,
    );
    setSelectedStudent({ ...selectedStudent, evaluations: updatedEvals });

    if (galleryEvalId === evalId) {
      setGalleryEvalId(
        updatedEvals.length > 0 ? updatedEvals[updatedEvals.length - 1].id : "",
      );
    }
    if (compareAId === evalId || compareBId === evalId) {
      setCompareAId("");
      setCompareBId("");
    }
  };

  const handleDeleteAllEvaluations = async () => {
    if (!selectedStudent) return;
    if (
      !window.confirm(
        "Tem certeza que deseja apagar DEFINITIVAMENTE todo o histórico de avaliações deste aluno? Esta ação não pode ser desfeita.",
      )
    )
      return;

    // Delete all photos safely
    if (selectedStudent.evaluations) {
      selectedStudent.evaluations.forEach((evalItem) => {
        if (evalItem.photos) {
          evalItem.photos.forEach((photo) => {
            if (photo && photo.startsWith("http")) {
              deleteImageFromStorage(photo).catch(() => {});
            }
          });
        }
      });
    }

    try {
      await deleteAllEvaluations(selectedStudent.id);
    } catch (e) {
      console.error("Error deleting all evaluations:", e);
      alert("Erro ao excluir histórico de avaliações.");
      return;
    }

    setSelectedStudent({ ...selectedStudent, evaluations: [] });
    setGalleryEvalId("");
    setCompareAId("");
    setCompareBId("");
  };

  const handleAddEval = async (data: any) => {
    if (!selectedStudent) return;

    const getNum = (val: string) => (val ? Number(val) : undefined);

    const cleanObject = (obj: any) => {
      return Object.fromEntries(
        Object.entries(obj).filter(
          ([_, v]) =>
            v !== undefined &&
            v !== null &&
            (typeof v !== "object" || Object.keys(v).length > 0),
        ),
      );
    };

    setShowAddEval(false); // Hide immediately for UX
    setIsPhotoUploading(true);

    try {
      const evalId = crypto.randomUUID();
      const uploadedUrls: string[] = [];

      for (let i = 0; i < 3; i++) {
        const p = photos[i];
        if (p && p.blob && p.blob.size > 0) {
          try {
            const path = `students/${selectedStudent.id}/evaluations/${evalId}/photo_${i}_${Date.now()}.jpg`;
            const url = await uploadImageToStorage(path, p.blob);
            uploadedUrls[i] = url;
          } catch (uploadErr) {
            console.warn("Failed to upload photo", i, uploadErr);
            uploadedUrls[i] = "";
          }
        } else {
          uploadedUrls[i] = "";
        }
      }

      await addEvaluation(selectedStudent.id, {
        id: evalId, // Injected temporarily manually, wait, addEvaluation drops the 'id', we need to intercept or not matter
        date: new Date().toISOString().split("T")[0],
        method: data.method,
        weight: Number(data.weight),
        height: Number(data.height),
        folds: cleanObject({
          peitoral: getNum(data.peitoral),
          axilar: getNum(data.axilar),
          triciptal: getNum(data.triciptal),
          subescapular: getNum(data.subescapular),
          abdominal: getNum(data.abdominal),
          suprailiaca: getNum(data.suprailiaca),
          coxa: getNum(data.coxa),
          bicipital: getNum(data.bicipital),
        }),
        bioimpedance:
          data.method === "bioimpedance"
            ? cleanObject({
                bf: getNum(data.bf),
                visceralFat: getNum(data.visceralFat),
              })
            : undefined,
        circumferences: cleanObject({
          shoulder: getNum(data.shoulder),
          chest: getNum(data.chest),
          waist: getNum(data.waist),
          abdomen: getNum(data.abdomen),
          hip: getNum(data.hip),
          rightArm: getNum(data.rightArm),
          leftArm: getNum(data.leftArm),
          rightThigh: getNum(data.rightThigh),
          leftThigh: getNum(data.leftThigh),
          rightCalf: getNum(data.rightCalf),
          leftCalf: getNum(data.leftCalf),
        }),
        photos: uploadedUrls.some(url => url && url.trim().length > 0) ? uploadedUrls : undefined,
      });

      resetEvalForm();
      setPhotos([]);

      const updatedStudent = students.find((s) => s.id === selectedStudent.id);
      if (updatedStudent) setSelectedStudent(updatedStudent);
    } catch (error) {
      console.error(error);
      alert(
        "Houve um erro ao salvar a avaliação. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setIsPhotoUploading(false);
    }
  };

  const openEditEvalModal = (evalId: string) => {
    if (!selectedStudent) return;
    const evaluation = selectedStudent.evaluations.find((e) => e.id === evalId);
    if (!evaluation) return;

    setEditingEvalId(evalId);
    const initialPhotos = [...(evaluation.photos || [])];
    while (initialPhotos.length < 3) initialPhotos.push("");
    setPhotos(initialPhotos.map(url => ({ url, blob: null as any })));
    setEvalValue("method", evaluation.method);
    setEvalValue("weight", String(evaluation.weight));
    setEvalValue("height", String(evaluation.height));

    if (evaluation.folds) {
      Object.entries(evaluation.folds).forEach(([key, val]) => {
        setEvalValue(key as any, String(val));
      });
    }

    if (evaluation.circumferences) {
      Object.entries(evaluation.circumferences).forEach(([key, val]) => {
        setEvalValue(key as any, String(val));
      });
    }

    if (evaluation.bioimpedance) {
      setEvalValue("bf", String(evaluation.bioimpedance.bf));
      setEvalValue("visceralFat", String(evaluation.bioimpedance.visceralFat));
    }

    setShowEditEval(true);
  };

  const handleUpdateEval = async (data: any) => {
    if (!selectedStudent || !editingEvalId) return;

    const getNum = (val: string) => (val ? Number(val) : undefined);
    const cleanObject = (obj: any) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null),
      );
    };

    setIsPhotoUploading(true);
    try {
      const evaluation = selectedStudent.evaluations.find((e) => e.id === editingEvalId);
      if (!evaluation) return;

      const uploadedUrls: string[] = [...(evaluation.photos || [])];

      for (let i = 0; i < 3; i++) {
        const p = photos[i];
        if (p && p.blob && p.blob.size > 0) {
          try {
            const path = `students/${selectedStudent.id}/evaluations/${editingEvalId}/photo_${i}_${Date.now()}.jpg`;
            const url = await uploadImageToStorage(path, p.blob);
            uploadedUrls[i] = url;
          } catch (uploadErr) {
            console.warn("Failed to upload photo for update", i, uploadErr);
            uploadedUrls[i] = "";
          }
        } else if (p && p.url && p.url !== "") {
          uploadedUrls[i] = p.url;
        } else {
          uploadedUrls[i] = "";
        }
      }

      const updates: any = {
        method: data.method,
        weight: Number(data.weight),
        height: Number(data.height),
        folds: cleanObject({
          peitoral: getNum(data.peitoral),
          axilar: getNum(data.axilar),
          triciptal: getNum(data.triciptal),
          subescapular: getNum(data.subescapular),
          abdominal: getNum(data.abdominal),
          suprailiaca: getNum(data.suprailiaca),
          coxa: getNum(data.coxa),
          bicipital: getNum(data.bicipital),
        }),
        bioimpedance:
          data.method === "bioimpedance"
            ? cleanObject({
                bf: getNum(data.bf),
                visceralFat: getNum(data.visceralFat),
              })
            : undefined,
        circumferences: cleanObject({
          shoulder: getNum(data.shoulder),
          chest: getNum(data.chest),
          waist: getNum(data.waist),
          abdomen: getNum(data.abdomen),
          hip: getNum(data.hip),
          rightArm: getNum(data.rightArm),
          leftArm: getNum(data.leftArm),
          rightThigh: getNum(data.rightThigh),
          leftThigh: getNum(data.leftThigh),
          rightCalf: getNum(data.rightCalf),
          leftCalf: getNum(data.leftCalf),
        }),
        photos: uploadedUrls.some(url => url && url.trim().length > 0) ? uploadedUrls : undefined,
      };

      await (updateEvaluation as any)(selectedStudent.id, editingEvalId, updates);
      
      setShowEditEval(false);
      setEditingEvalId(null);
      setPhotos([]);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar avaliação.");
    } finally {
      setIsPhotoUploading(false);
    }
  };

  const [activeViewTab, setActiveViewTab] = useState<
    "evo" | "anamnese" | "shape-ia"
  >("evo");
  const [isAnalyzingShape, setIsAnalyzingShape] = useState(false);

  const {
    register: registerAnamnesis,
    handleSubmit: onAnamnesisSubmit,
    reset: resetAnamnesisForm,
  } = useForm<Anamnesis>();

  const ai = useMemo(() => {
    // Vite's 'define' replacement requires the exact string process.env.GEMINI_API_KEY
    let key = process.env.GEMINI_API_KEY || "";
    if (!key) {
      console.warn(
        "GEMINI_API_KEY não detectada. Tentando obter localmente...",
      );
      key = localStorage.getItem("GEMINI_API_KEY_TEMP") || "";
    }
    return new GoogleGenAI({ apiKey: key });
  }, []);

  const [obsText, setObsText] = useState("");
  const [compareAId, setCompareAId] = useState<string>("");
  const [compareBId, setCompareBId] = useState<string>("");
  const [galleryEvalId, setGalleryEvalId] = useState<string>("");
  const [photoCompareA, setPhotoCompareA] = useState<string>("");
  const [photoCompareB, setPhotoCompareB] = useState<string>("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [fullScreenPhoto, setFullScreenPhoto] = useState<string | null>(null);

  // Sync obs and anamnesis when selected student changes
  useEffect(() => {
    if (selectedStudent) {
      const updated = students.find((s) => s.id === selectedStudent.id);
      if (updated && updated.evaluations?.length !== selectedStudent.evaluations?.length) {
        setSelectedStudent(updated);
      }
    }
  }, [students, selectedStudent?.id, selectedStudent?.evaluations?.length]);

  useEffect(() => {
    if (selectedStudent) {
      setObsText(selectedStudent.observations || "");

      if (selectedStudent.anamnesis) {
        resetAnamnesisForm(selectedStudent.anamnesis);
      } else {
        resetAnamnesisForm({});
      }

      const evals = selectedStudent.evaluations || [];
      if (evals.length >= 2) {
        // Default to first (oldest) and last (newest) evaluation
        setCompareAId(evals[0].id);
        setCompareBId(evals[evals.length - 1].id);
        setPhotoCompareA(evals[0].id);
        setPhotoCompareB(evals[evals.length - 1].id);
      } else if (evals.length === 1) {
        setCompareAId(evals[0].id);
        setCompareBId("");
        setPhotoCompareA(evals[0].id);
        setPhotoCompareB("");
      } else {
        setCompareAId("");
        setCompareBId("");
        setPhotoCompareA("");
        setPhotoCompareB("");
      }

      if (evals.length > 0) {
        setGalleryEvalId(evals[evals.length - 1].id);
      } else {
        setGalleryEvalId("");
      }
    }
  }, [selectedStudent]);

  const handleSaveObservations = () => {
    if (!selectedStudent) return;
    updateStudent(selectedStudent.id, { observations: obsText });

    // Quick feedback overlay/re-sync
    const updated = students.find((s) => s.id === selectedStudent.id);
    if (updated) setSelectedStudent({ ...updated, observations: obsText });

    alert("Observações salvas com sucesso!");
  };

  const handleProfilePictureUpload = async (e: any) => {
    if (e.target.files && e.target.files.length > 0 && selectedStudent) {
      setIsPhotoUploading(true);
      try {
        const file = e.target.files[0];
        const { blob } = await compressImageToBlob(file);
        const path = `students/${selectedStudent.id}/profile_${Date.now()}.jpg`;

        const newPhotoUrl = await uploadImageToStorage(path, blob);

        // delete old if needed
        if (
          selectedStudent.profilePicture &&
          selectedStudent.profilePicture.startsWith("http")
        ) {
          deleteImageFromStorage(selectedStudent.profilePicture).catch(
            () => {},
          );
        }

        await updateStudent(selectedStudent.id, {
          profilePicture: newPhotoUrl,
        });

        const updated = students.find((s) => s.id === selectedStudent.id);
        if (updated)
          setSelectedStudent({ ...updated, profilePicture: newPhotoUrl });
      } catch (err) {
        alert("Ops, não foi possível carregar a imagem na Nuvem.");
      } finally {
        setIsPhotoUploading(false);
      }
    }
  };

  const handleSaveAnamnesis = (data: Anamnesis) => {
    if (!selectedStudent) return;
    const anamnesis = { ...data, lastUpdated: new Date().toISOString() };
    updateStudent(selectedStudent.id, { anamnesis });
    const updated = students.find((s) => s.id === selectedStudent.id);
    if (updated) setSelectedStudent(updated);
    alert("Anamnese salva com sucesso!");
  };

  const [aiStatus, setAiStatus] = useState<string>("");

  const handleAnalyzeShape = async (evaluationId: string) => {
    const evaluation = selectedStudent?.evaluations.find(
      (e) => e.id === evaluationId,
    );
    if (!evaluation || !evaluation.photos || evaluation.photos.length === 0) {
      alert("Esta avaliação não possui fotos para análise.");
      return;
    }

    setIsAnalyzingShape(true);
    setAiStatus("Baixando e processando imagens...");
    try {
      const photosParts = await Promise.all(
        (evaluation.photos || []).map(async (photo, index) => {
          try {
            let base64Data = "";
            if (photo.startsWith("http")) {
              const response = await fetch(photo, {
                referrerPolicy: "no-referrer",
              });
              if (!response.ok) throw new Error(`HTTP ${response.status}`);
              const blob = await response.blob();
              base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () =>
                  resolve((reader.result as string).split(",")[1]);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });
            } else if (photo.includes("base64")) {
              base64Data = photo.split(",")[1];
            }

            if (!base64Data) return null;
            return { inlineData: { data: base64Data, mimeType: "image/jpeg" } };
          } catch (photoErr) {
            console.warn(`Erro na foto ${index + 1}:`, photoErr);
            return null;
          }
        }),
      );

      const validPhotosParts = photosParts.filter(
        (p): p is { inlineData: { data: string; mimeType: string } } =>
          p !== null && !!p.inlineData.data,
      );

      if (validPhotosParts.length === 0) {
        throw new Error(
          "CORS/Bloqueio: Não foi possível baixar as fotos para análise. Se as fotos estão no Firebase, verifique as regras de CORS do Storage.",
        );
      }

      setAiStatus("Consultando Inteligência Artificial (Gemini Flash)...");

      // Check key presence just before calling
      const currentKey = process.env.GEMINI_API_KEY;

      if (!currentKey) {
        throw new Error(
          "Chave GEMINI_API_KEY não configurada no ambiente. Análise cancelada.",
        );
      }

      
      const latestEvals = (selectedStudent?.evaluations || [])
        .slice(-2)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
      const evalsStr =
        latestEvals.length > 0
          ? JSON.stringify(latestEvals, null, 2)
          : "Nenhuma medida anterior.";

      const promptText = `Analise as fotos deste aluno e as avaliações recentes. Objetivo: ${selectedStudent?.objective}. 
Avaliações Recentes:
${evalsStr}

Faça uma leitura anatômica e analise a diferença entre as medidas da semana passada e da atual (se houver) para sugerir mudanças no treino.
Retorne o JSON estrito.`;

      const systemInstruction =
        "Você é um mestre de biomecânica e nutrição avançada. Responda de forma extremamente fria e técnica, sem firulas. Foco estrito em protocolos para atletas naturais e estética corporal.";

      const currentAi = new GoogleGenAI({ apiKey: currentKey });
      
      let response_ai;
      const configObj: any = {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            report: { type: Type.STRING },
            weakPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            strongPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedTrainingAdjustments: { type: Type.STRING },
          },
          required: [
            "report",
            "weakPoints",
            "strongPoints",
            "suggestedTrainingAdjustments",
          ],
        },
      };

      const modelsToTry = [
        "gemini-flash-lite-latest",
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash-lite",
        "gemini-3.8-flash",
        "gemini-flash-latest",
        "gemini-3.6-flash",
        "gemini-3.7-flash"
      ];
      let lastError: any = null;

      for (const modelName of modelsToTry) {
        try {
          console.log(`Tentando gerar análise de shape com o modelo: ${modelName}`);
          response_ai = await currentAi.models.generateContent({
            model: modelName,
            contents: [{ role: "user", parts: [...validPhotosParts, { text: promptText }] }],
            config: configObj,
          });
          if (response_ai && response_ai.text) {
            break; // Sucesso!
          }
        } catch (err: any) {
          console.warn(`Erro com o modelo ${modelName} na análise de shape:`, err);
          lastError = err;
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      if (!response_ai || !response_ai.text) {
        throw new Error(
          lastError?.message ||
          "Serviço de IA indisponível no momento. Por favor, tente novamente em instantes."
        );
      }

      const resultText = response_ai.text;

      let result;
      try {
        result = JSON.parse(resultText);
      } catch (e) {
        // Fallback for markdown blocks
        const cleaned = resultText.replace(/```json\n?/, "").replace(/\n?```/, "").trim();
        result = JSON.parse(cleaned);
      }
      
      const newAnalysis: AIShapeAnalysis = {
        ...result,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        associatedEvaluationId: evaluationId,
      };

      const currentAnalyses = selectedStudent?.aiAnalyses || [];
      await updateStudent(selectedStudent!.id, {
        aiAnalyses: [newAnalysis, ...currentAnalyses],
      });

      const updated = students.find((s) => s.id === selectedStudent!.id);
      if (updated) setSelectedStudent(updated);
      setAiStatus("Sucesso!");
    } catch (error: any) {
      console.error("AI error:", error);
      let errorMsg = error.message || "Erro desconhecido";
      if (
        typeof errorMsg === "string" &&
        errorMsg.includes("PERMISSION_DENIED") &&
        errorMsg.includes("API_KEY_SERVICE_BLOCKED")
      ) {
        errorMsg =
          "A chave de API fornecida é válida, mas seu uso está BLOQUEADO no painel do Google Cloud para a API 'generativelanguage.googleapis.com'.\n\nPor favor, vá no Google Cloud Console, encontre sua API Key e edite as 'Restrições da chave'. Permita o 'Generative Language API'.";
      }
      alert(
        `Falha na IA: ${errorMsg}\n\nDetalhes para suporte: ${JSON.stringify(error)}`,
      );
    } finally {
      setIsAnalyzingShape(false);
      setAiStatus("");
    }
  };

  const evolutionData = useMemo(() => {
    if (!selectedStudent) return [];

    // Sort by date ascending to ensure chronological order for charts
    const sortedData = [...(selectedStudent.evaluations || [])].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // Filter by timeframe
    const now = new Date();
    let cutoffDate = new Date(0);

    if (chartTimeframe === "3M") {
      cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
    } else if (chartTimeframe === "6M") {
      cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
    } else if (chartTimeframe === "1Y") {
      cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
    }

    return sortedData
      .filter((ev) => new Date(ev.date) >= cutoffDate)
      .map((ev) => ({
        id: ev.id,
        date: new Date(ev.date).toLocaleDateString("pt-BR", {
          month: "short",
          day: "numeric",
        }),
        weight: ev.weight,
        bf: ev.metrics?.bf,
        leanMass: ev.metrics?.leanMass,
        fatMass: ev.metrics?.fatMass,
        evalDate: ev.date, // original date for comparison logic
        circumferences: ev.circumferences,
        metrics: ev.metrics,
      }));
  }, [selectedStudent, chartTimeframe]);

  const handleGeneratePDF = () => {
    if (!selectedStudent) return;

    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text(`Relatório do Aluno: ${selectedStudent.name}`, 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Idade: ${selectedStudent.age} | Gênero: ${selectedStudent.gender === "M" ? "Masculino" : "Feminino"} | Objetivo: ${selectedStudent.objective}`,
      14,
      32,
    );

    let startY = 45;

    if (selectedStudent.evaluations && selectedStudent.evaluations.length > 0) {
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text("Histórico de Avaliações", 14, startY);

      const evalData = (selectedStudent.evaluations || []).map((ev) => [
        new Date(ev.date).toLocaleDateString("pt-BR"),
        `${ev.weight} kg`,
        ev.method === 'photo_only' ? 'N/A' : `${ev.metrics?.bf || 0}%`,
        ev.method === 'photo_only' ? 'N/A' : `${ev.metrics?.leanMass || 0} kg`,
        ev.method === 'photo_only' ? 'N/A' : `${ev.metrics?.fatMass || 0} kg`,
      ]);

      autoTable(doc, {
        startY: startY + 5,
        head: [["Data", "Peso", "BF (%)", "Massa Magra", "Massa Gorda"]],
        body: evalData,
        theme: "striped",
        headStyles: { fillColor: [41, 128, 185] },
      });

      startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (selectedStudent.dietPlan && selectedStudent.dietPlan.meals.length > 0) {
      if (startY > 250) {
        doc.addPage();
        startY = 20;
      }

      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text("Plano Alimentar Atual", 14, startY);

      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Calorias Alvo: ${selectedStudent.dietPlan.targetCalories} kcal`,
        14,
        startY + 8,
      );
      doc.text(
        `Macros Alvo: ${selectedStudent.dietPlan.targetProtein}g P | ${selectedStudent.dietPlan.targetCarbs}g C | ${selectedStudent.dietPlan.targetFats}g G`,
        14,
        startY + 14,
      );

      let mealY = startY + 25;

      selectedStudent.dietPlan.meals.forEach((meal) => {
        if (mealY > 260) {
          doc.addPage();
          mealY = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(60, 60, 60);
        doc.text(meal.name, 14, mealY);

        const foodData = meal.foods.map((f) => [
          f.name,
          `${f.quantity}g`,
          `${f.protein}g`,
          `${f.carbs}g`,
          `${f.fats}g`,
          `${f.kcals} kcal`,
        ]);

        autoTable(doc, {
          startY: mealY + 4,
          head: [["Alimento", "Qtd", "Prot", "Carb", "Gord", "Kcal"]],
          body: foodData,
          margin: { left: 14 },
          theme: "grid",
          headStyles: { fillColor: [46, 204, 113] },
          styles: { fontSize: 10 },
        });

        mealY = (doc as any).lastAutoTable.finalY + 12;
      });

      startY = mealY + 5;
    }

    if (selectedStudent.aiAnalyses && selectedStudent.aiAnalyses.length > 0) {
      const latestAi = selectedStudent.aiAnalyses[0];
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(41, 128, 185);
      doc.text("Análise de Shape por IA", 14, 20);

      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text("Diagnóstico:", 14, 30);
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const splitReport = doc.splitTextToSize(latestAi.report, 180);
      doc.text(splitReport, 14, 36);

      let nextY = 36 + splitReport.length * 5 + 10;

      doc.setFontSize(12);
      doc.setTextColor(0, 150, 0);
      doc.text("Pontos Fortes:", 14, nextY);
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      latestAi.strongPoints.forEach((p, i) => {
        if (nextY + 6 + i * 5 > 280) {
          doc.addPage();
          nextY = 20;
        }
        doc.text(`• ${p}`, 20, nextY + 6 + i * 5);
      });

      nextY = nextY + 6 + latestAi.strongPoints.length * 5 + 10;
      if (nextY > 260) {
        doc.addPage();
        nextY = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(200, 0, 0);
      doc.text("Pontos de Melhoria:", 14, nextY);
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      latestAi.weakPoints.forEach((p, i) => {
        if (nextY + 6 + i * 5 > 280) {
          doc.addPage();
          nextY = 20;
        }
        doc.text(`• ${p}`, 20, nextY + 6 + i * 5);
      });

      nextY = nextY + 6 + latestAi.weakPoints.length * 5 + 15;
      if (nextY > 260) {
        doc.addPage();
        nextY = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(41, 128, 185);
      doc.text("Sugestões de Treino:", 14, nextY);
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const splitAdjust = doc.splitTextToSize(
        latestAi.suggestedTrainingAdjustments,
        180,
      );
      doc.text(splitAdjust, 14, nextY + 6);
    }

    doc.save(
      `relatorio_${selectedStudent.name.replace(/\s+/g, "_").toLowerCase()}.pdf`,
    );
  };

  const handleGenerateAIReportPDF = (analysis: AIShapeAnalysis) => {
    if (!selectedStudent) return;

    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text(`Análise de Shape IA: ${selectedStudent.name}`, 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Data da Análise: ${new Date(analysis.date).toLocaleDateString("pt-BR")}`,
      14,
      32,
    );

    doc.setFontSize(18);
    doc.setTextColor(41, 128, 185);
    doc.text("Diagnóstico do Shape", 14, 45);

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const splitReport = doc.splitTextToSize(analysis.report, 180);
    doc.text(splitReport, 14, 55);

    let nextY = 55 + splitReport.length * 5 + 15;

    doc.setFontSize(14);
    doc.setTextColor(0, 150, 0);
    doc.text("Pontos Fortes", 14, nextY);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    analysis.strongPoints.forEach((p, i) => {
      if (nextY + 8 + i * 5 > 280) {
        doc.addPage();
        nextY = 20;
      }
      doc.text(`• ${p}`, 20, nextY + 8 + i * 5);
    });

    nextY = nextY + 8 + analysis.strongPoints.length * 5 + 15;
    if (nextY > 260) {
      doc.addPage();
      nextY = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(200, 0, 0);
    doc.text("Pontos de Melhoria", 14, nextY);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    analysis.weakPoints.forEach((p, i) => {
      if (nextY + 8 + i * 5 > 280) {
        doc.addPage();
        nextY = 20;
      }
      doc.text(`• ${p}`, 20, nextY + 8 + i * 5);
    });

    nextY = nextY + 8 + analysis.weakPoints.length * 5 + 20;
    if (nextY > 260) {
      doc.addPage();
      nextY = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text("Sugestões de Treino e Ajustes", 14, nextY);
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const splitAdjust = doc.splitTextToSize(
      analysis.suggestedTrainingAdjustments,
      180,
    );
    doc.text(splitAdjust, 14, nextY + 8);

    doc.save(
      `analise_ia_${selectedStudent.name.replace(/\s+/g, "_").toLowerCase()}_${analysis.id}.pdf`,
    );
  };

  if (selectedStudent) {
    const latestEval =
      selectedStudent.evaluations && selectedStudent.evaluations.length > 0
        ? selectedStudent.evaluations[selectedStudent.evaluations.length - 1]
        : null;

    const getMethodLabel = (method: string) => {
      if (method === "pollock7") return "Pollock 7 Dobras";
      if (method === "pollock3") return "Pollock 3 Dobras";
      if (method === "durnin4") return "Durnin & Womersley 4 Dobras";
      if (method === "bioimpedance") return "Bioimpedância";
      if (method === "photo_only") return "Avaliação Fotográfica (Online)";
      return "Personalizado";
    };

    return (
      <div className="flex flex-col gap-[30px] animate-in fade-in slide-in-from-right-8 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-[15px]">
            <button
              onClick={() => setSelectedStudent(null)}
              className="p-[10px] bg-dark-card border border-dark-border hover:bg-white/[0.03] rounded-full text-[#999999] hover:text-white transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div
              className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-dark-bg group cursor-pointer shadow-2xl transition-transform hover:scale-105 active:scale-95"
              onClick={() => profilePicInputRef.current?.click()}
            >
              {selectedStudent.profilePicture ? (
                <img
                  src={selectedStudent.profilePicture}
                  alt={selectedStudent.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                  <User className="w-8 h-8 text-[#444]" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <input
              type="file"
              ref={profilePicInputRef}
              onChange={handleProfilePictureUpload}
              accept="image/*"
              className="hidden"
            />

            <div>
              <h1 className="text-[28px] sm:text-[32px] font-[300] tracking-[-1px] text-white leading-tight">
                {selectedStudent.name}
              </h1>
              <p className="text-[#999999] text-[13px] sm:text-[14px] mt-[2px] sm:mt-[5px]">
                Perfil e Histórico Físico Completo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                if (
                  confirm(
                    "ATENÇÃO: Tem certeza que deseja excluir DEFINITIVAMENTE este aluno e TODOS os seus dados (avaliações, anamnese, dietas, mensagens, etc)? Esta ação é irreversível.",
                  )
                ) {
                  const studentId = selectedStudent.id;
                  setSelectedStudent(null);
                  try {
                    await deleteStudent(studentId);
                    alert("Aluno e seus dados foram excluídos permanentemente com sucesso!");
                  } catch (err) {
                    alert("Erro ao excluir aluno. Por favor, tente novamente.");
                    console.error(err);
                  }
                }
              }}
              className="p-[10px] bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-500 rounded-[8px] transition-colors flex-shrink-0"
              title="Excluir Aluno"
            >
              <Trash className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="p-[10px] bg-primary/10 border border-primary/30 hover:bg-primary/20 text-primary rounded-[8px] transition-colors flex-shrink-0"
              title="Compartilhar Acesso ao Portal"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleGeneratePDF}
              className="flex items-center justify-center gap-2 bg-dark-card border border-dark-border hover:border-[#666] text-white px-[20px] py-[10px] rounded-[8px] transition-colors font-[500] text-[14px]"
            >
              <Download className="w-4 h-4" /> Exportar PDF
            </button>
            <button
              onClick={openEditStudentModal}
              className="flex items-center justify-center gap-2 bg-dark-card border border-dark-border hover:border-[#666] text-white px-[20px] py-[10px] rounded-[8px] transition-colors font-[500] text-[14px]"
            >
              <FileText className="w-4 h-4" /> Editar Perfil
            </button>
            <button
              onClick={() => {
                setShowAddEval(true);
                const initialPhotos = ["", "", ""];
                setPhotos(initialPhotos.map(url => ({ url, blob: null as any })));
              }}
              className="flex items-center justify-center gap-2 bg-primary/10 border border-primary hover:bg-primary/20 text-primary px-[20px] py-[10px] rounded-[8px] transition-colors font-[500] text-[14px]"
            >
              <Plus className="w-4 h-4" /> Nova Avaliação
            </button>
          </div>
        </div>

        {/* Navigation Tabs for Student Profile */}
        <div className="flex border-b border-dark-border gap-6 mb-2 overflow-x-auto whitespace-nowrap scrollbar-hide relative">
          <button
            onClick={() => setActiveViewTab("evo")}
            className={`pb-3 text-[13px] font-[600] uppercase tracking-[1.5px] relative transition-colors flex-shrink-0 ${activeViewTab === "evo" ? "text-primary" : "text-[#666] hover:text-[#999]"}`}
          >
            <div className="flex items-center gap-2 px-1">
              <TrendingUp className="w-4 h-4" /> Evolução & Fotos
            </div>
            {activeViewTab === "evo" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--color-primary)]"
              />
            )}
          </button>

          <button
            onClick={() => setActiveViewTab("anamnese")}
            className={`pb-3 text-[13px] font-[600] uppercase tracking-[1.5px] relative transition-colors flex-shrink-0 ${activeViewTab === "anamnese" ? "text-primary" : "text-[#666] hover:text-[#999]"}`}
          >
            <div className="flex items-center gap-2 px-1">
              <ClipboardList className="w-4 h-4" /> Anamnese Técnica
            </div>
            {activeViewTab === "anamnese" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--color-primary)]"
              />
            )}
          </button>

          <button
            onClick={() => setActiveViewTab("shape-ia")}
            className={`pb-3 text-[13px] font-[600] uppercase tracking-[1.5px] relative transition-colors flex-shrink-0 ${activeViewTab === "shape-ia" ? "text-primary" : "text-[#666] hover:text-[#999]"}`}
          >
            <div className="flex items-center gap-2 px-1">
              <Brain className="w-4 h-4 font-bold" /> Análise IA de Shape
            </div>
            {activeViewTab === "shape-ia" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--color-primary)]"
              />
            )}
          </button>
        </div>

        {/* Add Eval Modal */}
        {showAddEval && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 pb-24 sm:pb-4 backdrop-blur-sm">
            <div className="bg-dark-card border border-dark-border rounded-[16px] w-full max-w-4xl max-h-[85dvh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b border-dark-border gap-4 shrink-0 bg-dark-card">
                <h2 className="text-[20px] font-bold text-white">
                  Nova Avaliação Física Completa
                </h2>
                <div className="flex items-center gap-3">
                  <select
                    {...registerEval("method")}
                    className="bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white text-[13px] focus:outline-none focus:border-primary"
                  >
                    <option value="pollock7">Protocolo: Pollock 7 Dobras</option>
                    <option value="pollock3">Protocolo: Pollock 3 Dobras</option>
                    <option value="durnin4">
                      Protocolo: Durnin & Womersley 4 Dobras
                    </option>
                    <option value="bioimpedance">Protocolo: Bioimpedância</option>
                    <option value="photo_only">Protocolo: Apenas Fotos (Consultoria Online)</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowAddEval(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#999999] hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={onEvalSubmit(handleAddEval)}
                className="flex flex-col flex-1 min-h-0 overflow-hidden"
              >
                <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-[30px]">
                {/* Basic Metrics */}
                <div>
                  <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] mb-[15px] pb-[10px] border-b border-dark-border">
                    Dados Vitais
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Peso (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("weight", {
                          required: "Peso é obrigatório",
                          min: { value: 1, message: "Valor inválido" },
                        })}
                        className={`w-full bg-dark-bg border ${evalErrors.weight ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                      />
                      {evalErrors.weight && (
                        <span className="text-red-500 text-[10px] block mt-1">
                          {evalErrors.weight.message as string}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Altura (m)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...registerEval("height", {
                          required: "Altura é obrigatória",
                          min: { value: 0.5, message: "Valor inválido" },
                        })}
                        className={`w-full bg-dark-bg border ${evalErrors.height ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                      />
                      {evalErrors.height && (
                        <span className="text-red-500 text-[10px] block mt-1">
                          {evalErrors.height.message as string}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Protocol Depending Inputs */}
                {(() => {
                  if (activeMethod === "bioimpedance") {
                    return (
                      <div>
                        <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] mb-[15px] pb-[10px] border-b border-dark-border text-primary">
                          Leitura Bioimpedância
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                              % Gordura (BF)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              {...registerEval("bf", {
                                required: "BF é obrigatório",
                                min: { value: 0.1, message: "Valor inválido" },
                              })}
                              className={`w-full bg-dark-bg border ${evalErrors.bf ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                            />
                            {evalErrors.bf && (
                              <span className="text-red-500 text-[10px] block mt-1">
                                {evalErrors.bf.message as string}
                              </span>
                            )}
                          </div>
                          <div>
                            <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                              Gordura Visceral
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              {...registerEval("visceralFat")}
                              className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white placeholder:text-[#666]"
                              placeholder="Opcional"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (activeMethod === "photo_only") return null;

                  let activeFolds: string[] = [];
                  if (activeMethod === "pollock7")
                    activeFolds = [
                      "peitoral",
                      "axilar",
                      "triciptal",
                      "subescapular",
                      "abdominal",
                      "suprailiaca",
                      "coxa",
                    ];
                  else if (activeMethod === "pollock3")
                    activeFolds =
                      selectedStudent.gender === "M"
                        ? ["peitoral", "abdominal", "coxa"]
                        : ["triciptal", "suprailiaca", "coxa"];
                  else if (activeMethod === "durnin4")
                    activeFolds = [
                      "bicipital",
                      "triciptal",
                      "subescapular",
                      "suprailiaca",
                    ];

                  const foldLabels: Record<string, string> = {
                    peitoral: "Peitoral",
                    axilar: "Axilar",
                    triciptal: "Tríceps",
                    subescapular: "Dorsal",
                    abdominal: "Abdômen",
                    suprailiaca: "Suprailíaca",
                    coxa: "Coxa",
                    bicipital: "Bíceps",
                  };

                  return (
                    <div>
                      <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] mb-[15px] pb-[10px] border-b border-dark-border text-primary">
                        Dobras Cutâneas (mm)
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {activeFolds.map((fold) => (
                          <div key={fold}>
                            <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                              {foldLabels[fold] || fold}
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              {...registerEval(fold as any, {
                                required: "Obrigatório",
                              })}
                              className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white placeholder:text-[#666]"
                              placeholder="0.0"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Circumferences */}
                <div>
                  <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] mb-[15px] pb-[10px] border-b border-dark-border">
                    Perimetria / Circunferências (cm)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[
                      { key: "shoulder", label: "Ombro" },
                      { key: "chest", label: "Tórax" },
                      { key: "waist", label: "Cintura" },
                      { key: "abdomen", label: "Abdômen" },
                      { key: "hip", label: "Quadril" },
                      { key: "rightArm", label: "Braço Dir." },
                      { key: "leftArm", label: "Braço Esq." },
                      { key: "rightThigh", label: "Coxa Dir." },
                      { key: "leftThigh", label: "Coxa Esq." },
                      { key: "rightCalf", label: "Pant. Dir." },
                      { key: "leftCalf", label: "Pant. Esq." },
                    ].map((circ) => (
                      <div key={circ.key}>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          {circ.label}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerEval(circ.key as any)}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] mb-[15px] pb-[10px] border-b border-dark-border flex items-center justify-between">
                    <span>Registros Fotográficos</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {["Frente", "Costas", "Perfil"].map((label, i) => (
                      <div key={label} className="flex flex-col items-center">
                        <input
                          type="file"
                          id={`photo-upload-${i}`}
                          className="hidden"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const compressed = await compressImageToBlob(file);
                            setPhotos((prev) => {
                              const newArr = [...prev];
                              while (newArr.length <= i)
                                newArr.push({ url: "", blob: new Blob() });
                              newArr[i] = compressed;
                              return newArr;
                            });
                          }}
                        />
                        <div
                          onClick={() =>
                            document
                              .getElementById(`photo-upload-${i}`)
                              ?.click()
                          }
                          className={`w-full aspect-[3/4] rounded-[8px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition-colors ${photos[i]?.url ? "border-primary bg-black" : "border-dark-border bg-dark-bg hover:border-primary/50"}`}
                        >
                          {photos[i]?.url ? (
                            <>
                              <img
                                src={photos[i].url}
                                alt={label}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPhotos((prev) => {
                                    const newArr = [...prev];
                                    newArr[i] = { url: "", blob: new Blob() };
                                    return newArr;
                                  });
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <div className="text-center p-4">
                              <Camera className="w-6 h-6 text-[#666] mx-auto mb-2" />
                              <p className="text-[12px] text-[#999]">{label}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-[8px] p-3 flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-[12px] text-[#999] leading-relaxed">
                      Faça o upload organizando pelas posições corretas para
                      garantir que o <strong>Analisador de Shape IA</strong>{" "}
                      consiga avaliar a simetria com maior precisão.
                    </p>
                  </div>
                </div>

                </div>

                <div className="shrink-0 sticky bottom-0 bg-dark-card border-t border-dark-border p-4 flex justify-end gap-3 z-10">
                  <button
                    type="button"
                    onClick={() => setShowAddEval(false)}
                    className="px-4 py-2 text-[#999999] hover:text-white transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-[8px] transition-colors font-bold shadow-lg"
                  >
                    Salvar Avaliação
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEditEval && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 pb-24 sm:pb-4 backdrop-blur-sm">
            <div className="bg-dark-card border border-dark-border rounded-[16px] w-full max-w-4xl max-h-[85dvh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b border-dark-border gap-4 shrink-0 bg-dark-card">
                <h2 className="text-[20px] font-bold text-white">
                  Editar Avaliação Física
                </h2>
                <div className="flex items-center gap-3">
                  <select
                    {...registerEval("method")}
                    className="bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white text-[13px] focus:outline-none focus:border-primary"
                  >
                    <option value="pollock7">Protocolo: Pollock 7 Dobras</option>
                    <option value="pollock3">Protocolo: Pollock 3 Dobras</option>
                    <option value="durnin4">
                      Protocolo: Durnin & Womersley 4 Dobras
                    </option>
                    <option value="bioimpedance">Protocolo: Bioimpedância</option>
                    <option value="photo_only">Protocolo: Apenas Fotos (Consultoria Online)</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowEditEval(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#999] hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={onEvalSubmit(handleUpdateEval)}
                className="flex flex-col flex-1 min-h-0 overflow-hidden"
              >
                <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-[30px]">
                <div>
                  <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] mb-[15px] pb-[10px] border-b border-dark-border">
                    Dados Vitais
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Peso (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("weight", { required: true })}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Altura (m)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...registerEval("height", { required: true })}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {watchEval("method") === "bioimpedance" ? (
                  <div className="bg-dark-bg/50 p-6 rounded-[12px] border border-dark-border">
                    <div className="flex items-center gap-3 mb-[20px]">
                      <Activity className="w-5 h-5 text-primary" />
                      <h3 className="text-white font-[600] uppercase tracking-[1px] text-[14px]">
                        Bioimpedância
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          % Gordura Corporal (BF)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerEval("bf")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Gordura Visceral
                        </label>
                        <input
                          type="number"
                          step="1"
                          {...registerEval("visceralFat")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                ) : watchEval("method") !== "photo_only" ? (
                  <div className="bg-dark-bg/50 p-6 rounded-[12px] border border-dark-border">
                    <div className="flex items-center gap-3 mb-[20px]">
                      <Activity className="w-5 h-5 text-primary" />
                      <h3 className="text-white font-[600] uppercase tracking-[1px] text-[14px]">
                        Dobras Cutâneas (mm)
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(watchEval("method") === "pollock7" ||
                        watchEval("method") === "pollock3" ||
                        watchEval("method") === "durnin4") && (
                        <>
                          {(watchEval("method") === "pollock7" ||
                            watchEval("method") === "pollock3") && (
                            <div>
                              <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                                Peitoral
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                {...registerEval("peitoral")}
                                className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                              />
                            </div>
                          )}
                          {watchEval("method") === "pollock7" && (
                            <div>
                              <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                                Axilar Média
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                {...registerEval("axilar")}
                                className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                              />
                            </div>
                          )}
                          {(watchEval("method") === "pollock7" ||
                            watchEval("method") === "pollock3" ||
                            watchEval("method") === "durnin4") && (
                            <div>
                              <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                                Triciptal
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                {...registerEval("triciptal")}
                                className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                              />
                            </div>
                          )}
                          {(watchEval("method") === "pollock7" ||
                            watchEval("method") === "pollock3" ||
                            watchEval("method") === "durnin4") && (
                            <div>
                              <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                                Subescapular
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                {...registerEval("subescapular")}
                                className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                              />
                            </div>
                          )}
                          {(watchEval("method") === "pollock7" ||
                            watchEval("method") === "pollock3") && (
                            <div>
                              <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                                Abdominal
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                {...registerEval("abdominal")}
                                className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                              />
                            </div>
                          )}
                          {(watchEval("method") === "pollock7" ||
                            watchEval("method") === "pollock3" ||
                            watchEval("method") === "durnin4") && (
                            <div>
                              <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                                Suprailíaca
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                {...registerEval("suprailiaca")}
                                className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                              />
                            </div>
                          )}
                          {(watchEval("method") === "pollock7" ||
                            watchEval("method") === "pollock3") && (
                            <div>
                              <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                                Coxa
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                {...registerEval("coxa")}
                                className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                              />
                            </div>
                          )}
                          {watchEval("method") === "durnin4" && (
                            <>
                              <div>
                                <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                                  Bicipital
                                </label>
                                <input
                                  type="number"
                                  step="0.1"
                                  {...registerEval("bicipital")}
                                  className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                                />
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="bg-dark-bg/50 p-6 rounded-[12px] border border-dark-border">
                  <div className="flex items-center gap-3 mb-[20px]">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-white font-[600] uppercase tracking-[1px] text-[14px]">
                      Registros Fotográficos
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {["Frente", "Costas", "Perfil"].map((label, i) => (
                      <div key={label} className="flex flex-col items-center">
                        <input
                          type="file"
                          id={`edit-photo-upload-${i}`}
                          className="hidden"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const compressed = await compressImageToBlob(file);
                            setPhotos((prev) => {
                              const newArr = [...prev];
                              while (newArr.length <= i)
                                newArr.push({ url: "", blob: new Blob() });
                              newArr[i] = compressed;
                              return newArr;
                            });
                          }}
                        />
                        <div
                          onClick={() =>
                            document
                              .getElementById(`edit-photo-upload-${i}`)
                              ?.click()
                          }
                          className={`w-full aspect-[3/4] rounded-[8px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition-colors ${photos[i]?.url ? "border-primary bg-black" : "border-dark-border bg-dark-bg hover:border-primary/50"}`}
                        >
                          {photos[i]?.url ? (
                            <>
                              <img
                                src={photos[i].url}
                                alt={label}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold uppercase">Trocar Foto</span>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center text-[#666]">
                              <Camera className="w-8 h-8 mb-2" />
                              <span className="text-[11px] uppercase font-bold tracking-wider">{label}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-dark-bg/50 p-6 rounded-[12px] border border-dark-border">
                  <div className="flex items-center gap-3 mb-[20px]">
                    <Utensils className="w-5 h-5 text-primary" />
                    <h3 className="text-white font-[600] uppercase tracking-[1px] text-[14px]">
                      Perimetria (cm)
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Ombro
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("shoulder")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Tórax
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("chest")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Cintura
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("waist")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Abdômen
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("abdomen")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Quadril
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("hip")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Braço Dir.
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("rightArm")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Braço Esq.
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("leftArm")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Coxa Dir.
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("rightThigh")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Coxa Esq.
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("leftThigh")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Panturilha Dir.
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("rightCalf")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                        Panturilha Esq.
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...registerEval("leftCalf")}
                        className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                </div>

                <div className="shrink-0 sticky bottom-0 bg-dark-card border-t border-dark-border p-4 flex justify-end gap-3 z-10">
                  <button
                    type="button"
                    onClick={() => setShowEditEval(false)}
                    className="px-4 py-2 text-[#999999] hover:text-white transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-[8px] transition-colors flex items-center gap-2 font-bold shadow-lg"
                  >
                    {isPhotoUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Atualizar Avaliação
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab Content Rendering */}
        <AnimatePresence mode="wait">
          {activeViewTab === "evo" && (
            <motion.div
              key="evo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-[30px]"
            >
              <div className="grid lg:grid-cols-3 gap-[25px]">
                <div className="rounded-[16px] bg-dark-card border border-dark-border p-[25px]">
                  <h2 className="text-[13px] text-[#999999] uppercase tracking-[0.5px] mb-[20px] flex justify-between items-center">
                    <span>Dados Cadastrais</span>
                    <button
                      onClick={() => {
                        const url = new URL(window.location.origin);
                        url.searchParams.set("student", "true");
                        // we don't automatically login with email because they need google auth.
                        navigator.clipboard.writeText(url.toString());
                        alert("Link do Portal copiado! Envie para o aluno.");
                      }}
                      className="flex items-center gap-1.5 text-primary hover:text-primary-hover bg-primary/10 px-2 py-1 rounded-[6px] transition-colors"
                      title="Copiar Link de Acesso do Aluno"
                    >
                      <Link className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-[600] uppercase tracking-[0.5px]">
                        Link Portal
                      </span>
                    </button>
                  </h2>
                  <div className="space-y-[15px] text-[14px]">
                    <div className="flex justify-between border-b border-dark-border pb-[10px]">
                      <span className="text-[#999999]">Idade</span>
                      <span className="text-white font-[500]">
                        {selectedStudent.age} anos
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-dark-border pb-[10px]">
                      <span className="text-[#999999]">Sexo</span>
                      <span className="text-white font-[500]">
                        {selectedStudent.gender === "M"
                          ? "Masculino"
                          : "Feminino"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-dark-border pb-[10px]">
                      <span className="text-[#999999]">Nível Ativ.</span>
                      <span className="text-white font-[500]">
                        Fator {selectedStudent.activityLevel}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-dark-border pb-[10px]">
                      <span className="text-[#999999]">Objetivo</span>
                      <span className="text-primary font-[500]">
                        {selectedStudent.objective}
                      </span>
                    </div>
                    {selectedStudent.email && (
                      <div className="flex justify-between border-b border-dark-border pb-[10px]">
                        <span className="text-[#999999]">E-mail</span>
                        <span
                          className="text-white font-[500] truncate max-w-[150px]"
                          title={selectedStudent.email}
                        >
                          {selectedStudent.email}
                        </span>
                      </div>
                    )}
                    {selectedStudent.phone && (
                      <div className="flex justify-between border-b border-dark-border pb-[10px]">
                        <span className="text-[#999999]">Telefone</span>
                        <span className="text-white font-[500]">
                          {selectedStudent.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 rounded-[16px] bg-dark-card border border-dark-border p-[25px]">
                  <h2 className="text-[13px] text-[#999999] uppercase tracking-[0.5px] mb-[20px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      Evolução - Histórico ({evolutionData.length} registros)
                      {evolutionData.length > 0 && (
                        <button
                          onClick={handleDeleteAllEvaluations}
                          className="ml-2 text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 px-2 py-0.5 rounded transition-colors"
                          title="Apagar definitivamente todo histórico de avaliações"
                        >
                          Zerar Histórico
                        </button>
                      )}
                    </span>
                    {evolutionData.length >= 2 && (
                      <div className="flex bg-dark-bg border border-dark-border rounded-[8px] p-1">
                        {["3M", "6M", "1Y", "ALL"].map((tf) => (
                          <button
                            key={tf}
                            onClick={() => setChartTimeframe(tf as any)}
                            className={`text-[11px] px-3 py-1 rounded-[4px] transition-colors ${
                              chartTimeframe === tf
                                ? "bg-primary text-white font-[600]"
                                : "text-[#666] hover:text-[#999]"
                            }`}
                          >
                            {tf === "ALL" ? "Tudo" : tf}
                          </button>
                        ))}
                      </div>
                    )}
                  </h2>

                  {evolutionData.length < 2 ? (
                    <div className="h-[180px] flex items-center justify-center border border-dashed border-dark-border rounded-[12px] text-[#999999] text-[14px]">
                      Realize pelo menos duas avaliações para visualizar o
                      gráfico de evolução do aluno.
                    </div>
                  ) : (
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={evolutionData}
                          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorBf"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#00D1FF"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#00D1FF"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorWeight"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#00FF85"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#00FF85"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorLean"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#9b59b6"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#9b59b6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="date"
                            stroke="#999999"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            yAxisId="kg"
                            stroke="#999999"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={["dataMin - 2", "dataMax + 2"]}
                          />
                          <YAxis
                            yAxisId="percent"
                            orientation="right"
                            stroke="#00D1FF"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, "dataMax + 5"]}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#111111",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                            }}
                            itemStyle={{ fontSize: "13px", paddingTop: "4px" }}
                          />
                          <Area
                            yAxisId="percent"
                            type="monotone"
                            dataKey="bf"
                            name="Gordura (%)"
                            stroke="#00D1FF"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorBf)"
                            connectNulls={true}
                          />
                          <Area
                            yAxisId="kg"
                            type="monotone"
                            dataKey="weight"
                            name="Peso Total (kg)"
                            stroke="#00FF85"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorWeight)"
                            connectNulls={true}
                          />
                          <Area
                            yAxisId="kg"
                            type="monotone"
                            dataKey="leanMass"
                            name="Massa Magra (kg)"
                            stroke="#9b59b6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorLean)"
                            connectNulls={true}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {evolutionData.length >= 2 && (
                    <div className="mt-[30px] border-t border-dark-border pt-[20px]">
                      <h3 className="text-[14px] text-white font-[500] mb-[15px] uppercase tracking-[1px]">
                        Progressão de Peso
                      </h3>
                      <div className="h-[150px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={evolutionData}
                            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id="colorWeightOnly"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#00FF85"
                                  stopOpacity={0.2}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#00FF85"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.05)"
                              vertical={false}
                            />
                            <XAxis dataKey="date" hide />
                            <YAxis
                              stroke="#999999"
                              fontSize={11}
                              tickLine={false}
                              axisLine={false}
                              domain={["dataMin - 1", "dataMax + 1"]}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#111111",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                              }}
                              itemStyle={{ fontSize: "12px" }}
                            />
                            <Area
                              type="monotone"
                              dataKey="weight"
                              name="Peso (kg)"
                              stroke="#00FF85"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#colorWeightOnly)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {evolutionData.length >= 2 && (
                    <div className="mt-[30px] border-t border-dark-border pt-[30px]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-[20px]">
                        <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" />{" "}
                          Análise Comparativa Especializada
                        </h3>
                        <div className="flex bg-dark-bg border border-dark-border rounded-[8px] p-1 gap-1">
                          <select
                            value={compareAId}
                            onChange={(e) => setCompareAId(e.target.value)}
                            className="bg-transparent border-none rounded-[4px] px-2 py-1 text-[11px] text-white focus:outline-none hover:bg-white/[0.05] cursor-pointer"
                          >
                            {evolutionData.map((ev) => (
                              <option
                                key={`a-${ev.id}`}
                                value={ev.id}
                                className="bg-dark-card"
                              >
                                {new Date(ev.evalDate).toLocaleDateString(
                                  "pt-BR",
                                )}{" "}
                                ({ev.weight}kg)
                              </option>
                            ))}
                          </select>
                          <div className="w-[1px] bg-dark-border self-stretch" />
                          <select
                            value={compareBId}
                            onChange={(e) => setCompareBId(e.target.value)}
                            className="bg-transparent border-none rounded-[4px] px-2 py-1 text-[11px] text-white focus:outline-none hover:bg-white/[0.05] cursor-pointer"
                          >
                            {evolutionData.map((ev) => (
                              <option
                                key={`b-${ev.id}`}
                                value={ev.id}
                                className="bg-dark-card"
                              >
                                {new Date(ev.evalDate).toLocaleDateString(
                                  "pt-BR",
                                )}{" "}
                                ({ev.weight}kg)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {compareAId && compareBId && (
                        <div className="grid gap-[15px]">
                          <div className="overflow-hidden border border-dark-border rounded-[12px] bg-dark-bg/50">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-white/[0.02] border-b border-dark-border">
                                  <th className="py-3 px-4 text-[11px] text-[#666] uppercase tracking-[1px] font-[600]">
                                    Indicador
                                  </th>
                                  <th className="py-3 px-4 text-[11px] text-[#666] uppercase tracking-[1px] font-[600] text-center">
                                    De (
                                    {new Date(
                                      evolutionData.find(
                                        (e) => e.id === compareAId,
                                      )?.evalDate || "",
                                    ).toLocaleDateString("pt-BR")}
                                    )
                                  </th>
                                  <th className="py-3 px-4 text-[11px] text-[#666] uppercase tracking-[1px] font-[600] text-center">
                                    Para (
                                    {new Date(
                                      evolutionData.find(
                                        (e) => e.id === compareBId,
                                      )?.evalDate || "",
                                    ).toLocaleDateString("pt-BR")}
                                    )
                                  </th>
                                  <th className="py-3 px-4 text-[11px] text-[#666] uppercase tracking-[1px] font-[600] text-right">
                                    Variação Real
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-dark-border/50">
                                {(() => {
                                  const evalA = evolutionData.find(
                                    (e) => e.id === compareAId,
                                  );
                                  const evalB = evolutionData.find(
                                    (e) => e.id === compareBId,
                                  );
                                  if (!evalA || !evalB) return null;

                                  const metrics = [
                                    {
                                      label: "Peso Corporal Total",
                                      key: "weight",
                                      unit: " kg",
                                      type: "weight",
                                    },
                                    {
                                      label: "Percentual de Gordura",
                                      key: "bf",
                                      unit: "%",
                                      type: "bf",
                                    },
                                    {
                                      label: "Massa Magra",
                                      key: "leanMass",
                                      unit: " kg",
                                      type: "muscle",
                                    },
                                    {
                                      label: "Massa Gorda",
                                      key: "fatMass",
                                      unit: " kg",
                                      type: "bf",
                                    },
                                    {
                                      label: "Tórax",
                                      key: "chest",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Ombro",
                                      key: "shoulder",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Cintura",
                                      key: "waist",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Abdômen",
                                      key: "abdomen",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Quadril",
                                      key: "hip",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Braço Direito",
                                      key: "rightArm",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Braço Esquerdo",
                                      key: "leftArm",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Coxa Direita",
                                      key: "rightThigh",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Coxa Esquerda",
                                      key: "leftThigh",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Panturrilha Dir.",
                                      key: "rightCalf",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                    {
                                      label: "Panturrilha Esq.",
                                      key: "leftCalf",
                                      unit: " cm",
                                      type: "measure",
                                    },
                                  ];

                                  const getValue = (ev: any, key: string) => {
                                    if (key === "weight") return ev.weight;
                                    if (key === "bf") return ev.method === 'photo_only' ? null : ev.metrics?.bf;
                                    if (key === "leanMass")
                                      return ev.method === 'photo_only' ? null : ev.metrics?.leanMass;
                                    if (key === "fatMass")
                                      return ev.method === 'photo_only' ? null : ev.metrics?.fatMass;
                                    if (key === "waist")
                                      return ev.circumferences?.waist;
                                    if (key === "abdomen")
                                      return ev.circumferences?.abdomen;
                                    if (key === "hip")
                                      return ev.circumferences?.hip;
                                    if (key === "chest")
                                      return ev.circumferences?.chest;
                                    if (key === "shoulder")
                                      return ev.circumferences?.shoulder;
                                    if (key === "rightArm")
                                      return ev.circumferences?.rightArm;
                                    if (key === "leftArm")
                                      return ev.circumferences?.leftArm;
                                    if (key === "rightThigh")
                                      return ev.circumferences?.rightThigh;
                                    if (key === "leftThigh")
                                      return ev.circumferences?.leftThigh;
                                    if (key === "rightCalf")
                                      return ev.circumferences?.rightCalf;
                                    if (key === "leftCalf")
                                      return ev.circumferences?.leftCalf;
                                    return 0;
                                  };

                                  return metrics.map((m) => {
                                    const valA =
                                      Number(getValue(evalA, m.key)) || 0;
                                    const valB =
                                      Number(getValue(evalB, m.key)) || 0;
                                    if (valA === 0 && valB === 0) return null;

                                    const diff = valB - valA;
                                    const isPositive = diff > 0;

                                    let diffColor = "text-[#666]";
                                    let TrendIcon = null;

                                    if (diff !== 0) {
                                      if (
                                        m.key === "bf" ||
                                        m.key === "waist" ||
                                        m.key === "abdomen"
                                      ) {
                                        diffColor = isPositive
                                          ? "text-red-500 bg-red-500/5"
                                          : "text-[#00FF85] bg-[#00FF85]/5";
                                      } else if (m.key === "leanMass") {
                                        diffColor = isPositive
                                          ? "text-[#00FF85] bg-[#00FF85]/5"
                                          : "text-red-500 bg-red-500/5";
                                      } else {
                                        diffColor = isPositive
                                          ? "text-primary bg-primary/5"
                                          : "text-[#00D1FF] bg-[#00D1FF]/5";
                                      }
                                    }

                                    return (
                                      <tr
                                        key={m.key}
                                        className="hover:bg-white/[0.01] transition-colors group"
                                      >
                                        <td className="py-3 px-4 text-[13px] text-white font-[500]">
                                          {m.label}
                                        </td>
                                        <td className="py-3 px-4 text-[14px] text-[#999] text-center">
                                          {valA.toFixed(1)}
                                          {m.unit}
                                        </td>
                                        <td className="py-3 px-4 text-[14px] text-white text-center font-[500]">
                                          {valB.toFixed(1)}
                                          {m.unit}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                          <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-[600] ${diffColor}`}
                                          >
                                            {diff > 0 ? "+" : ""}
                                            {diff.toFixed(1)}
                                            {m.unit}
                                            {diff !== 0 && (
                                              <span className="text-[10px]">
                                                {isPositive ? "▲" : "▼"}
                                              </span>
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  });
                                })()}
                              </tbody>
                            </table>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-[12px]">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                              <Info className="w-5 h-5" />
                            </div>
                            <p className="text-[12px] text-primary/80 leading-relaxed italic">
                              Dica técnica: Valores em{" "}
                              <span className="text-[#00FF85] font-[700] underline">
                                verde
                              </span>{" "}
                              indicam progresso positivo conforme o objetivo
                              (redução de BF ou ganho de massa). Diferenças
                              significativas em perímetros indicam hipertrofia
                              ou redução de tecido adiposo localizado.
                            </p>
                          </div>

                          {/* Removed old nested photo comparison to add new separate section */}
                        </div>
                      )}
                    </div>
                  )}

                  {evolutionData.length >= 2 && (
                    <div className="mt-[30px] border-t border-dark-border pt-[30px]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-[20px]">
                        <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-primary" />{" "}
                          Comparativo Visual (Antes & Depois)
                        </h3>
                        <div className="flex bg-dark-bg border border-dark-border rounded-[8px] p-1 gap-1">
                          <select
                            value={photoCompareA}
                            onChange={(e) => setPhotoCompareA(e.target.value)}
                            className="bg-transparent border-none rounded-[4px] px-2 py-1 text-[11px] text-white focus:outline-none hover:bg-white/[0.05] cursor-pointer"
                          >
                            {evolutionData.map((ev) => (
                              <option
                                key={`pa-${ev.id}`}
                                value={ev.id}
                                className="bg-dark-card"
                              >
                                {new Date(ev.evalDate).toLocaleDateString(
                                  "pt-BR",
                                )}{" "}
                                ({ev.weight}kg)
                              </option>
                            ))}
                          </select>
                          <div className="w-[1px] bg-dark-border self-stretch" />
                          <select
                            value={photoCompareB}
                            onChange={(e) => setPhotoCompareB(e.target.value)}
                            className="bg-transparent border-none rounded-[4px] px-2 py-1 text-[11px] text-white focus:outline-none hover:bg-white/[0.05] cursor-pointer"
                          >
                            {evolutionData.map((ev) => (
                              <option
                                key={`pb-${ev.id}`}
                                value={ev.id}
                                className="bg-dark-card"
                              >
                                {new Date(ev.evalDate).toLocaleDateString(
                                  "pt-BR",
                                )}{" "}
                                ({ev.weight}kg)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {(() => {
                        const evalA = selectedStudent.evaluations.find(
                          (e) => e.id === photoCompareA,
                        );
                        const evalB = selectedStudent.evaluations.find(
                          (e) => e.id === photoCompareB,
                        );

                        if (!evalA || !evalB) return null;

                        const photosA = evalA.photos || [];
                        const photosB = evalB.photos || [];
                        const maxPhotos = Math.max(
                          photosA.length,
                          photosB.length,
                        );

                        if (maxPhotos === 0) {
                          return (
                            <div className="bg-dark-bg/50 border border-dark-border border-dashed rounded-[12px] p-[40px] text-center text-[#666]">
                              <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-20" />
                              <p className="text-[14px]">
                                Nenhuma foto disponível para comparação entre
                                estas datas.
                              </p>
                            </div>
                          );
                        }

                        return (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[0, 1, 2].map((idx) => {
                              let viewLabel = "";
                              if (idx === 0) viewLabel = "Frontal (Frente)";
                              if (idx === 1) viewLabel = "Posterior (Costas)";
                              if (idx === 2) viewLabel = "Lateral (Perfil)";

                              const hasPhotoA = !!photosA[idx];
                              const hasPhotoB = !!photosB[idx];

                              if (!hasPhotoA && !hasPhotoB) return null; // Only show if at least one photo exists for this view

                              return (
                                <div key={idx} className="space-y-3">
                                  <div className="flex items-center justify-between px-1">
                                    <span className="text-[10px] text-primary uppercase tracking-[1px] font-[700] flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                                      {viewLabel}
                                    </span>
                                    <div className="flex gap-4">
                                      <span className="text-[10px] text-[#666]">
                                        {new Date(
                                          evalA.date,
                                        ).toLocaleDateString("pt-BR")}
                                      </span>
                                      <span className="text-[10px] text-primary">
                                        {new Date(
                                          evalB.date,
                                        ).toLocaleDateString("pt-BR")}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 bg-dark-bg p-2 rounded-[12px] border border-dark-border">
                                    <div className="aspect-[3/4] rounded-[8px] overflow-hidden bg-black border border-dark-border relative group">
                                      {hasPhotoA ? (
                                        <img
                                          src={photosA[idx]}
                                          alt="Antes"
                                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                          referrerPolicy="no-referrer"
                                          crossOrigin="anonymous"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-[#333] text-[11px]">
                                          <ImageIcon className="w-6 h-6 mb-1 opacity-20" />
                                          <span>Sem foto</span>
                                        </div>
                                      )}
                                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[9px] text-white font-[600]">
                                        ANTES
                                      </div>
                                    </div>
                                    <div className="aspect-[3/4] rounded-[8px] overflow-hidden bg-black border border-dark-border relative group">
                                      {hasPhotoB ? (
                                        <img
                                          src={photosB[idx]}
                                          alt="Depois"
                                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                          referrerPolicy="no-referrer"
                                          crossOrigin="anonymous"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-[#333] text-[11px]">
                                          <ImageIcon className="w-6 h-6 mb-1 opacity-20" />
                                          <span>Sem foto</span>
                                        </div>
                                      )}
                                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-primary/70 backdrop-blur-md rounded text-[9px] text-white font-[600]">
                                        DEPOIS
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {selectedStudent.evaluations && selectedStudent.evaluations.length > 0 && (
                    <div className="mt-[30px] border-t border-dark-border pt-[30px]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-[20px]">
                        <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-primary" /> Galeria
                          de Fotos por Avaliação
                        </h3>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <select
                            value={galleryEvalId}
                            onChange={(e) => setGalleryEvalId(e.target.value)}
                            className="flex-1 bg-dark-bg border border-dark-border rounded-[8px] px-3 py-1.5 text-[12px] text-white focus:outline-none focus:border-primary cursor-pointer w-full sm:w-auto"
                          >
                            {(selectedStudent.evaluations || []).map((ev) => (
                              <option
                                key={`gallery-${ev.id}`}
                                value={ev.id}
                                className="bg-dark-card"
                              >
                                {new Date(ev.date).toLocaleDateString("pt-BR")}{" "}
                                - {ev.weight}kg
                              </option>
                            ))}
                          </select>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditEvalModal(galleryEvalId)}
                              className="p-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/50 rounded-[8px] transition-all flex-shrink-0"
                              title="Editar Avaliação"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteEvaluation(galleryEvalId)
                              }
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 hover:border-red-500/50 rounded-[8px] transition-all flex-shrink-0"
                              title="Excluir Avaliação"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {(() => {
                        const galleryEval = selectedStudent.evaluations.find(
                          (e) => e.id === galleryEvalId,
                        );
                        if (
                          !galleryEval ||
                          !galleryEval.photos ||
                          galleryEval.photos.length === 0
                        ) {
                          return (
                            <div className="bg-dark-bg/50 border border-dark-border rounded-[12px] p-[40px] flex flex-col items-center justify-center text-center text-[#666]">
                              <ImageIcon className="w-10 h-10 mb-3 opacity-20" />
                              <p className="text-[14px]">
                                Nenhuma foto registrada nesta avaliação.
                              </p>
                              <p className="text-[12px] mt-1 opacity-70">
                                Fotos ajudam a documentar a evolução visual do
                                aluno.
                              </p>
                            </div>
                          );
                        }

                        return (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[0, 1, 2].map((idx) => {
                              const photo = galleryEval.photos?.[idx] || "";
                              const viewLabel = [
                                "Frontal (Frente)",
                                "Posterior (Costas)",
                                "Lateral (Perfil)",
                              ][idx];

                              return (
                                <div key={idx} className="flex flex-col">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] text-[#999] uppercase tracking-[1px]">
                                      {viewLabel}
                                    </span>
                                    {photo && (
                                      <div className="flex gap-1">
                                        {idx > 0 && (
                                          <button
                                            onClick={() =>
                                              handleSwapPhotos(
                                                galleryEvalId,
                                                idx,
                                                idx - 1,
                                              )
                                            }
                                            className="p-1 hover:bg-dark-border rounded text-[#999] hover:text-white transition-colors"
                                            title="Mover para esquerda"
                                          >
                                            <ArrowLeft className="w-3.5 h-3.5" />
                                          </button>
                                        )}
                                        {idx < 2 && (
                                          <button
                                            onClick={() =>
                                              handleSwapPhotos(
                                                galleryEvalId,
                                                idx,
                                                idx + 1,
                                              )
                                            }
                                            className="p-1 hover:bg-dark-border rounded text-[#999] hover:text-white transition-colors"
                                            title="Mover para direita"
                                          >
                                            <ArrowRight className="w-3.5 h-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    id={`edit-photo-${idx}`}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      if (e.target.files?.[0])
                                        handleUpdateEvaluationPhoto(
                                          galleryEvalId,
                                          idx,
                                          e.target.files[0],
                                        );
                                    }}
                                  />

                                  {photo ? (
                                    <div className="relative group rounded-[12px] overflow-hidden border border-dark-border aspect-[3/4] bg-black shadow-sm">
                                      <img
                                        src={photo}
                                        alt={viewLabel}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                                        <button
                                          onClick={() =>
                                            setFullScreenPhoto(photo)
                                          }
                                          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-transform hover:scale-110"
                                          title="Ver Ampliada"
                                        >
                                          <Search className="w-5 h-5" />
                                        </button>
                                        <button
                                          onClick={() =>
                                            document
                                              .getElementById(
                                                `edit-photo-${idx}`,
                                              )
                                              ?.click()
                                          }
                                          className="p-3 bg-primary text-white rounded-full transition-transform hover:scale-110 shadow-lg"
                                          title="Alterar Foto"
                                        >
                                          <Camera className="w-5 h-5" />
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleUpdateEvaluationPhoto(
                                              galleryEvalId,
                                              idx,
                                              null,
                                            )
                                          }
                                          className="p-3 bg-red-500 text-white rounded-full transition-transform hover:scale-110 shadow-lg"
                                          title="Excluir Foto"
                                        >
                                          <Trash className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        document
                                          .getElementById(`edit-photo-${idx}`)
                                          ?.click()
                                      }
                                      className="aspect-[3/4] rounded-[12px] border-2 border-dashed border-dark-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-dark-bg group relative overflow-hidden"
                                    >
                                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      <Camera className="w-8 h-8 text-[#666] mx-auto mb-2 opacity-50 group-hover:text-primary group-hover:opacity-100 transition-colors" />
                                      <p className="text-[12px] text-[#999] group-hover:text-primary transition-colors">
                                        Adicionar Foto
                                      </p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>

              {/* Latest Evaluation Detailed Area */}
              {latestEval && (
                <div className="rounded-[16px] bg-dark-card border border-dark-border p-[30px] relative">
                  <div className="absolute top-[30px] right-[30px] flex gap-2">
                    <button
                      onClick={() => openEditEvalModal(latestEval.id)}
                      className="flex items-center gap-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary px-4 py-2 rounded-[8px] transition-all text-[12px] font-[500]"
                    >
                      <Edit2 className="w-4 h-4" /> Editar
                    </button>
                    <button
                      onClick={() => handleDeleteEvaluation(latestEval.id)}
                      className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-[8px] transition-all text-[12px] font-[500]"
                    >
                      <Trash className="w-4 h-4" /> Excluir
                    </button>
                  </div>
                  <h2 className="text-[16px] text-white font-[600] uppercase tracking-[1px] mb-[25px] flex flex-col md:flex-row md:items-center justify-between pb-[15px] border-b border-dark-border gap-3 pr-[180px]">
                    <div className="flex items-center gap-3">
                      <span>Composição Corporal Atual</span>
                      <span className="text-[#999999] text-[10px] border border-dark-border px-[8px] py-[3px] rounded-full uppercase tracking-[0.5px]">
                        {getMethodLabel(latestEval.method)}
                      </span>
                    </div>
                    <span className="text-primary text-[14px] normal-case bg-primary/10 px-[15px] py-[5px] rounded-[20px] self-start md:self-auto">
                      Avaliado em:{" "}
                      {new Date(latestEval.date).toLocaleDateString("pt-BR")}
                    </span>
                  </h2>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-[30px]">
                    <div className="p-[25px] bg-dark-bg border border-dark-border rounded-[12px] text-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-[12px] text-[#999999] uppercase tracking-[1px] mb-[10px]">
                        Peso Total
                      </div>
                      <div className="text-[36px] font-[200] text-white leading-none mb-[5px]">
                        {latestEval.weight}
                        <span className="text-[16px] ml-1 text-[#666]">kg</span>
                      </div>
                      <div className="text-[12px] text-[#00FF85] uppercase tracking-[1px] mt-[10px]">
                        IMC {latestEval.metrics?.imc || '--'}
                      </div>
                    </div>

                    <div className="p-[25px] bg-dark-bg border border-dark-border rounded-[12px] text-center relative overflow-hidden group border-[#00D1FF]/20">
                      <div className="absolute inset-0 bg-[#00D1FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-[12px] text-[#00D1FF] uppercase tracking-[1px] mb-[10px]">
                        Gordura Corporal
                      </div>
                      <div className="text-[36px] font-[200] text-white leading-none mb-[5px] text-[#00D1FF]">
                        {latestEval.method === 'photo_only' ? 'N/A' : (latestEval.metrics?.bf || 0)}
                        {latestEval.method !== 'photo_only' && (
                          <span className="text-[16px] ml-1 text-[#00D1FF]/50">
                            %
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-[#999999] uppercase tracking-[1px] mt-[10px]">
                        {latestEval.method === 'photo_only' ? '--' : `${latestEval.metrics?.fatMass || 0} kg (Massa Gorda)`}
                      </div>
                    </div>

                    <div className="p-[25px] bg-dark-bg border border-dark-border rounded-[12px] text-center relative overflow-hidden group border-[#00FF85]/20">
                      <div className="absolute inset-0 bg-[#00FF85]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-[12px] text-[#00FF85] uppercase tracking-[1px] mb-[10px]">
                        Massa Magra
                      </div>
                      <div className="text-[36px] font-[200] text-white leading-none mb-[5px] text-[#00FF85]">
                        {latestEval.method === 'photo_only' ? 'N/A' : (latestEval.metrics?.leanMass || 0)}
                        {latestEval.method !== 'photo_only' && (
                          <span className="text-[16px] ml-1 text-[#00FF85]/50">
                            kg
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-[#999999] uppercase tracking-[1px] mt-[10px]">
                        Musculatura, ossos, etc.
                      </div>
                    </div>

                    <div className="p-[25px] bg-dark-bg border border-dark-border rounded-[12px] flex items-center justify-center text-left">
                      <div className="w-full">
                        <div className="text-[12px] text-[#999999] uppercase tracking-[1px] mb-[15px] border-b border-dark-border pb-[8px]">
                          Perimetria (Base)
                        </div>
                        {latestEval.circumferences ? (
                          <div className="space-y-[8px]">
                            <div className="flex justify-between text-[13px]">
                              <span className="text-[#666]">Tórax</span>{" "}
                              <span className="text-white">
                                {latestEval.circumferences.chest || "--"} cm
                              </span>
                            </div>
                            <div className="flex justify-between text-[13px]">
                              <span className="text-[#666]">Cintura</span>{" "}
                              <span className="text-white">
                                {latestEval.circumferences.waist || "--"} cm
                              </span>
                            </div>
                            <div className="flex justify-between text-[13px]">
                              <span className="text-[#666]">Abdômen</span>{" "}
                              <span className="text-[#00D1FF]">
                                {latestEval.circumferences.abdomen || "--"} cm
                              </span>
                            </div>
                            <div className="flex justify-between text-[13px]">
                              <span className="text-[#666]">Quadril</span>{" "}
                              <span className="text-white">
                                {latestEval.circumferences.hip || "--"} cm
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-[12px] text-[#666]">
                            Nenhuma anotada
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Folds mapped out */}
                  {latestEval.method !== "bioimpedance" &&
                    latestEval.folds &&
                    Object.values(latestEval.folds).some(
                      (val) => val !== undefined,
                    ) && (
                      <div className="p-[20px] bg-dark-bg border border-dark-border rounded-[12px] mb-[20px]">
                        <h3 className="text-[12px] text-[#999999] uppercase tracking-[1px] mb-[15px]">
                          Dobras Cutâneas (mm)
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-[20px] gap-y-[15px]">
                          {[
                            {
                              label: "Dorsal",
                              val: latestEval.folds.subescapular,
                            },
                            {
                              label: "Tríceps",
                              val: latestEval.folds.triciptal,
                            },
                            {
                              label: "Abdômen",
                              val: latestEval.folds.abdominal,
                            },
                            {
                              label: "Suprailíaca",
                              val: latestEval.folds.suprailiaca,
                            },
                            { label: "Coxa", val: latestEval.folds.coxa },
                            {
                              label: "Peitoral",
                              val: latestEval.folds.peitoral,
                            },
                            { label: "Axilar", val: latestEval.folds.axilar },
                            {
                              label: "Bíceps",
                              val: latestEval.folds.bicipital,
                            },
                          ]
                            .filter(
                              (f) => f.val !== undefined && f.val !== null,
                            )
                            .map((f) => (
                              <div
                                key={f.label}
                                className="flex justify-between text-[13px] border-b border-dark-border pb-[5px]"
                              >
                                <span className="text-[#666]">{f.label}</span>
                                <span className="text-white">{f.val}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                  {/* Detailed Perimetria Grid */}
                  {latestEval.circumferences && (
                    <div className="p-[20px] bg-dark-bg border border-dark-border rounded-[12px]">
                      <h3 className="text-[12px] text-[#999999] uppercase tracking-[1px] mb-[15px]">
                        Mapeamento Perimétrico Completo
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-[20px] gap-y-[15px]">
                        {[
                          {
                            label: "Ombro",
                            val: latestEval.circumferences.shoulder,
                          },
                          {
                            label: "Braço Dir.",
                            val: latestEval.circumferences.rightArm,
                          },
                          {
                            label: "Braço Esq.",
                            val: latestEval.circumferences.leftArm,
                          },
                          {
                            label: "Coxa Dir.",
                            val: latestEval.circumferences.rightThigh,
                          },
                          {
                            label: "Coxa Esq.",
                            val: latestEval.circumferences.leftThigh,
                          },
                          {
                            label: "Pant. Dir.",
                            val: latestEval.circumferences.rightCalf,
                          },
                          {
                            label: "Pant. Esq.",
                            val: latestEval.circumferences.leftCalf,
                          },
                        ].map((c) => (
                          <div
                            key={c.label}
                            className="flex justify-between text-[13px] border-b border-dark-border pb-[5px]"
                          >
                            <span className="text-[#666]">{c.label}</span>
                            <span className="text-white">{c.val || "--"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {latestEval.photos && latestEval.photos.length > 0 && (
                    <div className="p-[25px] bg-dark-bg border border-dark-border rounded-[12px] mt-[20px]">
                      <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] mb-[20px] pb-[10px] border-b border-dark-border flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-primary" /> Galeria
                        Fotográfica (Última Avaliação)
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(latestEval.photos || []).map((photo, i) =>
                          photo ? (
                            <div
                              key={i}
                              onClick={() => setFullScreenPhoto(photo)}
                              className="relative group rounded-[12px] overflow-hidden border border-dark-border aspect-[3/4] bg-black cursor-pointer shadow-sm hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300"
                            >
                              <img
                                src={photo}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.15]"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                  <span className="text-white text-[11px] uppercase font-[700] tracking-[1.5px] bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                                    {["Frente", "Costas", "Perfil"][i] ||
                                      `Extra ${i + 1}`}
                                  </span>
                                </div>
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-black/50 backdrop-blur-md p-3 rounded-full text-white transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                  <Search className="w-5 h-5" />
                                </div>
                              </div>
                            </div>
                          ) : null,
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Observations Section */}
              <div className="rounded-[16px] bg-dark-card border border-dark-border p-[30px] w-full">
                <h2 className="text-[16px] text-white font-[600] uppercase tracking-[1px] mb-[15px] pb-[10px] border-b border-dark-border">
                  Anotações Comportamentais e Clínicas
                </h2>
                <div className="flex flex-col gap-4">
                  <textarea
                    className="w-full h-[150px] bg-dark-bg border border-dark-border rounded-[12px] p-4 text-white text-[14px] resize-none focus:outline-none focus:border-primary placeholder:text-[#666]"
                    placeholder="Descreva queixas do paciente, nível de adesão, lesões relatadas, ciclo menstrual atual, padrão de sono ou uso de ergogênicos/medicações..."
                    value={obsText}
                    onChange={(e) => setObsText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveObservations}
                      className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-[8px] transition-colors font-[500] text-[14px]"
                    >
                      Salvar Anotações
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Anamnesis Tab Content */}
          {activeViewTab === "anamnese" && (
            <motion.div
              key="anamnese"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-[16px] bg-dark-card border border-dark-border p-[30px]">
                <div className="flex items-center justify-between mb-8 border-b border-dark-border pb-4">
                  <div>
                    <h2 className="text-[18px] text-white font-[600]">
                      Anamnese Técnica
                    </h2>
                    <p className="text-[13px] text-[#999999]">
                      Histórico médico, estilo de vida e preferências.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {selectedStudent.anamnesis?.lastUpdated && (
                      <span className="text-[11px] text-[#666] bg-dark-bg px-3 py-1 rounded-full">
                        Última atualização:{" "}
                        {new Date(
                          selectedStudent.anamnesis.lastUpdated,
                        ).toLocaleDateString("pt-BR")}
                      </span>
                    )}
                    {selectedStudent.anamnesis &&
                      Object.keys(selectedStudent.anamnesis).length > 0 && (
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "Tem certeza que deseja excluir esta anamnese definitivamente?",
                              )
                            ) {
                              updateStudent(selectedStudent.id, {
                                anamnesis: {},
                              });
                              resetAnamnesisForm({});
                            }
                          }}
                          className="text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-full flex items-center gap-2 text-[11px] transition-colors"
                        >
                          <Trash className="w-3 h-3" /> Excluir Anamnese
                        </button>
                      )}
                  </div>
                </div>

                {!selectedStudent.anamnesis ||
                Object.keys(selectedStudent.anamnesis).length === 0 ||
                !selectedStudent.anamnesis.lastUpdated ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ClipboardList className="w-12 h-12 text-[#333] mb-4" />
                    <h3 className="text-[15px] font-[600] text-white mb-2">
                      Nenhuma anamnese recebida
                    </h3>
                    <p className="text-[13px] text-[#999999]">
                      O aluno ainda não preencheu e enviou a anamnese técnica
                      pelo portal dele.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-[14px] text-primary font-[600] uppercase tracking-[1px] flex items-center gap-2">
                          <Info className="w-4 h-4" /> Saúde & Histórico
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[12px] text-[#666] uppercase mb-2">
                              Histórico Médico / Cirurgias
                            </label>
                            <textarea
                              {...registerAnamnesis("medicalHistory")}
                              readOnly
                              className="w-full bg-dark-bg/50 border border-dark-border rounded-[8px] p-3 text-white text-[14px] h-[80px] resize-none outline-none"
                              placeholder="Sem dados"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] text-[#666] uppercase mb-2">
                              Medicamentos em Uso
                            </label>
                            <textarea
                              {...registerAnamnesis("medications")}
                              readOnly
                              className="w-full bg-dark-bg/50 border border-dark-border rounded-[8px] p-3 text-white text-[14px] h-[80px] resize-none outline-none"
                              placeholder="Sem dados"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] text-[#666] uppercase mb-2">
                              Lesões ou Dores Articulares
                            </label>
                            <textarea
                              {...registerAnamnesis("injuries")}
                              readOnly
                              className="w-full bg-dark-bg/50 border border-dark-border rounded-[8px] p-3 text-white text-[14px] h-[80px] resize-none outline-none"
                              placeholder="Sem dados"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-[14px] text-primary font-[600] uppercase tracking-[1px] flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" /> Estilo de Vida
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[12px] text-[#666] uppercase mb-2">
                              Rotina / Trabalho / Estresse
                            </label>
                            <textarea
                              {...registerAnamnesis("lifestyle")}
                              readOnly
                              className="w-full bg-dark-bg/50 border border-dark-border rounded-[8px] p-3 text-white text-[14px] h-[80px] resize-none outline-none"
                              placeholder="Sem dados"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] text-[#666] uppercase mb-2">
                              Qualidade do Sono
                            </label>
                            <input
                              {...registerAnamnesis("sleepQuality")}
                              readOnly
                              className="w-full bg-dark-bg/50 border border-dark-border rounded-[8px] p-3 text-white text-[14px] outline-none"
                              placeholder="Sem dados"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] text-[#666] uppercase mb-2">
                              Funcionamento Digestivo
                            </label>
                            <input
                              {...registerAnamnesis("digestion")}
                              readOnly
                              className="w-full bg-dark-bg/50 border border-dark-border rounded-[8px] p-3 text-white text-[14px] outline-none"
                              placeholder="Sem dados"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-dark-border">
                      <h3 className="text-[14px] text-primary font-[600] uppercase tracking-[1px] mb-6 flex items-center gap-2">
                        <Utensils className="w-4 h-4" /> Preferências
                        Alimentares
                      </h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-[12px] text-[#666] uppercase mb-2">
                            O que Gosta e Não Gosta
                          </label>
                          <textarea
                            {...registerAnamnesis("dietaryPreferences")}
                            readOnly
                            className="w-full bg-dark-bg/50 border border-dark-border rounded-[8px] p-3 text-white text-[14px] h-[100px] resize-none outline-none"
                            placeholder="Sem dados"
                          />
                        </div>
                        <div>
                          <label className="block text-[12px] text-[#666] uppercase mb-2">
                            Alergias ou Intolerâncias
                          </label>
                          <textarea
                            {...registerAnamnesis("allergies")}
                            readOnly
                            className="w-full bg-dark-bg/50 border border-dark-border rounded-[8px] p-3 text-white text-[14px] h-[100px] resize-none outline-none"
                            placeholder="Sem dados"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* AI Shape Analysis Tab Content */}
          {activeViewTab === "shape-ia" && (
            <motion.div
              key="shape-ia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="rounded-[16px] bg-dark-card border border-dark-border p-[30px]">
                <div className="flex items-center justify-between mb-8 border-b border-dark-border pb-4">
                  <div>
                    <h2 className="text-[18px] text-white font-[600] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" /> Análise de
                      Shape por Inteligência Artificial
                    </h2>
                    <p className="text-[13px] text-[#999999]">
                      Gerado por Gemini Vision AI.
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-[12px] p-6 mb-8">
                  <h3 className="text-[14px] text-white font-[600] mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" /> Como funciona?
                  </h3>
                  <p className="text-[13px] text-[#999999] leading-relaxed">
                    Selecione uma avaliação que contenha fotos (frente, costas e
                    perfil). A IA irá processar as imagens para identificar o
                    desenvolvimento muscular, simetria e áreas com maior
                    necessidade de hipertrofia ou redução de gordura.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] border-b border-dark-border pb-3">
                    Nova Análise
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <select
                      className="flex-1 bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white text-[14px] focus:border-primary outline-none"
                      id="ai-eval-select"
                    >
                      <option value="">
                        Selecione uma avaliação com fotos...
                      </option>
                      {selectedStudent.evaluations
                        .filter((e) => e.photos && e.photos.length > 0)
                        .map((e) => (
                          <option key={e.id} value={e.id}>
                            {new Date(e.date).toLocaleDateString("pt-BR")} -{" "}
                            {e.weight}kg ({e.photos?.length} fotos)
                          </option>
                        ))}
                    </select>
                    <button
                      disabled={isAnalyzingShape}
                      onClick={() => {
                        const select = document.getElementById(
                          "ai-eval-select",
                        ) as HTMLSelectElement;
                        if (select.value) handleAnalyzeShape(select.value);
                        else alert("Selecione uma avaliação válida.");
                      }}
                      className="bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-2 rounded-[8px] font-[600] flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]"
                    >
                      {isAnalyzingShape ? (
                        <>
                          {" "}
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Analisando Shape...{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <Wand2 className="w-4 h-4" /> Gerar Relatório IA{" "}
                        </>
                      )}
                    </button>
                  </div>
                  {isAnalyzingShape && (
                    <div className="mt-4 bg-dark-bg/50 border border-dark-border rounded-[12px] p-6 text-center animate-pulse">
                      <p className="text-[13px] text-primary mb-2 font-[600]">
                        {aiStatus ||
                          "A IA está processando imagens e métricas..."}
                      </p>
                      <p className="text-[11px] text-[#666]">
                        Esta operação utiliza o Gemini Flash e pode levar de 5 a
                        15 segundos. Por favor, aguarde.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {selectedStudent.aiAnalyses &&
              selectedStudent.aiAnalyses.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-[14px] text-[#666] uppercase tracking-[1px] font-[600] px-1">
                    Histórico de Análises IA
                  </h3>
                  {selectedStudent.aiAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="rounded-[16px] bg-dark-card border border-dark-border overflow-hidden shadow-xl animate-in fade-in slide-in-from-top-4"
                    >
                      <div className="p-6 bg-white/[0.02] border-b border-dark-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <Brain className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-white font-[600]">
                              Relatório de Shape -{" "}
                              {new Date(analysis.date).toLocaleDateString(
                                "pt-BR",
                              )}
                            </h4>
                            <p className="text-[11px] text-[#666]">
                              Avaliação Base:{" "}
                              {selectedStudent.evaluations.find(
                                (e) => e.id === analysis.associatedEvaluationId,
                              )?.date || "Removida"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              if (
                                confirm(
                                  "Tem certeza que deseja excluir esta Análise IA permanentemente?",
                                )
                              ) {
                                const newAnalyses =
                                  selectedStudent.aiAnalyses!.filter(
                                    (a) => a.id !== analysis.id,
                                  );
                                try {
                                  await updateStudent(selectedStudent.id, {
                                    aiAnalyses: newAnalyses,
                                  });
                                  setSelectedStudent({
                                    ...selectedStudent,
                                    aiAnalyses: newAnalyses,
                                  });
                                  alert("Análise excluída com sucesso.");
                                } catch (error) {
                                  console.error(
                                    "Erro ao excluir análise",
                                    error,
                                  );
                                }
                              }
                            }}
                            className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-[8px] transition-all text-[12px] font-[500]"
                          >
                            <Trash className="w-4 h-4" /> Excluir
                          </button>
                          <button
                            onClick={() => handleGenerateAIReportPDF(analysis)}
                            className="flex items-center gap-2 bg-dark-bg border border-dark-border hover:border-primary text-white px-4 py-2 rounded-[8px] transition-all text-[12px] font-[500]"
                          >
                            <Download className="w-4 h-4 text-primary" /> Salvar
                            Relatório
                          </button>
                        </div>
                      </div>

                      <div className="p-8 space-y-8 text-[14px] leading-relaxed text-[#999999]">
                        <div>
                          <h5 className="text-white font-[600] mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />{" "}
                            Diagnóstico do Shape
                          </h5>
                          <div className="p-4 bg-dark-bg/50 rounded-[12px] border border-dark-border/50 text-white/90">
                            {analysis.report}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="p-4 bg-[#00FF85]/5 border border-[#00FF85]/20 rounded-[12px]">
                            <h5 className="text-[#00FF85] font-[700] mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" /> Pontos Fortes
                              Identificados
                            </h5>
                            <ul className="space-y-2">
                              {analysis.strongPoints.map((p, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#00FF85] mt-1">•</span>{" "}
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-[12px]">
                            <h5 className="text-red-500 font-[700] mb-3 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" /> Pontos de
                              Melhoria / Fraquezas
                            </h5>
                            <ul className="space-y-2">
                              {analysis.weakPoints.map((p, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-red-500 mt-1">•</span>{" "}
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-[12px]">
                          <h5 className="text-primary font-[700] mb-3 flex items-center gap-2 uppercase tracking-[1px] text-[12px]">
                            <Wand2 className="w-4 h-4" /> Sugestão de Ajuste no
                            Planejamento
                          </h5>
                          <p className="italic text-white/80 font-mono text-[13px]">
                            "{analysis.suggestedTrainingAdjustments}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[16px] bg-dark-card border border-dark-border border-dashed p-[80px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center text-[#333] mb-6 shadow-inner">
                    <Brain className="w-10 h-10 opacity-30" />
                  </div>
                  <h4 className="text-white font-[600] mb-2 text-[18px]">
                    Nenhuma Análise IA Realizada
                  </h4>
                  <p className="text-[14px] text-[#666] max-w-sm">
                    Use o poder da inteligência artificial para analisar o shape
                    do seu aluno através das fotos das avaliações físicas.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Photo Modal */}
        {fullScreenPhoto && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 outline-none focus:outline-none opacity-0 animate-[fadeIn_0.3s_forwards]"
            onClick={() => setFullScreenPhoto(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full focus:outline-none"
              onClick={() => setFullScreenPhoto(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={fullScreenPhoto}
              alt="Fullscreen Preview"
              className="w-auto max-w-full h-auto max-h-full object-contain rounded-[8px] shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-95 animate-[zoomIn_0.3s_forwards]"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
            <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes zoomIn { from { transform: scale(0.95); } to { transform: scale(1); } }
          `}</style>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 pb-24 sm:pb-4 backdrop-blur-sm">
            <div className="bg-dark-card border border-dark-border rounded-[24px] w-full max-w-md max-h-[85dvh] sm:max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-hover" />

              <div className="p-6 border-b border-dark-border flex items-center justify-between shrink-0 bg-dark-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-[700] text-white">
                      Compartilhar Acesso
                    </h2>
                    <p className="text-[#666] text-xs">
                      Envie as credenciais de acesso ao aluno.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-[#666] hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                <div className="p-4 bg-dark-bg border border-dark-border rounded-[16px] space-y-3">
                  <div>
                    <span className="text-[10px] text-[#666] uppercase tracking-[1px] font-[600]">
                      E-mail do Aluno
                    </span>
                    <div className="text-white text-[14px] font-[500] mt-1">
                      {selectedStudent.email || "Não cadastrado"}
                    </div>
                  </div>
                  {selectedStudent.accessPassword && (
                    <div className="pt-3 border-t border-dark-border/50">
                      <span className="text-[10px] text-white uppercase tracking-[1px] font-[600]">
                        Senha de Acesso ao APP
                      </span>
                      <div className="text-white text-[18px] font-[600] tracking-[1px] mt-1">
                        {selectedStudent.accessPassword}
                      </div>
                    </div>
                  )}
                  <div className="pt-3 border-t border-dark-border/50">
                    <span className="text-[10px] text-primary uppercase tracking-[1px] font-[700]">
                      Código Antigo (Apenas Ref.)
                    </span>
                    <div className="text-primary text-[16px] font-[800] tracking-[1px] mt-1">
                      {selectedStudent.accessCode}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const appUrl = window.location.origin;
                      const finalUrl = `${appUrl}/?portal=true`;
                      const pwd = selectedStudent.accessPassword
                        ? `\n🔑 Senha: ${selectedStudent.accessPassword}`
                        : `\n🔑 Senha / Código: ${selectedStudent.accessCode}`;
                      const codeRef = selectedStudent.accessCode
                        ? `\n🆔 Código de Acesso: ${selectedStudent.accessCode}`
                        : "";
                      const text = `Olá ${selectedStudent.name}! Aqui está o seu link de acesso exclusivo ao nosso Portal do Aluno:\n\n🔗 Link direto do Portal: ${finalUrl}\n📧 Seu E-mail: ${selectedStudent.email}${pwd}${codeRef}\n\nNo portal você acessa seus treinos, dieta, avaliações físicas e evolução com carregamento instantâneo!`;
                      window.open(
                        `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
                        "_blank",
                      );
                    }}
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-[12px] font-[600] transition-all flex items-center justify-center gap-2 text-sm shadow-md active:scale-98 cursor-pointer"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={async () => {
                      setIsSendingEmail(true);
                      try {
                        const response = await fetch("/api/send-access", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            email: selectedStudent.email,
                            name: selectedStudent.name,
                            accessCode: selectedStudent.accessCode,
                            appUrl: `${window.location.origin}/?portal=true`,
                          }),
                        });
                        if (response.ok) alert("E-mail enviado com sucesso!");
                        else throw new Error("Falha ao enviar");
                      } catch (e) {
                        alert(
                          "Erro ao enviar e-mail. Verifique a configuração.",
                        );
                      } finally {
                        setIsSendingEmail(false);
                      }
                    }}
                    disabled={isSendingEmail}
                    className="bg-[#EA4335] hover:bg-[#d6382a] text-white py-3 rounded-[12px] font-[600] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 active:scale-98 cursor-pointer"
                  >
                    {isSendingEmail ? "Enviando..." : "E-mail"}
                  </button>
                </div>

                <button
                  onClick={() => {
                    const finalUrl = `${window.location.origin}/?portal=true`;
                    const pwd = selectedStudent.accessPassword
                      ? `\n🔑 Senha: ${selectedStudent.accessPassword}`
                      : `\n🔑 Senha / Código: ${selectedStudent.accessCode}`;
                    const codeRef = selectedStudent.accessCode
                      ? `\n🆔 Código de Acesso: ${selectedStudent.accessCode}`
                      : "";
                    const text = `Olá ${selectedStudent.name}! Aqui está o seu acesso oficial ao nosso Portal do Aluno:\n\n🔗 Link direto do Portal: ${finalUrl}\n📧 E-mail: ${selectedStudent.email}${pwd}${codeRef}\n\nLá você encontrará seus treinos, dieta e evolução!`;
                    navigator.clipboard.writeText(text);
                    alert("Credenciais e Link do Portal copiados com sucesso!");
                  }}
                  className="w-full bg-dark-bg border border-dark-border hover:border-primary text-white py-3 rounded-[12px] font-[600] transition-all flex items-center justify-center gap-2 text-sm active:scale-98 cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-primary" />
                  Copiar dados de acesso e link direto
                </button>

                <button
                  onClick={() => {
                    setShareTargetStudent(selectedStudent);
                    setShowSharePortalModal(true);
                  }}
                  className="w-full bg-[#00FF66]/10 border border-[#00FF66]/30 hover:bg-[#00FF66] text-[#00FF66] hover:text-black py-3 rounded-[12px] font-[700] transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(0,255,102,0.1)] active:scale-98 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  Abrir Opções de Compartilhamento & QR Code
                </button>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-[12px] flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-primary/70 leading-relaxed">
                    O aluno poderá ver o plano alimentar, registrar ingestão de
                    água e acompanhar o relatório de shape gerado por IA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditStudent && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 pb-24 sm:pb-4 backdrop-blur-sm">
            <div className="bg-dark-card border border-dark-border rounded-[16px] w-full max-w-4xl max-h-[85dvh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-5 border-b border-dark-border shrink-0 bg-dark-card">
                <h2 className="text-[20px] font-bold text-white">
                  Editar Perfil do Aluno
                </h2>
                <button
                  type="button"
                  onClick={() => setShowEditStudent(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#999999]" />
                </button>
              </div>

              <form
                onSubmit={onStudentSubmit(handleEditStudent)}
                className="flex flex-col flex-1 min-h-0 overflow-hidden"
              >
                <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      {...registerStudent("name", {
                        required: "Nome é obrigatório",
                      })}
                      className={`w-full bg-dark-bg border ${studentErrors.name ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                    />
                    {studentErrors.name && (
                      <span className="text-red-500 text-[10px] sm:text-[11px] mt-1">
                        {studentErrors.name.message as string}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      E-mail
                    </label>
                    <input
                      type="email"
                      {...registerStudent("email")}
                      className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      Idade
                    </label>
                    <input
                      type="number"
                      {...registerStudent("age", {
                        required: "Idade é obrigatória",
                      })}
                      className={`w-full bg-dark-bg border ${studentErrors.age ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                    />
                    {studentErrors.age && (
                      <span className="text-red-500 text-[10px] sm:text-[11px] mt-1">
                        {studentErrors.age.message as string}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      Telefone/WhatsApp
                    </label>
                    <input
                      type="tel"
                      {...registerStudent("phone")}
                      className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      Sexo
                    </label>
                    <select
                      {...registerStudent("gender")}
                      className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors"
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      Objetivo Principal
                    </label>
                    <select
                      {...registerStudent("objective")}
                      className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors"
                    >
                      <option value="Hipertrofia">Hipertrofia</option>
                      <option value="Emagrecimento">Emagrecimento</option>
                      <option value="Definição">Definição</option>
                      <option value="Saúde">Saúde / Bem-estar</option>
                      <option value="Performance">Performance Esportiva</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      Fator de Atividade
                    </label>
                    <select
                      {...registerStudent("activityLevel")}
                      className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors"
                    >
                      <option value="1.2">1.2 (Sedentário)</option>
                      <option value="1.375">1.375 (Levemente Ativo)</option>
                      <option value="1.55">1.55 (Moderadamente Ativo)</option>
                      <option value="1.725">1.725 (Muito Ativo)</option>
                      <option value="1.9">1.9 (Extremamente Ativo)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      Senha de Acesso (Portal)
                    </label>
                    <input
                      type="text"
                      {...registerStudent("accessPassword", {
                        required: "Senha é obrigatória",
                        minLength: {
                          value: 6,
                          message: "Senha deve ter 6+ chars",
                        },
                      })}
                      className={`w-full bg-dark-bg border ${studentErrors.accessPassword ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                    />
                    {studentErrors.accessPassword && (
                      <span className="text-red-500 text-[10px] sm:text-[11px] mt-1">
                        {studentErrors.accessPassword.message as string}
                      </span>
                    )}
                  </div>
                </div>

                {selectedStudent.evaluations && selectedStudent.evaluations.length > 0 && (
                  <div className="mt-[30px] border-t border-dark-border pt-[30px]">
                    <div className="flex items-center gap-3 mb-[20px]">
                      <Camera className="w-5 h-5 text-primary" />
                      <h3 className="text-white font-[600] uppercase tracking-[1px] text-[14px]">
                        Fotos da Última Avaliação
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {(() => {
                        const latest = [...(selectedStudent.evaluations || [])].sort(
                          (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime(),
                        )[0];
                        return ["Frente", "Costas", "Perfil"].map((label, i) => {
                          const photo = latest.photos?.[i] || "";
                          return (
                            <div key={label} className="flex flex-col gap-3">
                              <span className="text-[11px] text-[#999] uppercase font-bold tracking-wider">
                                {label}
                              </span>
                              <div
                                onClick={() =>
                                  document
                                    .getElementById(`edit-profile-photo-${i}`)
                                    ?.click()
                                }
                                className={`aspect-[3/4] rounded-[12px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition-all group ${photo ? "border-primary bg-black" : "border-dark-border bg-dark-bg hover:border-primary/50"}`}
                              >
                                {photo ? (
                                  <>
                                    <img
                                      src={photo}
                                      alt={label}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                                      <Camera className="w-6 h-6 text-white" />
                                      <span className="text-[10px] text-white font-bold uppercase">Trocar Foto</span>
                                    </div>
                                  </>
                                ) : (
                                  <div className="flex flex-col items-center text-[#666] group-hover:text-primary transition-colors">
                                    <Plus className="w-8 h-8 mb-2 opacity-50" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Adicionar</span>
                                  </div>
                                )}
                              </div>
                              <input
                                type="file"
                                id={`edit-profile-photo-${i}`}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleUpdateEvaluationPhoto(latest.id, i, file);
                                  }
                                }}
                              />
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}
                </div>

                <div className="shrink-0 sticky bottom-0 bg-dark-card border-t border-dark-border p-4 flex justify-end gap-3 z-10">
                  <button
                    type="button"
                    onClick={() => setShowEditStudent(false)}
                    className="px-6 py-2 border border-dark-border text-[#999] hover:text-white rounded-[8px] transition-all hover:bg-white/5 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isAddingStudent}
                    className="bg-primary hover:bg-primary-hover font-[700] text-white px-6 py-2 rounded-[8px] transition-all transform active:scale-95 shadow-lg flex items-center gap-2"
                  >
                    {isAddingStudent ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isPhotoUploading && (
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h2 className="text-white text-[24px] font-[800] tracking-[-1px] mb-2">
              Armazenando Mídia
            </h2>
            <p className="text-[#999] text-[13px] max-w-[300px] text-center">
              Transferindo fotos com altíssima qualidade para o Cloud Storage.
              Isso pode levar alguns segundos dependendo da sua internet...
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[30px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#09090b] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div>
          <h1 className="text-3xl font-[300] tracking-tight text-white leading-tight">
            Gestão de Alunos
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Controle total de evoluções, avaliações e anamnese.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setShareTargetStudent(null);
              setShowSharePortalModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-[#00FF66]/15 hover:bg-[#00FF66] text-[#00FF66] hover:text-black border border-[#00FF66]/30 px-5 py-3 rounded-xl transition-all font-bold shadow-[0_0_15px_rgba(0,255,102,0.15)] active:scale-95 cursor-pointer"
            title="Compartilhar link de acesso do portal (para aluno novo ou já cadastrado)"
          >
            <Share2 className="w-5 h-5" /> Compartilhar Portal
          </button>
          <button
            onClick={() => setShowAddStudent(true)}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-[#00e676] text-black px-6 py-3 rounded-xl transition-all font-bold shadow-[0_0_20px_rgba(0,255,133,0.2)] hover:shadow-[0_0_30px_rgba(0,255,133,0.4)] cursor-pointer"
          >
            <Plus className="w-5 h-5" /> Novo Aluno
          </button>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 pb-24 sm:pb-4 backdrop-blur-sm">
          <div className="bg-dark-card border border-dark-border rounded-[16px] w-full max-w-lg max-h-[85dvh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-dark-border flex items-center justify-between shrink-0 bg-dark-card">
              <h2 className="text-[20px] font-bold text-white">
                Cadastrar Aluno
              </h2>
              <button
                type="button"
                onClick={() => setShowAddStudent(false)}
                className="text-[#666] hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={onStudentSubmit((data) => {
                console.log("Form submitted with:", data);
                handleAddStudent(data);
              })}
              className="flex flex-col flex-1 min-h-0 overflow-hidden"
            >
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                  Nome Completo
                </label>
                <input
                  type="text"
                  {...registerStudent("name", {
                    required: "Nome é obrigatório",
                  })}
                  className={`w-full bg-dark-bg border ${studentErrors.name ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                />
                {studentErrors.name && (
                  <span className="text-red-500 text-[10px] block mt-1">
                    {studentErrors.name.message as string}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                    E-mail (Login App)
                  </label>
                  <input
                    type="email"
                    {...registerStudent("email" as any, {
                      required: "O E-mail é obrigatório para o acesso.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Formato de e-mail inválido",
                      },
                    })}
                    className={`w-full bg-dark-bg border ${studentErrors.email ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                    placeholder="aluno@gmail.com"
                  />
                  {studentErrors.email && (
                    <span className="text-red-500 text-[10px] block mt-1">
                      {(studentErrors.email as any).message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                    Senha Inicial do App
                  </label>
                  <input
                    type="text"
                    {...registerStudent("accessPassword" as any, {
                      required: "A senha inicial é obrigatória",
                      minLength: {
                        value: 6,
                        message: "A senha deve ter no mínimo 6 dígitos",
                      },
                    })}
                    className={`w-full bg-dark-bg border ${studentErrors["accessPassword"] ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                    placeholder="Ex: 123456"
                  />
                  {studentErrors["accessPassword"] && (
                    <span className="text-red-500 text-[10px] block mt-1">
                      {(studentErrors["accessPassword"] as any).message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    {...registerStudent("phone" as any, {
                      required: "Telefone é obrigatório",
                      pattern: {
                        value:
                          /^\(?[1-9]{2}\)?\s?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
                        message: "Telefone inválido (Ex: 11 99999-9999)",
                      },
                    })}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length > 11) val = val.substring(0, 11);
                      if (val.length > 2 && val.length <= 6) {
                        e.target.value = `(${val.substring(0, 2)}) ${val.substring(2)}`;
                      } else if (val.length > 6) {
                        e.target.value = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7)}`;
                      } else {
                        e.target.value = val;
                      }
                    }}
                    className={`w-full bg-dark-bg border ${studentErrors.phone ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                    placeholder="(11) 99999-9999"
                  />
                  {studentErrors.phone && (
                    <span className="text-red-500 text-[10px] block mt-1">
                      {(studentErrors.phone as any).message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                    Idade
                  </label>
                  <input
                    type="number"
                    {...registerStudent("age", {
                      required: "Idade é obrigatória",
                      min: { value: 1, message: "Idade inválida" },
                    })}
                    className={`w-full bg-dark-bg border ${studentErrors.age ? "border-red-500" : "border-dark-border"} rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary transition-colors`}
                  />
                  {studentErrors.age && (
                    <span className="text-red-500 text-[10px] block mt-1">
                      {studentErrors.age.message as string}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                    Sexo
                  </label>
                  <select
                    {...registerStudent("gender")}
                    className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                  Fator Atividade
                </label>
                <select
                  {...registerStudent("activityLevel")}
                  className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white text-[14px]"
                >
                  <option value="1.2">1.2 (Sedentário)</option>
                  <option value="1.375">1.375 (Leve)</option>
                  <option value="1.55">1.55 (Moderado)</option>
                  <option value="1.725">1.725 (Ativo)</option>
                  <option value="1.9">1.9 (Muito Ativo)</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                  Objetivo
                </label>
                <select
                  {...registerStudent("objective")}
                  className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white text-[14px]"
                >
                  <option value="Emagrecimento">Emagrecimento</option>
                  <option value="Hipertrofia">Hipertrofia</option>
                  <option value="Manutenção">Manutenção</option>
                </select>
              </div>



              <div className="pt-6 border-t border-dark-border mt-6">
                <button
                  type="button"
                  onClick={() => setShowPhysicalEval(!showPhysicalEval)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px]">
                    Avaliação Física Inicial
                  </h3>
                  {showPhysicalEval ? (
                    <ChevronRight className="w-5 h-5 text-white -rotate-90" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white rotate-90" />
                  )}
                </button>

                {showPhysicalEval && (
                  <div className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Peso (kg)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("weight")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Altura (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("height")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Ombro (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("shoulder")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Tórax (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("chest")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Cintura (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("waist")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Abdômen (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("abdomen")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Quadril (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("hip")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Braço Dir. (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("rightArm")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Braço Esq. (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("leftArm")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Coxa Dir. (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("rightThigh")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Coxa Esq. (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("leftThigh")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Panturilha Dir. (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("rightCalf")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Panturilha Esq. (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("leftCalf")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <h3 className="text-[14px] text-white font-[600] uppercase tracking-[1px] mt-[25px] mb-[15px]">
                      Dobras Cutâneas (7 Dobras)
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Peitoral
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("peitoral")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Axilar Média
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("axilar")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Triciptal
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("triciptal")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Subescapular
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("subescapular")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Abdominal
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("abdominal")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Suprailíaca
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("suprailiaca")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                          Coxa
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...registerStudent("coxa")}
                          className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </div>
              <div className="shrink-0 sticky bottom-0 bg-dark-card border-t border-dark-border p-4 flex justify-end gap-3 z-10">
                <button
                  type="button"
                  onClick={() => setShowAddStudent(false)}
                  className="px-4 py-2 font-[600] text-[#999999] hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isAddingStudent}
                  className="bg-primary hover:bg-primary-hover font-[700] text-white px-6 py-2 rounded-[8px] transition-all transform active:scale-95 shadow-lg flex items-center gap-2"
                >
                  {isAddingStudent ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  Cadastrar Aluno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      <div className="rounded-3xl bg-[#09090b] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar aluno por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-gray-600 shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center px-4 py-2.5 bg-black/50 rounded-xl border border-white/10 text-xs text-gray-500 whitespace-nowrap">
            <User className="w-3.5 h-3.5 mr-2 opacity-50" />
            <span className="text-white font-bold mr-1">
              {filteredStudents.length}
            </span>
            {filteredStudents.length === 1
              ? "aluno"
              : "alunos"}
          </div>
        </div>

        <div className="p-6 bg-[#0A0A0A]">
          {filteredStudents.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-[32px] bg-[#151515] border border-white/5 flex items-center justify-center shadow-inner">
                <User className="w-8 h-8 text-primary opacity-60" />
              </div>
              <div>
                <p className="text-white font-black text-base mb-1">Base de Alunos Limpa</p>
                <p className="text-gray-500 text-xs">Nenhum aluno cadastrado no momento. Pronto para iniciar novos cadastros e avaliações!</p>
              </div>
              <button
                onClick={() => setShowAddStudent(true)}
                className="mt-2 bg-gradient-to-r from-[#00D4FF] to-[#00FF88] text-black font-black px-6 py-3.5 rounded-2xl text-xs transition-all shadow-[0_0_25px_rgba(0,212,255,0.25)] flex items-center gap-2 hover:opacity-90 active:scale-95"
              >
                <Plus className="w-4 h-4" /> Cadastrar Primeiro Aluno
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStudents.map((student) => {
                const lastEval =
                  student.evaluations && student.evaluations.length > 0
                    ? student.evaluations[student.evaluations.length - 1]
                    : null;
                const isOnlineMock = student.isActive; // Reusing isActive to mock online state for CRM visual
                
                return (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="group bg-[#151515] border border-white/5 hover:border-primary/30 rounded-[32px] p-6 cursor-pointer transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,212,255,0.1)] hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {student.profilePicture ? (
                            <img
                              src={student.profilePicture}
                              className="w-16 h-16 rounded-[20px] object-cover border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-[20px] bg-[#0A0A0A] border border-white/5 shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                              <User className="w-7 h-7 text-gray-600" />
                            </div>
                          )}
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-[#151515] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${isOnlineMock ? 'bg-[#00FF88] shadow-[0_0_10px_rgba(0,255,136,0.5)]' : 'bg-gray-500'}`}></div>
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-white tracking-tight leading-tight group-hover:text-primary transition-colors">{student.name || "Sem Nome"}</h4>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1 max-w-[140px] truncate">{student.email || 'Acesso Direto'}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStudent(student.id, { isActive: !student.isActive });
                        }}
                        className={`p-2 rounded-xl border transition-all shadow-inner ${student.isActive ? "bg-[#00FF88]/10 border-[#00FF88]/20 text-[#00FF88] hover:bg-[#00FF88]/20" : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"}`}
                        title={student.isActive ? 'Desativar aluno' : 'Ativar aluno'}
                      >
                         <Activity className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                       <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-3 shadow-inner">
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black mb-1">Idade/Sexo</p>
                          <p className="text-sm font-bold text-gray-300">{student.age || '--'} / {student.gender === 'M' ? 'Masc' : 'Fem'}</p>
                       </div>
                       <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-3 shadow-inner">
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black mb-1">Objetivo</p>
                          <p className="text-sm font-bold text-primary truncate">{student.objective || '--'}</p>
                       </div>
                    </div>

                    <div className="pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
                       <div className="flex flex-col">
                          <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black mb-0.5">Última Avaliação</span>
                          <span className="text-xs font-bold text-gray-400">
                             {lastEval ? new Date(lastEval.date).toLocaleDateString("pt-BR") : 'Pendente'}
                          </span>
                       </div>
                       <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-[#00D4FF] group-hover:translate-x-1 transition-transform">
                          Gerenciar Ficha <ChevronRight className="w-4 h-4 ml-1" />
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <SharePortalModal
        isOpen={showSharePortalModal}
        onClose={() => {
          setShowSharePortalModal(false);
          setShareTargetStudent(null);
        }}
        preselectedStudent={shareTargetStudent}
      />
    </div>
  );
}
