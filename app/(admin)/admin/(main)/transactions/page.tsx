import React from "react";
import Header from "../header";

const Transactions = () => {
  return (
    <div className="w-full  h-full">
      <Header title="Transactions" />
      <div className="px-10 py-8 space-y-6">
        <div className="space-y-3">
          <h1 className="text-lg leading-[44px] text-black font-bold ">
            All Transactions
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
