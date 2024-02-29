import React, { useRef } from "react";
import DefaultLayout from "../DefaultLayout";
import { notify } from "../../Utils/Toast";
import { ToastContainer } from "react-toastify";
import axios from "axios";
// Item_HSN,
//         Category,
//         Sale_price,
//         Cost_price,
//         Tax,
//         Min_Stock,
//         Quantity,
//         Name,
//         user_id,

const AddItems = () => {
  const Item_HSN = useRef(null);
  const Category = useRef(null);
  const Sale_price = useRef(null);
  const Cost_price = useRef(null);
  const Tax = useRef(null);
  const Min_Stock = useRef(null);
  const Quantity = useRef(null);
  const Name = useRef(null);
  const handleFormSubmit = async () => {
    if (
      !Item_HSN.current.value ||
      !Category.current.value ||
      !Sale_price.current.value ||
      !Cost_price.current.value ||
      !Tax.current.value ||
      !Min_Stock.current.value ||
      !Quantity.current.value ||
      !Name.current.value
    ) {
      notify("Please Fill All The Required Fields", "error");
    } else {
      const data = {
        Item_HSN: Item_HSN.current.value,
        Category: Category.current.value,
        Sale_price: Sale_price.current.value,
        Cost_price: Cost_price.current.value,
        Tax: Tax.current.value,
        Min_Stock: Min_Stock.current.value,
        Quantity: Quantity.current.value,
        Name: Name.current.value,
        user_id: 1,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/addItems",
          data
        );
        if (response.status === 200) {
          notify("Item Added Successfully", "success");
        }

        Item_HSN.current.value = null;
        Category.current.value = null;
        Sale_price.current.value = null;
        Cost_price.current.value = null;
        Tax.current.value = null;
        Min_Stock.current.value = null;
        Quantity.current.value = null;
        Name.current.value = null;
      } catch (error) {
        notify("Error Adding Item", "error");
      }
    }
  };
  // user_id = useRef(null);
  return (
    <DefaultLayout>
      <ToastContainer />
      <div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                ADD ITEM TO INVENTORY
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
                      Product Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      ref={Name}
                      type="text"
                      placeholder="Enter Product Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      ITEM HSN <span className="text-meta-1">*</span>
                    </label>
                    <input
                      ref={Item_HSN}
                      type="number"
                      placeholder="Enter HSN Code"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Quantity <span className="text-meta-1">*</span>
                    </label>
                    <input
                      ref={Quantity}
                      type="number"
                      placeholder="Enter Product Quantity"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Minimum Quantity <span className="text-meta-1">*</span>
                    </label>
                    <input
                      ref={Min_Stock}
                      type="number"
                      placeholder="Enter Minimum Qunatity Of Product"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Cost Price <span className="text-meta-1">*</span>
                    </label>
                    <input
                      ref={Cost_price}
                      type="number"
                      placeholder="Enter Product Purchase Price"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sale Price <span className="text-meta-1">*</span>
                    </label>
                    <input
                      ref={Sale_price}
                      type="number"
                      placeholder="Enter Product Sale Price"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2 mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tax <span className="text-meta-1">*</span>
                    </label>
                    <input
                      ref={Tax}
                      type="number"
                      placeholder="Enter Tax On Product"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Category <span className="text-meta-1">*</span>
                    </label>
                    <input
                      ref={Category}
                      type="text"
                      placeholder="Enter Product Sale Price"
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
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddItems;
