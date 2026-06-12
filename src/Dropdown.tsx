import { useEffect, useRef, useState } from "react";
import type { Song } from "./types";
import { getSongsByTerm } from "./lib";

export function Dropdown({onPick,disabled, children}:{onPick: (pick: Song) => boolean, disabled: boolean, children: React.ReactNode}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<Song[]>([]);
    const [error, setError] = useState<string | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    async function updateSearchTerm(term: string) {
        setSearchTerm(term);

        if(term.length <= 2)
        {
            return;
        }

        const foundSongs = await getSongsByTerm(term, 10);
        
        if(!foundSongs)
        {
          setError("Failed to fetch songs, please wait.");
          return;
        }

        setError(null);
        setOptions(foundSongs);
    }

    function handleOptionSelect(option: Song) {
        setIsOpen(false);
        if(onPick(option) === true)
        {
            setOptions([]);
            setSearchTerm("");
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="w-1/2 relative">
        <div className="w-full flex gap-2">
          <input
            type="text"
            placeholder="Search for a song..."
            className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => updateSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            disabled={disabled}
            />
          {children}
        </div>

        {(isOpen && !disabled) && (
          <div ref={dropdownRef} className="w-full max-h-[300px] overflow-y-auto absolute bg-[var(--bg)] z-20 my-2">
            {error && (
              <div className="p-4 text-red-500">{error}</div>
            )}
            {options.length === 0 && !error && (
              <div className="p-4 text-gray-500">No songs found.</div>
            )}
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                className="p-2 cursor-pointer hover:bg-gray-600"
              >
                <p className="text-wrap">
                    {option.title} - {option.artist}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}