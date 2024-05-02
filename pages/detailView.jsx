import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getProductDetails } from "@/redux/action/productAction";
import ActionItem from "@/Components/Details/actionItem";
import Nav from "@/Components/Header/header";
import { auth } from "@/utils/firebaseAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from "@/Components/menu/menu";
import axios from "axios";


import ProductDetail from "@/Components/Details/productDetail";

const detailView = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  const [related, setRelated] = useState(null, product);



  useEffect(() => {
    const productView = async (id) => {
      const res = await axios.get(`/api/product/productDetails?id=${id}`);
      if (res.status === 200) {
        setProduct(res.data);
      } else {
        console.log("Something went wrong");
      }
    }
    productView(id);
  }, [id]);


  const buyNow = async () => {
    if (auth.currentUser) {
      try {
        const productId = product._id;
        const userID = auth.currentUser.uid;
      } catch (e) {
        console.log(e);
      }
    } else {
      toast("Log in first...")
    }
  }

  useEffect(() => {
    const relatedProduct = async () => {
      try {
        const res = await axios.get(`/api/product/filter?color=${product.color}`)
        if (res.status === 200) {
          setRelated(res.data)
        }
      } catch (e) {
        console.log(e);
      }

    }
    relatedProduct();
  }, [product])
  console.log("Related Products", related)

  return (
    <>
      <Nav />
      <div className="mt-20 mb-8">
        {product && Object.keys(product).length && (
          <>
            <div className="flex md:flex-row flex-col gap-2 px-2 md:px-16">
              <div className="w-[98%] md:w-[40%]">
                <ActionItem product={product} buyNow={buyNow} />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <ProductDetail product={product} />

              </div>

            </div>
            
          </>
        )}
        <div>
          <div className="flex justify-center items-center text-2xl font-semibold py-8 font-serif">
            <h2>You might be intrested</h2>
          </div>
          <div>

            <div className="flex md:flex-row flex-col gap-2 flex-wrap justify-center items-center">
              {related && related.map((prd, i) => (
                <>
                  <div key={i} className="border py-4 px-2 hover:shadow-sm hover:shadow-purple-600 ">
                    <img src={prd.imageUrl} alt={prd.title} className="h-40 w-full object-cover mb-2 rounded-sm" />
                    <div className="flex flex-col justify-between items-center px-8">
                    <h3 className="text-lg font-semibold mb-2">{prd.title}</h3>
                    
                    
                      <p className="text-green-500 mb-2">
                        Profit : {Math.round(((prd.mrp - prd.rate) / prd.mrp * 100).toFixed(2))}%
                      </p>
                     
                    
                    <p>{prd.description}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>


        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default detailView;
