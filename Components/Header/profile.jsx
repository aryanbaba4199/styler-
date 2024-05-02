

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import React, {useState} from 'react'
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import {auth } from "@/utils/firebaseAuth"

const profile = ({account, setAccount}) => {



  const signOutHandler = async () => {
    try{
      await auth.signOut();
      window.location.href = "/";
    }catch(err){
      console.log("Error:", err);
    }
  }
    // const [open, setOpen] = useState(false);

    // const handleProfileMenu  = (event) =>{
    //     setOpen(event?.currentTarget);
    // }
    // const handleClose = () =>{
    //     setOpen(false);
    // }
    // const logOut = () => {
    //     setAccount('');
    // }
  return (
   <>
   <button className='bg-red-600 p-1 px-2 rounded-md' onClick={signOutHandler}>Log Out</button>
     {/* <div>
     <button onClick={()=>handleProfileMenu()} className='bg-red-600 font-semibold p-1 rounded-lg px-2'>{account}</button>

     </div>
     <MenuList
        anchorE1 = {open}
        open = {Boolean(open)}
        onClose = {handleClose}
     >
          
          <MenuItem
          onClick={()=>{handleClose(); logOut()}}
          ><PowerSettingsNewIcon/>Logout</MenuItem>
        </MenuList> */}
   </>
  )
}

export default profile;