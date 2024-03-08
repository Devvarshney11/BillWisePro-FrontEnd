import React, { useEffect } from "react";
import DefaultLayout from "../DefaultLayout";
import { Link } from "react-router-dom";
import SelectGroupOne from "./SelectGroupOne";
import DatePickerOne from "./DatePickerOne";
import { useState } from "react";
import axios from "axios";

const GenerateInvoice = ({ type }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [count, setCount] = useState(0);
  const [partiesData, setPartiesData] = useState([{}]);
  const [customer, setCustomer] = useState(null);
  const [cphone_number, setCphone_number] = useState("");
  const [date, setDate] = useState(new Date());
  const [pphone_number, setPphone_number] = useState("");
  const [billing_address, setBilling_address] = useState("");
  const [shipping_address, setShipping_address] = useState("");
  const fetchCount = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/invoicesCount`, {
        user_id: user.user_id,
      });
      console.log(response.data);
      setCount(response.data.invoicescount[0].count);
      const party = await axios.post("http://localhost:5000/getParties", {
        user_id: user.user_id,
      });
      setPartiesData(party.data.parties);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCount();
  }, []);
  useEffect(() => {
    if (customer) {
      const filterdata = partiesData.filter((party) => {
        return party.name === customer;
      });
      setPphone_number(filterdata[0].phone_number);
      setBilling_address(filterdata[0].address);
      setShipping_address(filterdata[0].address);
    }
  }, [customer]);
  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            {type == "sale" ? "Generate Sale" : "Generate Purchase"}
          </h3>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="p-6.5">
            <div className="flex flex-col items-end">
              <div className="mb-4.5 w-full xl:w-1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Invoice Number <span className="text-meta-1">*</span>
                </label>
                <input
                  onChange={(e) => {
                    setCount(e.target.value);
                  }}
                  type="number"
                  value={count + 1}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 w-full xl:w-1/4">
                <DatePickerOne
                  date={date.toISOString().split("T")[0]}
                  setDate={setDate}
                />
              </div>
            </div>
            <div className="">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/4">
                  <SelectGroupOne
                    name={"Customer"}
                    arr={partiesData}
                    setCustomer={setCustomer}
                  />
                </div>
                {customer && (
                  <div className="w-full xl:w-1/4">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Phone Number
                    </label>

                    <input
                      onChange={(e) => {
                        if (e.target.value.length <= 10)
                          setPphone_number(e.target.value);
                      }}
                      type="number"
                      placeholder="Phone Number"
                      value={pphone_number}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}
              </div>
              {customer && (
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="mb-6 w-full xl:w-1/4">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Billing Address
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter Billing Address"
                      value={billing_address}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>
                  <div className="mb-6 w-full xl:w-1/4">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Shipping Address
                    </label>
                    <textarea
                      rows={3}
                      value={shipping_address}
                      placeholder="Enter Shipping Address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Items</h2>
              <table className="w-full border">
                <thead>
                  <tr>
                    <th className="border p-2">Item Name</th>
                    <th className="border p-2">Sale Price</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">GST%</th>
                    <th className="border p-2">Tax</th>
                    <th className="border p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {invoiceData.items.map((item) => {
                  const tax =
                    (item.Sale_price * item.Tax * item.item_qty) / 100;
                  return (
                    <tr key={item.item_id}>
                      <td className="border p-2">{item.i_name}</td>
                      <td className="border p-2">{item.Sale_price}</td>
                      <td className="border p-2">{item.item_qty}</td>
                      <td className="border p-2">{item.Tax}</td>
                      <td className="border p-2">{tax}</td>
                      <td className="border p-2">
                        {item.Sale_price * item.item_qty + tax}
                      </td>
                    </tr>
                  );
                })} */}
                </tbody>
              </table>
            </div>
            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Generate Bill
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default GenerateInvoice;
