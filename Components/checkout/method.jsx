import React, { useState } from "react";

const PaymentMethod = ({selectedMethod, setSelectedMethod, handleConfirmOrder}) => {
  

  const handleRadioChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-8 font-serif shadow-md shadow-red-600 px-6 py-16">
        <div className="text-2xl text-purple-950 font-semibold">
          <h2>Choose Payment Method</h2>
        </div>
        <div>
          <div className="flex gap-2 mt-8 text-lg">
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="cashOnDelivery"
              className="w-5"
              onChange={handleRadioChange}
              checked={selectedMethod === "cashOnDelivery"}
            />
            <label htmlFor="cashOnDelivery">Cash On Delivery</label>
          </div>
          <div className="flex gap-2 mt-8">
            <input
              type="radio"
              id="onlinePayment"
              className="w-5"
              name="paymentMethod"
              value="onlinePayment"
              onChange={handleRadioChange}
              checked={selectedMethod === "onlinePayment"}
            />
            <label htmlFor="onlinePayment">Online Payment</label>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <button onClick={handleConfirmOrder}
          className="bg-green-600 px-4 p-2 rounded-md text-white"
          >Confirm Order</button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
