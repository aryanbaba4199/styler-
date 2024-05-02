import React, { useState, useEffect } from "react";
import { InputBase, List, ListItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { getproducts } from "@/redux/action/productAction";
import Link from 'next/link';

const search = () => {
  const [text, setText] = useState("");
  const { products } = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproducts);
  }, [dispatch]);

  const getText = (text) => {
    setText(text);
  };

  return (
    <div className="flex gap-2">
      <div className="bg-white w-72 ml-5 flex rounded-md">
        <InputBase
          className="w-full px-2"
          placeholder="Search for products"
         
          onChange={(e) => getText(e.target.value)}
        />
        <div className=" flex justify-end items-end">
          <SearchIcon className="text-2xl mr-2 mb-1 text-black" />
        </div>
        <div className="absolute mt-12">
          {text && (
            <List className="text-white bg-slate-950 rounded-lg">
              {products
                .filter((product) =>
                  product?.title
                    .toLowerCase()
                    .includes(text.toLowerCase())
                )
                .map((product) => (
                  <ListItem key={product.id} onClick={()=>setText('')}>
                    <Link href = {`/detailView?id=${product._id}`}>* {product?.title?.longTitle}</Link>
                  </ListItem>
                ))}
            </List>
          )}
        </div>
      </div>
    </div>
  );
};

export default search;
