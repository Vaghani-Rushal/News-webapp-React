import React from "react";
import loading from "./loading.gif";
const Spinner = () => {
  return (
    <>
      <div className="container text-center my-4">
        <img src={loading} alt="Loading" />
      </div>
    </>
  );
};

export default Spinner;
