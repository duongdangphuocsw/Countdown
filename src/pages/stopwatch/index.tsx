import { useState, useRef, useEffect } from "react";
import { formatedTime } from "~/helpers";
import ShowTime from "~/components/ShowTime";
const Page = () => {
  const [startTime, setStartTime] = useState<any>(null);
  const [now, setNow] = useState<any>(null);
  const [stopTime, setStopTime] = useState(0);
  const intervalRef = useRef<any>(null);
  const [isStop, setIsStop] = useState<boolean>(true);
  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
    setIsStop(false);
  }
  function handleStop() {
    setIsStop(true);
    clearInterval(intervalRef.current);
    setStopTime(secondsPassed);
  }

  const handleReset = () => {
    setStopTime(0);
    setStartTime(Date.now());
    setNow(Date.now());
  };

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = now - startTime;
    // secondsPassed += stopTime;
  }

  const { hours, minutes, seconds, milliseconds } = formatedTime(secondsPassed);
  return (
    <div className="">
      <div className="bg-red-500">
        <ShowTime
          hours={hours}
          milliseconds={milliseconds}
          minutes={minutes}
          seconds={seconds}
        />
        <button onClick={handleReset} disabled={!isStop}>
          Reset
        </button>
        {isStop ? (
          <>
            <button onClick={handleStart}>Start</button>
          </>
        ) : (
          <>
            <button onClick={handleStop}>Stop</button>
          </>
        )}
      </div>
    </div>
  );
};
export default Page;
