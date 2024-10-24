import NextAuth from "next-auth";
import SpotifyProvider from 'next-auth/providers/spotify';

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization:
                'https://accounts.spotify.com/authorize?scope=user-read-email,user-top-read,user-read-currently-playing',
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            return session;
        }
    }
})

export { handler as GET, handler as POST }