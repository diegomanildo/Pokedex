import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import "./Landing.css";
import icon from "../../public/icon.svg";
import {
  filterPokemons,
  getAllPokemon,
  getGenerationData,
} from "../utils/utils";
import Select from "../common/Select";
import Sprite from "../common/Sprite";

export default function Landing() {
  const pokemonContainerRef = useRef(null);

  const pokemons = 1025;
  const pokemonsPerPage = 32;

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(
    () => localStorage.getItem("search") || ""
  );

  const [allPokemon, setAllPokemon] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [generationData, setGenerationData] = useState({});

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = parseInt(localStorage.getItem("currentPage"), 10);
    return isNaN(savedPage) ? 1 : savedPage;
  });

  // Filters
  const [type, setType] = useState(() => localStorage.getItem("type") || "");
  const [generation, setGeneration] = useState(
    () => localStorage.getItem("generation") || ""
  );

  useEffect(() => {
    try {
      setLoading(true);
      getAllPokemon(pokemons).then((data) => {
        setAllPokemon(data);
      });
      getGenerationData().then(setGenerationData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filteredList = filterPokemons(
      allPokemon,
      search,
      type,
      generation,
      generationData
    );
    setFiltered(filteredList);
  }, [allPokemon, search, type, generation, generationData]);

  const currentPokemons = filtered.slice(
    currentPage * pokemonsPerPage - pokemonsPerPage,
    currentPage * pokemonsPerPage
  );
  const totalPages = Math.ceil(filtered.length / pokemonsPerPage);

  useEffect(() => {
    const handleWheel = (e) => {
      if (document.body.scrollHeight > window.innerHeight) {
        return;
      }

      if (e.deltaY > 0) {
        // Scroll up
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
      } else if (e.deltaY < 0) {
        // Scroll down
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [totalPages]);

  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("type", type);
  }, [type]);

  useEffect(() => {
    localStorage.setItem("generation", generation);
  }, [generation]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  const SearchBarForm = () => (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <div className="d-flex justify-content-center gap-2 mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search Pokemon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="btn btn-danger"
          onClick={() => {
            setSearch("");
            setType("");
            setGeneration("");
            setCurrentPage(1);
            localStorage.clear();
          }}
        >
          Reset Filters
        </button>
      </div>

      <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
        <Select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            "All Types",
            "Normal",
            "Fire",
            "Water",
            "Grass",
            "Electric",
            "Ice",
            "Fighting",
            "Poison",
            "Ground",
            "Flying",
            "Psychic",
            "Bug",
            "Rock",
            "Ghost",
            "Dragon",
            "Dark",
            "Steel",
            "Fairy",
          ]}
        />

        <Select
          value={generation}
          onChange={(e) => {
            setGeneration(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            "All generations",
            "generation-i",
            "generation-ii",
            "generation-iii",
            "generation-iv",
            "generation-v",
            "generation-vi",
            "generation-vii",
            "generation-viii",
            "generation-ix",
          ]}
        />
      </div>
    </form>
  );

  const Button = ({ onClick, disabled, children }) => (
    <button className="btn btn-secondary" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );

  const BackButton = () => (
    <Button
      onClick={() => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }}
      disabled={currentPage === 1}
    >
      Back
    </Button>
  );

  const NextButton = () => (
    <Button
      onClick={() => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      }}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  );

  const MovePageButtons = () => {
    return totalPages <= 0 ? null : (
      <div className="pagination d-flex justify-content-center mt-4">
        <BackButton />

        <span className="m-2">
          Page {currentPage} of {totalPages}
        </span>

        <NextButton />
      </div>
    );
  };

  const SearchBar = () => (
    <header className="text-center mb-4">
      <Link to="/">
        <img className="m-3" src={icon} width={40} />
      </Link>
      <SearchBarForm />
      <MovePageButtons />
    </header>
  );

  const PokemonList = () => {
    return currentPokemons.map(pokemon => (
      <div
        className="pokemon-card d-flex align-items-center justify-content-center m-2"
        key={pokemon.name}
      >
        <Link to={`/pokemon/${pokemon.name}`}>
          <Sprite pokemon={pokemon} size={100} />
        </Link>
      </div>
    ))
  };

  return (
    <div className="container">
      <SearchBar />
      <div ref={pokemonContainerRef} className="container d-flex flex-wrap justify-content-center">
        <PokemonList />
      </div>
    </div>
  );
}
