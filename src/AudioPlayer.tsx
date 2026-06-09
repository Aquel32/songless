import { useEffect } from "react";

export default function Audio({
  previewUrl,
  audioRef,
  handleTimeUpdate,
}: {
  previewUrl: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  handleTimeUpdate: () => void;
}) {
  useEffect(() => {
    let interval: number;

    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = 1;
      interval = setInterval(handleTimeUpdate, 10);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [previewUrl]);

  return (
    <div>
      <audio ref={audioRef}>
        <source src={previewUrl} type="audio/x-m4a" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}