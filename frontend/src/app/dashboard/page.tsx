'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSkeleton from "../../components/LoadingSkelton";
import { IoIosWarning } from "react-icons/io";
import { BsVinylFill, BsClockHistory } from "react-icons/bs";
import { GiLoveSong, GiWorld } from "react-icons/gi";
import { FaHeadphones } from "react-icons/fa";

interface Artist {
  album: any;
  id: string;
  name: string;
  images: { url: string }[];
  genres?: string[];
}

interface AudioFeatures {
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
}

const DashboardPage = () => {
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Artist[]>([]);
  const [currentPlaying, setcurrentPlaying] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures | null>(null);
  const [recentTracks, setRecentTracks] = useState<any[]>([]);
  const [listeningStats, setListeningStats] = useState<any>({});

  useEffect(() => {
    const fetchspotifydata = async () => {
      if (!session?.accessToken) {
        setIsLoading(false);
        return;
      }

      // Fetch top artists
      try {
        const [topArtistsres, currentPlayingRes, topTracksRes, recentTracksRes] = await Promise.all([
          axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }),
          axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }),
          axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }),
        ]);

        
        setTopArtists(topArtistsres.data.items);
        setcurrentPlaying(currentPlayingRes.data);
        setTopTracks(topTracksRes.data.items);
        // setRecentTracks(recentTracksRes.data.items);

        // Fetch audio features for top tracks
        const trackIds = topTracksRes.data.items.map((track: any) => track.id).join(',');
        const featuresResponse = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        const features = featuresResponse.data.audio_features;
        const averageFeatures = {
          danceability: features.reduce((acc: number, curr: any) => acc + curr.danceability, 0) / features.length,
          energy: features.reduce((acc: number, curr: any) => acc + curr.energy, 0) / features.length,
          valence: features.reduce((acc: number, curr: any) => acc + curr.valence, 0) / features.length,
          tempo: features.reduce((acc: number, curr: any) => acc + curr.tempo, 0) / features.length,
        };
        setAudioFeatures(averageFeatures);

        // Calculate listening stats
        const genres = topArtistsres.data.items.flatMap((artist: any) => artist.genres);
        const uniqueGenres = new Set(genres);

        setListeningStats({
          totalArtists: topArtistsres.data.items.length,
          uniqueGenres: uniqueGenres.size,
          avgTempo: Math.round(averageFeatures.tempo),
          // recentlyPlayed: recentTracksRes.data.items.length
        });

      } catch (err) {
        setError('Failed to fetch top artists. Please try again later.');
        console.error("Error fetching top artists:", err);
      } finally {
        setIsLoading(false);
      }

      // Fetch top tracks
      try {
        const topTracksRes = await axios.get(
          'https://api.spotify.com/v1/me/top/tracks',
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
        setTopTracks(topTracksRes.data.items);
      } catch (err) {
        setError('Failed to fetch top tracks. Please try again later.');
        console.error("Error fetching top tracks:", err);
      }
    };
    fetchspotifydata();
  }, [session]);

  if (isLoading) {
    return (
      <div>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <> 
      <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold mb-5">
          <div className="m-2 flex flex-col justify-center items-center text-red-500">
            <IoIosWarning />
            <h1 className="text-transparent px-2 bg-gradient-to-r font-bolder from-red-500 to-red-700 bg-clip-text">
              {error}
            </h1>
          </div>
        </div>
      </>
    )
  }

  return (
    <>

<div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
              <h1>
              MusicMate reveals your 
                <span className="text-transparent px-2 bg-gradient-to-r font-bolder from-green-500 to-green-700 bg-clip-text">
                Spotify listening trends
                </span >
                and favorites.
              </h1>
            </div>      

      {/* Current Playing Section */}
      <div className="p-8">
        <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold mb-5">
          <h1>
            <span className="text-transparent px-2 bg-gradient-to-r font-bolder from-green-500 to-green-700 bg-clip-text">
              Currently Vibing on!
            </span>
          </h1>

          {currentPlaying ? (
            <div className="flex flex-col md:flex-row justify-center items-center mt-5 mb-2 py-2 gap-4">
              <img
                src={currentPlaying.item.album.images[0]?.url}
                className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-xl object-cover"
              />
              <div>
                <h2 className="text-4xl font-bold">{currentPlaying.item.name}</h2>
                <h3 className="text-xl text-slate-600 font-bold">
                  {currentPlaying.item.artists.map((artist: any) => artist.name).join(', ')}
                </h3>
                <div className="relative z-10 w-full mt-4">
                  <div className="bg-gray-200 h-2 rounded-sm">
                    <div
                      className="bg-green-500 h-2 rounded-sm"
                      style={{ width: `${(currentPlaying.progress_ms / currentPlaying.item.duration_ms) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1>User isn't Vibing Right Now</h1>
          )}
        </div>
      </div>


      {/* Music stats overview */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
        {listeningStats && (
          <>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <FaHeadphones className="text-green-500 text-2xl" />
              </div>
              <p className="text-3xl font-bold text-green-500">{listeningStats.totalArtists}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Top Artists</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <GiWorld className="text-green-500 text-2xl" />
              </div>
              <p className="text-3xl font-bold text-green-500">{listeningStats.uniqueGenres}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Unique Genres</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <BsClockHistory className="text-green-500 text-2xl" />
              </div>
              <p className="text-3xl font-bold text-green-500">{listeningStats.avgTempo}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Avg BPM</p>
            </div>
          </>
        )}
      </div>


      {/* New Feature: Music Mood Analysis */}
      {audioFeatures && (
        <div className="p-8">
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold mb-5">
            <h1>
              <span className="text-transparent px-2 bg-gradient-to-r font-bolder from-green-500 to-green-700 bg-clip-text">
                Your Music Mood
              </span>
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <p className="text-lg font-semibold mb-2">Energy</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${audioFeatures.energy * 100}%` }}></div>
              </div>
              <p className="mt-2 text-green-500 font-bold">{Math.round(audioFeatures.energy * 100)}%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <p className="text-lg font-semibold mb-2">Dance</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${audioFeatures.danceability * 100}%` }}></div>
              </div>
              <p className="mt-2 text-green-500 font-bold">{Math.round(audioFeatures.danceability * 100)}%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <p className="text-lg font-semibold mb-2">Happiness</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${audioFeatures.valence * 100}%` }}></div>
              </div>
              <p className="mt-2 text-green-500 font-bold">{Math.round(audioFeatures.valence * 100)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* New Feature: Recently Played */}
      <div className="p-4">
        <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold mb-5">
          <h1>
            <span className="text-transparent px-2 bg-gradient-to-r font-bolder from-green-500 to-green-700 bg-clip-text">
              Recently Played
            </span>
          </h1>
        </div>
        <div className="flex overflow-x-auto gap-4 p-4">
          {recentTracks.slice(0, 5).map((track: any) => (
            <div key={track.track.id} className="flex-shrink-0 w-48">
              <img
                src={track.track.album.images[0].url}
                alt={track.track.name}
                className="w-48 h-48 rounded-xl object-cover"
              />
              <p className="font-bold mt-2 text-sm truncate">{track.track.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {track.track.artists[0].name}
              </p>
            </div>
          ))}
        </div>
      </div>


      {/* Top Artists Section */}
      <div className="p-4">
        <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold mb-5">
          <h1>
            <span className="text-transparent px-2 bg-gradient-to-r font-bolder from-green-500 to-green-700 bg-clip-text">
              Top Artists
            </span>
          </h1>
        </div>

        {topArtists.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 gap-y-5 justify-center">
            {topArtists.slice(0, 5).map((artist) => (
              <> 
                <div className="flex justify-center flex-col items-center"> 
                <img
                key={artist.id}
                src={artist.images[0].url}
                className="rounded-xl w-[300px] h-[300px] object-cover"
              /> 
              <p className="font-bold mt-2 mb-2"> {artist.name} </p>
              </div>
              </>
            ))}
          </div>
        ) : (
          <p>No top artists found. Try listening to more music!</p>
        )}
      </div>

      {/* Top Tracks Section */}
      <div className="p-4 mt-6">
        <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold mb-5">
          <h1>
            <span className="text-transparent px-2 bg-gradient-to-r font-bolder from-green-500 to-green-700 bg-clip-text">
              Top Tracks
            </span>
          </h1>
        </div>

        {topTracks.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 gap-y-5 justify-center">
            {topTracks.slice(0, 5).map((track) => (
              <> 
                <div className="flex justify-center flex-col items-center"> 
                <img
                key={track.id}
                src={track.album.images[0].url}
                className="rounded-xl w-[300px] h-[300px] object-cover"
              />
              <p className="font-bold mt-2 mb-2"> {track.name} </p>
                </div>
              </>
            ))}
          </div>
        ) : (
          <p>No top tracks found. Try listening to more music!</p>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
