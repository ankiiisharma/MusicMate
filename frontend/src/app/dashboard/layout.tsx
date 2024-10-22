// import { Footer } from '@/components/ui/Footer';
import Footer from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center w-full ">
      <div> 
      <Navbar />
      <header className="py-4">
        <section id='headerdahboard' className='mt-11' > 
            <div> 
      
            </div>
            
        </section>

      </header>
      <main className="flex-grow">
        {children}
      </main>
      </div>
      <Footer/>
    </div>
  );
}
