import Providers from "@/components/Providers";
import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import {ReactNode} from "react";
import "../../../styles/globals.css";


import React from 'react'

const layout = ({children}: {
  children: ReactNode
}) => {
  return (
    <html lang="en">
        <Navbar />
        <div>
            <Providers> 
              {children}
            </Providers>
        </div>
        <Footer />
    </html>
  )
}

export default layout