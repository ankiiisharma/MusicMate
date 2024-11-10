'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LogOut, Music } from "lucide-react"

export default function HomePage() {
  const { data: session } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Tight Square Grid Background with Fading Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-[1px]">
          {Array.from({ length: 2500 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-50"></div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[550px] bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Meet your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">
                Chart-toppers!
              </span>
              Tuning into your musical universe.
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              MusicMate connects to your Spotify, revealing your top artists, tracks, and music insights.
            </p>

            <div className="flex justify-center">
              {!session ? (
                <button
                  onClick={() => signIn('spotify')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
                >
                  <Music className="mr-2 h-5 w-5" />
                  Login with Spotify
                </button>
              ) : (
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </button>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { title: "Discover Top Tracks", description: "Uncover your most-played songs and hidden gems." },
              { title: "Analyze Music Taste", description: "Gain insights into your listening habits and preferences." },
              { title: "Explore Artists", description: "Dive deep into your favorite artists and their impact on your music journey." },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <footer className="text-center py-6 text-sm text-gray-500 bg-white/80 backdrop-blur-sm">
          <p>
            MusicMate is a showcase project. All rights to music, artwork, and related content belong to Spotify and their respective owners.
          </p>
        </footer>
      </div>
    </div>
  )
}