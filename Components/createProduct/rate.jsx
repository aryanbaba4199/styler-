import React from "react";

const rate = ({ rate, setRate, mrp, setMRP }) => {
  return (
    <>
      <div className="text-lg flex justify-between gap-4 font-serif ">
        MRP :
        <input
          type="number"
          value={mrp}
          className="bg-gray-200 border-2  px-2  border-black w-64"
          onChange={(e) => setMRP(e.target.value)}
        />
      </div>

      <div className="text-lg flex justify-between gap-4 font-serif ">
        Selling Rate :
        <input
          type="number"
          value={rate}
          className="bg-gray-200 border-2 px-2  border-black w-64"
          onChange={(e) => setRate(e.target.value)}
        />
      </div>
    </>
  );
};

export default rate;
