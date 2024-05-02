import React, {useState} from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/action/cartAction";
import {auth} from "@/utils/firebaseAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const actionItem = ({ product }) => {
  const [qty, setQty] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();
  const id = product._id;
  

  const addToCartHanlder = async() => {
    if(auth.currentUser){
      let userId = auth?.currentUser?.uid;
      let productId = product._id;
      const res = await axios.post("/api/product/cart", {userId, productId});
      if(res.status===200){
        toast("Added to Cart");
      }else{
        toast("Something went wrong")
      }
    }else{
      toast("Log in first!");
    }

    

    // dispatch(addToCart(id, qty));
    // router.push("/cart")
  }
  const buyNowHandler = async()=>{
    try{
    addToCartHanlder();
    let productId = product._id;
    let userId = auth.currentUser.uid;
    router.push(`/checkout?productId=${productId}&userId=${userId}`)
    }catch(e){
      toast("Something went wrong");
    }
  }


  return (
    <>
    <div>
      <div className=" flex justify-center items-center flex-col border-2 my-2 mx-0 md:mx-10 border-solid border-slate-100">
        <img
            src={product.imageUrl}
            className="w-80 p-5 py-10"
        />
        </div>
        <div className="flex gap-4 p-2 md:p-5 justify-center items-center">
        <button className="bg-orange-600 p-2 text-lg w-[49%] md:w-[30%] text-white font-semibold rounded-sm" onClick={()=> addToCartHanlder()}>ADD TO CART</button>
        <button className="bg-green-600 p-2 text-lg w-[49%] md:w-[30%]  text-white font-semibold rounded-sm" onClick={()=>buyNowHandler()}>BUY NOW</button>
        </div>
        </div>
        <ToastContainer />
    </>
  );
};

export default actionItem;
