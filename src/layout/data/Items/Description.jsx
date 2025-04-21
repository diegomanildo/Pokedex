import React from "react";
import FoldableCard from "../../../common/FoldableCard";

const Item = ({ item }) => (
  <header className="d-flex flex-column align-items-center">
    <img src={item.sprites.default} alt={`${item.name} sprite`} width="150px" />
  </header>
);

const Desc = ({ item }) => {
  const textEntry = item.effect_entries.find(
    (entry) => entry.language.name === "en"
  );

  
  if (textEntry) {
    const description = textEntry
    ? textEntry.short_effect.replace(/\n|\f/g, " ")
    : null;

    return (
      description && (
        <FoldableCard title={"Description"}>
          <p className="d-inline">{textEntry.short_effect}</p>
        </FoldableCard>
      )
    );
  }

  return null;
};

const Description = ({ item }) => {
  return (
      <Desc item={item} />
  );
};

export default Description;
