export const formatMinutes = (time) => {
  return (Math.floor(time / 60));
}

export const formatSeconds = (time) => {
  let minutes = Math.floor(time / 60);
  return time - minutes * 60;
}
export const formatTimeString = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  return `${minutes}:${seconds}`;
}