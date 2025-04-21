import React from "react";
import FoldableCard from "../../../common/FoldableCard";
import { romanToInt } from "../../../utils/utils";

const Generation = ({ addedIn }) => {
  const number = romanToInt(addedIn.split("-")[1]);
  
  return (
    <FoldableCard title="Generation">
      <p className="d-inline text-capitalize">
        {" "}
        &ge; Generation {number}
      </p>
    </FoldableCard>
  );
};

export default Generation;
