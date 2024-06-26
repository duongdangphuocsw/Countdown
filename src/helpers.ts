export const formatedTime = (time: number) => {
  const hours = "00";
  const minutes = Math.floor(time / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const milliseconds = (time % 1000).toString().padStart(3, "0");
  return { hours, minutes, seconds, milliseconds };
};
