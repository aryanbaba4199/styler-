import React from "react";

const Size = ({ size, setSize, customSize, setCustomSize, qty, setQty }) => {
  const sizeData = [
    { id: 1, name: "mm" },
    { id: 2, name: "cft" },
    { id: 3, name: "cm" },
    { id: 4, name: "sqft" },
    { id: 5, name: "ft" },
    { id: 6, name: "meter" },
    { id: 7, name: "1x1" },
    { id: 8, name: "2x2" },
    { id: 9, name: "4x2" },
    { id: 10, name: "4x4" },
    { id: 11, name: "8x4" },
    { id: 12, name: "8x8" },
  ];

  const sizeChange = (event) => {
    const selectedSize = event.target.value;
    console.log("Selected Size:", selectedSize);
    setSize(selectedSize);

    if (selectedSize !== "custom") {
      setCustomSize("");
    }
  };

  const handleCustomSizeChange = (event) => {
    const customSizeValue = event.target.value;
    console.log("Custom Size:", customSizeValue);
    setCustomSize(customSizeValue);
  };

  return (
    <>
      <div className="text-lg flex justify-between font-sans gap-4">
        <p>Size</p>
        <select value={size} onChange={sizeChange}>
          <option value="">Select Size</option>
          {sizeData.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="custom">Custom Size</option>
        </select>
        {size === "custom" && (
          <input
            type="text"
            placeholder="Enter Custom Size"
            value={customSize}
            onChange={handleCustomSizeChange}
          />
        )}
      </div>

      <div className="text-lg flex justify-between gap-4 font-serif ">
        Quantity :
        <input
          value={qty}
          className="bg-gray-200 border-2  px-2  border-black w-64"
          onChange={(e) => setQty(e.target.value)}
        />
      </div>
    </>
  );
};

export default Size;
