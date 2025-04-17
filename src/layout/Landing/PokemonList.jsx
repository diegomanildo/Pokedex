import React from "react";
import { Link } from "react-router-dom";
import Sprite from "../../common/Sprite";

function PokemonList({ pokemons }) {
  return pokemons.map((pokemon) => (
    <div
      className="pokemon-card d-flex align-items-center justify-content-center m-2"
      key={pokemon.id}
    >
      <Link to={`/pokemon/${pokemon.id}`}>
        <Sprite pokemon={pokemon} size={100} />
      </Link>
    </div>
  ));
}

export default PokemonList;
