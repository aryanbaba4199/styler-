import Payment from "@/components/order/Payment";
import Header from "@/components/Header/Header";
import OrderInfo from "@/components/order/OrderInfo";
import Product from "@/components/order/Product";
import Total from "@/components/order/Total";
import UserInfo from "@/components/order/UserInfo";
import Order from "../../models/Order";
import { useEffect, useState } from "react";
import db from "@/utils/db";    
import DotLoaderSpinner from "@/components/loaders/dotLoader/DotLoaderSpinner";

const OrderPage = ({ order: orderData }: any) => {
    console.log("jdjd",orderData);
    const [order ,setOrder] = useState(orderData);
    const [loading, setLoading] = useState(false);
    console.log
    return (
        <>
            {loading && <DotLoaderSpinner loading={loading} />}
            <Header title="Styler" />
            <main className="max-w-screen-2xl mx-auto bg-gray-100 grid grid-cols-1 md:grid-cols-2 md:px-10 pt-5 pb-8 gap-8">
                <section className="bg-white p-2 md:p-5 rounded-xl border">
                    <OrderInfo order={order} />

                    {order.products.map((product: any, i: any) => (
                        <Product key={i} product={product} />
                    ))}

                    <Total order={order} />
                </section>
                <section className="h-fit bg-white p-2 md:p-5 rounded-xl border">
                    <UserInfo order={orderData} />
                    {order.isPaid == false && (
                        <Payment
                            order={order}
                            setOrder={setOrder}
                            setLoading={setLoading}
                            profile={false}
                            
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export default OrderPage;

export async function getServerSideProps(context: any) {
    const { query } = context;
    const id = query.id;
    console.log(id);
    await db.connectDb();
        
    const order = await Order.findById(id).populate("user").lean();

    return {
        props: {
            order: JSON.parse(JSON.stringify(order)),
        },
    };
}

