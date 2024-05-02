import React from "react";

const category = ({ category, setCategory }) => {
  const categoryData = [
    { id: 1, name: "Raw" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Plumbing" },
    { id: 4, name: "Flooring" },
    { id: 5, name: "Services" },
    { id: 6, name: "Tools"},
    {id: 7, name: "Decorations"},
    { id: 8, name: "Furniture"},
    { id: 9, name: "Hardware"},
    
  ];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <>
      <div className="text-lg flex justify-between gap-4 font-serif">
        Category:
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categoryData.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default category;
