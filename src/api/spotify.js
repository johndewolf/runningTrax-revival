import axios from 'axios'
export const getProfileName = (token) => {
  return axios.get('https://api.spotify.com/v1/me',
    {headers: {"Authorization": `Bearer ${token}`}
  })
}

export const getGenreSeeds = (token) => {
  return axios.get('  https://api.spotify.com/v1/recommendations/available-genre-seeds',
    {headers: {"Authorization": `Bearer ${token}`}
  })
}

export const getPlaylistData = (token, miles) => {
  console.log('firing get playlist data');
  getSeedTracks(token, miles)
    .then(tracks => {
      let returnData = miles.map((mile, index) => {
        let mileTracks = tracks[index];
        let idealDuration = mile.duration * 1000;
        let subset = findOptimalSubset(mileTracks, idealDuration);
        debugger;
      })
    })
}


const findOptimalSubset = (tracks, target) => {
  var solutions = [], currentBest

  function subsetSum(tracks, target, partial = [])   {
    if (partial.length > 0) {

      let solution = partial.reduce(function(total, currentTrack) {
        return (total + currentTrack.duration_ms);
      }, 0);
 
      let diffFromTarget = Math.abs(target - solution);
      if ( currentBest === undefined || diffFromTarget < currentBest ){
        currentBest = diffFromTarget;
        console.log(partial);
        solutions.push(partial);
      }
    }
    for (var index = 0; index < tracks.length;  index++) {
      if (currentBest === 0) {
        return solutions;
        break;
      }
      else {
        var n = tracks[index];
        var remaining = tracks.slice(index + 1, tracks.length);
        var newPartial = partial.concat(n);
        subsetSum(remaining, target, newPartial);
      }
    }
    return solutions;
  }
 var subsets = subsetSum(tracks, target)
 return subsets[subsets.length - 1];
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