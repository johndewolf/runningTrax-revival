export const formatMinutes = (time) => {
  return (Math.floor(time / 60));
}

export const formatSeconds = (time) => {
  let minutes = Math.floor(time / 60);
  return time - minutes * 60;
}
export const formatTimeString = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Number(time - minutes * 60).toFixed(0);
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  if (seconds === 60) {
    seconds = '00'
    minutes += 1;
  }
  return `${minutes}:${seconds}`;
}

export const roundToTwoPlaces = (num) => {
  return Math.round( num * 100 + Number.EPSILON ) / 100;
}

export const formatArtistName = (artistArr) => {
  return artistArr.map((artist) => artist.name).join(', ')
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

export const presets = {
  rolling: [
    {
      genre: 'alt-rock',
      tempo: 131,
      duration: 480,
      editing: false
    },
    {
      genre: 'bluegrass',
      tempo: 150,
      duration: 360,
      editing: false
    },
    {
      genre: 'rock',
      tempo: 130,
      duration: 480,
      editing: false
    },
    {
      genre: 'bluegrass',
      tempo: 160,
      duration: 360,
      editing: false
    },
    {
      genre: 'indie',
      tempo: 135,
      duration: 480,
      editing: false
    },
    {
      genre: 'funk',
      tempo: 170,
      duration: 360,
      editing: false
    },
    {
      genre: 'indie',
      tempo: 140,
      duration: 480,
      editing: false
    }
  ],
  building: [
    {
      genre: 'chill',
      tempo: 140,
      duration: 300,
      editing: false
    },
    {
      genre: 'ambient',
      tempo: 150,
      duration: 360,
      editing: false
    },
    {
      genre: 'electronic',
      tempo: 170,
      duration: 420,
      editing: false
    },
    {
      genre: 'breakbeat',
      tempo: 196,
      duration: 480,
      editing: false
    },
    {
      genre: 'dubstep',
      tempo: 211,
      duration: 540,
      editing: false
    }
  ]
}