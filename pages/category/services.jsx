import React, {useState } from "react";
import Nav from "@/Components/Header/header";
import { servicesData } from "@/constants/data";
import ServiceDraw from "@/Components/services/serviceDrawer";

const Services = () => {
  const [open, setOpen] = useState(false);

  const serviceClick = () =>{
    setOpen(true);
  }


  return (
    <>
      <Nav />
      <div className="mt-24">
        <div className="flex justify-center items-center mt-4 ">
          <h2 className="flex font-serif text-2xl font-semibold bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
            Welcome To AGS ( Ammz Goods & Service )
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 mt-8 mb-8">
          {servicesData.map((service) => (
            <div
              onClick={()=>serviceClick()}
              key={service.id}
              className="flex flex-col shadow-lg shadow-black p-6 justify-center items-center gap-2"
            >
              <img src={service.image} alt={service.title} className="h-52 w-52" />
              <p className="text-xl text-blue-950 font-semibold font-serif">
                {service.title}
              </p>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <ServiceDraw open = {open} setOpen={setOpen} data = {servicesData}/>
    </>
  );
};

export default Services;
