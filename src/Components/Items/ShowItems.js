import React from "react";
import DefaultLayout from "../DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ShowItems = () => {
  const [itemData, setItemData] = useState(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/items", {
        user_id: 1,
      });
      setItemData(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          INVENTORY
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Product Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Quantity
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Sale Price
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Cost Price
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Category
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                View More
              </h5>
            </div>
          </div>

          {itemData?.map((items) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6`}
              key={items.Item_id}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className=" text-black dark:text-white sm:block">
                  {items.Name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{items.Quantity}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{items.Sale_price}</p>
              </div>

              <div className=" items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{items.Cost_price}</p>
              </div>

              <div className=" items-center justify-center p-2.5 sm:flex xl:p-5">
                <p>{items.Category}</p>
              </div>
              <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                <button
                  className="text-blue-500"
                  onClick={() => {
                    navigate(`/showItems/${items.Item_id}`);
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

export default ShowItems;
