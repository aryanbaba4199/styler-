import React, { useState, useEffect } from "react";
import AddAddress from "@/Components/checkout/newAddress";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationDialog from "@/Components/Confirmation/delete";

const Address = ({ address, setAddress }) => {
  const [open, setOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, idToDelete: null });


  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get("/api/user/address");
        if (res.status === 200) {
          setUserAddresses(res.data);
        } else {
          console.error("Error fetching addresses:", res.status);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const addAddress = () => {
    setOpen(true);
  };

  const deleteAddress = async (id) => {
    
    setDeleteConfirmation({ isOpen: true, idToDelete: id });
    
  };
  const confirmDelete = async () => {
    
    try {
      const res = await axios.delete(`/api/user/address?id=${deleteConfirmation.idToDelete}`);
      if (res.status === 200) {
        const updatedAddresses = userAddresses.filter(item => item._id !== deleteConfirmation.idToDelete);
        setUserAddresses(updatedAddresses);
        toast("Address Removed successfully");
      } else {
        toast("Something went Wrong in Response");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setDeleteConfirmation({ isOpen: false, idToDelete: null });
    }
  };

  const cancelDelete = () => {
   
    setDeleteConfirmation({ isOpen: false, idToDelete: null });
  };

  const handleRadioChange = (selectedAddress) => {
    console.log(selectedAddress);
    setAddress(selectedAddress);
  };

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mt-8 bg-gradient-to-r from-black to-red-600 text-transparent bg-clip-text">
            Address
          </h2>
          <button
            className="mt-8 bg-slate-950 px-3 p-1 text-white rounded-md"
            onClick={() => addAddress()}
          >
            Add Address
          </button>
        </div>
        <div>
          <div className="">
            {userAddresses.map((item, index) => (
              <div
                key={index}
                className="flex flex-col shadow-lg shadow-black gap-2 p-4 px-10 mt-8
                bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-lg"
              >
                <div className="flex gap-4">
                  <input
                    type="radio"
                    id={`address-${index}`}
                    name="address"
                    value={item._id}
                    onChange={() => handleRadioChange(item)}
                  />
                  <label htmlFor={`address-${index}`}>
                    <h2 className="font-serif font-semibold text-red-700 text-xl">{item.name}</h2>
                  </label>
                  <p>{item.mobile}</p>
                  <button onClick={() => deleteAddress(item._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8  text-red-600 ml-52 -translate-y-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                  
                </div>
                <div className="flex gap-3 font-semibold font-serif ">
                  <p>{item.landmark}</p>
                  <p>{item.address}</p>
                  <p>{item.city}</p>
                  <p>{item.pin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ConfirmationDialog
        showDialog={deleteConfirmation.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        open={open}
        setOpen={setOpen}
      />
      <AddAddress open={open} setOpen={setOpen} />
      <ToastContainer />
    </>
  );
};

export default Address;
