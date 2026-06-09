import { useEffect, useRef, useState } from 'react';
import './App.css'
import { getRandomSong } from "./lib.tsx";
import AudioPlayer from "./AudioPlayer.tsx";
import { ProgressBar } from './ProgressBar.tsx';
import { timeStops, timeStopsDurations } from "./static.tsx";

function App() {
  const [song, setSong] = useState<any|undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const timeStopIndex = useRef(0);

  async function fetchSong()
  {
    const randomSong = await getRandomSong();
    setSong(randomSong);
  }

  async function nextSong()
  {
    await fetchSong();
    timeStopIndex.current = 0;
    setProgress(0);
    setCanSkip(true);
    setIsPlaying(false);
  }

  function handleTimeUpdate()
  {
    if (audioRef.current) {
      if (timeStopIndex.current === -1)
      {
        return;
      }

      setProgress(
        (audioRef.current.currentTime /
          timeStopsDurations[timeStops.length - 1]) *
          100,
      );
    
      if (audioRef.current.currentTime >= timeStopsDurations[timeStopIndex.current]) {
        changeSongState(false);

        if (timeStopIndex.current == timeStops.length - 1) {
          setCanSkip(false);
          return;
        }

        setCanSkip(true);
      }
    }
  }

  function changeSongState(newState: boolean)
  {
    if (audioRef.current) {
      if (newState) {
        if(audioRef.current.currentTime >= timeStopsDurations[timeStopIndex.current]) {
          audioRef.current.currentTime = 0;
        }

        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }

  function playNextTimeStop()
  {
    const newIndex = timeStopIndex.current + 1;
    if (newIndex >= timeStops.length) {
      setCanSkip(false);
      timeStopIndex.current = -1;
      return;
    }

    timeStopIndex.current = newIndex;
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <div>
        {song && (
          <>
            <AudioPlayer
              previewUrl={song.previewUrl}
              audioRef={audioRef}
              handleTimeUpdate={handleTimeUpdate}
            />
            <div className="flex flex-col items-center gap-4">
              <img src={song.imageUrl} alt={song.title} />
              <h2>{song.title}</h2>
              <p>{song.artist}</p>
              <p>{song.releaseDate}</p>
              <p>{song.genre}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-950 text-white font-bold py-2 px-4 rounded"
                onClick={() => changeSongState(!isPlaying)}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <ProgressBar progress={progress} />
              <button
                disabled={!canSkip}
                className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-950 text-white font-bold py-2 px-4 rounded"
                onClick={() => playNextTimeStop()}
              >
                Skip
              </button>
            </div>
          </>
        )}

        <button
          onClick={nextSong}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next song
        </button>
      </div>
    </>
  );
}

export default App