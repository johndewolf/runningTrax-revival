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

export const getHash = () => {
  let hashArr = window.location.hash
    .substring(1)
    .split("&");

    return hashArr.reduce(function(initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
  }, {})
}

export const getUsername = (token) => {
  fetch(' https://api.spotify.com/v1/me',
    { headers:
      {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(result => {
      return result;
    })
}