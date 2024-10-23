'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import LoadingSkelton from '@/components/LoadingSkelton';
import "../../../styles/globals.css";

interface ArtistImage {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  id: string;
  name: string;
  images: ArtistImage[];
}

const TopArtists: React.FC = () => {
  const { data: session } = useSession();

  // Use proper types for the state
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      if (!session?.accessToken) return;

      try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        setArtists(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        console.error(error);
      } finally {
        console.log('Top Artists fetched');
        //loading image
      }
    };

    fetchTopArtists();
  }, [session]);

  if (!session) {
    return (
      <>
        <div className='w-full justify-center items-center px-10 flex mt-11'>
          <div className='flex flex-col'>
            <div className='flex gap-3'>
              <LoadingSkelton />
              <LoadingSkelton />
              <LoadingSkelton />
            </div>
            <div className='flex gap-3'>
              <LoadingSkelton />
              <LoadingSkelton />
              <LoadingSkelton />
            </div>
            <div className='flex gap-3'>
              <LoadingSkelton />
              <LoadingSkelton />
              <LoadingSkelton />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='mt-11'>
        <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold mb-5">
          <h1>
            <span className="text-transparent px-2 bg-gradient-to-r font-bolder from-green-500 to-green-700 bg-clip-text">
              Top Artists
            </span>
          </h1>
        </div>

        {artists.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 gap-y-5 justify-center">
            {artists.map((artist) => (
              <div key={artist.id} className="flex justify-center flex-col items-center">
                <img
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  className="rounded-xl w-[300px] h-[300px] object-cover"
                />
                <p className="font-bold mt-2 mb-2">{artist.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className='w-full justify-center items-center px-10 flex mt-11'>
              <div className='flex flex-col'>
                <div className='flex gap-3'>
                  <LoadingSkelton />
                  <LoadingSkelton />
                  <LoadingSkelton />
                </div>
                <div className='flex gap-3'>
                  <LoadingSkelton />
                  <LoadingSkelton />
                  <LoadingSkelton />
                </div>
                <div className='flex gap-3'>
                  <LoadingSkelton />
                  <LoadingSkelton />
                  <LoadingSkelton />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TopArtists;
