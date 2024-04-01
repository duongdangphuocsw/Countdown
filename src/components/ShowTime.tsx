import { CommonComponentInterface } from "~/interfaces";

interface ShowTimeInterface extends CommonComponentInterface {
  hours?: string;
  minutes?: string;
  seconds?: string;
  milliseconds?: string;
}
const ShowTime = ({
  className,
  hours,
  minutes,
  seconds,
  milliseconds,
}: ShowTimeInterface) => {
  const TimeItem = ({ time }: { time: string }) => {
    return <span className="text-3xl">{time || "00"}</span>;
  };
  return (
    <div className="bg-red-500">
      <TimeItem time={hours || "00"} />
      <span> : </span>
      <TimeItem time={minutes || "00"} />
      <span> : </span>
      <TimeItem time={seconds || "00"} />
      <span>, </span>
      <TimeItem time={milliseconds || "00"} />
    </div>
  );
};
export default ShowTime;
