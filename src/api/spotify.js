import axios from 'axios'
export const getProfileName = (token) => {
  return axios.get('https://api.spotify.com/v1/me',
    {headers: {"Authorization": `Bearer ${token}`}
  })
}

export const getGenreSeeds = (token) => {
  return axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds',
    {headers: {"Authorization": `Bearer ${token}`}
  })
}