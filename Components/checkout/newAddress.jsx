import React, { useState } from 'react'
import { Dialog } from "@mui/material";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const newAddress = ({open, setOpen}) => {

    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [pin, setPin] = useState("")
    const [address , setAddress] = useState("")
    const [city, setCity] = useState("");
    const [state, setState] = useState("")
    const [landmark, setLandmark] = useState("")


    const handleClose = () =>{
        setOpen(false);
    }

    const submitAddress = async() =>{
        const res = await axios.post("/api/user/address", {
            name, mobile, pin, address, city, state, landmark
        });
        if(res.status===200){
            toast("Address Added successfully")
            handleClose();
            setName("");
            setMobile("");
            setPin("");
            setState("");
            setLandmark("");
            setAddress("");
            setCity("");
            window.location.reload();
        }
       
        else{
            toast("Something went wrong")
        }
    }


  return (
    
    <Dialog open ={open} onClose={handleClose} className='bg-transparent z-10' >
        <div className='px-16 py-4 flex gap-4 flex-col '>
            <div>
                <h2 className=' ml-16  text-transparent font-serif bg-clip-text text-2xl font-semibold bg-gradient-to-r from-black to-red-600'>Enter New Delivery Address</h2>
                
            </div>
            <div className='flex gap-16'>
                <input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder='Name'
                    className='px-2 p-1 border-2 border-black'
                />
                <input
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                    placeholder='Mobile No.'
                    className='px-2 p-1 border-2 border-black'
                />
            </div>
            <div className='flex gap-16'>
                <input
                    value={pin}
                    onChange={(e)=>setPin(e.target.value)}
                    placeholder='Pin || ZIP Code'
                    className='px-2 p-1 border-2 border-black'
                />
                <input
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    placeholder='Address'
                    className='px-2 p-1 border-2 border-black'
                />
            </div>
            <div className='flex gap-16'>
                <input
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                    placeholder='City'
                    className='px-2 p-1 border-2 border-black'
                />
                <input
                    value={state}
                    onChange={(e)=>setState(e.target.value)}
                    placeholder='State'
                    className='px-2 p-1 border-2 border-black'
                />
            </div>
            <div className='flex gap-16 justify-center items-center'>
                <input
                    value={landmark}
                    onChange={(e)=>setLandmark(e.target.value)}
                    placeholder='Landmark'
                    className='px-2 p-1 border-2 border-black'
                />
               
            </div>
            <div className='flex justify-center items-center'>
                <button onClick = {()=>submitAddress()} className='bg-black my-4 text-xl text-white px-4 p-1 rounded-md' >Submit</button>
            </div>
           
        </div>
        <ToastContainer />
    </Dialog>
    
  )
}

export default newAddress;