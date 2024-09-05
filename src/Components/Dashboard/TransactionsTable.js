import React from "react";

const transactionData = [
  {
    transactionId: "TXN12345",
    partyName: "Amit Sharma",
    amount: "₹3,500",
    paidAmount: "₹2,000",
    dueAmount: "₹1,500",
  },
  {
    transactionId: "TXN12346",
    partyName: "Priya Patel",
    amount: "₹4,200",
    paidAmount: "₹3,000",
    dueAmount: "₹1,200",
  },
  {
    transactionId: "TXN12347",
    partyName: "Rajesh Kumar",
    amount: "₹2,750",
    paidAmount: "₹2,750",
    dueAmount: "₹0",
  },
  {
    transactionId: "TXN12348",
    partyName: "Anita Desai",
    amount: "₹1,800",
    paidAmount: "₹1,800",
    dueAmount: "₹0",
  },
  {
    transactionId: "TXN12349",
    partyName: "Suresh Reddy",
    amount: "₹3,200",
    paidAmount: "₹2,500",
    dueAmount: "₹700",
  },
];

const TransactionsTable = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Transactions
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase">ID</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase">Party Name</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase">Amount</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase">Paid Amount</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase">Due Amount</h5>
          </div>
        </div>

        {transactionData.map((transaction, index) => (
          <div
            className={`grid grid-cols-5 ${
              index === transactionData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={index}
          >
            <div className="p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {transaction.transactionId}
              </p>
            </div>

            <div className="p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {transaction.partyName}
              </p>
            </div>

            <div className="p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{transaction.amount}</p>
            </div>

            <div className="p-2.5 xl:p-5">
              <p className="text-meta-3">{transaction.paidAmount}</p>
            </div>

            <div className="p-2.5 xl:p-5">
              <p className="text-red-500">{transaction.dueAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsTable;
