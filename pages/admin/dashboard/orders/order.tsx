// Import necessary dependencies and styles
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import axios from 'axios';

export default function Orders() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  let adminEmail = 'aryanbaba4199@gmail.com';
  let isAdmin = false;

  if (session) {
    if (session?.user?.email === adminEmail) {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (status === 'authenticated') {
        try {
          const response = await axios.get('/api/admin/order');
          const data = response.data;
          setOrders(data.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [status]);

  return (
    <>
      <Header />
      {isAdmin ?(
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition"
            >
              {/* Order status and details */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{order.status}</h2>
                <p className="text-gray-600">
                  Order ID: {order._id} <br/>
                 Updated: {new Date(order.updatedAt).toLocaleString()}
                </p>
              </div>

              {/* Products in the order */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Products:</h3>
                <ul className="list-disc ml-4">
                  {order.products.map((product) => (
                    <li key={product._id}>
                      {product.name} - <br/>
                       Qty: {product.qty} <br/>
                        Size: {product.size} <br/>
                         Price: {product.price.toFixed()}/- <br/>
                          Color: {product.color.color} <br/>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Address */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Shipping Address:</h3>
                <p className="text-gray-600">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  <br />
                  {order.shippingAddress.address1}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.state}, {order.shippingAddress.zipCode}
                </p>
              </div>

              {/* Payment and additional details */}
              <div>
                <h3 className="text-lg font-semibold">Payment:</h3>
                <p className="text-gray-600">
                  {order.isPaid ? 'Paid' : 'Not Paid'} | Payment Method: {order.paymentMethod}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      ) : (
        "Log In as Admin First"
      )}
    </>
  );
}
