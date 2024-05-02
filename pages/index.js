import React from 'react'
import NavBar from "@/Components/Header/header"
import Home from "@/Components/Home/home"
import { useEffect } from "react";
import { getproducts } from "@/redux/action/productAction";
import { useDispatch, useSelector } from "react-redux";



const index = () => {
  let {products} = useSelector(state => state.getProducts)
 
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getproducts())
  }, [dispatch])
  return (
    <>
    <NavBar/>
    <div className='mt-16'>
      <Home products={products}/>
    </div>
    </>
  )
}

export default index;