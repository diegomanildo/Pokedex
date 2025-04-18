import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Stats from "./Pokemon/Stats";
import Evolutions from "./Pokemon/Evolutions";
import Damages from "./Pokemon/Damages";
import Header from "./Pokemon/Header";
import Description from "./Pokemon/Description";
import Error from "../../common/Error";
import Movements from "./Pokemon/Movements";
import { getPokemon } from "../../utils/pokemon";

function Pokemon() {
  const { name } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [showShiny, setShowShiny] = useState(
    localStorage.getItem("showShiny") === "true"
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("showShiny", showShiny);
  }, [showShiny]);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);

      try {
        const p = await getPokemon(name);
        setPokemon(p);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [name]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pokemon container py-4">
      {error ? (
        <Error error={error} />
      ) : (
        <div className="d-flex flex-column align-items-center">
          <Header
            pokemon={pokemon}
            setPokemon={setPokemon}
            showShiny={showShiny}
            setShowShiny={setShowShiny}
          />

          <Description pokemon={pokemon} showShiny={showShiny} />
          <Damages types={pokemon.types.map(slot => slot.type.name)} />
          <Evolutions species={pokemon.species} showShiny={showShiny} />
          <Stats pokemonStats={pokemon.stats} />
          <Movements moves={pokemon.moves} />
        </div>
      )}
    </div>
  );
}

export default Pokemon;
