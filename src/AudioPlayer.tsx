import { useEffect, useRef } from "react";

export default function Audio({previewUrl}: {previewUrl: string}) {
    const audioRef = useRef<HTMLAudioElement|null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [previewUrl]);

    return (
      <div>
        <audio ref={audioRef} controls>
          <source src={previewUrl} type="audio/x-m4a" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
}