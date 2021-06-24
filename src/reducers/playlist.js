import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getMileTracks } from '../api/spotify'
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
      .then( async (result) => {
        let totalTracks = result.data.tracks;
        let idealDuration = mile.duration * 1000;
        let compiledTracks = await getMileTracks(totalTracks, idealDuration);
        return compiledTracks.data.result;
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
      state.inProgress = true;
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