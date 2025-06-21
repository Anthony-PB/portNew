"use client";
import { useState } from 'react';
import styles from './spotify-sec.module.css';

interface Track {
    artists: SimpleArtist[];
    duration_ms: number;
    explicit: boolean;
    external_urls: { spotify: string };
    name: string;
    uri: string;
    album: {
        images: SimpleImage[];
        name: string;
    };
}

interface SimpleArtist {
    name: string
}

interface SimpleImage {
    url: string
}

interface Artist {
    external_urls: { spotify: string };
    followers: { total: number };
    genres: string[];
    name: string;
    images: SimpleImage[];
    uri: string;
}

export default function MySpotify() {
    const [activeType, setActiveType] = useState<'tracks' | 'artists'>('tracks');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [hasData, setHasData] = useState(false);

    // Everytime we have to fetch data from switching or refreshing!
    const fetchSpotifyData = async (type = activeType) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`/api/spotify?type=${type}&time_range=short_term&limit=10`);

            if (!response.ok) {
                throw new Error('Failed to fetch Spotify data');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if(type === 'tracks'){
                setTracks(data.items);
            } else {
                setArtists(data.items);
            }
            setHasData(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // Super simple just change the active type and fetch if we have not yet for the type
    const handleTabSwitch = (newType: 'tracks' | 'artists') => {
        setActiveType(newType);
        
        // If switching to a type we don't have data for, fetch it
        // The only way to actually get fresh data is by first arriving or using the refresh button to fetch again
        if (newType === 'tracks' && tracks.length === 0) {
            fetchSpotifyData(newType);
        } else if (newType === 'artists' && artists.length === 0) {
            fetchSpotifyData(newType);
        }
    };

    // Initial State
    const renderEmptyState = () => (
        <div className={styles.emptyState}>
            <SpotifyIcon className={styles.emptyStateIcon} />
            <h4 className={styles.emptyStateTitle}>Ready to see my music taste?</h4>
            <p className={styles.emptyStateSubtitle}>Click the button below to load my current Spotify favorites!</p>
            <div className={styles.buttonContainer}>
                <button
                    type="button"
                    onClick={() => fetchSpotifyData(activeType)}
                    disabled={loading}
                    className={styles.spotifyButton}
                >
                    {loading ? (
                        <>
                            <LoadingSpinner className={styles.spotifyIcon}/>
                            <span className={styles.spotifyText}>Loading...</span>
                        </>
                    ) : (
                        <>
                            <SpotifyIcon className={styles.spotifyIcon} />
                            <span className={styles.spotifyText}>Load My Music</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );

    // Shows up if there is an error!
    const errorRender = () => (
        <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
            <button
                type="button"
                onClick={() => fetchSpotifyData(activeType)}
                className={styles.errorButton}
            >
                Try again
            </button>
        </div>
    );

    // Header for labeling the purpose of the section
    const renderHeader = () => {
        return(
        <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
                <SpotifyIcon />
                <div>
                    <h3 className={styles.headerTitle}>My Music</h3>
                    <p className={styles.headerSubtitle}>
                        Take a gander at what I have been listening to!
                    </p>
                    <p className={styles.headerSubtitle}>
                        Notice: No matter what these rankings say Vacations is #1
                    </p>
                </div>
            </div>
            <button
                onClick={() => fetchSpotifyData(activeType)}
                disabled={loading}
                className={styles.refreshButton}
            >
                {loading ? <LoadingSpinner className={styles.loadingSpinnerSmall} /> : '↻ '}
                Refresh
            </button>
        </div>
    )}

    const renderTabSwitcher = () => (
        <div className={styles.tabContainer}>
            <button
                onClick={() => handleTabSwitch('tracks')}
                className={`${styles.tabButton} ${
                    activeType === 'tracks' ? styles.tabButtonActive : styles.tabButtonInactive
                }`}
            >
                Top Tracks
            </button>
            <button
                onClick={() => handleTabSwitch('artists')}
                className={`${styles.tabButton} ${
                    activeType === 'artists' ? styles.tabButtonActive : styles.tabButtonInactive
                }`}
            >
                Top Artists
            </button>
        </div>
    )

    const renderLoadingState = () => (
        <div className={styles.loadingContainer}>
            {[...Array(5)].map((_, i) => (
                <div key={i} className={styles.loadingItem}>
                    <div className={styles.loadingNumber}></div>
                    <div className={styles.loadingImage}></div>
                    <div className={styles.loadingContent}>
                        <div className={styles.loadingTitle}></div>
                        <div className={styles.loadingSubtitle}></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const convertMS = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    const renderArtists = () => (
        <div className={styles.contentContainer}>
            {artists.slice(0, 10).map((artist, index) => (
                <div key={artist.uri} className={styles.itemContainer}>
                    <span className={styles.itemNumber}>{index + 1}</span>
                    
                    <img 
                        src={artist.images[0]?.url || '/placeholder.svg'} 
                        alt={artist.name}
                        className={styles.artistImage}
                    />
                    
                    <div className={styles.itemContent}>
                        <p className={styles.artistName}>{artist.name}</p>
                        
                        <div className={styles.genreContainer}>
                            {artist.genres.slice(0, 3).map((genre) => (
                                <span key={genre} className={styles.genreBadge}>
                                    {genre}
                                </span>
                            ))}
                            {artist.genres.length > 3 && (
                                <span className={styles.genreMore}>+{artist.genres.length - 3} more</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.followersContainer}>
                        <p className={styles.followersLabel}>Followers</p>
                        <p className={styles.followersCount}>{artist.followers.total}</p>
                    </div>

                    <a 
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.spotifyLink}
                    >
                        <SpotifyIcon className={styles.spotifyLinkIcon} />
                    </a>
                </div>
            ))}
        </div>
    );
    
    const renderTracks = () => (
        <div className={styles.contentContainer}>
            {tracks.slice(0, 10).map((track, index) => (
                <div key={track.uri} className={styles.itemContainer}>
                    <span className={styles.itemNumber}>{index + 1}</span>
                    
                    <img 
                        src={track.album.images[0]?.url || '/placeholder.svg'} 
                        alt={track.album.name}
                        className={styles.artistImage}
                    />
                
                    <div className={styles.itemContent}>
                        <div className={styles.trackInfo}>
                            <p className={styles.trackName}>{track.name}</p>
                            {track.explicit && (
                                <span className={styles.explicitBadge}>E</span>
                            )}
                        </div>
                        <p className={styles.trackArtists}>
                            {track.artists.map(artist => artist.name).join(', ')}
                        </p>
                    </div>
                    
                    <span className={styles.trackDuration}>
                        {convertMS(track.duration_ms)}
                    </span>
                    
                    <a 
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.spotifyLink}
                    >
                        <SpotifyIcon className={styles.spotifyLinkIcon} />
                    </a>
                </div>
            ))}
        </div>
    );
    
    const renderContent = () => {
        if(loading){
            return renderLoadingState();
        }

        if(activeType == 'tracks'){
            return renderTracks();
        }else{
            return renderArtists();
        }
    }

    return (
        <div className={styles.mainContainer}>
            {error && errorRender()}
            {!hasData && !loading ? renderEmptyState() : (
                <div>
                    {renderHeader()}
                    {renderTabSwitcher()}
                    {renderContent()}
                </div>
            )}
        </div>
    );
}

function SpotifyIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
      <path 
        fill="#1DB954" 
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"
      />
    </svg>
  );
}

function LoadingSpinner({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} ${styles.animateSpin}`} viewBox="0 0 24 24" fill="none">
      <circle 
        className={styles.opacity25}
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className={styles.opacity75}
        fill="currentColor" 
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}