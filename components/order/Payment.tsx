import { useAppDispatch } from "@/redux/hooks";
import { emptyCart } from "@/redux/slices/CartSlice";
import axios from "axios";
import razorpay from "razorpay";
import Image from "next/image";
import { paymentMethods } from "../checkoutPage/payment/paymentMethods";

import { useState, useEffect } from "react";
import Head from "next/head";

  




const Payment = ({ order, setLoading, setOrder }: any) => {
    const dispatch = useAppDispatch();
    console.log("Order dara : " + order)


    //--------Checking Integretion-----------
   // ... (existing imports)


  // const initiatePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post('/api/order/razorpay', {
  //       amount: order.total * 100, // Convert the amount to the smallest currency unit (e.g., paise)
  //     });

  //     const { orderId, razorpayOptions } = response.data;

  //     const razor : any = new razorpay(razorpayOptions);
  //     razor.on('payment.failed', function (response : any) {
  //       // Handle failed payment
  //       console.error('Payment failed:', response.error.description);
  //       setLoading(false);
  //     });
  //     razor.on('payment.success', function (response : any) {
  //       // Handle successful payment
  //       console.log('Payment successful:', response);
  //       paymentHandler(response.razorpay_payment_id);
  //     });

  //     razor.open();
  //   } catch (error) {
  //     setLoading(false);
  //     console.log('Error initiating payment:', error);
  //   }
  // };

  // useEffect(() => {
  //   initiatePayment();
  // }, []);


  const paymentHandler = async (razorpayPaymentId: string) => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/order/payment", {
        id: order._id,
        razorpayPaymentId,
      });
      setOrder(data);
      dispatch(emptyCart(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error handling payment:", error);
    }
  };

  

    


    

    // const paymentHandler = async () => {
    //     try {
    //         setLoading(true);
    //         setTimeout(async () => {
    //             const { data } = await axios.put("/api/order/payment", {
    //                 id: order._id,
    //             });
    //             setOrder(data);
    //             dispatch(emptyCart(data));
    //             setLoading(false);
    //         }, 500);

    //     } catch (error: any) {
    //         setLoading(false);
    //         console.log("errr > ", error);
    //     }
    // };

    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
        </Head>
            <h3 className=" pb-2 mb-4 border-b border-b-2  text-xl font-semibold">
                Payment
            </h3>
            <div>
                {paymentMethods.map((payment: any) => {
                    if (payment.id == order.paymentMethod) {
                        return (
                            <div
                                key={payment.id}
                                className={`cursor-pointer p-2 my-2 flex items-center rounded-xl ${
                                    order.paymentMethod == payment.id &&
                                    "bg-slate-200"
                                } hover:bg-slate-200 transition`}
                            >
                                <label htmlFor={payment.id} className="">
                                    <input
                                        type="radio"
                                        name="payment"
                                        id={payment.id}
                                        readOnly
                                        defaultChecked={
                                            order.paymentMethod == payment.id
                                        }
                                    />
                                </label>
                                <div className="flex items-center ">
                                    <Image
                                        src={`/../public/assets/images/${payment.id}.png`}
                                        alt={payment.name}
                                        width={40}
                                        height={40}
                                        className="mx-3"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-semibold">
                                            {payment.name}
                                        </span>
                                        <p className="text-sm text-slate-600">
                                            {payment.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
                <button
                    className=" mt-2 w-full rounded-xl bg-amazon-blue_light text-white p-4 font-semibold text-2xl hover:bg-amazon-blue_dark hover:scale-95 transition"
                    onClick={() => paymentHandler()}
                >
                    Pay
                </button>
            </div>
        </>
    );
};

export default Payment;
