import Layout from "@/components/profile/layout/Layout";
import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { ordersLinks } from "./../../components/profile/sidebar/ordersLinks";
import Link from "next/link";
import Image from "next/image";
import {
  CheckBadgeIcon,
  EyeIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import slugify from "slugify";
import { useRouter } from "next/dist/client/router";

const Orders = ({ user, tab, orders }: any) => {
  const router = useRouter();

  return (
    <>
      <div className="">
        <Layout user={user} tab={tab} title={`${user.name}'s Orders`}>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">My Orders</h2>
            <nav>
              <ul className="flex overflow-scroll bg-slate-200 rounded-lg mb-4">
                {ordersLinks.map((order: any, i: any) => (
                  <li
                    className={`${
                      router.query?.q?.split("__")[0] ==
                      slugify(order.name, { lower: true })
                        ? "font-bold border-b"
                        : ""
                    } px-2  py-2 flex items-center justify-center hover:font-bold hover:border-b mb-2`}
                    key={i}
                  >
                    <Link
                    
                      href={`/profile/orders?tab=${tab}&q=${slugify(
                        order.name,
                        { lower: true }
                      )}__${order.filter}`}
                    >
                      {order.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="overflow-x-auto">
              <table className="table_order w-full">
                <thead>
                  <tr className="hidden md:table-row">
                    
                    <td>Products</td>
                    
                    <td>Total</td>
                    <td>Paid</td>
                    <td>Status</td>
                    <td>View</td>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any, i: any) => (
                    <tr key={i} className="border-b md:border-b-0">
                      
                      <td className="px-2 md:px-4 py-2 flex flex-wrap">
                        {order.products.map((p: any) => (
                          <img
                            key={p._id}
                            src={p.image}
                            alt={p.name}
                            width={50}
                            height={50}
                            className="rounded-full mx-1 mb-2 md:mb-0"
                          />
                        ))}
                      </td>
                      
                      <td className="px-2 md:px-4 py-2">
                        <span className="md:hidden">Total: </span>
                        {order.total}/-
                      </td>
                      <td className="px-2 md:px-4 py-2">
                        <span className="md:hidden">Paid: </span>
                        {order.isPaid == true ? (
                          <CheckBadgeIcon className="w-8 h-8 fill-green-500" />
                        ) : (
                          <XCircleIcon className="w-8 h-8 fill-red-500" />
                        )}
                      </td>
                      <td className="px-2 md:px-4 py-2">
                        <span className="md:hidden">Status: </span>
                        {order.status}
                      </td>
                      <td className="px-2 md:px-4 py-2">
                        <span className="md:hidden">View: </span>
                        <Link href={`/order/${order._id}`}>
                          <EyeIcon className="w-8 h-8 fill-slate-500 cursor-pointer hover:fill-slate-800" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Orders;

export async function getServerSideProps(context: any) {
  db.connectDb();
  const { query } = context;
  const session = await getSession(context);
  const tab = query.tab || 0;

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  // --------------------------------
  const filter = query.q.split("__")[1];
  let orders = [];

  if (!filter) {
    orders = await Order.find({ user: session.user?.id })
      .sort({ createdAt: -1 })
      .lean();
  } else if (filter == "paid") {
    orders = await Order.find({ user: session.user?.id, isPaid: true })
      .sort({ createdAt: -1 })
      .lean();
  } else if (filter == "unpaid") {
    orders = await Order.find({ user: session.user?.id, isPaid: false })
      .sort({ createdAt: -1 })
      .lean();
  } else {
    orders = await Order.find({ user: session.user?.id, status: filter })
      .sort({ createdAt: -1 })
      .lean();
  }
  // console.log("filter", filter, "orders > ", orders);
  return {
    props: {
      user: session.user,
      tab,
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
