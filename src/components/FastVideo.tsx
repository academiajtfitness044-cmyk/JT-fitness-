import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, RotateCcw } from "lucide-react";
import { getCachedVideoSrc } from "../utils/mediaCache";

interface FastVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  forceVisible?: boolean;
  fallbackSrc?: string;
}

export function FastVideo({ src, forceVisible, fallbackSrc, poster, ...props }: FastVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(forceVisible || false);
  const [isIntersecting, setIsIntersecting] = useState(forceVisible || false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // Sync src prop updates & resolve cached version
  useEffect(() => {
    let isCancelled = false;

    setHasError(false);
    setIsLoading(true);
    setRetryCount(0);

    // Check local cache for instant playback without hitting Bunny bandwidth
    getCachedVideoSrc(src).then((cachedOrOriginal) => {
      if (!isCancelled) {
        setCurrentSrc(cachedOrOriginal);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [src]);

  // Setup intersection observer to lazy-load and play/pause on viewport change
  useEffect(() => {
    if (forceVisible) {
      setHasBeenVisible(true);
      setIsIntersecting(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (typeof IntersectionObserver === "undefined") {
      setHasBeenVisible(true);
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
        }
      },
      {
        rootMargin: "300px",
        threshold: 0.01,
      }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, [forceVisible]);

  // Handle play/pause programmatically based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasBeenVisible) return;

    if (isIntersecting) {
      if (props.autoPlay) {
        // Safe play call
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPaused(false))
            .catch(() => {
              setIsPaused(true);
            });
        }
      }
    } else {
      video.pause();
      setIsPaused(true);
    }
  }, [isIntersecting, hasBeenVisible, props.autoPlay, currentSrc]);

  // Handle setup/cleanup of video source
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasBeenVisible || !currentSrc) return;

    const isM3u8 = currentSrc.includes(".m3u8");

    if (isM3u8) {
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        const hls = new Hls({
          capLevelToPlayerSize: true,
          startLevel: -1,
          enableWorker: true,
          maxBufferLength: 30,
        });

        hls.loadSource(currentSrc);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          setHasError(false);
          if (props.autoPlay && isIntersecting) {
            video.play().catch(() => {});
          }
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                tryFallback();
                break;
            }
          }
        });

        hlsRef.current = hls;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = currentSrc;
      }
    } else {
      // Standard MP4
      if (video.src !== currentSrc) {
        video.src = currentSrc;
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentSrc, hasBeenVisible]);

  // Try fallback resolutions (e.g. 480p instead of 720p or fallbackSrc)
  const tryFallback = () => {
    if (retryCount === 0 && currentSrc.includes("play_720p.mp4")) {
      const fallback480 = currentSrc.replace("play_720p.mp4", "play_480p.mp4");
      setRetryCount(1);
      setCurrentSrc(fallback480);
      setIsLoading(true);
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      setRetryCount(2);
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleManualPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPaused(false)).catch(() => {});
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const { className, autoPlay, ...videoProps } = props;

  if (hasError) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-[#0d0d0f] rounded-[16px] text-gray-400 p-4 border border-white/5 overflow-hidden group ${className || "w-full h-full"}`}>
        {poster ? (
          <img src={poster} alt="Prévia" className="absolute inset-0 w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
        ) : null}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <button
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
              setCurrentSrc(src);
              if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play().catch(() => {});
              }
            }}
            className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary text-primary hover:text-black flex items-center justify-center transition-all shadow-md"
            title="Tentar carregar novamente"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <span className="text-[11px] text-gray-300 font-medium">Toque para tentar novamente</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-[#070709] ${className || ""}`}>
      <video
        ref={videoRef}
        preload="metadata"
        playsInline
        poster={poster}
        disablePictureInPicture={false}
        onError={(e) => {
          // Ignore abort errors which happen during standard cleanup
          const mediaError = videoRef.current?.error;
          if (mediaError && mediaError.code !== 1) {
            tryFallback();
          }
        }}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPaused(false);
        }}
        onPause={() => setIsPaused(true)}
        onCanPlay={() => setIsLoading(false)}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        className="w-full h-full bg-[#0A0A0A]"
        style={{ objectFit: className?.includes("object-contain") ? "contain" : "cover" }}
        {...videoProps}
      />

      {isLoading && hasBeenVisible && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-opacity duration-300 pointer-events-none z-10">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      )}

      {/* Play button overlay if paused and not on controls mode */}
      {!props.controls && isPaused && !isLoading && hasBeenVisible && (
        <div 
          onClick={handleManualPlay}
          className="absolute inset-0 bg-black/25 flex items-center justify-center cursor-pointer group-hover:bg-black/40 transition-colors z-10"
        >
          <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:text-primary transition-all shadow-lg">
            <Play className="w-5 h-5 ml-0.5" />
          </div>
        </div>
      )}
    </div>
  );
}

