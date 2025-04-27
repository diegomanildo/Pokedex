import React from "react";

const spriteType = null;

const Sprite = React.memo(({ pokemon, showShiny, size }) => {
  const sprite = spriteType
    ? showShiny
      ? pokemon.sprites.other[spriteType].front_shiny
      : pokemon.sprites.other[spriteType].front_default
    : showShiny
    ? pokemon.sprites.front_shiny
    : pokemon.sprites.front_default;

  return (
    <img
      className="lazy"
      src={sprite}
      alt={`${pokemon.name} sprite`}
      width={size}
    />
  );
});
export default Sprite;
