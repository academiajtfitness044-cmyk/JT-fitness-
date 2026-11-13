import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { toJpeg, toPng } from 'html-to-image';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import { Activity, Play, StopCircle, Share2, Map as MapIcon, Camera, Instagram, Target, Heart } from "lucide-react";
import { motion } from "motion/react";

// Fix leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function FitMap({ route }: { route: L.LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (route.length > 0) {
        map.fitBounds(L.latLngBounds(route), { padding: [20, 20] });
    }
  }, [route, map]);
  return null;
}


function ShareImageModal({ 
  isOpen, 
  onClose, 
  imageUrl, 
  file, 
  title, 
  textContext 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  imageUrl: string, 
  file: File | null, 
  title: string, 
  textContext?: string 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pb-24 sm:pb-4 bg-black/90 backdrop-blur-sm shadow-2xl">
      <div className="bg-[#0a0a0f] border border-dark-border rounded-3xl p-6 w-full max-w-[360px] max-h-[85dvh] flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.8)] relative animate-in fade-in zoom-in duration-200 overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white p-2">
            X
        </button>
        <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wider text-center shrink-0">Tudo Pronto!</h3>
        <div className="w-full relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-[0_0_20px_rgba(0,255,133,0.1)] mb-4 max-h-[40vh] flex items-center justify-center bg-black shrink-0">
           <img src={imageUrl} alt="Sua imagem" className="w-full h-full object-contain" />
        </div>
        
        <p className="text-[12px] text-gray-400 mb-4 text-center leading-relaxed">
           Pressione no botão abaixo para compartilhar.<br/><br/>Se quiser salvar e o botão falhar ou não aparecer o instagram, <span className="text-white font-bold">pressione e segure o dedo em cima da imagem</span> para baixar na galeria.
        </p>

        <button 
          onClick={async () => {
             if (file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                 try {
                     await navigator.share({ files: [file], title, text: textContext });
                 } catch(err) {
                     console.log("Share cancelled or failed", err);
                 }
             } else {
                 const a = document.createElement('a');
                 a.href = imageUrl;
                 a.download = file ? file.name : 'imagem.jpg';
                 a.click();
             }
          }}
          className="w-full bg-primary text-[#0c0c0e] font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-95 transition-all text-sm uppercase tracking-wider shadow-lg shrink-0 sticky bottom-0"
        >
          <Share2 className="w-5 h-5" /> COMPARTILHAR
        </button>
      </div>
    </div>
  );
}

