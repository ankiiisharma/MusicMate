'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSkeleton from "../../components/LoadingSkelton";

import { IoIosWarning } from "react-icons/io";

interface Artist {
  album: any;
  id: string;
  name: string;
  images: { url: string }[];
}

const DashboardPage = () => {
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Artist[]>([]);
  const [currentPlaying, setcurrentPlaying] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchspotifydata = async () => {
      if (!session?.accessToken) {
        setIsLoading(false);
        return;
      }

      // Fetch top artists
      try {
        const topArtistsres = await axios.get<{ items: Artist[] }>(
          'https://api.spotify.com/v1/me/top/artists',
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        setTopArtists(topArtistsres.data.items);
      } catch (err) {
        setError('Failed to fetch top artists. Please try again later.');
        console.error("Error fetching top artists:", err);
      } finally {
        setIsLoading(false);
      }

      // Fetch currently playing
      try {
        const currentPlayingRes = await axios.get(
          'https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          }
        );
        setcurrentPlaying(currentPlayingRes.data);
      } catch (err) {
        setError('Failed to fetch current playing track. Please try again later.');
        console.error("Error fetching current playing track:", err);
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
