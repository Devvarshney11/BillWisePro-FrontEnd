import React, { useEffect, useState } from "react";
import DefaultLayout from "../DefaultLayout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleParty = () => {
  const para = useParams();
  const navigate = useNavigate();
  const [partyData, setPartyData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/singleParty/${para.id}`
      );
      setPartyData(response.data.parties[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTrasactionData = async () => {
    try {
      const data = {
        party_id: partyData.party_id,
      };
      const response = await axios.post(
        "http://localhost:5000/partyTransactions",
        data
      );
      setTransactionData(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (partyData) {
      fetchTrasactionData();
    }
  }, [partyData]);
  return partyData ? (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 flex flex-col">
        <div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm uppercase xsm:text-base font-semibold">
              Party Name :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {partyData.name}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Phone Number
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {partyData.phone_number}
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Email Address :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {partyData.email_id}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              GST Number :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {partyData.GSTIN}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Address :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {partyData.address}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              To Collect :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {partyData.to_get}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              To Pay :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {partyData.to_pay}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Limit Amount :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {partyData.limit_amount}
            </span>
          </div>
          <div className="flex items-center gap-3 py-2.5 xl:py-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Notice Period :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {partyData.notice_period}Days
            </span>
          </div>
        </div>
        <div className="flex justify-end my-6">
          <button className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 w-1/6 mr-3">
            Edit
          </button>
          <button className="inline-flex items-center justify-center rounded-full bg-red-500 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 w-1/6">
            Delete
          </button>
        </div>
      </div>
      {/* Transaction_id: 1; */}
      {/* // Transaction_type: "cash";
// amount_received: 5000;
// date: "2023-10-24T18:30:00.000Z";
// sale_id: 1;
// total_amount: 10000; */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Transactions
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Date
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Transaction Type
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Total Amount
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Amount Received
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Balance Amount
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                View More
              </h5>
            </div>
          </div>

          {transactionData?.map((t) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6`}
              key={t.transaction_id + Math.random()}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className=" text-black dark:text-white sm:block">
                  {t.date.split("T")[0]}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {t.Transaction_type.toUpperCase()}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{t.total_amount}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{t.amount_received}</p>
              </div>

              <div className=" items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-red-500">
                  {t.total_amount - t.amount_received}
                </p>
              </div>
              <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                <button
                  className="text-blue-500"
                  onClick={() => {
                    navigate(`/invoice/${t.sale_id}`);
                  }}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  ) : null;
};

export default SingleParty;
