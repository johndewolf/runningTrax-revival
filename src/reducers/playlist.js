import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const getMileTracks = (tracks, target)  => {
  //more accurate (but much slower) algorithm in api/spotify.js file. TODO: use updated algorithm, setup on lambda and move the logic to the api/spotify.js file to clean up this file and make it re-usable. 
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

const getRecommendation = async (token, genre, tempo) => {
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
const getSeedTracks = async (token, miles) => {
  let promiseData = miles.map((mile) => {
    return getRecommendation(token, mile.genre, mile.tempo)
      .then(result => {
        let totalTracks = result.data.tracks;
        let idealDuration = mile.duration * 1000
        return getMileTracks(totalTracks, idealDuration)
      })
      .catch(error => console.log(error))
  })
  return Promise.all(promiseData);
}

export const fetchPlaylistData = createAsyncThunk(
  'playlist/fetchData',
  async (data, thunkAPI) => {
    const {token, sets} = data;
    const response = await getSeedTracks(token, sets);
    return response;
  }
)

export const exportPlaylist = createAsyncThunk(
  'playlist/exportPlaylist',
  async (data, thunkAPI) => {
    return axios.post(`https://api.spotify.com/v1/users/${data.user_id}`,
    {
    data: {
      name: 'Running Trax Playlist',
      description: 'dope ass playlist'
    }},
    {
      headers: {
        "Authorization": `Bearer ${data.token}`
      },
    }
  )
  }
)
export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlist: [],
    inProgress: true,
    exported: false
  },
  reducers: {
  },
  extraReducers: {
    [fetchPlaylistData.fulfilled]: (state, action) => {
      state.playlist = action.payload;
      state.inProgress = false;
    },
    [fetchPlaylistData.rejected]: (state, action) => {
      state.seedData = [];
      state.inProgress = false;
    },
    [fetchPlaylistData.pending]: (state) => {
      state.inProgress = true;
    },
    [exportPlaylist.fulfilled]: (state, action) => {
      state.exported = true;
    },
    [exportPlaylist.rejected]: (state, action) => {
      state.seedData = [];
      state.exported = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateUsername, updateToken } = playlistSlice.actions

export default playlistSlice.reducer