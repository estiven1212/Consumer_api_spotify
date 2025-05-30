import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSpotifyToken } from '../auth/hooks/useSpotifyToken';
import '../styles/PlaylistDetail.css';

const PlaylistDetail = () => {
  const { id } = useParams();
  const token = useSpotifyToken();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPreview, setCurrentPreview] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPlaylist(data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPlaylist();
  }, [id, token]);

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  const handlePreview = (previewUrl) => {
    if (previewUrl) {
      setCurrentPreview(previewUrl);
    }
  };

  if (loading) return <p>Cargando playlist...</p>;
  if (!playlist) return <p>No se pudo cargar la playlist</p>;

  return (
    <div className="playlist-detail">
      <div className="playlist-content">
        <h2>{playlist.name}</h2>
        {playlist.description && <p>{}</p>}
        {playlist.images?.[0]?.url && (
          <img src={playlist.images[0].url} alt={playlist.name} />
        )}
        
        <div className="song-list-header">
          <span>#</span>
          <span>Título</span>
          <span>Artista</span>
          <span>Duración</span>
          <span>Preview</span>
        </div>

        <ul>
          {playlist.tracks.items.map((item, index) => (
            <li key={item.track.id || index}>
              <span className="song-number">{index + 1}</span>
              <span className="song-name">{item.track.name}</span>
              <span className="song-artist">
                {item.track.artists.map(a => a.name).join(', ')}
              </span>
              <span className="song-duration">
                {formatDuration(item.track.duration_ms)}
              </span>
              <span className="song-preview">
                <button
                  className="play-button"
                  onClick={() => handlePreview(item.track.preview_url)}
                  disabled={!item.track.preview_url}
                  title={item.track.preview_url ? 'Reproducir preview' : 'Sin preview disponible'}
                >
                  {item.track.preview_url ? '▶' : '🔒'}
                </button>
              </span>
            </li>
          ))}
        </ul>

        {currentPreview && (
          <audio
            src={currentPreview}
            controls
            autoPlay
            onEnded={() => setCurrentPreview(null)}
            className="audio-preview"
          />
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;