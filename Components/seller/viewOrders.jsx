import React, {useState} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import DeleteDialog from "@/Components/Confirmation/delete"
import axios from "axios";

const ViewOrders = ({ orders }) => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  
  const confirmDelete = async(id)=>{
    console.log(`Are you sure you want to delete`);
    try{
        const res = await axios.delete(`/api/payment/cod?id=${id}`);
        if(res.status===200){
            toast("Order deleted successfully")
        }else{
            toast("Something went wrong")
        }
        setProductId("");
        setOpen(false);
    }catch(err){
        console.log(err);
    }
  }

  const onClose = () => {
    setProductId("");
    setOpen(false);
    
  };

  console.log("idghkjsddhf",productId);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
      {orders ? (
        orders.map((order) => (
          <div key={order._id} className="border p-4 shadow-md shadow-black hover:shadow-xl hover:shadow-blue-600 ">
            <h2 className="text-xl font-semibold text-red-950 ">
              Customer Name : {order?.addresses[0]?.name}
            </h2>
            <p className="text-lg font-semibold text-blue-950">
              Product Name : {order?.product[0]?.title || "Not Defined"}
            </p>
            <p className="text-green-950 font-semibold">
              Mobile : {order?.addresses[0]?.mobile}
            </p>
            <p className="mt-2 text-lg font-semibold text-cyan-950">Product Details : </p>
            
              <li className="">Name : {order?.product[0]?.title ||"Not Defined"}</li>
              <li className="">Category : {order?.product[0]?.category}</li>
              <li className="">Color : {order?.product[0]?.color || "NA"}</li>
              <li className="">Size : {order?.product[0]?.size || order?.product[0]?.customSize || "NA"}</li>
              <li className="">MRP : {order?.product[0]?.mrp}/-</li>
              <li className="">Rate  : {order?.product[0]?.rate}/-</li>
            
            <p className="mt-2 font-semibold text-cyan-950 text-lg">Customer Address </p>
            <li className="">Address : {order?.addresses[0]?.address}</li>
            <li className="">Landmark : {order?.addresses[0]?.landmark}</li>
            <li className="">City : {order?.addresses[0]?.city}</li>
            <li className="">State : {order?.addresses[0]?.state}</li>
            <li className="">Pin Code : {order?.addresses[0]?.pin}</li>
            
            <div className="flex justify-end items-end">
                <MdDelete className="text-3xl hover:cursor-pointer  text-red-700" onClick={()=>{setOpen(true), setProductId(order._id)}} />
            </div>
            <DeleteDialog showDialog={open} onClose={onClose} onConfirm={confirmDelete}/>
            
          </div>
        ))
      ) : (
        <div className="flex text-2xl gap-4 text-blue-600 justify-center items-center w-[70vh] h-[70vh]">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