function CardioPhotoShare({ distance, duration }: { distance: number, duration: number }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [logoScale, setLogoScale] = useState(1);
  const compositeRef = useRef<HTMLDivElement>(null);
  const [modalData, setModalData] = useState<{isOpen: boolean, imageUrl: string, file: File | null, title: string, text: string}>({isOpen: false, imageUrl: '', file: null, title: '', text: ''});

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShareComposite = async () => {
    if (!photoUrl || !compositeRef.current) return;
    setIsSharing(true);
    try {
      // Workaround for Safari/iOS: render once to pre-load/render images in the canvas, then render again after layout cycle
      await toJpeg(compositeRef.current, {
        canvasWidth: 1080,
        canvasHeight: 1920,
        backgroundColor: '#000000'
      });
      await new Promise((resolve) => setTimeout(resolve, 150));
      const dataUrl = await toJpeg(compositeRef.current, {
        canvasWidth: 1080,
        canvasHeight: 1920,
        backgroundColor: '#000000'
      });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `cardio-foto.jpg`, { type: 'image/jpeg' });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
              files: [file],
              title: `Meu Cardio`,
              text: `Olha o meu cardio de hoje!`
          });
      } else {
          alert('Foto pronta! (Seu dispositivo não suporta compartilhamento direto. A foto foi gerada mas talvez você tenha que baixar no seu celular.)');
      }
    } catch(err) {
      alert('Erro ao compartilhar foto: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="mt-8 border-t border-dark-border pt-8">
      <div className="bg-dark-card border border-dark-border p-6 rounded-[24px]">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
           <Camera className="w-5 h-5 text-primary" /> Compartilhar com Foto
        </h3>
        <p className="text-sm text-gray-400 mb-6">Tire uma foto (ou escolha uma) do local do cardio com seus dados para compartilhar no Instagram Story ou WhatsApp Status!</p>
        
        {photoUrl ? (
          <div className="flex flex-col gap-4">
            <div className="w-full max-w-[400px] mx-auto">
              <div className="relative overflow-hidden rounded-2xl w-full border border-dark-border" ref={compositeRef} style={{ aspectRatio: '9/16' }}>
                 <img src={photoUrl} alt="Paisagem" className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
               <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
               
               {/* Top Overlay: JT Fitness and Info */}
               <div className="absolute top-16 left-8 right-8 flex items-start justify-between">
                 <motion.div drag dragMomentum={false} className="flex items-center cursor-move" style={{ scale: logoScale, transformOrigin: 'top left' }}>
                    <img src="https://i.postimg.cc/PfQtzTps/Chat-GPT-Image-29-de-ago-de-2026-13-37-34.png" alt="Logo Academia JT Fitness" className="w-[100px] h-auto rounded-xl object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] border border-[#00FF66]/30 pointer-events-none" draggable="false" crossOrigin="anonymous" referrerPolicy="no-referrer"  />
                  </motion.div>
                 
                 <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">{new Date().toLocaleDateString('pt-BR')}</span>
                 </div>
               </div>
               
               {/* Bottom Overlay: Cardio Info Only */}
               <div className="absolute bottom-24 left-8 right-8">
                 <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-xl">
                   <div className="flex justify-between items-end mb-3">
                     <div>
                       <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-0.5">Meu Cardio</p>
                       <p className="text-3xl font-black text-primary leading-none">{(distance / 1000).toFixed(2)} <span className="text-sm font-bold">km</span></p>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Tempo</span>
                        <span className="text-sm font-bold text-white">{formatTime(duration)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Ritmo médio</span>
                        <span className="text-sm font-bold text-white">{(duration > 0 && distance > 0 ? (duration / 60 / (distance / 1000)).toFixed(2) : '0.00')} <span className="text-xs">/km</span></span>
                      </div>
                   </div>
                 </div>
               </div>
            </div>
            </div>

                        <div className="flex justify-center bg-white/5 p-4 rounded-xl mt-2 border border-white/10 w-full mb-2">
               <div className="flex flex-col w-full">
                 <label className="text-xs font-bold text-gray-400 mb-2">Tamanho da Logo (Arraste p/ mover)</label>
                 <input type="range" min="0.5" max="3" step="0.1" value={logoScale} onChange={e => setLogoScale(parseFloat(e.target.value))} className="w-full accent-primary" />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
               <button onClick={() => setPhotoUrl(null)} className="py-3 px-4 rounded-xl border border-white/10 font-bold text-white hover:bg-white/5 transition-colors text-sm text-center">
                  Tirar Outra
               </button>
               <button onClick={handleShareComposite} disabled={isSharing} className="bg-primary text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors text-sm disabled:opacity-50">
                  {isSharing ? <Activity className="w-4 h-4 animate-spin" /> : <Instagram className="w-4 h-4" />}
                  Compartilhar
               </button>
            </div>
            <ShareImageModal isOpen={modalData.isOpen} onClose={() => setModalData(prev => ({...prev, isOpen: false}))} imageUrl={modalData.imageUrl} file={modalData.file} title={modalData.title} textContext={modalData.text} />
          </div>
        ) : (
          <div className="flex gap-4 w-full">
            <button onClick={() => { fileInputRef.current!.removeAttribute('capture'); fileInputRef.current?.click(); }} className="flex-1 relative overflow-hidden group flex flex-col items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white p-6 rounded-2xl transition-all font-bold tracking-wide">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <span className="text-gray-400 group-hover:text-white transition-colors text-center text-sm">Galeria</span>
            </button>
            <button onClick={() => { fileInputRef.current!.setAttribute('capture', 'environment'); fileInputRef.current?.click(); }} className="flex-1 relative overflow-hidden group flex flex-col items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white p-6 rounded-2xl transition-all font-bold tracking-wide">
               <Camera className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
               <span className="text-gray-400 group-hover:text-white transition-colors text-center text-sm">Câmera</span>
            </button>
          </div>
        )}
        
        <input 
          type="file" 
          accept="image/*" 
           
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleCapture}
        />
      </div>
    </div>
  );
}

