import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DefaultLayout from "../DefaultLayout";
const SingleItem = () => {
  const para = useParams();
  const [itemData, setItemData] = useState(null);
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:5000/singleItem/${para.id}`
    );
    setItemData(response.data.item[0]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return itemData ? (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 flex flex-col">
        <div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm uppercase xsm:text-base font-semibold">
              Product Name :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {itemData.Name}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Category :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {itemData.Category}
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Quantity :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {itemData.Quantity}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Minimum Quantity :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {itemData.Min_Stock}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Sale Price :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {itemData.Sale_price}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              Cost Price :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {itemData.Cost_price}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2.5 xl:pt-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              HSN Code :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {itemData.Item_HSN}
            </span>
          </div>
          <div className="flex items-center gap-3 py-2.5 xl:py-5">
            <h5 className="text-sm font-semibold uppercase xsm:text-base">
              GST :
            </h5>
            <span className="text-black dark:text-white sm:block font-medium">
              {itemData.Tax}%
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
    </DefaultLayout>
  ) : null;
};

export default SingleItem;
