import Button from "./Button";
import React from "react";

const NextButton = ({ currentPage, setCurrentPage, totalPages }) => (
  <Button
    onClick={() => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }}
    disabled={currentPage === totalPages}
    placeholder="Next"
  />
);

export default NextButton;
