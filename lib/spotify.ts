// https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens

let cachedAccessToken: string | null = null;
let tokenExpiry: number = 0;

export async function getAccessToken() {
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiry) {
    return cachedAccessToken;
  }

  const refreshToken = process.env.SPOT_REFRESH_TOKEN;
  if (!refreshToken) throw new Error('Missing Spotify refresh token');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.SPOT_CLIENT_ID}:${process.env.SPOT_CLIENT_SECRET}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error(`Failed to get access token. Status: ${response.status}`);
  }

   const data = await response.json();
  cachedAccessToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000; // Subtract buffer
  return cachedAccessToken;
}

