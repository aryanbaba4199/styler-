import { useAppDispatch } from "@/redux/hooks";
import { emptyCart } from "@/redux/slices/CartSlice";
import axios from "axios";
import Image from "next/image";
import { paymentMethods } from "../checkoutPage/payment/paymentMethods";
import Razorpay from 'razorpay';

import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

function loadScript(src: any) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}




const Payment = ({ order, setLoading, setOrder, }: any) => {
    let paymentMethod = order.paymentMethod;
    console.log("payment", order);
   
    const dispatch = useAppDispatch();
    
    async function displayRazorpay() {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razropay failed to load!!')
            return
        }
        const response = await axios.post(`/api/order/razorpay`, {
            amount: order.total * 100,
            user: order.user
        });

        const { orderId, razorpayOptions } = response.data;
        console.log(razorpayOptions);



        var options = {
            "key": process.env.RAZOR_MID, // Replace with your Razorpay Key ID
            "amount":order.total * 100,
            "currency": "INR",
            "name": order.user.name,
            "description": "Payment for Order",
            "order_id": orderId,
            "callback_url": "/api/order/razorpaycallback",
            "handler": function (response: any) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
            },

        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
            
        

    }


//--------Checking Integretion-----------



//   const initiatePayment = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(`/api/order/razorpay`, {
//         amount : order.total * 100, 
//         user : order.user
//       });

//       const { orderId, razorpayOptions } = response.data;

//       var razor : any = new Razorpay(razorpayOptions);
//       razor.on('payment.failed', function (response : any) {

//         console.error('Payment failed:', response.error.description);
//         setLoading(false);
//       });
//       razor.on('payment.success', function (response : any) {

//         console.log('Payment successful:', response);
//         paymentHandler(response.razorpay_payment_id);
//       });

//       razor.open();
//     } catch (error) {
//       setLoading(false);
//       console.log('Error initiating payment:', error);
//     }
//   };

//   useEffect(() => {
//     initiatePayment();
//   }, []);


const paymentHandler = async (rzrPaymnetId: any, rzrOrderId: any, rzrSignature: any) => {

    try {

        setLoading(true);
        const { data } = await axios.put("/api/order/payment", {
            id: order._id,
            rzrPaymnetId,
        });
        setOrder(data);
        dispatch(emptyCart(data));
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.log("Error handling payment:", error);
    }
};

const paymentBtn = () => {
    if (paymentMethod === "cash") {
        cashHandler()
        return;
    }
    else {
        displayRazorpay();
        return;
    }
}








const cashHandler = async () => {
    try {
        let method = "cash";
        setLoading(true);
        setTimeout(async () => {
            const { data } = await axios.put("/api/order/payment", {
                id: order._id,
                method,
            });
            console.log(data);
            setOrder(data);
            dispatch(emptyCart(data));
            setLoading(false);
        }, 500);

    } catch (error: any) {
        setLoading(false);
        console.log("errr > ", error);
    }
};

return (
    <>
        <Head>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
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
                            className={`cursor-pointer p-2 my-2 flex items-center rounded-xl ${order.paymentMethod == payment.id &&
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
                onClick={paymentBtn}
            >
                Pay
            </button>
        </div>
    </>
);
};

export default Payment;
