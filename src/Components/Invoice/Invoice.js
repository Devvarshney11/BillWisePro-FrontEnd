import React, { useEffect } from "react";
import DefaultLayout from "../DefaultLayout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Invoice = () => {
  const para = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getSingleInvoice/${para.id}`
      );
      setInvoiceData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <DefaultLayout>
      {invoiceData ? (
        <div class="container mx-auto my-8 p-8 bg-white dark:bg-boxdark rounded shadow-lg">
          <div class="flex justify-between">
            <div className="mb-8">
              <p className="text-4xl font-bold mb-4">
                {invoiceData.saleInvoice[0].Company_Name}
              </p>
              <p>
                {"Contact Number: " + invoiceData.saleInvoice[0].Phone_Number}
              </p>
            </div>
            <div class="mb-8">
              <h1 class="text-4xl font-bold mb-4">
                {"Sale Invoice #" + invoiceData.saleInvoice[0].invoice_no}
              </h1>
              <p>{"Date: " + invoiceData.saleInvoice[0].date.split("T")[0]}</p>
            </div>
          </div>
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">BILL TO :</h2>
            <p>{"Name: " + invoiceData.saleInvoice[0].p_name}</p>
            <p>{"GSTIN: " + invoiceData.saleInvoice[0].p_gst}</p>
            <p>{"Address: " + invoiceData.saleInvoice[0].p_add}</p>
            <p>{"Phone Number: " + invoiceData.saleInvoice[0].p_phno}</p>
          </div>
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Items</h2>
            <table class="w-full border">
              <thead>
                <tr>
                  <th class="border p-2">Item Name</th>
                  <th class="border p-2">Sale Price</th>
                  <th class="border p-2">Quantity</th>
                  <th class="border p-2">GST%</th>
                  <th class="border p-2">Tax</th>
                  <th class="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item) => {
                  const tax =
                    (item.Sale_price * item.Tax * item.item_qty) / 100;
                  return (
                    <tr key={item.item_id}>
                      <td class="border p-2">{item.i_name}</td>
                      <td class="border p-2">{item.Sale_price}</td>
                      <td class="border p-2">{item.item_qty}</td>
                      <td class="border p-2">{item.Tax}</td>
                      <td class="border p-2">{tax}</td>
                      <td class="border p-2">
                        {item.Sale_price * item.item_qty + tax}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div class="flex justify-end">
            <div class="bg-gray-200 p-4 rounded-lg dark:bg-gray-700">
              <p>
                {"Discount Amount: " +
                  invoiceData.saleInvoice[0].discount_amount}
              </p>
              <p>
                {"Total Amount: " + invoiceData.saleInvoice[0].total_amount}
              </p>
              <p>
                {"Amount Received: " +
                  invoiceData.saleInvoice[0].amount_received}
              </p>
              <h2 class="text-xl font-bold">Amount Due</h2>
              <p class="text-3xl font-bold text-red-600">
                {invoiceData.saleInvoice[0].total_amount -
                  invoiceData.saleInvoice[0].amount_received -
                  invoiceData.saleInvoice[0].discount_amount}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h1>No Data Found .....</h1>
      )}
    </DefaultLayout>
  );
};

export default Invoice;
