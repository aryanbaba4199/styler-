import React from "react";
import { Dialog } from "@mui/material";

const ConfirmationDialog = ({ showDialog, setOpen, onClose, onConfirm, }) => {
  const handleClose = () =>{
    setOpen(false);
  }  
  return (
    <>
    <Dialog open={showDialog} onClose={handleClose} className='bg-transparent  z-10' >
      {showDialog && (
        
        <div className="  flex flex-col justify-center items-center py-8 px-16">
          <p className="font-serif text-xl text-red-600">Are you sure you want to delete this address?</p>
          <div className="flex gap-16 mt-8">
          <button onClick={onConfirm} className="
          bg-black text-white px-8 p-1 rounded-md hover:bg-red-600 hover:shadow-xl hover:shadow-red-600
          ">Yes</button>
          <button className="bg-black text-white px-8 p-1 rounded-md hover:bg-green-600 hover:shadow-xl hover:shadow-green-600" onClick={onClose}>No</button>
          </div>
        </div>
        
      )}
      </Dialog>
    </> 
  );
};

export default ConfirmationDialog;
