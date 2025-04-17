import React, { useEffect, useState } from "react";
import {
  getEvolutionChain,
  getPokemon,
  getPokemonRelations,
} from "../utils/utils";
import { useParams } from "react-router-dom";
import "./Pokemon.css";
import Loading from "../common/Loading";
import Types from "./Pokemon/Types";
import Stats from "./Pokemon/Stats";
import Evolutions from "./Pokemon/Evolutions";
import Damages from "./Pokemon/Damages";
import Header from "./Pokemon/Header";
import Description from "./Pokemon/Description";
import Error from "../common/Error";

function Pokemon() {
  const { name } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [showShiny, setShowShiny] = useState(
    localStorage.getItem("showShiny") === "true"
  );
  const [damageRelations, setDamageRelations] = useState({});
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [forms, setForms] = useState([]);
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

        const relations = await getPokemonRelations(p.types);
        setDamageRelations(relations);

        const paths = await getEvolutionChain(p.species.url);
        setEvolutionChain(paths);

        const speciesRes = await fetch(p.species.url);
        const speciesData = await speciesRes.json();

        const varietyForms = await Promise.all(
          speciesData.varieties.map(async (variety) => {
            return await getPokemon(variety.pokemon.name);
          })
        );

        setForms(varietyForms);
        setPokemon(p);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unknown error");
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
            forms={forms}
            pokemon={pokemon}
            setPokemon={setPokemon}
            showShiny={showShiny}
            setShowShiny={setShowShiny}
          />

          <Description pokemon={pokemon} showShiny={showShiny} />
          <Types pokemonTypes={pokemon.types} />
          <Damages damageRelations={damageRelations} />
          <Evolutions evolutionChain={evolutionChain} showShiny={showShiny} />
          <Stats pokemonStats={pokemon.stats} />
        </div>
      )}
    </div>
  );
}

export default Pokemon;
