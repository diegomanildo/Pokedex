import React from "react";
import Sprite from "../../common/Sprite";
import Cry from "./Cry";
import Type from "../../common/Type";

const Types = ({ pokemonTypes }) => (
  <section className="mt-3">
    <h2 className="text-start">Types</h2>
    <div className="col">
      {pokemonTypes.map((slot) => (
        <Type key={slot.slot} name={slot.type.name} />
      ))}
    </div>
  </section>
);

const Description = ({ pokemon, showShiny }) => (
  <div className="card p-4 mt-3 w-100 text-center shadow">
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-2 text-capitalize">
        {pokemon.name.replace("-", " ")} #{pokemon.id}
      </h1>

      <Sprite pokemon={pokemon} showShiny={showShiny} size="150px" />
    </div>

    <Types pokemonTypes={pokemon.types} />

    <section className="mt-4">
      <h2 className="text-start">Cries</h2>
      <Cry cries={pokemon.cries} />
    </section>
  </div>
);

export default Description;
