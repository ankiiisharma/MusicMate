import { ReactNode } from "react";
import Providers from "../components/Providers"

import "../../styles/globals.css";

export const metadata = {
  title : 'MusicMate',
  description: 'A music app that helps you discover new music and share it with your friends',
}

export default function RootLayout({children}:{
  children : ReactNode}) {
    return(
        <html lang="en">
              <body> 
                <Providers>
                  {children}
                </Providers>
              </body>
          </html>
    )
}
