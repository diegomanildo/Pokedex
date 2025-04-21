import React from "react";
import FoldableCard from "../../../common/FoldableCard";

const Description = ({ move }) => {
  const flavorTextEntry = move.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );

  const description = flavorTextEntry
    ? flavorTextEntry.flavor_text.replace(/\n|\f/g, " ")
    : null;

  return (
    description && (
      <FoldableCard title={"Description"}>
        <p className="d-inline">{description}</p>
      </FoldableCard>
    )
  );
};

export default Description;
