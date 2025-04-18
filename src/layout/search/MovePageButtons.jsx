import React from "react";

const Button = ({ onClick, disabled, placeholder }) => (
  <button className="btn btn-secondary" onClick={onClick} disabled={disabled}>
    {placeholder}
  </button>
);

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

const MovePageButtons = ({ totalPages, currentPage, setCurrentPage }) => {
  return totalPages <= 1 ? null : (
    <div className="pagination d-flex justify-content-center mt-4">
      <BackButton currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <span className="m-2">
        Page {currentPage} of {totalPages}
      </span>

      <NextButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MovePageButtons;
