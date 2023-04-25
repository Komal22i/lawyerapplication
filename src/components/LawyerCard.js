import React from "react";

const LawyerCard = ({ emplyeeData, onClickBook }) => {
  const { name, price, speciality, image } = emplyeeData;

  return (
    <>
      <div className=" rounded-lg shadow-md shadow-sky-600 hover:translate-y-1 translate transform">
        <img
          className="px-20 py-2"
          src='../lawyer.png'
          alt="lawyer_image"
        />
        <div className="px-6 py-4 text-center">
          <h4 className="mb-3 text-xl uppercase font-semibold tracking-tight text-sky-600">
            {name}
          </h4>
          <p className="mb-2 leading-normal text-sky-900 text-lg capitalize font-bold">{speciality}</p>
          <p className="mb-2 leading-normal text-sky-900 font-semibold">Rs. {price}</p>

          <div>
            <button
              type="button"
              onClick={onClickBook}
              className="px-8 py-2 mb-5 font-semibold rounded-md shadow-sm bg-sky-600 shadow-sky-600 text-white 
        hover:bg-sky-600 hover:text-sky-100"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerCard;
