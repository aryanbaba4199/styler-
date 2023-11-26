

import { useAppDispatch } from "@/redux/hooks";
import { emptyCart } from "@/redux/slices/CartSlice";
import axios from "axios";
import Image from "next/image";
import { paymentMethods } from "../checkoutPage/payment/paymentMethods";

import Head from "next/head";

function loadScript(src : any) {
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

const Payment = ({ order , setLoading, setOrder } : any) => {    
  let paymentMethod = order.paymentMethod;
  const dispatch = useAppDispatch();

  async function initiatePaytmPayment() {
    try {
      setLoading(true);

      const response = await axios.post(`/api/order/paytm`, {
        amount: order.total * 100,
        user: order.user,
      });

      const paytmData = response.data;

      const form = document.createElement('form');
      form.method = 'post';
      form.action = paytmData.paytmUrl;
      form.target = '_blank';

      Object.keys(paytmData.params).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = paytmData.params[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // You may want to handle the payment response in a callback URL
      // For example, redirect the user to a success/failure page after payment
    } catch (error) {
      setLoading(false);
      console.error("Error initiating Paytm payment:", error);
    }
  }

const paymentBtn = () => {
    if (paymentMethod === "cash") {
        cashHandler()
        return;
    }
    else {
        initiatePaytmPayment();
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
        <h3 className=" pb-2 mb-4  border-b-2  text-xl font-semibold">
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
