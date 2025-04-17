import React from "react";
import { capitalize } from "../utils/utils";

const Type = React.memo(({ name }) => (
  <img
    key={name}
    className="lazy px-1"
    src={`https://play.pokemonshowdown.com/sprites/types/${capitalize(name)}.png`}
    alt={name}
    width="60px"
  />
));

export default Type;