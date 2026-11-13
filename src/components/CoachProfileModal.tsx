import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  Award,
  Save,
  X,
  Sparkles,
} from 'lucide-react';
import { CoachProfile } from '../types';
import { StorageService } from '../services/storage';

interface CoachProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: () => void;
}

export const CoachProfileModal: React.FC<CoachProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileUpdated,
}) => {
  const currentProfile = StorageService.getCoachProfile();
  const [name, setName] = useState(currentProfile.name);
  const [cref, setCref] = useState(currentProfile.cref);
  const [specialty, setSpecialty] = useState(currentProfile.specialty);
  const [email, setEmail] = useState(currentProfile.email);
  const [phone, setPhone] = useState(currentProfile.phone);
  const [bio, setBio] = useState(currentProfile.bio);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CoachProfile = {
      ...currentProfile,
      name,
      cref,
      specialty,
      email,
      phone,
      bio,
    };
    StorageService.saveCoachProfile(updated);
    setSavedSuccess(true);
    onProfileUpdated();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative max-w-lg w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-zinc-900 p-2 text-zinc-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 text-black font-black text-xl shadow-lg shadow-yellow-500/20">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Perfil do Treinador / Coach</h3>
            <p className="text-xs text-zinc-400">Academia JT Fitness</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Nome Completo *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">CREF / Registro Profissional</label>
              <input
                type="text"
                value={cref}
                onChange={(e) => setCref(e.target.value)}
                className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-mono text-yellow-400 focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">E-mail Profissional</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Telefone / WhatsApp</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-yellow-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Especialidade / Título</label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Biografia / Filosofia de Treinamento</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white focus:border-yellow-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 font-bold">
                ✓ Perfil salvo com sucesso!
              </span>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2 text-xs font-black text-zinc-950 hover:from-yellow-300 hover:to-amber-400"
              >
                <Save className="h-4 w-4" />
                Salvar Perfil
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
