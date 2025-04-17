import Button from './Button';
import React from "react";

const BackButton = ({ currentPage, setCurrentPage }) => (
  <Button
    onClick={() => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }}
    disabled={currentPage === 1}
    placeholder="Back"
  />
);
export default BackButton;
