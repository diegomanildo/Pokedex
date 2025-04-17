import React from "react";

const Sprite = React.memo(({ pokemon, showShiny, size }) => (
  <img
    className="lazy"
    src={
      showShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default
    }
    alt={`${pokemon.name} sprite`}
    width={size}
  />
));

export default Sprite;