export function CardioView() {
  const [status, setStatus] = useState<'idle' | 'tracking' | 'summary'>('idle');
  const [distance, setDistance] = useState(0); // in meters
  const [duration, setDuration] = useState(0); // in seconds
  const [route, setRoute] = useState<L.LatLng[]>([]);
  const [heartRate, setHeartRate] = useState(72);
  const watchId = useRef<number | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [modalData, setModalData] = useState<{isOpen: boolean, imageUrl: string, file: File | null, title: string, text: string}>({isOpen: false, imageUrl: '', file: null, title: '', text: ''});

  useEffect(() => {
    let hrInterval: NodeJS.Timeout;
    if (status === 'tracking') {
      setHeartRate(78);
      hrInterval = setInterval(() => {
        setHeartRate(prev => {
          const target = 142; // optimal training zone
          const diff = Math.floor(Math.random() * 7) - 3; // -3 to +3
          let next = prev + diff;
          if (prev < target) {
            next += 2;
          }
          return Math.min(185, Math.max(70, next));
        });
      }, 1500);
    } else {
      setHeartRate(72);
    }
    return () => clearInterval(hrInterval);
  }, [status]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'tracking') {
      interval = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
      
      if ("geolocation" in navigator) {
        watchId.current = navigator.geolocation.watchPosition(
          (position) => {
            const newPoint = L.latLng(position.coords.latitude, position.coords.longitude);
            setRoute(prev => {
              if (prev.length > 0) {
                setDistance(d => d + prev[prev.length - 1].distanceTo(newPoint));
              }
              return [...prev, newPoint];
            });
          },
          (err) => console.error(err),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    } else {
      if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
      clearInterval(interval!);
    }
    return () => {
      if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
      clearInterval(interval);
    };
  }, [status]);

  const handleShare = async () => {
    if (!summaryRef.current) return;
    
    // Hide the button during capture
    const button = summaryRef.current.querySelector('button');
    if (button) button.style.display = 'none';
    
    try {
        const dataUrl = await toPng(summaryRef.current, {
            backgroundColor: '#000000',
            pixelRatio: 2,
            filter: (node) => {
              // We can exclude elements here if needed, but we want the map.
              return true;
            }
        });

        // Convert dataUrl to blob
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        
        // Show the button back
        if (button) button.style.display = 'flex';

        const file = new File([blob], 'treino.png', { type: 'image/png' });
        
  
        const blobUrl = URL.createObjectURL(blob);
        setModalData({ isOpen: true, imageUrl: blobUrl, file: file, title: 'Meu treino', text: 'Confira meu treino!' });

    } catch (err) {
        // Show the button back even if error
        const button = summaryRef.current.querySelector('button');
        if (button) button.style.display = 'flex';
        
        console.error('Error sharing:', err);
        alert('Erro ao preparar compartilhamento: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {status === 'summary' ? (
        <>
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-black text-white">Resumo</h2>
            <button onClick={() => { setRoute([]); setDistance(0); setDuration(0); setStatus('idle'); }} className="bg-[#151515] text-white px-4 py-2 rounded-xl font-bold flex items-center border border-white/5 hover:border-white/10 transition-colors">Voltar</button>
        </div>
        <div ref={summaryRef} className="p-6 rounded-[32px] border bg-[#151515] text-center space-y-6 relative overflow-hidden font-sans border-white/5 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #00D4FF, transparent)' }} />
          
          <div className="flex flex-col items-center">
            <span className="font-bold tracking-widest text-[10px] uppercase mb-1 text-primary">Cardio Concluído</span>
            <h3 className="text-2xl font-black text-white">Excelente Trabalho</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Distância Tot.</p>
              <p className="text-6xl font-black text-white">{(distance / 1000).toFixed(2)} <span className="text-xl font-normal text-gray-500">km</span></p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Ritmo Médio</p>
                <p className="text-2xl font-bold text-white">{(duration > 0 && distance > 0 ? (duration / 60 / (distance / 1000)).toFixed(2) : '0.00')} <span className="text-xs text-gray-500">/km</span></p>
              </div>
              <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Tempo Total</p>
                <p className="text-2xl font-bold text-[#00D4FF]">{formatTime(duration)}</p>
              </div>
            </div>
          </div>

          <div className="h-48 rounded-[24px] border overflow-hidden relative border-white/10 shadow-lg">
            <MapContainer center={route[0] || [0,0]} zoom={15} style={{ height: "100%", width: "100%" }} dragging={false} scrollWheelZoom={false} doubleClickZoom={false} boxZoom={false} touchZoom={false}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
              <Polyline positions={route} color="#00D4FF" weight={4} opacity={0.8} />
              <FitMap route={route} />
            </MapContainer>
          </div>
          
          <button onClick={handleShare} className="w-full bg-[#0A0A0A] border border-[#00D4FF]/30 text-[#00D4FF] font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#00D4FF]/10 mt-4">
            <Share2 className="w-5 h-5"/> Compartilhar Resumo
          </button>
        </div>
        <CardioPhotoShare distance={distance} duration={duration} />
      </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center pt-8 pb-4">
             <div className="w-64 h-64 rounded-full border-[6px] flex items-center justify-center flex-col transition-all duration-500 shadow-2xl relative" style={{ borderColor: status === 'tracking' ? '#00FF88' : '#333' }}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#151515] to-[#0A0A0A]" />
                {status === 'tracking' && (
                  <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-[-10px] rounded-full border-2 border-[#00FF88] opacity-50" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                   <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-2">Tempo Ativo</p>
                   <p className={`text-6xl font-black tabular-nums transition-colors ${status === 'tracking' ? 'text-white' : 'text-gray-400'}`}>{formatTime(duration)}</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#151515] p-4 rounded-[24px] border border-white/5 flex flex-col items-center justify-center shadow-lg">
              <Activity className="w-5 h-5 text-[#00FF88] mb-2" />
              <p className="text-xl sm:text-2xl font-black text-white">{(distance / 1000).toFixed(2)}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1 text-center">KM</p>
            </div>
            
            <div className="bg-[#151515] p-4 rounded-[24px] border border-white/5 flex flex-col items-center justify-center shadow-lg">
              <motion.div 
                animate={{ scale: status === 'tracking' ? [0.95, 1.2, 0.95] : 1 }} 
                transition={{ repeat: Infinity, duration: 60 / heartRate, ease: "easeInOut" }}
                className="mb-2"
              >
                <Heart className={`w-5 h-5 ${status === 'tracking' ? 'text-red-500 fill-red-500 animate-pulse' : 'text-gray-500'}`} />
              </motion.div>
              <p className="text-xl sm:text-2xl font-black text-white tabular-nums">
                {status === 'tracking' ? heartRate : '--'}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400/80 font-bold mt-1 text-center">BPM</p>
            </div>

            <div className="bg-[#151515] p-4 rounded-[24px] border border-white/5 flex flex-col items-center justify-center shadow-lg">
              <Target className="w-5 h-5 text-[#00D4FF] mb-2" />
              <p className="text-xl sm:text-2xl font-black text-white">{Math.floor(duration / 60 * 8.5)}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1 text-center">KCAL</p>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8">
            {status === 'tracking' ? (
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setStatus('summary')} className="bg-[#FF5555] text-white w-24 h-24 rounded-full font-black flex flex-col items-center justify-center gap-1 shadow-[0_0_30px_rgba(255,85,85,0.4)] border-4 border-[#151515] hover:bg-red-400">
                    <StopCircle className="w-8 h-8"/>
                    PARAR
                </motion.button>
            ) : (
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setRoute([]); setDistance(0); setDuration(0); setStatus('tracking'); }} className="bg-[#00FF88] text-[#0A0A0A] w-24 h-24 rounded-full font-black flex flex-col items-center justify-center gap-1 shadow-[0_0_30px_rgba(0,255,136,0.4)] border-4 border-[#151515] hover:bg-green-400">
                    <Play className="w-8 h-8 ml-1"/>
                    INICIAR
                </motion.button>
            )}
          </div>

          <div className="h-64 bg-[#151515] rounded-3xl border border-white/5 overflow-hidden relative shadow-lg mt-8">
            {route.length > 0 ? (
                <MapContainer center={route[route.length - 1]} zoom={15} style={{ height: "100%", width: "100%" }}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    <Polyline positions={route} color="#00FF88" weight={5} />
                    <Marker position={route[route.length - 1]} />
                    <FitMap route={route} />
                </MapContainer>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <MapIcon className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-xs uppercase tracking-widest font-bold">GPS Aguardando</p>
                </div>
            )}
          </div>
        </>
      )}
      <ShareImageModal isOpen={modalData.isOpen} onClose={() => setModalData(prev => ({...prev, isOpen: false}))} imageUrl={modalData.imageUrl} file={modalData.file} title={modalData.title} textContext={modalData.text} />
    </div>
  );
}
