import React, { useEffect, useState } from "react";
import {
  getEvolutionChain,
  getPokemon,
  getPokemonRelations,
} from "../utils/utils";
import { useParams } from "react-router-dom";
import "./Pokemon.css";
import Loading from "../common/Loading";
import Sprite from "../common/Sprite";
import Types from "./Pokemon/Types";
import Stats from "./Pokemon/Stats";
import Evolutions from "./Pokemon/Evolutions";
import Damages from "./Pokemon/Damages";
import Cry from "./Pokemon/Cry";
import Header from "./Pokemon/Header";

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

  const Error = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2 className="error" style={{ color: "#ff6b6b" }}>
          Error: {error}
        </h2>
        <small className="error h6 fw-normal">
          There was an issue loading the Pokémon data. Please try again later.
        </small>
      </div>
    </div>
  );

  const PokemonBasics = () => (
    <div className="card p-4 mt-3 w-100 text-center shadow">
      <div className="d-flex flex-column align-items-center">
        <h1 className="mb-2 text-capitalize">
          {pokemon.name.replace("-", " ")} #{pokemon.id}
        </h1>
        <div className="d-flex align-items-center gap-3">
          <Sprite pokemon={pokemon} showShiny={showShiny} size="150px" />
          <Cry cries={pokemon.cries} />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pokemon container py-4">
      {error ? (
        <Error />
      ) : (
        <div className="d-flex flex-column align-items-center">
          <Header forms={forms} pokemon={pokemon} setPokemon={setPokemon} showShiny={showShiny} setShowShiny={setShowShiny} />
          <PokemonBasics />
          <div className="card p-4 mt-4 w-100 shadow">
            <Types pokemonTypes={pokemon.types} />
          </div>
          <div className="card p-4 mt-4 w-100 shadow">
            <Damages damageRelations={damageRelations} />
          </div>

          <Evolutions evolutionChain={evolutionChain} showShiny={showShiny} />

          <div className="card p-4 mt-4 w-100 shadow">
            <Stats pokemonStats={pokemon.stats} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokemon;
