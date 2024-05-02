import React from "react";

const description = ({description, setDescription, color, setColor}) => {
  return (
    <>
      <div className="text-lg flex justify-between gap-4 font-serif ">
        Description :
        <input
          value={description}
          className="bg-gray-200 border-2 px-2  border-black w-64"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="text-lg flex justify-between gap-4 font-serif ">
        Color :
        <input
          value={color}
          className="bg-gray-200 border-2 px-2  border-black w-64"
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </>
  );
};

export default description;
