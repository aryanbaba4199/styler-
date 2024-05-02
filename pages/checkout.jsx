import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CheckoutItem from "@/Components/checkout/checkOut";
import Address from "@/Components/checkout/address";
import Nav from "@/Components/Header/header";
import Method from "@/Components/checkout/method";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const router = useRouter();
  const { productId, userId } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `/api/product/productDetails?id=${productId}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);
  console.log("--------------------------------", address);

  const handleConfirmOrder = async () => {
    console.log("Selected Payment Method:", selectedMethod);
    if (selectedMethod === "cashOnDelivery") {
      codHandler();
    }
  };

  const codHandler = async () => {
    try {
      const res = await axios.post(`/api/payment/cod?passcode=${"727798"}`, {product, address, selectedMethod});
      if (res.status === 200) {
        toast("Order Created Succefully");
        removeFromCart();
      } else {
        toast("something Went Wrong");
        toast("Contact : +91-123456");
      }
    } catch (err) {
      toast("Order creation failed");
    }
  };

  const removeFromCart = async() =>{
    const productId = product._id;
    const res = await axios.delete(`/api/product/cart?id=${productId}`)
    if(res.status===200){
      toast("Cart deleted successfully")
    }else{
      toast("Failed to delete")
    }
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col mt-24">
        <div className="flex justify-center items-center">
          <h1 className="text-center font-semibold text-3xl bg-clip-text text-transparent font-serif bg-gradient-to-r from-black to-red-600">
            Checkout
          </h1>
        </div>
        {product ? (
          <>
            <div className="flex gap-4">
              <div className="flex  px-2 md:px-16 md:w-[30%] w-[98%] shadow-lg shadow-cyan-400">
                <CheckoutItem product={product} />
              </div>
              <div className="md:w-[30%] w-[98%] shadow-lg shadow-cyan-400">
                <Address address={address} setAddress={setAddress} />
              </div>
              <div className="flex flex-col md:w-[30%] w-[98%] shadow-lg shadow-cyan-400">
                <Method
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  handleConfirmOrder={handleConfirmOrder}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-[100vh] h-[100vh] flex justify-center items-center">
              <p>Loading...</p>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Checkout;
