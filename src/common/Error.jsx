import React from "react";

const Error = ({ error }) => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <h2 className="error">
        Error: {error}
      </h2>
      <small className="error h6 fw-normal">
        There was an issue loading the Pokémon data. Please try again later.
      </small>
    </div>
  </div>
);

export default Error;
