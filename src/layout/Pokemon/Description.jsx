import React from "react";
import Sprite from "../../common/Sprite";
import Cry from "./Cry";

const Description = ({ pokemon, showShiny }) => (
  <div className="card p-4 mt-3 w-100 text-center shadow">
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-2 text-capitalize">
        {pokemon.name.replace("-", " ")} #{pokemon.id}
      </h1>
      <div className="d-flex align-items-center gap-3">
        <Sprite pokemon={pokemon} showShiny={showShiny} size="150px" />
        <Cry cries={pokemon.cries} />
      </div>
    </div>
  </div>
);

export default Description;
