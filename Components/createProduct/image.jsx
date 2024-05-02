import React from "react";

const Image = ({ image, setImage, tempImageURL, setTempImageURL }) => {
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const temporaryImageURL = URL.createObjectURL(selectedImage);
      setTempImageURL(temporaryImageURL);
      setImage(selectedImage);
    }
  };

  return (
    <>
      <div>
        <div className="text-lg flex justify-between gap-4 font-serif ">
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {tempImageURL && (
          <img
            src={tempImageURL}
            alt="Temporary Preview"
            style={{ maxWidth: "200px" }}
          />
        )}
      </div>
    </>
  );
};

export default Image;
