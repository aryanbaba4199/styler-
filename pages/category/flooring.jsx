import React, { useEffect, useState } from "react";
import Nav from "@/Components/Header/header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuView from "@/Components/menu/menu";

const flooring = () => {
    const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/product/filter?category=${"Flooring"}`);
        if (res.status === 200) {
          setProducts(res.data);
        } else {
          toast("Something went wrong");
        }
      } catch (err) {
        toast(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Nav />
      {products ? (
        <div className="mt-24">
          <div className="flex justify-center items-center font-serif text-2xl font-semibold">
            <h2 className="bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
              Category : Flooring
            </h2>
          </div>
          <MenuView products={products} />
        </div>
      ) : (
        <div className="flex justify-center items-center w-[100%] h-[100%]">
          <p>Loading...</p>
        </div>
      )}

      <ToastContainer />
    </>
  )
}

export default flooring;