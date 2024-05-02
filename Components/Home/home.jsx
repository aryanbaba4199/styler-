import React, { Fragment } from "react";
import HomeNav from "@/Components/Home/homeNav";
import Banner from "@/Components/Home/banner";
import Slide from "@/Components/Home/slide";


const home = ({products}) => {
  
 
  return (
    <Fragment>
      <HomeNav />
      <div className="p-2">
      <Banner />
      <Slide products={products} title = "Deal of the Day" timer={true} />
      <Slide products={products} title = "Discount for you"timer={false} />
      <Slide products={products} title = "Suggesting Items" timer={false} />
      <Slide products={products} title = "Recommend Items" timer={false} />
      <Slide products={products} title = "Top Deals" timer={false} />
      </div>
    </Fragment>
  );
};

export default home;
