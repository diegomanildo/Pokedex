import React from "react";
import Type from "../../common/Type";

const Types = ({ pokemonTypes }) => (
  <section className="card p-4 mt-4 w-100 shadow">
    <h2>Types</h2>
    <div className="col">
      {pokemonTypes.map((slot) => (
        <Type name={slot.type.name} />
      ))}
    </div>
  </section>
);

export default Types;
