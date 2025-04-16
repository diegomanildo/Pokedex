import React, { useEffect, useState } from "react";
import {
  formatEvolutionMethod,
  getEvolutionChain,
  getPokemon,
  getPokemonRelations,
} from "../utils/utils";
import {
  IconArrowBigRightLinesFilled,
  IconArrowNarrowLeftDashed,
} from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Pokemon.css";
import Loading from "../common/Loading";
import Type from "../common/Type";
import Sprite from "../common/Sprite";

function Pokemon() {
  const navigate = useNavigate();
  const { name } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [showShiny, setShowShiny] = useState(
    localStorage.getItem("showShiny") === "true"
  );
  const [damageRelations, setDamageRelations] = useState({});
  const [evolutionChain, setEvolutionChain] = useState([]);
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

  const Header = () => (
    <header className="container">
      <div className="row align-items-center mb-2">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            <IconArrowNarrowLeftDashed stroke={2} />
          </button>
          <div />
        </div>
        <div className="col-12 d-flex justify-content-end mt-2">
          <input
            className="form-check-input me-2"
            type="checkbox"
            checked={showShiny}
            onChange={() => {
              setShowShiny(!showShiny);
            }}
          />
          <p className="mb-0">Shiny sprites</p>
        </div>
      </div>
    </header>
  );

  const Types = () => (
    <section>
      <h2>Types</h2>
      {pokemon.types.map((slot) => (
        <Type name={slot.type.name} />
      ))}
    </section>
  );

  const Damages = () => {
    return Object.keys(damageRelations).length === 0 ? null : (
      <section>
        <h2>Damages</h2>
        <table cellPadding="4">
          <thead>
            <tr>
              <th>Damage</th>
              <th>Types</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(damageRelations)
              .filter(([, types]) => types.length > 0)
              .map(([category, types]) => (
                <tr key={category}>
                  <td className={category.replace("/", "-")}>
                    <strong>{category}</strong>
                  </td>
                  <td>
                    {types.map((name) => (
                      <Type name={name} />
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    );
  };

  const EvolutionStage = ({ evo, showShiny }) => (
    <div className="evolution-stage d-flex flex-column align-items-center text-center">
      <Link to={`/pokemon/${evo.name}`}>
        <Sprite pokemon={evo} showShiny={showShiny} size="" />
      </Link>
      <p className="text-capitalize">{evo.name}</p>
    </div>
  );

  const EvolutionArrow = ({ method }) => (
    <div className="d-flex flex-column align-items-center mx-2">
      <IconArrowBigRightLinesFilled />
      <small>{formatEvolutionMethod(method)}</small>
    </div>
  );

  const EvolutionLine = ({ line, showShiny }) => (
    <div className="evolution-chain d-flex flex-wrap align-items-center justify-content-center gap-3">
      {line.map((evo, idx) => (
        <React.Fragment key={evo.id}>
          <EvolutionStage evo={evo} showShiny={showShiny} />
          {idx < line.length - 1 && (
            <EvolutionArrow method={line[idx + 1].evolutionDetails} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const Evolutions = () => (
    <section>
      <h2>Evolutions</h2>
      <div className="evolution-lines d-flex flex-column align-items-center gap-4">
        {evolutionChain.map((line, i) => (
          <EvolutionLine key={i} line={line} showShiny={showShiny} />
        ))}
      </div>
    </section>
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
          <Header />
          <div className="card p-4 mt-3 w-100 text-center shadow">
            <div className="d-flex align-items-center justify-content-center gap-4 flex-wrap">
              <h1 className="mb-0 text-capitalize">
                {pokemon.name} #{pokemon.id}
                <Sprite pokemon={pokemon} showShiny={showShiny} size="150px" />
              </h1>
            </div>
          </div>
          <div className="card p-4 mt-4 w-100 shadow">
            <Types />
          </div>
          <div className="card p-4 mt-4 w-100 shadow">
            <Damages />
          </div>

          {evolutionChain.length === 0 ||
          (evolutionChain.length === 1 &&
            evolutionChain[0].length === 1) ? null : (
            <div className="card p-4 mt-4 w-100 shadow">
              <Evolutions />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Pokemon;
