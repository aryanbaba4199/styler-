import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { TableRow, TableBody, Table, TableCell } from "@mui/material";

const productDetail = ({ product }) => {
    const deliveryDate = new Date(new Date().getTime()+(3*24*60*60*1000));
 
  return (
    <>
      <div className="flex gap-2 flex-col">
        <p className="font-semibold text-lg text-blue-950">{product.title || "Ammz Goods"}</p>
        <p className="text-blue-950 font-serif">{product.category}</p>
        <div className="flex gap-4 text-sm font-semibold">
          <p className="bg-green-700 text-white px-3 rounded-sm">4.6</p>
          <p className="opacity-[0.7] gap-2">1101 Ratings & 251 Reviews</p>
        </div>
        <p className="font-semibold text-green-500">Special Price</p>
        <div className="flex gap-4 items-center">
          <p className="text-4xl font-bold opacity-[0.9]">
            <CurrencyRupeeIcon className="text-3xl " />
            {product.rate}
          </p>
          <p className="text-gray-600">
            <CurrencyRupeeIcon className="text-sm" />
            {product.mrp}
            
          </p>
          <p className=" px-2 font-semibold text-green-500 ">
            Get {Math.round(100*(product.mrp-product.rate)/product.mrp)}% Profit on this product
          </p>
          <p></p>
        </div>
        <p>Available offers</p>
       
      </div>
      <div>
        <Table>
            <TableBody>
            <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell className="font-semibold">{product.description}  </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Delivery</TableCell>
                    <TableCell className="font-semibold">Delivery by {deliveryDate.toDateString()}  </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Warranty</TableCell>
                    <TableCell className="font-semibold">No Warranty  </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Seller</TableCell>
                    <TableCell className="font-semibold">Ammz Goods & Services </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Color</TableCell>
                  <TableCell>{product.color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Measurement</TableCell>
                  <TableCell>{product.size || product.customSize || "NA"}</TableCell>
                </TableRow>
            </TableBody>
            
        </Table>
        
      </div>
      
    </>
  );
};

export default productDetail;
