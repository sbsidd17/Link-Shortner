import React from "react";
import './Loading.css';

function Loading() {
  return (
    <div className="loading">
      <div className="loading-container">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Loading...</p>
      <p>This May Take Few Seconds,</p>
      <p>Please Don't Close The Page</p>
      </div>
    </div>
  );
}

export default Loading;