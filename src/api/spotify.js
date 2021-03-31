import axios from 'axios'

export const getGenreSeeds = (token) => {
  return axios.get('  https://api.spotify.com/v1/recommendations/available-genre-seeds',
    {headers: {"Authorization": `Bearer ${token}`}
  })
}

export const getPlaylistData = (token, miles) => {

  return getSeedTracks(token, miles)
    .then(tracks => {
      let returnData = miles.map((mile, index) => {
        let totalTracks = tracks[index].tracks;
        let idealDuration = mile.duration * 1000;
        return getMileTracks(totalTracks, idealDuration)
      })
      return returnData;
    })
}


const getMileTracks = (tracks, target)  => {
  tracks.sort((trackA, trackB) => {
    return trackA.duration_ms - trackB.duration_ms;
  })

  let returnTracks = [];
  let offset = target;
  let index = 0;
  while (offset > 0 && index < 20) {
    returnTracks.push(tracks[index]);
    offset = offset - tracks[index].duration_ms;
    index++;
  }

  let overValue = offset * -1;
  let underValue = returnTracks.slice(0, returnTracks.length - 1).reduce((iterator, track) => {
    return track.duration_ms + iterator;
  }, 0)

  if (overValue - offset <= target - underValue) {
    return returnTracks;
  }
  
  return returnTracks.slice(0, returnTracks.length - 1)
}

const getSeedTracks = (token, miles) => {
  let promiseData = miles.map((mile) => {
    return getRecommendation(token, mile.genre, mile.tempo)
      .then(result => {
        return result.data
      })
      .catch(error => console.log(error))
  })
  return Promise.all(promiseData);

}
const getRecommendation = (token, genre, tempo) => {
  return axios.get('https://api.spotify.com/v1/recommendations',
    {
      params: {
        seed_genres: genre,
        target_tempo: tempo
      },
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }
  )
}

