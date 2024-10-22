"use client"

import {signIn, signOut, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaSpotify } from "react-icons/fa";
import { LogOut } from 'lucide-react';

import "../../../../styles/globals.css"

export const HeroSection = () => {

    const {data:session} = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(session){
            router.push('/dashboard');
        }
    },[session,router])

    return (
      <section className="container w-full bg-white">
        <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
          <div className="text-center space-y-8">
            
  
            <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
              <h1>
              Meet your
                <span className="text-transparent px-2 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text">
                  Chart-toppers!
                </span>
                Tuning into your musical universe.
              </h1>
            </div>
  
            <p className="max-w-screen-sm mx-auto text-xl text-gray-600">
              {`MusicMate connects to your Spotify, revealing your top artists, tracks, and music insights.`}
            </p>
  
            <div className="space-y-4 md:space-y-0 md:space-x-4 justify-center items-center flex">
                {!session ?(
              <button
              onClick={()=>signIn('spotify')}
              className="w-5/6 md:w-1/4 font-bold group/arrow bg-green-700 hover:bg-green-800 text-white item-center flex py-3 text-center px-2 rounded-lg border border-gray-500 items-center justify-center">
                <FaSpotify className="mr-2"/>
                Login with Spotify
                
              </button>) :(
                   <button className="w-5/6 md:w-1/4 font-bold group/arrow bg-green-700 hover:bg-green-800 text-white item-center flex py-3 text-center px-2 rounded-lg border border-gray-500 items-center justify-center">
                   <LogOut /> Log Out
                   
                 </button> 
              )}
  
           
              
            </div>
          </div>
  
          <div className="relative group mt-14">
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-green-400/50 rounded-full blur-3xl"></div>
  
            <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-white/0 via-white/50 to-white rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  };