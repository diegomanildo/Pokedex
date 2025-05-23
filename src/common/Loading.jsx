import React from "react";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="spinner-border text-primary"
        style={{ width: "70px", height: "70px" }}
        role="status"
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
}
