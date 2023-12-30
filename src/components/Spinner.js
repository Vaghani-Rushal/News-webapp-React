import React, { Component } from "react";
import loading from "./loading.gif";
export class Spinner extends Component {
  render() {
    return (
      <>
        <div className="container text-center position-absolute top-50 start-50 translate-middle">
          <img src={loading} alt="Loading" />
        </div>
      </>
    );
  }
}

export default Spinner;
