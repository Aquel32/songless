import { useEffect, useState } from 'react';
import './App.css'
import { getRandomSong } from "./lib.tsx";
import AudioPlayer from "./AudioPlayer.tsx";

function App() {
  const [song, setSong] = useState<any|undefined>(undefined);

  async function fetchSong()
  {
    const randomSong = await getRandomSong();
    setSong(randomSong);
  }

  async function nextSong()
  {
    await fetchSong();
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <div>
        {song && (
          <div className="flex flex-col items-center gap-4">
            <img src={song.imageUrl} alt={song.title} />
            <h2>{song.title}</h2>
            <p>{song.artist}</p>
            <p>{song.releaseDate}</p>
            <p>{song.genre}</p>
            <AudioPlayer previewUrl={song.previewUrl} />
          </div>
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