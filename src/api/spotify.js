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

const getMileTracks = (tracks, target)  => {
  let result = [];
  let currentBest;
  tracks.sort((trackA, trackB) => {
      return trackA.duration_ms - trackB.duration_ms;
  })
  
  function findCombinations(currentSum, currentList, index) {
      console.log(currentSum)
      if (Math.abs(target - currentSum) < currentBest || typeof currentBest === 'undefined' ) {
          result.push([...currentList]);
          currentBest = Math.abs(target - currentSum);
      }

      if ( currentBest < 3000 ) {
          return;
      }
      
      //if within 3 seconds return current list, break;
      for (let i = index; i < tracks.length; i++) {
          // if (i != index && tracks[i] == tracks[i-1]) continue; //already return, go next loop(not recursion)
          currentList.push(tracks[i]);

          findCombinations(currentSum + tracks[i].duration_ms, currentList, i+1);
          currentList.pop();
      }

  }
  findCombinations(0, [], 0);
  console.log(currentBest);
  return result[result.length - 1];
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

