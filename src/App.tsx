import { useEffect, useRef, useState } from 'react';
import './App.css'
import { getRandomSong } from "./lib.tsx";
import AudioPlayer from "./AudioPlayer.tsx";

const timeStops = [0, 0.5, 1, 3, 5, 10, 15, 30];

function App() {
  const [song, setSong] = useState<any|undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeStopIndex, setTimeStopIndex] = useState(0);

  async function fetchSong()
  {
    const randomSong = await getRandomSong();
    setSong(randomSong);
    setTimeStopIndex(0);
  }

  async function nextSong()
  {
    await fetchSong();
  }

  function handleTimeUpdate()
  {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    
      if (audioRef.current.currentTime >= timeStops[timeStopIndex]) {
        changeSongState(false);

        if(timeStopIndex == timeStops.length - 1) {
          // TODO: END GAME
        }
      }
    }
  }

  function changeSongState(newState: boolean)
  {
    setIsPlaying(newState);

    if (audioRef.current) {
      if (newState) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }

  function playNextTimeStop()
  {
    setTimeStopIndex((prev)=>{
      const newIndex = prev + 1;

      if(newIndex >= timeStops.length) {
        // TODO: END GAME
        return 0;
      }

      console.log(newIndex);
      return newIndex;
    });
    changeSongState(true);
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
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => playNextTimeStop()}
                >
                  Play
                </button>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
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