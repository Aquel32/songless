import { timeStopsDurations } from "./static";

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-[60%] h-10 bg-gray-200 my-20 relative overflow-hidden">
      <div
        className="bg-blue-500 h-full"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full flex">
        {timeStopsDurations.map((stop, index) => {
          const previousStop = timeStopsDurations[index - 1] ?? 0;
          const width = ((stop - previousStop) / timeStopsDurations[timeStopsDurations.length - 1]) * 100;

          return (
            <div
              key={index}
              className="h-full flex-none box-border border-red-400 border-2"
              style={{ width: `${width}%` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}