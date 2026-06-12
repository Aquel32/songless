import { useEffect } from "react";
import { timeStopsDurations } from "./static";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export function ProgressBar({ progress, timestopIndex }: { progress: number, timestopIndex: number }) {
  useEffect(() => {
  }, [timestopIndex]);
  
  return (
    <div className="w-[60%] h-10 bg-slate-700 my-5 relative">
      <div
        className="bg-blue-500 h-full"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full flex">
        {timeStopsDurations.map((stop, index) => {
          const previousStop = timeStopsDurations[index - 1] ?? 0;
          const width = ((stop - previousStop) / timeStopsDurations[timeStopsDurations.length - 1]) * 100;

          const isActive = index === timestopIndex;
          const border = index === 0 ? "border-r-2" : index === timeStopsDurations.length - 1 ? "border-l-2" : "border-x-2";

          return (
            <div
              key={index}
              className={`h-full flex-none box-border relative ${border} border-slate-600`}
              style={{ width: `${width}%` }}
            >
              {isActive && (
                <div className="absolute -top-8 right-0 translate-x-[55%] flex flex-col items-center">
                  <p className="text-slate-300 font-medium m-0 p-0">{timeStopsDurations[index]}s</p>
                  <ChevronDownIcon className="w-5 h-5 text-slate-300 -translate-y-2" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}