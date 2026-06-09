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
    };
}

async function getArtistSongs(artist: string, limit: number): Promise<any[]>
{
    const songsQuery = `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&media=music&entity=song&attribute=artistTerm&limit=${limit}`;
    const response = await fetch(songsQuery);
    const songs = (await response.json()).results;

    return songs;
}