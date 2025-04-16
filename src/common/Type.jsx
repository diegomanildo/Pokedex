import React from "react";
import { capitalize } from "../utils/utils";

function Type({ name }) {
  return (
    <img
      key={name}
      className="px-1"
      src={`https://play.pokemonshowdown.com/sprites/types/${capitalize(
        name
      )}.png`}
      alt={name}
      width="60px"
    />
  );
}

export default Type;
