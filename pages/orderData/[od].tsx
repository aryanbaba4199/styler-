import React, { useEffect, useState } from 'react';
import Header from "@/components/Header/Header";
import Order from "../../models/Order";
import { getSession } from 'next-auth/react';
import db from '@/utils/db';
import OrderInfo from "@/components/order/OrderInfo";
import Product from "@/components/order/Product";
import Total from "@/components/order/Total";
import UserInfo from "@/components/order/UserInfo";
import Payment from "@/components/order/Payment";
import { useRouter } from 'next/router';

export default function Orders({ orders : initialOrders}) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const session = getSession();
  
  useEffect(() => {
    
    if (!session) {
      router.push('/');
    }
  }, [session, router]);
  
  
 
  return (
    <>
      <Header />
      {orders.map((order : any, i) =>(
      <main className="max-w-screen-2xl mx-auto bg-gray-100 grid grid-cols-1 md:grid-cols-2 md:px-10 pt-5 pb-8 gap-8">
                <section className="bg-white p-2 md:p-5 rounded-xl border">

                
                    <OrderInfo order={order} />

                    {order.products.map((product: any, i: any) => (
                        <Product key={i} product={product} />
                    ))}

                    <Total order={order} />
                </section>
                <section className="h-fit bg-white p-2 md:p-5 rounded-xl border">
                    <UserInfo order={order} />
                    {order.isPaid == false && (
                        <Payment
                            order={order}
                            
                            profile={false}
                            
                        />
                    )}
                </section>
            </main>
            ))}
      
        
    </>
  );
}


export async function getServerSideProps(context: any) {
  
  const session = getSession(context);
  
  
  let userId: any = null;

  if (session) {
    userId = session?.user?.id;
  }
  

  await db.connectDb();
  const initialOrders : any = await Order.find(userId).populate("user").lean();
  await db.disconnectDb();
  

  return {
    props: {
      orders: JSON.parse(JSON.stringify(initialOrders)),
    },
  };
}
