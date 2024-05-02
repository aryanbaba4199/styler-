import React from "react";

const checkOut = ({ product }) => {
  return (
    <>
      <div>
        <h2 className="text-center font-semibold font-serif text-xl md:w-[30%] w-[100%]">
          Product Details{" "}
        </h2>
        <div className="mt-8">
          <img src={product.imageUrl} className="w-48" />
          <h2 className="text-xl font-semibold">
            {product.title || "Ammz Construction"}
          </h2>
          <div className="">
            <li className="mt-2 text-lg text-red-400">
              Market Price : {product.mrp}/-
            </li>
            <li className="mt-2 text-lg font-semibold text-green-600">
              Discount Applied{" "}
              {Math.round((100 * (product.mrp - product.rate)) / product.mrp)}%
            </li>
            <li className="mt-2 text-2xl font-semibold text-green-600">
              Price : {product.rate}/-
            </li>
            {product.size ||
              (product.customSize && (
                <li>{product.size || product.customSize}</li>
              ))}
            {product.color && <li>{product.color}</li>}
            <li>{product.description}</li>
          </div>
        </div>
      </div>
    </>
  );
};

export default checkOut;
