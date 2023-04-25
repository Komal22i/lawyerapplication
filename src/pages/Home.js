import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Select from "react-select";
import lawyerdata from "../data/db.json";
import LawyerCard from "../components/LawyerCard";
import { useDispatch, useSelector } from "react-redux";
import { BookAppointment } from "../redux/action/bookingAction";

const Home = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.bookingReducer);
  const [lawyer, setLawyer] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    date: "",
    slot: "",
  });

  const options = [
    { value: "09:00 AM to 09:30 AM", label: "09:30 AM to 10:00 AM" },
    { value: "10:00 AM to 10:30 AM", label: "19:30 AM to 11:00 AM" },
    { value: "11:00 AM to 11:30 AM", label: "11:30 AM to 12:00 PM" },
  ];

  const storeAppointmentData = (e) => {
    e.preventDefault();
    var myArr = appointments || [];

    var obj = {
      lawyerName: lawyer.name,
      lawyerProff: lawyer.speciality,
      lawyerPrice: lawyer.price,
      lawyerId: lawyer.id,
      slotCount: 1,
      clientRecord: [],
    };

    if (clientData.name.length <= 0) alert("Please Enter Your Name First");
    else if (clientData.email.length <= 0) alert("Please Enter Your Email Id");
    else if (clientData.phone.length <= 0)
      alert("Please Enter Your Phone Number");
    else if (clientData.subject.length <= 0) alert("Please Enter Your Subject");
    else if (clientData.date.length <= 0) alert("Please Select Date");
    else if (clientData.slot.length <= 0) alert("Please Select Given Slot");
    else {
      let SlotPossible = true;

      let res = appointments
        .filter((elem) => {
          return elem.lawyerId === lawyer.id;
        })
        .map((el) => {
          return el.clientRecord;
        });
      console.log(res);
      res[0]?.forEach((check) => {
        if (check.date === clientData.date && check.slot === clientData.slot) {
          SlotPossible = false;
        }
      });

      if (!SlotPossible) {
        alert("Appointments not available");
      } else if (SlotPossible) {
        let flag = true;
        appointments.forEach((el) => {
          if (el.lawyerId === obj.lawyerId) {
            el.slotCount++;
            el["clientRecord"].push(clientData);
            flag = false;
          }
        });

        if (flag) {
          obj["clientRecord"].push(clientData);
          myArr.push(obj);
        }
        dispatch(BookAppointment(myArr));
        alert("Your Appointment is Booked.");
        setIsOpen(false);
        setClientData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          date: "",
          slot: "",
        });
      }
    }
  };

  return (
    <>
      <div className="container mx-auto mb-20">
        {lawyerdata.law_firms.map((item) => (
          <div key={item.id}>
            <div className="flex items-center justify-center">
            <h1 className=" bg-gray-600/70 w-64 py-4 text-white rounded-md text-center text-xl font-semibold my-10">
              {item.name}
            </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-10 ">
              {item.employees.map((emp) => (
                <LawyerCard
                  key={emp.id}
                  onClickBook={() => {
                    setLawyer(emp);
                    setIsOpen(true);
                  }}
                  emplyeeData={emp}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative  overflow-scroll"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-scroll ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6  align-middle shadow-xl transition-all">
                  <div
                    className="text-right cursor-pointer text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    X
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-xl  text-center font-medium leading-6 text-gray-900"
                  >
                    Enter Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      value={clientData.name}
                      onChange={(e) =>
                        setClientData({ ...clientData, name: e.target.value })
                      }
                      placeholder="Enter Your Name"
                      className="w-full border-gray-300 border-2 px-2 py-2 my-3 rounded-md outline-none"
                    />
                    <input
                      value={clientData.email}
                      onChange={(e) =>
                        setClientData({ ...clientData, email: e.target.value })
                      }
                      placeholder="Enter Your Email "
                      className="w-full border-gray-300 border-2 px-2 py-2 my-3 rounded-md outline-none"
                    />
                    <input
                      value={clientData.phone}
                      onChange={(e) =>
                        setClientData({ ...clientData, phone: e.target.value })
                      }
                      placeholder="Enter Your Phone Number "
                      className="w-full border-gray-300 border-2 px-2 py-2 my-3 rounded-md outline-none"
                    />
                    <input
                      value={clientData.subject}
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          subject: e.target.value,
                        })
                      }
                      placeholder="Enter Your Subject"
                      className="w-full border-gray-300 border-2 px-2 py-2 my-3 rounded-md outline-none"
                    />
                    <input
                      value={clientData.date}
                      onChange={(e) =>
                        setClientData({ ...clientData, date: e.target.value })
                      }
                      type="date"
                      placeholder="Enter Your Subject"
                      className="w-full border-gray-300 border-2 px-2 py-2 my-3 rounded-md outline-none"
                    />
                    <label className="text-left">Choose Any Slot</label>
                    <Select
                      value={{ value: clientData.slot, label: clientData.slot }}
                      onChange={(e) =>
                        setClientData({ ...clientData, slot: e.value })
                      }
                      className="text-left my-3 rounded-md"
                      options={options}
                    />
                  </div>

                  <div className="mt-20 mb-2">
                    <button
                      type="button"
                      className="inline-flex text-lg px-20 justify-center rounded-md border border-transparent bg-blue-100  py-2  font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={storeAppointmentData}
                    >
                      SUBMIT
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Home;
