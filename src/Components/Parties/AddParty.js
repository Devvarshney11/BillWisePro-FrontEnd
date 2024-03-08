import React from "react";
import DefaultLayout from "../DefaultLayout";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import axios from "axios";
const AddParty = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email_id, setEmailId] = useState("");
  const [address, setAddress] = useState("");
  const [notice_period, setNoticePeriod] = useState(1);
  const [limit_amount, setLimitAmount] = useState(0);
  const [to_pay, setToPay] = useState(0);
  const handleFormSubmit = async () => {
    if (name === "" || phone_number === "" || address === "") {
      toast.error("Please fill all the required fields");
    } else {
      try {
        const data = {
          name: name,
          GSTIN: GSTIN,
          phone_number: phone_number,
          email_id: email_id,
          address: address,
          notice_period: notice_period,
          limit_amount: limit_amount,
          to_pay: to_pay,
          to_get: 0,
          user_id: user.user_id,
        };
        const response = await axios.post(
          "http://localhost:5000/addParties",
          data
        );
        if (response.status === 200) {
          toast.success("Party Added Successfully");
          setName("");
          setGSTIN("");
          setPhoneNumber("");
          setEmailId("");
          setAddress("");
          setNoticePeriod(1);
          setLimitAmount(0);
          setToPay(0);
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <DefaultLayout>
      <ToastContainer />
      <div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                ADD PARTY
              </h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Party Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      type="text"
                      placeholder="Enter Party Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Phone Number <span className="text-meta-1">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        if (e.target.value.length <= 10) {
                          setPhoneNumber(e.target.value);
                        }
                      }}
                      value={phone_number}
                      type="text"
                      placeholder="Enter Phone Number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email Address
                    </label>
                    <input
                      onChange={(e) => {
                        setEmailId(e.target.value);
                      }}
                      value={email_id}
                      type="text"
                      placeholder="Enter Email Address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      GSTIN
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setGSTIN(e.target.value);
                      }}
                      value={GSTIN}
                      placeholder="Enter GST Number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2 mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Billing Address <span className="text-meta-1">*</span>
                    </label>
                    <textarea
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      rows={2}
                      placeholder="Enter Billing Address"
                      value={address}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Opening Balance
                    </label>
                    <input
                      onChange={(e) => {
                        setToPay(e.target.value);
                      }}
                      type="text"
                      value={to_pay}
                      placeholder="Enter Opening Balance"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Credit Period
                    </label>
                    <input
                      type="number"
                      onChange={(e) => {
                        setNoticePeriod(e.target.value);
                      }}
                      value={notice_period}
                      placeholder="Enter Credit Period"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Credit Limit
                    </label>
                    <input
                      onChange={(e) => {
                        setLimitAmount(e.target.value);
                      }}
                      value={limit_amount}
                      type="number"
                      placeholder="Enter Credit Limit"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  onClick={() => {
                    handleFormSubmit();
                  }}
                >
                  Add Party
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddParty;
