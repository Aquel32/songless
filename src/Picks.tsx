import { timeStops } from "./static";
import type { Song } from "./types";
import {ChevronDoubleDownIcon} from "@heroicons/react/24/solid";

export function Picks({picks, song, showCorrect}: {picks: (Song|boolean)[], song: Song | undefined, showCorrect: boolean})
{
    function getSongPick(pick:Song)
    {
        let finalColor = 'bg-red-500/50';

        if(song)
        {
          if(song.artist.includes(pick.artist) || pick.artist.includes(song.artist) || song.title.split(" ").some(word => pick.artist.includes(word)) || pick.artist.split(" ").some(word => song.artist.includes(word)))
          {
            finalColor = 'bg-orange-500/50';
          }

          if(pick.album === song.album)
          {
            finalColor = 'bg-yellow-500/50';
          }

          if (pick.id === song.id) {
            finalColor = "bg-green-500/50";
          }
        }

        return (
          <>
            <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10 ${finalColor}`}>
              {/* BACKGROUND */}
            </div>
            <img
              src={pick.imageUrl}
              alt="Album cover"
              className="w-8 h-8 object-cover"
            />
            <div className="flex flex-col items-start">
              <p className="font-medium text-gray-200 text-sm">
                {pick.title}{" "}
                <span className="text-xs font-thin italic text-gray-500">
                  ({new Date(pick.releaseDate).getFullYear()})
                </span>
              </p>
              <p className="text-xs text-gray-400"> {pick.artist}</p>
            </div>
          </>
        );
    }

    return (
      <>
        <div className="flex flex-col gap-2 w-auto">
          {timeStops.map((_,index) => (
            <div
              key={index}
              className="h-12 min-w-[400px] flex items-center justify-center gap-4 border-2 border-gray-600 px-8 py-2 relative"
            >
              {index >= picks.length ? (
                <></>
              ) : typeof picks[index] === "boolean" ? (
                <>
                  <div
                    className={`absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10 bg-gray-500/50`}
                  >
                    {/* BACKGROUND */}
                  </div>
                  <p className="text-gray-400 text-xl">SKIPPED</p>
                </>
              ) : (
                getSongPick(picks[index] as Song)
              )}
            </div>
          ))}
          {song && showCorrect && typeof picks[picks.length - 1] !== "boolean" && (picks[picks.length - 1] as Song).id !== song.id && (
                <>
                <ChevronDoubleDownIcon className="w-6 h-6 text-gray-400 self-center" />
                <div className="h-12 min-w-[400px] flex items-center justify-center gap-4 border-2 border-gray-600 px-8 py-2 relative">
                    {getSongPick(song)}
                </div>
                </>
            )}
        </div>
      </>
    );
}