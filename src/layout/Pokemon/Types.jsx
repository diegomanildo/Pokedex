import React from "react";
import Type from "../../common/Type";

const Types = ({ pokemonTypes }) => (
  <section>
    <h2>Types</h2>
    {pokemonTypes.map((slot) => (
      <Type name={slot.type.name} />
    ))}
  </section>
);

export default Types;
