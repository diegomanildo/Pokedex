import React from "react";
import FoldableCard from "../../../common/FoldableCard";

const Information = ({ move }) => {
  const { type, damage_class, power, accuracy, pp, priority } = move;

  return (
    <FoldableCard title="Information">
      <ul className="list-unstyled mb-0">
        <li><strong>Type:</strong> <p className="d-inline text-capitalize">{type.name}</p></li>
        <li><strong>Category:</strong> <p className="d-inline text-capitalize">{damage_class.name}</p></li>
        <li><strong>Power:</strong> {power ?? '-'}</li>
        <li><strong>Accuracy:</strong> {accuracy ? `${accuracy}%` : '-'}</li>
        <li><strong>PP:</strong> {pp}</li>
        <li><strong>Priority:</strong> {priority}</li>
      </ul>
    </FoldableCard>
  );
};

export default Information;
