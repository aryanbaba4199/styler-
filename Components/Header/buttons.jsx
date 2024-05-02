import React, {useEffect} from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Login from '../Auth/login';
import { useState, useContext } from 'react';
import { DataContext } from '@/context/datacontext';
import Profile from './profile';
import {auth} from "@/utils/firebaseAuth";
import Link from 'next/link';
import axios from 'axios';
const buttons = () => {
  const [open, setOpen] = useState(false);
  const {account, setAccount} = useContext(DataContext);
  const [cartLength, setCartLength] = useState("");
  

  useEffect(() => {
    if (auth.currentUser) {
      const fetchCartLength = async () => {
        try {
          const res = await axios.get(`/api/product/cart?id=${auth.currentUser.uid}`);
         
          setCartLength(res.data.length);
          console.log(cartLength);
         
        } catch (error) {
          console.error('Error fetching cart length:', error);
        }
      };

      fetchCartLength();
    }
  }, [auth.currentUser]);


 const openDialog = () => {
  setOpen(true);
 }

  return (
    <>
    <div className='flex gap-8 ml-5 md:flex-row flex-col'>
      {
        auth.currentUser ? (<Profile account={account} setAccount={setAccount}/>) :
        (<button onClick={()=>openDialog()} className='bg-red-600 font-semibold p-1 w-fit rounded-lg px-2'>Log in</button>)
      }
        
        <Link href="/sellerForm">Become a seller</Link>
        <p>More</p>
        <div className='flex'>
            <ShoppingCartIcon/>
            <Link className="font-serif" href="/cart">Cart</Link>
            
            <p className=' text-red-300 text-bold text-lg -translate-y-2'>{cartLength}</p>
          
        </div>
        <Login open={open} setOpen={setOpen}/>
    </div>
    </>
  )
}

export default buttons