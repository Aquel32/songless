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
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [previewUrl]);

  return (
    <div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}>
        <source src={previewUrl} type="audio/x-m4a" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}