import React, { useEffect, useState } from "react";
import { getPokemon } from "../../../utils/pokemon";
import FoldableCard from "../../../common/FoldableCard";
import Sprite from "../../../common/Sprite";
import { routes } from "../../../utils/routes";
import { Link } from "react-router-dom";

const Pokemons = ({ pokemonsData }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const results = await Promise.all(
        pokemonsData.map((slot) => getPokemon(slot.pokemon.name))
      );
      setPokemons(results);
    };

    fetchPokemons();
  }, [pokemonsData]);

  return (
    <FoldableCard title="Pokemons" opened={false}>
      <div className="d-flex flex-wrap justify-content-center">
        {pokemons.map((pokemon) => (
          <div
            className="search-card d-flex align-items-center justify-content-center m-2"
            key={pokemon.id}
          >
            <Link to={routes.pokemonData.replace(":name", pokemon.name)}>
              <Sprite pokemon={pokemon} size={100} />
            </Link>
          </div>
        ))}
      </div>
    </FoldableCard>
  );
};

export default Pokemons;
