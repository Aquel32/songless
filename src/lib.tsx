import { ARTIST } from "./static";
import type { Song } from "./types";

export async function getRandomSong(): Promise<Song | null>
{
    const randomArtist = ARTIST[Math.floor(Math.random() * ARTIST.length)];
    const songs = await getArtistSongs(randomArtist, 30);

    if(songs.length === 0)
    {
        return null;
    }

    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    
    return {
      title: randomSong.trackName,
      artist: randomSong.artistName,
      imageUrl: randomSong.artworkUrl100,
      previewUrl: randomSong.previewUrl,
      releaseDate: randomSong.releaseDate,
      genre: randomSong.primaryGenreName,
      id: randomSong.trackId,
      album: randomSong.collectionName,
    };
}

async function getArtistSongs(artist: string, limit: number): Promise<any[]>
{
  try {
    const songsQuery = `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&media=music&entity=song&attribute=artistTerm&limit=${limit}&country=pl`;
    const response = await fetch(songsQuery);
    const songs = (await response.json()).results;

    return songs;
  }
  catch(e)
  {
    return [];
  }
}

export async function getSongsByTerm(term: string, limit: number): Promise<Song[] | null> {
  try
  {
    const songsQuery = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=${limit}&country=pl`;
    const response = await fetch(songsQuery);
    const songs = (await response.json()).results;
    
    return songs.map((song: any) => ({
      title: song.trackName,
      artist: song.artistName,
      imageUrl: song.artworkUrl100,
      previewUrl: song.previewUrl,
      releaseDate: song.releaseDate,
      genre: song.primaryGenreName,
      id: song.trackId,
      album: song.collectionName,
    }));
  }
  catch(e)
  {
    return null;
  }
}