import React from "react";
import FoldableCard from "../../../common/FoldableCard";
import TypeIcon from "../../../common/TypeIcon";
import MoveCategoryIcon from "../../../common/MoveCategoryIcon";

const Type = ({ move }) => (
  <FoldableCard title={"Type"}>
    <TypeIcon name={move.type.name} />
    <MoveCategoryIcon name={move.damage_class.name} />
  </FoldableCard>
);

export default Type;
