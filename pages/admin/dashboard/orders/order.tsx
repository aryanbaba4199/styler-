// Import necessary dependencies and styles
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditOrderModal from "./edit"



export default function Orders() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [editForm, setEditForm] = useState({
    isPaid: false,
    status: '',
  });
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  let adminEmail = 'aryanbaba4199@gmail.com';
  let isAdmin = false;

  if (session) {
    if (session?.user?.email === adminEmail) {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  }

  const fetchOrders = async () => {
    if (status === 'authenticated') {
      try {
        const response = await axios.get('/api/admin/order');
        const data = response.data;
        setOrders(data.orders.reverse());
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const closeEdit= () =>{
    setEditModalOpen(false);
    setIsEditing(true);
  }

  const handleDelete = async (orderId : any) => {
    try {
      const res = await axios.delete(`/api/admin/order?id=${orderId}`);
      if (res.status === 200) {
        toast(`Order Deleted Successfully...`);
      }
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEdit = (orderId : any) => {
    const orderToEdit = orders.find((order) => order._id === orderId);
    setEditForm({
      isPaid: orderToEdit?.isPaid,
      status: orderToEdit?.status,
    });
    setEditingOrderId(orderId);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (formData : any) => {
    setIsEditing(true);

    try {
      await axios.put(`/api/admin/order?id=${editingOrderId}`, formData);
      setEditModalOpen(false);
      setEditingOrderId(null);
      fetchOrders();
    } catch (error) {
      console.error('Error editing order:', error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <>
      <Header />
      {isAdmin ? (
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-6 p-2">Orders</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 shadow-2xl shadow-black">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-md shadow-md hover:shadow-2x1 hover:shadow-black transition relative"
              >
                {/* Order status and details */}
                <div className="mb-4">
                  {order?.status=="Not Processes" ?(
                  <h2 className="text-xl font-semibold text-green-600 mb-2">Status : {order.status}</h2>
                  ):(
                    <h2 className="text-xl  font-semibold mb-2">Status : {order.status}</h2>
                  )}
                  <p className="text-gray-600">
                    Order ID: {order._id} <br />
                    Updated: {new Date(order.updatedAt).toLocaleString()}
                  </p>
                </div>

                {/* Products in the order */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Products:</h3>
                  <ul className="list-disc ml-4">
                    {order.products.map((product) => (
                      <li key={product._id}>
                        {product.name} - <br />
                        Qty: {product.qty} <br />
                        Size: {product.size} <br />
                        Price: {product.price.toFixed()}/- <br />
                        Color: {product.color.color} <br />
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
                    {order.isPaid ? <text className='text-green-600 font-semibold'>Paid</text> : <text className='text-red-700 font-semibold'>Not Paid</text>} | Payment Method: {order.paymentMethod}
                  </p>
                </div>

                {/* Edit and Delete buttons */}
                <div className="flex justify-end space-x-2 absolute top-2 right-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleEdit(order._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </div>

                {/* Render EditOrderModal for the selected order */}
                {editingOrderId === order._id && (
                  <EditOrderModal
                    isOpen={isEditModalOpen}
                    onClose={closeEdit}
                    onSubmit={handleEditSubmit}
                    formData={editForm}
                    isLoading={isEditing}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        'Log In as Admin First'
      )}

      <ToastContainer />
    </>
  );
}
