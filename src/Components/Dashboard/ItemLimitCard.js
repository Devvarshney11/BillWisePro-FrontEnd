import React from "react";

// Dummy item limit data
const itemLimitData = [
  {
    itemName: "Soap",
    quantity: 1,
  },
  {
    itemName: "Cold drink 250ml",
    quantity: 10,
  },
  {
    itemName: "Maggi 10MRP",
    quantity: 5,
  },
];

// Item Limit Card Component
const ItemLimitCard = () => {
  return (
    <div className="col-span-12 xl:col-span-4 bg-white dark:bg-boxdark rounded-md shadow-sm border border-stroke dark:border-strokedark overflow-hidden">
      <h4 className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-xl font-semibold px-6 py-4 border-b border-stroke dark:border-strokedark">
        Item To Buy
      </h4>

      <div className="p-6">
        {itemLimitData.map((item, index) => (
          <div
            className="flex items-center justify-between py-4 px-6 border-b border-stroke dark:border-strokedark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            key={index}
          >
            <div>
              <h5 className="text-lg font-medium text-black dark:text-white">
                {item.itemName}
              </h5>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                Quantity:{" "}
                <span className="font-medium text-red-700 dark:text-red-400">
                  {item.quantity}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemLimitCard;
