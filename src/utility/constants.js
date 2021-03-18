export const authEndpoint = 'https://accounts.spotify.com/authorize'
export const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const redirectUri = "http://localhost:3000/build";
export const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];