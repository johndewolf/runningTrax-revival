import axios from 'axios'


export const getGenreSeeds = (token) => {
  return axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds',
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
export const createPlaylist = (token, user_id, title, description) => {
  return axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists`,
    {
      name: title,
      description: description
    },
    {headers: {"Authorization": `Bearer ${token}`},
  })
}

export const addTracksToPlaylist = (token, playlistId, tracks) => {
  return axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    JSON.stringify({
      uris: tracks,
    }),
    {headers: {"Authorization": `Bearer ${token}`},
  })
}

export const getMileTracks = (tracks, target)  => {
  return axios.post(`https://ellv0k7zb8.execute-api.us-east-1.amazonaws.com/dev/tracks`,
    JSON.stringify({
      tracks: tracks,
      target: target
    })
  )
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

