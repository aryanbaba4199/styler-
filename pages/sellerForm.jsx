import React, { useState } from "react";
import Nav from "@/Components/Header/header";
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



const sellerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gst, setGst] = useState("");
  const router = useRouter();
  

  const submit = async() => {
    try{
        const res = await axios.post("/api/admin/seller", {name, email, mobile, gst})
        if(res.status === 200){
            toast("Congratulations : Admin panel is enabled now!");
            router.push("/seller");
        }
    }catch(err){
        toast("Something went wrong")
        console.error(err);
    }
  };

  return (
    <>
      <Nav />
      <div className="mt-20 md:flex flex-row">
        <div className="flex flex-col font-serif text-lg justify-center items-center md:w-1/3 w-full p-5">

        <h2 className="bg-gradient-to-r p-5 from-black to-red-600 bg-clip-text text-transparent text-4xl font-semibold">
            Grow Your Business with
            <Image 
                src="/images/StylersDark.png"
                width={1000}
                height={1000}
                className="w-48 translate-x-24 -translate-y-8"
            />
          </h2>
          <h2 className="bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent text-2xl mt-4">India's first Online Wholesale Market</h2>
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-international-trade-illustrated_52683-76252.jpg?w=900&t=st=1704709817~exp=1704710417~hmac=0b76c8af293098541631a9c86c26f709bc583565cdbc1768e85eb8a646eff345"
          />
        </div>
        <div className="flex flex-col font-serif text-lg justify-center items-center md:w-1/3 shadow-lg shadow-black mt-8 rounded-lg w-full">
          <h2 className="bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent text-4xl font-semibold">
            Welocme
          </h2>
          <h2 className="bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent mt-4">
            Kindly fill the Seller Registration Form
          </h2>
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center mt-8">
              <div className="">
                <p className="font-semibold bg-clip-text bg-gradient-to-r from-black to-red-600 text-transparent">
                  Enter Your Name *
                </p>
                <input
                  className="bg-slate-200 px-2 w-96"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className=" mt-6">
                <p className="font-semibold bg-clip-text bg-gradient-to-r from-black to-red-600 text-transparent">
                  Enter Your Email *
                </p>
                <input
                  className="bg-slate-200 px-2 w-96"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                />
              </div>
              <div className="mt-6">
                <p className="font-semibold bg-clip-text bg-gradient-to-r from-black to-red-600 text-transparent">
                  Enter Your Mobile Number *
                </p>
                <input
                  className="bg-slate-200 px-2 w-96"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  type="number"
                />
              </div>
              <div className="mt-6">
                <p className="font-semibold bg-clip-text bg-gradient-to-r from-black to-red-600 text-transparent">
                  Enter Your GSTIN
                </p>
                <input
                  className="bg-slate-200 px-2 w-96"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                />
              </div>
              <div className="flex justify-center items-center mt-8">
                <button className="bg-black px-4 p-1 text-white rounded-lg" onClick={submit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center font-serif">
            <h2 className="bg-gradient-to-r p-5 from-black to-red-600 bg-clip-text text-transparent text-3xl font-semibold">Few Steps to become a seller</h2>
            <img
                src="https://img.freepik.com/free-vector/handshake-background-design_1284-595.jpg?w=740&t=st=1704712665~exp=1704713265~hmac=dc59c46bb3254f26b9e4411ba6aba891fd11b456b607ba955e075573caecd76c"
                className="w-96 h-60 filter contrast-200 rounded-full "
            />
            <ul className="bg-gradient-to-r p-5 from-black to-red-600 bg-clip-text text-transparent text-lg">
                <li> Fill Seller Registration Form</li>
                <li>After Registration Click on Admin </li>
                <li>Click on Create Product</li>
                <li>Submit your product details</li>

            </ul>
            <p className="font-semibold text-xl">Congrats Your product is listed Now...</p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default sellerForm;
