export const authEndpoint = 'https://accounts.spotify.com/authorize'
export const clientId = 'fdbcee0e40724b0cb9d702be34d0762f'
export const prodUrl = 'https://modest-shannon-870e12.netlify.app';
export const redirectUri = process.env.NODE_ENV === 'development' ? "http://localhost:3000/build" : `${prodUrl}/build`;
export const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-modify-public",
  "playlist-modify-private"
];