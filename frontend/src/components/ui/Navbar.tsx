import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Navbar = () => {

    return(
        <> 
            <div className="shadow-green-200  w-[90%] md:w-[85%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-green-300 z-40 rounded-lg flex justify-between items-center p-3 bg-green-600 text-white">
                    <h1 className="text-xl font-semibold"> MusicMate </h1>

                    <div className="flex items-center gap-5"> 
                        <Link href="/topartists"> 
                        <h1> top artists </h1>
                        </Link>
                        <Link href="/toptracks"> 
                        <h1> top tracks </h1>
                        </Link>
                    </div>

                    <div> 
                        <Link href={"https://www.github.com/ankiiisharma"}> 
                        <FaGithub/>
                        </Link>
                    </div>
            </div>
        </>
    )

}