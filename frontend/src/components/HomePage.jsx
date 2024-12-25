import React, { useState } from "react";
import Actions from "./Actions"; 
import PlaceOrder from "./PlaceOrder"; 
import SearchOrder from "./SearchOrder";
import GetTotalRevenue from "./GetTotalRevenue"; 

function HomePage() {
  const [action, setAction] = useState(null);

  const renderActionComponent = () => {
    switch (action) {
      case "PlaceOrder":
        return <PlaceOrder />;
      case "SearchOrder":
        return <SearchOrder />;
      case "GetTotalRevenue":
        return <GetTotalRevenue />;
      default:
        return <p>Please select an action.</p>;
    }
  };

  return (
    <>
      {/* Render Actions Component */}
      <Actions onSelectAction={setAction} />

      {/* Render the selected action component */}
      <div className="mt-10">{renderActionComponent()}</div>
    </>
  );
}

export default HomePage;
