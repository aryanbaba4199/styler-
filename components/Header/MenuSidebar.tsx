import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeMenu, selectMenu } from "@/redux/slices/MenuSlice";
import { RootState } from "@/redux/store";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {useSession} from "next-auth/react";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";

const MenuSideBar = () => {
    const router = useRouter();
    const {data : session} = useSession();
    const dispatch = useAppDispatch();
    const menu = useAppSelector(selectMenu);
    let userName :any = "Guest";

    
    if  (session){
        userName = session?.user?.name;
    }
    

    return (
        <>
            <div
                className={`flex flex-col fixed bg-white shadow-xl w-72 md:w-96 h-screen top-0 z-50 
               ${menu ? "block" : "hidden"}
            `}
            >
                <div className="relative">
                    <div
                        className="absolute top-3 cursor-pointer -right-12 hover:scale-110 transition"
                        onClick={() => dispatch(closeMenu())}
                    >
                        <XMarkIcon className="h-9 text-white drop-shadow-md" />
                    </div>

                    <div className="flex items-center bg-amazon-blue_light text-white px-8 py-3 ">
                        {session ? 
                        <img
                            src = {session.user?.image}
                            alt = "Guest"
                            className="w-16 h-16 rounded-full"
                        />
                         : 
                        <UserCircleIcon className="h-9" />
                        }
                        <b className="text-xl font-bold ml-3">Hello {userName}</b>
                    </div>

                    <div className="menu-sidebar flex flex-col py-2 overflow-y-scroll h-[85%]">

                        <h3>
                           <Link href="/profile">Profile</Link>
                        </h3>
                        <ul className="border-b pb-2">
                            <li className="group">
                                <Link href="/cart">Cart</Link>
                                <ChevronRightIcon className="group-hover:text-gray-800"  />
                            </li>
                            <li className="group">
                                <Link href="/profile/orders?tab=1&q=all-orders__">Orders</Link>
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                        </ul>

                        <h3>
                            Shop By Category
                        </h3>
                        <Link href="/browse">
                        <ul className="border-b pb-2">
                            <li className="group">
                                Mens Clothing
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group flex">
                                Womens Clothing
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group">
                                Kids Clothing
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            
                        </ul>
                        </Link>

                        <h3>
                            Other venchers
                        </h3>
                        <ul className="border-b pb-2">
                            <li className="group">
                                <Link href = "https://dreamplanner.in">Dream Planner</Link>
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group">
                                <Link href="https://www.akchhatfilmsproduction.com/">Akchhat Films Production</Link>
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group">
                                <Link href="/">Amar Dance Academy</Link>
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            {menu && (
                <div
                    onClick={() => dispatch(closeMenu())}
                    className="fixed bg-zinc-900/[0.85] w-full  h-screen z-40 top-0 right-0"
                ></div>
            )}
        </>
    );
};

export default MenuSideBar;
