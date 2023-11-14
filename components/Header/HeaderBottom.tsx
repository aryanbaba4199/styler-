import {
    Bars3Icon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {useSession} from "next-auth/react";
const admins = ["aryanbaba4199@gmail.com", "pawan2dubey@gmail.com", "nidhikumari92212@gmail.com",]
const HeaderBottom = ({ handleOpenMenu }: any) => {
    const {data : session} = useSession();
    let useremail = null;
    let admin = "";
    if (session){
        useremail = session?.user?.email;
        if(admins.includes(useremail)){
            admin = "Admin Panel"
        } 
        else{
            console.log("Welcome Guest");
        } 
    }
    

    return ( 
        <>
        <div className="bg-amazon-blue_dark md:bg-amazon-blue_light flex items-center py-2 px-4 md:space-x-4 text-white max-md:-mt-1 max-md:pb-4">
            <div
                onClick={handleOpenMenu}
                className="hidden md:flex items-center cursor-pointer mr-2 text-lg"
            >
                <Bars3Icon className="h-7 mr-1" />
                <span className="font-bold text-sm">All</span>
            </div>
            <div className="flex flex-grow max-md:overflow-x-scroll scrollbar-hide text-sm whitespace-nowrap ">
                <ul className="flex space-x-4">
                    <li className=""><Link href="/browse">Products</Link></li>
                    <li className=""><Link href="/browse?category=65488df2a4791b6f27b8d01a">Top Jeans</Link></li>
                    <li className="text-lime-400 "><Link href="/browse">Todays Deal</Link></li>
                    <li className=""><Link href="/browse?category=654e09a3b94e29c59216a657">Jackets</Link></li>
                    <li className=""><Link href="/browse?category=654e09a9b94e29c59216a65b">Shirts</Link></li>
                    <Link href="/admin/dashboard">{admin}</Link>
                </ul>
            </div>
            <div className="hidden md:inline text-sm">
                <Link href="/admin/dashboard">{admin}</Link>
            </div>
        </div>

        
    </>
    );
}
 
export default HeaderBottom;