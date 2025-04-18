import React from "react";
import BackButton from "../../common/BackButton";
import { routes } from "../../utils/routes";

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4">404</h1>
        <p className="lead error">Page not found</p>
        <BackButton path={routes.default} />
      </div>
    </div>
  );
};

export default NotFound;
