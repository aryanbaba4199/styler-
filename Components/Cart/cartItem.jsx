import React, { useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import {auth } from "@/utils/firebaseAuth";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.qty || 1);
  const router = useRouter();

  const increaseQuantity = () => {
    if (!item.quantity || quantity < item.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const buyNow = async() =>{
    if(auth.currentUser){
        try{
          const productId = item._id;
           
           const userId = auth.currentUser.uid;
           router.push(`/checkout?productId=${productId}&userId=${userId}&qty=${quantity}`)
        }catch(e){
            console.log(e);
        }
    }else{
        toast("Log in first...")
    }
  }

  const removeFromCart = async() => {
    const productId = item._id;
    const res = await axios.delete(`/api/product/cart?id=${productId}`)
    if(res.status===200){
      toast("Cart deleted successfully")
      
    }else{
      toast("Failed to delete")
    }
  }

  console.log("Cart deleted successfully", item);
  return (
    <div className="mt-24 text-black">
      <div className="w-[60%] flex">
        <div className="mr-16 ml-8">
          <img src={item.imageUrl} className="w-24 h-24 " />
          <div className="flex items-center mt-2">
            <button
              className="bg-blue-500 text-white  px-2 rounded-l cursor-pointer"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span className="bg-gray-200  px-2 text-center w-12">
              {quantity}
            </span>
            <button
              className="bg-blue-500 text-white  px-2 rounded-r cursor-pointer"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </div>
        <div className="w-[40%]">
          <h2 className="font-semibold">{item.title || "Ammz Construction"}</h2>
          <p>{item.category}</p>
          
          <p>{item.tagline}</p>
          <div className="flex mt-1">
            <p className="text-gray-600">{item.mrp}</p>
            <p className=" text-gray-600 -translate-x-10 -translate-y-2">
              _______
            </p>
            <div className="-translate-x-10 -translate-y-1 flex gap-2">
              <MdOutlineCurrencyRupee className="translate-x-2 translate-y-1 font-semibold text-xl" />
              <p className="font-semibold text-xl text-green-600">
                {item.rate}
              </p>
              <p className="text-green-600">{Math.round(100*(item.mrp-item.rate)/item.mrp)}% off </p>
            </div>
          </div>
          <div className="">
            <button onClick={()=>removeFromCart()}
            className="ml-12 bg-red-600 text-white px-8 text-lg font-semibold rounded-md p-1">Remove</button>
            <button onClick={()=>buyNow()} 
            className="ml-12 bg-green-600 text-white px-8 text-lg font-semibold rounded-md p-1">Buy Now</button>
          </div>
        </div>
        <div className="w-[30%] flex flex-row justify-center">
          <p>Delivery by Mon Jan 24</p>
        </div>
      </div>
      <div className="w-[40%]"></div>
      <ToastContainer />
    </div>
  );
};

export default CartItem;
