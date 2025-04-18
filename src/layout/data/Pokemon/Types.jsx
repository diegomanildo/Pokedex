import React from "react";
import TypeIcon from "../../common/TypeIcon";

const Types = ({ pokemonTypes }) => (
  <section className="mt-3">
    <h2 className="text-start">Types</h2>
    <div className="col">
      {pokemonTypes.map((slot) => (
        <TypeIcon key={slot.slot} name={slot.type.name} />
      ))}
    </div>
  </section>
);

export default Types;
