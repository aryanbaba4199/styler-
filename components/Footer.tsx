import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import StylersLogo from '../public/assets/images/StlersLight.png';
import enFlag from "../public/assets/images/en-flag.png";


const Footer = () => {
    
    return ( 
        <div className="flex flex-col w-full mx-auto">
            <Link href="#">
                <div className="flex bg-[#37475a] hover:bg-[#485769] justify-center">
                    <p className="text-white text-xs py-4">Back to top</p>
                </div> 
            </Link>

            <div className="grid grid-cols-2 lg:grid-cols-4  md:px-32 gap-4 px-5 bg-amazon-blue_light justify-center py-10 md:space-x-16 border-b border-slate-600">

                <div className="link-footer">
                    <h5>Get to Know Us</h5>
                    <ul>
                        
                        <li><Link href="/">About Styler</Link></li>
                        <li><Link href="https://merchant.razorpay.com/policy/MyokIOTbkOG0zi/contact_us">Contact us</Link></li>
                        <li><Link href="https://merchant.razorpay.com/policy/MyokIOTbkOG0zi/shipping">Shipping & Delivery Policy</Link></li>
                        <li><Link href="https://merchant.razorpay.com/policy/MyokIOTbkOG0zi/privacy">Privacy and Policy</Link></li>
                        <li><Link href="https://merchant.razorpay.com/policy/MyokIOTbkOG0zi/terms">Terms & Conditions</Link></li>
                        <li><Link href="https://merchant.razorpay.com/policy/MyokIOTbkOG0zi/refund">Cencellation & Refund Policy</Link></li>
                    </ul>
                </div>

                <div className="link-footer">
                    <h5>Make Money with Us</h5>
                    <ul>
                        <li><Link href="/">Sell products on Styler</Link></li>
                        <li><Link href="/">Sell on Styler Business</Link></li>
                        
                        
                        <li><Link href="/">Advertise Your Products</Link></li>
                        <li><Link href="/">Self-Publish with Us</Link></li>
                        
                        
                    </ul>
                </div>

                <div className="link-footer">
                    <h5>Our Other Services</h5>
                    <ul>
                        <li><Link href="https://dreamplanner.in">Dream Planner</Link></li>
                        <li><Link href="https://www.akchhatfilmsproduction.com/">Akshat Films Production</Link></li>
                        <li><Link href="https://dreamplanner.in">Amar Dance Academy</Link></li>
                        
                    </ul>
                </div>

                <div className="link-footer">
                    <h5>Let Us Help You</h5>
                    <ul>
                        <li><Link href="/">Styler and COVID-19</Link></li>
                        <li><Link href="/">Your Account</Link></li>
                        <li><Link href="/">Your Orders</Link></li>
                        <li><Link href="/">Shipping Rates & Policies</Link></li>
                        <li><Link href="/">Returns & Replacements</Link></li>
                        
                    </ul>
                </div>

            </div>

            <div className="flex max-md:flex-col items-center bg-amazon-blue_light justify-center py-1">
                <Image src={StylersLogo} alt="amazon-log" className="object-contain w-20 h-20 md:mr-20" />

                <div className="flex items-center space-x-2 max-md:mb-4">
                    <div className="flex space-around border rounded border-slate-400 px-2 py-2 text-xs text-slate-100 cursor-pointer">
                        <GlobeAltIcon className="h-4 mr-3" />
                        <span>English</span>
                    </div>
                    <div className="flex border rounded border-slate-400 px-2 py-2 text-xs text-slate-100 cursor-pointer">
                        <span className="text-slate-100 mr-3"></span>
                        <span>Rupee - INR.</span>
                    </div>
                    <div className="flex items-center border rounded border-slate-400 px-2 py-2 text-xs text-slate-100 cursor-pointer">
                    <img
                             src="https://cdn-icons-png.flaticon.com/256/321/321238.png"
                             className="object-contain h-4 mr-3"
                            />
                        <span>
                            
                            India</span>
                    </div>
                </div>
            </div>

            

        </div>
     );
}
 
export default Footer;