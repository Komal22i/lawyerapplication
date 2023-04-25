import React from "react";
import { useSelector } from "react-redux";

const History = () => {
  const { appointments } = useSelector((state) => state.bookingReducer);
  return (
    <div className="container mx-auto space-y-5 grid grid-cols-2 py-6 ">
      {appointments && appointments.length > 0 ? (
        appointments.map((item, index) => (
          <div key={index} className="mt-5 space-y-5  border-gray-500 bg-black/50 text-white border rounded-md px-8 py-6">
            <h1 className=" text-xl font-bold capitalize underline">
              {item.lawyerName} - {item.lawyerProff} - {item.lawyerPrice}
            </h1>
            <div className="">
              {item.clientRecord?.map((client, index) => (
                <div key={index}>
                  <h1><span className="text-lg font-medium">Name :</span> {client.name}</h1>
                  <h1><span className="text-lg font-medium">Email :</span> {client.email}</h1>
                  <h1><span className="text-lg font-medium">Phone :</span> {client.phone}</h1>
                  <h1><span className="text-lg font-medium">Date :</span> {client.date}</h1>
                  <h1><span className="text-lg font-medium">Slot :</span> {client.slot}</h1>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <h1>No History Found</h1>
      )}
    </div>
  );
};

export default History;
