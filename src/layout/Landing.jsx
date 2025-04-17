import React, { useState, useEffect } from "react";
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
import PokemonList from "./Landing/PokemonList";
import BackButton from "./Landing/BackButton";
import NextButton from "./Landing/NextButton";

export default function Landing() {
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
    setLoading(true);
    const filteredList = filterPokemons(
      allPokemon,
      search,
      type,
      generation,
      generationData
    );
    setFiltered(filteredList);
    setLoading(false);
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

  const MovePageButtons = () => {
    return totalPages <= 0 ? null : (
      <div className="pagination d-flex justify-content-center mt-4">
        <BackButton currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <span className="m-2">
          Page {currentPage} of {totalPages}
        </span>

        <NextButton
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    );
  };

  const Filters = () => {
    const types = [
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
    ];

    const generations = [
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
    ];

    return (
      <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
        <Select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setCurrentPage(1);
          }}
          options={types}
        />

        <Select
          value={generation}
          onChange={(e) => {
            setGeneration(e.target.value);
            setCurrentPage(1);
          }}
          options={generations}
        />
      </div>
    );
  };

  return (
    <div className="container">
      <header className="text-center mb-4">
        <Link to="/">
          <img className="m-3" src={icon} width={40} />
        </Link>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex justify-content-center gap-2 mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search Pokemon..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
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

          <Filters />
        </form>
        <MovePageButtons />
      </header>
      <div className="container d-flex flex-wrap justify-content-center">
        <PokemonList pokemons={currentPokemons} />
      </div>
    </div>
  );
}
