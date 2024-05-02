import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "@/utils/firebaseAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@/Components/Header/header";
import CartItem from "@/Components/Cart/cartItem";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  if (auth.currentUser) {
    let userId = auth.currentUser.uid;
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/api/product/cart?id=${userId}`);
          if (res.status === 200) {
            try {
              const productIds = res.data.join(",");
              const productRes = await axios.post(
                `/api/product/product?productIds=${productIds}`
              );
              if (productRes.status === 200) {
                console.log("Product ressponse", productRes.data);
                setCartData(productRes.data);
              }
            } catch (err) {
              console.log(err);
            }
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          console.error("Error fetching cart data", error);
          toast.error("Error fetching cart data");
        }
      };

      fetchData();
    }, []);

    

  }
  console.log("Cart Data", cartData);

  return (
    <>
      <Nav />
      {
        cartData ?
        (
          <div className = "mt-20">
        <h2 className="text-center text-2xl font-semibold font-serif ">Your Cart</h2>
        <ul>
          {cartData.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </ul>
      </div>
        ) : (
          <div className="flex justify-center items-center">
            Loading...
          </div>
        )
      }
      

      <ToastContainer />
    </>
  );
};

export default Cart;
