import React from "react";

const title = ({title, setTitle}) => {
    
  return (
    <>
      <div className="flex flex-col  gap-4 justify-center">
        <div className="text-lg flex justify-between gap-4 font-serif ">
          <p>Title</p>

          <input
            type="text"
            value={title}
            className="bg-gray-200 border-2 px-2  border-black w-64 "
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
      </div>
    </>
  );
};

export default title;
