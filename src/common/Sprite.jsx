import React from "react";

export default function Sprite({ pokemon, showShiny, size }) {
  return (
    <img
      src={
        showShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default
      }
      alt={`${pokemon.name} sprite`}
      width={size}
    />
  );
}
