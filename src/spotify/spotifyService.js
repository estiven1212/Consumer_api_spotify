const API_BASE = 'https://api.spotify.com/v1';

const headers = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const getPlaylistById = async (token, playlistId) => {
  const res = await fetch(`${API_BASE}/playlists/${playlistId}`, {
    headers: headers(token),
  });
  return await res.json();
};


export const fetchUserProfile = async (token) => {
  const res = await fetch(`${API_BASE}/me`, { headers: headers(token) });
  return await res.json();
};


export const fetchUserTopTracks = async (token) => {
  const res = await fetch(`${API_BASE}/me/top/tracks?limit=12`, { headers: headers(token) });
  return await res.json();
};


export const fetchUserTopArtists = async (token) => {
  const res = await fetch(`${API_BASE}/me/top/artists?limit=6`, { headers: headers(token) });
  return await res.json();
};

export const fetchUserPlaylists = async (token) => {
  const res = await fetch(`${API_BASE}/me/playlists?limit=6`, { headers: headers(token) });
  return await res.json();
};


export const fetchRecentlyPlayed = async (token) => {
  const res = await fetch(`${API_BASE}/me/player/recently-played?limit=6`, { headers: headers(token) });
  return await res.json();
};


export const searchSpotify = async (token, query) => {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&type=track,artist&limit=6`, {
    headers: headers(token),
  });
  return await res.json();
};


export const fetchFeaturedTracks = async (token) => {
  const res = await fetch(`${API_BASE}/browse/new-releases?limit=10`, {
    headers: headers(token),
  });

  const data = await res.json();
  const albums = data.albums?.items || [];

  const allTracks = [];

  for (const album of albums) {
    const albumRes = await fetch(album.href, {
      headers: headers(token),
    });
    const albumData = await albumRes.json();
    if (albumData.tracks?.items) {
      allTracks.push(...albumData.tracks.items);
    }
  }
  

  
  return allTracks.filter((track) => track.preview_url);
};
export const fetchFeaturedPlaylists = async (token) => {
  const res = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?limit=6`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};