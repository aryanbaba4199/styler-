import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const slide = ({ products, title, timer }) => {

  const router = useRouter();

  
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      
      <div className="flex">
        <span className="flex gap-2">
          {hours} : {minutes} : {seconds}
          <p className="font-semibold px-2 rounded-md text-center">Left</p>
        </span>
      </div>
      
    );
  };

  const clickListener = (id) =>{
    router.push(`/detailView?id=${id}`)
  }

  
  return (
    <div className="flex flex-col gap-4 mt-2">
      {" "}
      <div className="flex justify-between rounded-lg p-2 bg-blue-100">
        <p className="ml-5 font-semibold text-lg">{title}</p>
        <div className="flex gap-2 w-[70%]">
          {timer && (
            <>
              {" "}
              <AccessTimeFilledIcon className="text-red-600" />
              <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
            </>
          )}
        </div>
        <div className="flex items-end">
          <button className="rounded-md px-2 text-white bg-red-600">
            View All
          </button>
        </div>
      </div>
      <Divider />
      <div>
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          infinite={true}
          keyBoardControl={true}
          centerMode={true}
        >
          {products.map((product, index) => (
            // <Link href={`/detailView?id=${product._id}`}>
            <div className=" flex flex-col justify-center w-44 hover:shadow-md hover:shadow-purple-600 h-52 items-center border-[1px] hover:cursor-pointer border-gray-300 ml-2 py-2 pt-4" key={index} onClick={()=>clickListener(product._id)}>
              <img
                src={product.imageUrl}
                alt={product.title || "Drill Machine"}
                className="w-32 h-32  rounded-sm"
              />
              <p className="font-semibold">{product?.title || "Ammz construction"}</p>
              <p className="text-green-600">{Math.round(100*(product.mrp-product.rate)/product.mrp)}% Discount</p>
              <p className="text-slate-950 opacity-[0.9]">
                {product.category}
              </p>
            </div>
            // </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default slide;
