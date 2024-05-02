import React, { useState } from "react";
import Nav from "@/Components/Header/header";
import axios from "axios";
import ViewOrders from "@/Components/seller/viewOrders";

import CreateProduct from "@/Components/seller/createProduct";

const seller = () => {
  const [create, setCreate] = useState(true);
  const [viewOrder, setViewOrder] = useState(false);
  const [product, setProduct] = useState(null);

  const createProduct = () => {
    setCreate(true);
  };

  const viewOrderBtn = async () => {
    setViewOrder(true);
    try {
      const res = await axios.get(`/api/payment/cod`);
      
      if (res.status === 200) {
        setProduct(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <>
      <Nav />
      <div className="mt-24 flex flex-col justify-center items-center font-serif">
        <div>
          <h2 className="bg-gradient-to-r bg-clip-text from-black to-red-600 text-transparent font-semibold text-3xl">
            Welcome to Seller Account
          </h2>
          <div className="flex justify-center items-center gap-8 mt-8">
            {create ? (
              <button
                className="bg-black text-white px-4 text-lg rounded-lg p-1 w-40"
                onClick={(e) => setCreate(false)}
              >
                Close
              </button>
            ) : (
              <button
                className="bg-black text-white px-4 text-lg rounded-lg p-1 w-40 "
                onClick={(e) => setCreate(true)}
              >
                Create Product
              </button>
            )}
            <button
              className="bg-black text-white px-4 text-lg rounded-lg p-1"
              onClick={createProduct}
            ></button>
            {
              viewOrder ? (
                <button
                className="bg-black text-white px-4 w-36 text-lg rounded-lg p-1"
                onClick={(e) => setViewOrder(false)}
              >
                Close
              </button>
                
              ) : (
                
              <button
              className="bg-black text-white px-4 text-lg rounded-lg p-1"
              onClick={() => viewOrderBtn()}
            >
              View Orders
            </button>
              )
            }
            
          </div>
          {create && <CreateProduct />}
          
          
        </div>
       
      </div>
      <div className="flex flex-col px-8 ">
      {viewOrder && <ViewOrders orders={product}/>}
      </div>
    </>
  );
};

export default seller;
