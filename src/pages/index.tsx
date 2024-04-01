import Image from "next/image";
import Link from "next/link";
import App from "./_app";
import moment, { Duration } from "moment";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { setInterval } from "timers/promises";
import { edgeServerPages } from "next/dist/build/webpack/plugins/pages-manifest-plugin";
import { StringLiteral } from "typescript";
import Setting from "~/components/Setting";
import useSound from "use-sound";
interface recommend {
  value: number;
  type: string;
}
export default function Countdown() {
  const [countdownTime, setCountdownTime] = useState<number>(0);
  const [inputHour, setinputHour] = useState<number>(0);
  const [inputMin, setinputMin] = useState<number>(0);
  const [isEndtime, setisEndtime] = useState<boolean>(false);
  const [inputSec, setinputSec] = useState<number>(0);
  const [isCountdown, setisCountdown] = useState<any>(false);
  const [isPause, setisPause] = useState<boolean>(false);
  const timerId = useRef<number | null>(null);
  const [percent, setPercent] = useState<number>(0);
  const [totalCountdownTime, setTotalCountdownTime] = useState<number>(0);
  const [play, { stop }] = useSound(
    "/songs/smartphone_vibrating_alarm_silent-7040.mp3"
  );
  const [isNotificationEndtime, setIsNotificationEndtime] =
    useState<boolean>(false);
  const [listRecommend, setlistRecommend] = useState<recommend[]>([
    { value: 15, type: "second" },
    { value: 20, type: "second" },
    { value: 30, type: "second" },
    { value: 45, type: "second" },
    { value: 1, type: "minute" },
    { value: 2, type: "minute" },
    { value: 5, type: "minute" },
    { value: 30, type: "minute" },
    { value: 45, type: "minute" },
  ]);

  useEffect(() => {
    if (totalCountdownTime > 0) {
      setPercent(
        Math.floor(
          ((totalCountdownTime - countdownTime) / totalCountdownTime) * 100
        )
      );
    }
    if (countdownTime <= 0 && timerId.current) {
      window.clearInterval(timerId.current);
      // setisCountdown(false);
      setisEndtime(true);
      // play();
      if (isCountdown) {
        play();
      }
    }
  }, [countdownTime]);

  const handleCountdown = (totalTime: number) => {
    if (totalTime > 0) {
      timerId.current = window.setInterval(() => {
        setCountdownTime((prev) => prev - 1);
      }, 1000);
      setisCountdown(true);
      setisEndtime(false);
    }
  };
  const handleStartCountdown = () => {
    const totalTime = inputSec + inputMin * 60 + inputHour * 3600;
    setTotalCountdownTime(totalTime);
    setCountdownTime(totalTime);
    handleCountdown(totalTime);
    setisCountdown(totalTime > 0 ? true : false);
  };

  const handlePause = () => {
    setisPause(true);
    if (timerId.current) window.clearInterval(timerId.current);
  };

  const handleContinue = () => {
    setisPause(false);
    timerId.current = window.setInterval(() => {
      setCountdownTime((prev) => prev - 1);
    }, 1000);
  };

  const handleRestart = () => {
    setCountdownTime(totalCountdownTime);
    if (countdownTime === 0 || isPause) {
      setisPause((prev) => (prev ? false : true));
      timerId.current = window.setInterval(() => {
        setCountdownTime((prev) => prev - 1);
      }, 1000);
      setisEndtime(false);
    }
    stop();
  };

  const handleStopCountdown = () => {
    setisCountdown(false);
    setCountdownTime(0);
    stop();
    if (timerId.current) window.clearInterval(timerId.current);
    setisPause(false);
  };

  const formatTime = (time: number) => {
    if (time > 0) {
      let hours: any = Math.floor(time / 3600);
      let minutes: any = Math.floor((time - hours * 3600) / 60);
      let seconds: any = time - hours * 3600 - minutes * 60;
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      return hours + " : " + minutes + " : " + seconds;
    }
    return "00 : 00 : 00";
  };

  const handleSelectRecommend = (value: number, type: string) => {
    const totalTime = type === "second" ? value : value * 60;
    setTotalCountdownTime(totalTime);
    setCountdownTime(totalTime);
    handleCountdown(totalTime);
  };

  return (
    <div className="container">
      <header>
        <h1 className="text-red-500 text-4xl my-10 font-extrabold font-serif">
          Time countdown
        </h1>
      </header>
      <div className="countdown">
        {isCountdown ? (
          <p>{formatTime(countdownTime)}</p>
        ) : (
          <p>
            <span>{inputHour < 10 ? "0" + inputHour : inputHour}</span> :{" "}
            <span>{inputMin < 10 ? "0" + inputMin : inputMin}</span> :{" "}
            <span>{inputSec < 10 ? "0" + inputSec : inputSec}</span>
          </p>
        )}
      </div>
      <div className="setting">
        <div
          className="setTime"
          style={{ display: isCountdown ? "none" : "block" }}
        >
          <div className="configureTime">
            <div className="timeGroup setHour">
              <label htmlFor="">Set hour</label>
              <select onChange={(e) => setinputHour(parseInt(e.target.value))}>
                {Array.from({ length: 24 }, (_, index) => index).map(
                  (value: number, index: number) => (
                    <option value={value} key={index}>
                      {value < 10 ? `0${value}` : value}{" "}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="timeGroup ">
              <label htmlFor="">Set minute</label>
              <select onChange={(e) => setinputMin(parseInt(e.target.value))}>
                {Array.from({ length: 60 }, (_, index) => index).map(
                  (value: number, index: number) => (
                    <option value={value} key={index}>
                      {value < 10 ? `0${value}` : value}{" "}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="timeGroup ">
              <label htmlFor="">Set second</label>
              <select onChange={(e) => setinputSec(parseInt(e.target.value))}>
                {Array.from({ length: 60 }, (_, index) => index).map(
                  (value: number, index: number) => (
                    <option value={value} key={index}>
                      {value < 10 ? `0${value}` : value}{" "}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>{" "}
          <div className="recommendTime">
            <ul>
              {listRecommend &&
                listRecommend.length > 0 &&
                listRecommend.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectRecommend(item.value, item.type)}
                  >
                    {item.value} {item.type === "second" ? "Sec" : "Min"}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="setSound"></div>
        <div className="setNameClock"></div>
        <div
          className="rangeCoundown"
          style={{ display: isCountdown ? "block" : "none" }}
        >
          <progress id="file" value={percent} max="100"></progress>
          <div className="showPercentNumber">
            <span>{percent}%</span>
          </div>
        </div>
        <div className="start__container">
          {isCountdown ? (
            <div className="btnCountdown__container">
              {isPause ? (
                <button
                  className="continueBtn"
                  onClick={() => handleContinue()}
                  style={{ display: isEndtime ? "none" : "block" }}
                >
                  Continue
                </button>
              ) : (
                <button
                  className="pauseBtn"
                  onClick={() => handlePause()}
                  style={{ display: isEndtime ? "none" : "block" }}
                >
                  Pause
                </button>
              )}

              <button
                className="restartBtn"
                onClick={() => handleRestart()}
                style={{ width: isEndtime ? "65%" : "30%" }}
              >
                Restart
              </button>
              <button onClick={() => handleStopCountdown()} className="stopBtn">
                Stop
              </button>
            </div>
          ) : (
            <button onClick={() => handleStartCountdown()} className="startBtn">
              Start Countdown
            </button>
          )}
        </div>
        <Setting className="text-2xl" />
      </div>
    </div>
  );
}
