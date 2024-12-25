import React from "react";

function Actions({ onSelectAction }) {
  return (
    <div className="flex justify-center text-black">
      <div className="flex gap-x-8 mb-20">
        <button
          onClick={() => onSelectAction("PlaceOrder")}
          className="h-12 w-32 border-2 border-black hover:bg-black hover:text-white font-mono"
        >
          Place Order
        </button>
        <button
          onClick={() => onSelectAction("SearchOrder")}
          className="h-12 w-32 border-2 border-black hover:bg-black hover:text-white font-mono"
        >
          Search Order
        </button>
        <button
          onClick={() => onSelectAction("GetTotalRevenue")}
          className="h-12 w-32 border-2 border-black hover:bg-black hover:text-white font-mono"
        >
          Get Total Revenue
        </button>
      </div>
    </div>
  );
}

export default Actions;
