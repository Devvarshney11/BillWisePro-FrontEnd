import React, { useEffect } from "react";
import DefaultLayout from "../DefaultLayout";
import { Link } from "react-router-dom";
import SelectCustomerOne from "./SelectCustomerOne";
import DatePickerOne from "./DatePickerOne";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GenerateInvoice = ({ type }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [partiesData, setPartiesData] = useState([{}]);
  const [itemsData, setItemsData] = useState([{}]);
  const [customer, setCustomer] = useState(null);
  const [date, setDate] = useState(new Date());
  const [pphone_number, setPphone_number] = useState("");
  const [billing_address, setBilling_address] = useState("");
  const [shipping_address, setShipping_address] = useState("");
  const [Transaction_type, setTransaction_type] = useState("cash");
  const [partyID, setPartyID] = useState("");
  const [items, setItems] = useState([
    {
      item_id: "",
      itemName: "",
      salePrice: 0,
      quantity: 0,
      gstPercentage: 0,
      tax: 0,
      discount: 0,
      total: 0,
    },
  ]);

  const handleAddRow = () => {
    setItems([
      ...items,
      {
        item_id: "",
        itemName: "",
        salePrice: 0,
        quantity: 0,
        gstPercentage: 0,
        tax: 0,
        discount: 0,
        total: 0,
      },
    ]);
  };
  const handleFormSubmit = async () => {
    const data = {
      transactions: {
        Transaction_type: Transaction_type,
        total_amount: calculateTotalAmount(items),
        discount_amount: calculateTotalDiscount(items),
        amount_received: balance,
      },
      sale: {
        Shipping_address: shipping_address,
        date: date.toISOString().split("T")[0],
        party_id: partyID,
        type: type,
        user_id: user.user_id,
      },
      items: items.map((item) => {
        return {
          item_id: item.item_id,
          item_qty: item.quantity,
        };
      }),
    };
    console.log(data);
    const response = await axios.post("http://localhost:5000/generate", data);
    console.log(response);
    navigate("/invoice/" + response.data.invoice_no);
  };
  const calculateTotalDiscount = (items) => {
    let totalDiscount = 0;
    items.forEach((item) => {
      totalDiscount += parseFloat(item.discount);
    });
    return totalDiscount;
  };
  const calculateTotalAmount = (items) => {
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += parseFloat(item.total);
    });
    return totalAmount;
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };
  const handleItemNameChange = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index].itemName = e.target.value;
    const data = itemsData.find((item) => item.Name === e.target.value);

    if (data) {
      updatedItems[index].item_id = data.Item_id;
      updatedItems[index].salePrice = parseFloat(data.Sale_price);
      updatedItems[index].gstPercentage = parseFloat(data.Tax);
      updatedItems[index].quantity = 1;

      const tax = (
        updatedItems[index].salePrice *
        0.01 *
        data.Tax *
        updatedItems[index].quantity
      ).toFixed(2);
      updatedItems[index].tax = parseFloat(tax);
      updatedItems[index].total =
        updatedItems[index].salePrice * updatedItems[index].quantity +
        updatedItems[index].tax -
        updatedItems[index].discount;
      setItems(updatedItems);
    } else {
      console.error("Item data not found for:", e.target.value);
    }
  };
  const handleQuantityChange = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = e.target.value;
    const tax = (
      updatedItems[index].salePrice *
      0.01 *
      updatedItems[index].gstPercentage *
      updatedItems[index].quantity
    ).toFixed(2);
    updatedItems[index].tax = parseFloat(tax);
    updatedItems[index].total =
      updatedItems[index].salePrice * updatedItems[index].quantity +
      updatedItems[index].tax -
      updatedItems[index].discount;
    setItems(updatedItems);
  };
  const handleSalePriceChange = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index].salePrice = e.target.value;
    const tax = (
      updatedItems[index].salePrice *
      0.01 *
      updatedItems[index].gstPercentage *
      updatedItems[index].quantity
    ).toFixed(2);
    updatedItems[index].tax = parseFloat(tax);
    updatedItems[index].total =
      updatedItems[index].salePrice * updatedItems[index].quantity +
      updatedItems[index].tax -
      updatedItems[index].discount;
    setItems(updatedItems);
  };
  const handleGstPercentageChange = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index].gstPercentage = e.target.value;
    const tax = (
      updatedItems[index].salePrice *
      0.01 *
      updatedItems[index].gstPercentage *
      updatedItems[index].quantity
    ).toFixed(2);
    updatedItems[index].tax = parseFloat(tax);
    updatedItems[index].total =
      updatedItems[index].salePrice * updatedItems[index].quantity +
      updatedItems[index].tax -
      updatedItems[index].discount;
    setItems(updatedItems);
  };
  const handleDiscountChange = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index].discount = e.target.value;
    updatedItems[index].total = (
      updatedItems[index].salePrice * updatedItems[index].quantity +
      updatedItems[index].tax -
      updatedItems[index].discount
    ).toFixed(2);
    setItems(updatedItems);
  };
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
      const item = await axios.post("http://localhost:5000/items", {
        user_id: user.user_id,
      });
      setItemsData(item.data.items);
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
      setBalance(filterdata[0].to_pay);
      setPphone_number(filterdata[0].phone_number);
      setBilling_address(filterdata[0].address);
      setShipping_address(filterdata[0].address);
      setPartyID(filterdata[0].party_id);
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
                  <SelectCustomerOne
                    name={"Party Name"}
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
                      onChange={(e) => setBilling_address(e.target.value)}
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
                      onChange={(e) => setShipping_address(e.target.value)}
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
                    <th className="border p-2">Discount</th>
                    <th className="border p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index + item.itemName}>
                      <td className="border p-2">
                        <select
                          name="itemName"
                          value={item.itemName}
                          onChange={(e) => handleItemNameChange(e, index)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                          <option value="" disabled>
                            Items
                          </option>
                          {itemsData.map((item) => (
                            <option
                              key={item.Name + item.item_id}
                              value={item.Name}
                            >
                              {item.Name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          name="salePrice"
                          value={item.salePrice}
                          onChange={(e) => handleSalePriceChange(e, index)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(e, index)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          name="gstPercentage"
                          value={item.gstPercentage}
                          onChange={(e) => handleGstPercentageChange(e, index)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          name="gstPercentage"
                          value={item.tax}
                          onChange={(e) => handleInputChange(e, index)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          name="gstPercentage"
                          value={item.discount}
                          onChange={(e) => handleDiscountChange(e, index)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          name="gstPercentage"
                          value={item.total}
                          onChange={(e) => handleInputChange(e, index)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleAddRow}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add Row
              </button>
              <div className="flex justify-between">
                <div className="bg-gray-200 p-4 rounded-lg dark:bg-gray-700">
                  <select
                    name=""
                    value={Transaction_type}
                    onChange={(e) => {
                      setTransaction_type(e.target.value);
                    }}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="cash">Cash</option>
                    <option value="bank">Online</option>
                  </select>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg dark:bg-gray-700">
                  <p>{"Total Amount: " + calculateTotalAmount(items)}</p>
                  <span>{"Amount Received: "}</span>
                  <input
                    type="text"
                    value={balance}
                    onChange={(e) => {
                      setBalance(e.target.value);
                    }}
                    className="rounded border-[1.5px] border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <h2 className="text-xl font-bold">Amount Due</h2>
                  <p className="text-3xl font-bold text-red-600">
                    {calculateTotalAmount(items) - balance}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              onClick={() => {
                handleFormSubmit();
              }}
            >
              {type == "sale" ? "Generate Sale" : "Generate Purchase"}
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default GenerateInvoice;
