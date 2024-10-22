'use client'

import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react';
import LoadingSkelton from '@/components/LoadingSkelton';
import "../../../styles/globals.css";
import { IoIosWarning } from 'react-icons/io';

interface Artist {
    id: string;
    name : string;
    url: string;
}

const TopArtists = () => {

    const {data:session} = useSession();

    const [artists, setArtists] = useState<Artist>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=> {
            const fetchTopArtists = async () => {
                if(!session?.accessToken) return;

            try{
                const TopArtistsRes = await axios.get('https://api.spotify.com/v1/me/top/artists',{
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    },
                });
                setArtists(TopArtistsRes.data.items)
                console.log(TopArtistsRes.data.items)
            }catch(e){
                console.error(e)
            }finally{
                // setLoading(false)
                console.log("hii")
            };
         
        }
        fetchTopArtists();
    },[session])

    if(!session)(
          <> 
              <div className='w-full justify-center items-center px-10 flex mt-11'> 
            < div className='flex flex-col'> 
              <div className='flex gap-3'> 
               <LoadingSkelton/>
               <LoadingSkelton/>
               <LoadingSkelton/>
               </div>
              <div className='flex gap-3'> 
               <LoadingSkelton/>
               <LoadingSkelton/>
               <LoadingSkelton/>
               </div>
              <div className='flex gap-3'> 
               <LoadingSkelton/>
               <LoadingSkelton/>
               <LoadingSkelton/>
               </div>
            </div>
            </div>
   </>
    )

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
          <> 
               <div className='w-full justify-center items-center px-10 flex mt-11'> 
            < div className='flex flex-col'> 
              <div className='flex gap-3'> 
               <LoadingSkelton/>
               <LoadingSkelton/>
               <LoadingSkelton/>
               </div>
              <div className='flex gap-3'> 
               <LoadingSkelton/>
               <LoadingSkelton/>
               <LoadingSkelton/>
               </div>
              <div className='flex gap-3'> 
               <LoadingSkelton/>
               <LoadingSkelton/>
               <LoadingSkelton/>
               </div>
            </div>
            </div>
          </>
        )}

     </div>
   </>
  )
}

export default TopArtists;