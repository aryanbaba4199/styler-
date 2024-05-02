import React, { useState } from "react";
import Title from "@/Components/createProduct/title";
import Category from "../createProduct/category";
import Rate from "../createProduct/rate";
import Description from "../createProduct/description";
import Size from "../createProduct/size";
import Image from "../createProduct/image";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog } from "@mui/material";


const createProduct = () => {
  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");
  const [rate, setRate] = useState("");
  const [mrp, setMRP] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [qty, setQty] = useState("");
  const [image, setImage] = useState(null);
  const [tempImageURL, setTempImageURL] = useState("");
  const [res, setRes] = useState("");


  const handleSubmit = async () => {
    console.log("Submit")

    try {

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "aryanbaba4199upload");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dmoygdwk1/image/upload`,
        formData
      );
      const imageUrl = cloudinaryResponse.data.secure_url;
      console.log(imageUrl);
      const productData = {
        title, category,
        mrp, rate, description, color, size, customSize, imageUrl,
      };
      console.log(productData);

      const saveProductResponse = await axios.post(
        "/api/product/createProduct",
        productData
      );

      console.log("Product saved successfully:");
      setRes("200")
      toast('Product Added successfully')


      // setTitle("");
      // setCategory("");
      // setMRP("");
      // setRate("");
      // setDescription("");
      // setColor("");
      // setSize("");
      // setCustomSize("");
      // setImage("");
      // setQty("");
      // setTempImageURL("");
    } catch (error) {
      setRes("405")
      console.error("Error creating product:", error);

    }
  }


  return (
    <>
      <div>
        <h2 className="text-center my-4 text-xl font-semibold text-red-600">Create Product</h2>
        <div className="flex flex-col justify-between gap-4">
          <Title
            setTitle={setTitle}
            title={title}

          />
          <Category setCategory={setCategory} category={category} />
          <Rate rate={rate} setRate={setRate} mrp={mrp} setMRP={setMRP} />
          <Description
            setDescription={setDescription}
            description={description}
            color={color}
            setColor={setColor}
          />
          <Size setSize={setSize} size={size} qty={qty} setQty={setQty} customSize={customSize} setCustomSize={setCustomSize} />

          <Image
            image={image}
            setImage={setImage}
            tempImageURL={tempImageURL}
            setTempImageURL={setTempImageURL}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={handleSubmit}
            className="bg-black w-24 mb-8 mt-4 text-white rounded-md p-1 text-xl px-4"
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />

      <Dialog open={res === '405'}>
        <div className='flex flex-col justify-center items-center px-4 bg-gray-700 text-white'>
          <p className='bg-slate-900 text-white px-4 my-4 rounded-md text-xl '>Failed</p>
          <p className=''>Product Cration failure....</p>


          <button onClick={() => setRes("")}
            className="p-1 my-4 bg-green-600 rounded-lg w-20 md:flex justify-center  btn font-semibold"
          >OK</button>
        </div>
      </Dialog>
      <Dialog open={res === '200'}>
        <div className='flex flex-col justify-center items-center px-4 bg-gray-700 text-white'>
          <p className='bg-slate-900 text-white px-4 my-4 rounded-md text-xl '>Success</p>
          <p className=''>Product Created Successfully...</p>


          <button onClick={() => setRes("")}
            className="p-1 my-4 bg-green-600 rounded-lg w-20 md:flex justify-center  btn font-semibold"
          >OK</button>
        </div>
      </Dialog>
    </>
  );
};

export default createProduct;

