import { useState, useRef, useEffect } from "react";

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
    secondsPassed = (now - startTime) / 1000;
    secondsPassed += stopTime;
  }
  return (
    <div>
      {" "}
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
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
      {/* <button onClick={handleStop}>Stop</button>
      <button onClick={handleStart}>Start</button> */}
    </div>
  );
};
export default Page;
