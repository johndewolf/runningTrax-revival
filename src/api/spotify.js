export async function getProfileName(token) {
  fetch(' https://api.spotify.com/v1/me', { headers:
    {
      Authorization: `Bearer ${token}`
    }
  })
}