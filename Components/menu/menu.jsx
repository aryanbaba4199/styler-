import React from 'react';
import { useRouter } from 'next/router';

const Menu = ({ products }) => {
    const router = useRouter();

const handleView = (id) =>{
    router.push(`/detailView?id=${id}`);
}

  return (
    <>
      <div className='grid grid-cols-4 gap-4'>
        {products ? products.length > 0 && (
          products.map((product) => (
            <div key={product._id} className='flex flex-col items-center hover:cursor-pointer shadow-md shadow-black py-4' onClick={()=>handleView(product._id)}>
              <img
                src={product.imageUrl}
                className='w-48 h-44'
                alt={product.name}
              />
              <p className='mt-2 text-blue-950 font-semibold text-xl'>{product.title || "Ammz"}</p>
              {product.color && (
                <p className="text-blue-950">Color: {product.color}</p>
              )}
              <div className='flex flex-col items-center'>
                <p className='text-gray-600'>MRP: {product.mrp}/-</p>
                <p className='text-green-600 text-xl font-semibold'>Selling Rate: {product.rate}/-</p>
                <p className='text-green-600 font-semibold'>Discount on this product: 
                  {Math.round(((product.mrp - product.rate) / product.mrp) * 100)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
}

export default Menu;
