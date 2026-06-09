import { ARTIST } from "./static";
import type { Song } from "./types";

export async function getRandomSong(): Promise<Song>
{
    const randomArtist = ARTIST[Math.floor(Math.random() * ARTIST.length)];
    const songs = await getArtistSongs(randomArtist, 30);
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    
    return {
      title: randomSong.trackName,
      artist: randomSong.artistName,
      imageUrl: randomSong.artworkUrl100,
      previewUrl: randomSong.previewUrl,
      releaseDate: randomSong.releaseDate,
      genre: randomSong.primaryGenreName,
      id: randomSong.trackId,
    };
}

async function getArtistSongs(artist: string, limit: number): Promise<any[]>
{
    const songsQuery = `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&media=music&entity=song&attribute=artistTerm&limit=${limit}&country=pl`;
    const response = await fetch(songsQuery);
    const songs = (await response.json()).results;

    return songs;
}

export async function getSongsByTerm(term: string, limit: number): Promise<Song[]> {
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
    }));
}