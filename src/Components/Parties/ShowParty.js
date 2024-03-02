import React, { useEffect } from "react";
import DefaultLayout from "../DefaultLayout";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ShowParty = () => {
  const [partiesData, setPartiesData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const fetchData = async () => {
    const data = {
      user_id: user.user_id,
    };
    const response = await axios.post("http://localhost:5000/getParties", data);
    setPartiesData(response.data.parties);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Parties
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Party Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Phone Number
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                GSTIN
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                To Collect
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                To Pay
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                View More
              </h5>
            </div>
          </div>

          {partiesData?.map((partiesData) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6`}
              key={partiesData.party_id}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className=" text-black dark:text-white sm:block">
                  {partiesData.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {partiesData.phone_number}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {partiesData.GSTIN}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{partiesData.to_get}</p>
              </div>

              <div className=" items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-red-500">{partiesData.to_pay}</p>
              </div>
              <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                <button
                  className="text-blue-500"
                  onClick={() => {
                    navigate(`/showParty/${partiesData.party_id}`);
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
  );
};

export default ShowParty;
