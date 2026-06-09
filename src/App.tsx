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
  const timeStopIndexRef = useRef(0);
  const [timeStopIndexState, setTimeStopIndexState] = useState(0);

  async function fetchSong()
  {
    const randomSong = await getRandomSong();
    setSong(randomSong);
  }

  function setTimeStopIndex(newIndex: number)
  {
    timeStopIndexRef.current = newIndex;
    setTimeStopIndexState(newIndex);
  }

  async function nextSong()
  {
    await fetchSong();
    setTimeStopIndex(0);
    setProgress(0);
    setCanSkip(true);
    setIsPlaying(false);
  }

  function handleTimeUpdate()
  {
    if (audioRef.current) {
      if (timeStopIndexRef.current === -1)
      {
        return;
      }

      setProgress(
        (audioRef.current.currentTime /
          timeStopsDurations[timeStops.length - 1]) *
          100,
      );
    
      if (audioRef.current.currentTime >= timeStopsDurations[timeStopIndexRef.current]) {
        changeSongState(false);

        if (timeStopIndexRef.current == timeStops.length - 1) {
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
        if(audioRef.current.currentTime >= timeStopsDurations[timeStopIndexRef.current]) {
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
    const newIndex = timeStopIndexRef.current + 1;

    if(newIndex == timeStops.length - 1) {
      setCanSkip(false);
    }

    if (newIndex >= timeStops.length) {
      setCanSkip(false);
      setTimeStopIndex(-1)
      return;
    }

    setTimeStopIndex(newIndex);
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
              <ProgressBar progress={progress} timestopIndex={timeStopIndexState} />
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