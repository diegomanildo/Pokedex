import React, { useEffect, useState } from "react";
import FoldableCard from "../../../common/FoldableCard";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/routes";
import Sprite from "../../../common/Sprite";
import { getPokemon } from "../../../utils/pokemon";

const CanLearn = ({ move }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    if (!move || !move.learned_by_pokemon) return;

    const fetchPokemons = async () => {
      const results = await Promise.all(
        move.learned_by_pokemon.map((entry) => getPokemon(entry.name))
      );
      setPokemons(results);
    };

    fetchPokemons();
  }, [move]);

  if (!move?.learned_by_pokemon?.length) return null;

  return (
    <FoldableCard title="Can Learn" opened={false}>
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

export default CanLearn;
