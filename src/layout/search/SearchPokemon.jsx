import React, { useEffect, useState } from "react";
import { filterPokemons, getAllPokemon, getGenerationData } from "../../utils/pokemon";
import { Link } from "react-router-dom";
import Sprite from "../../common/Sprite"

const SearchPokemon = ({ search, filters, setLoading, setError, currentPage, setCurrentPage, setTotalPages }) => {
  const pokemons = 1025;
  const pokemonsPerPage = 32;

  const [allPokemon, setAllPokemon] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [generationData, setGenerationData] = useState({});

  useEffect(() => {
    try {
      setLoading(true);
      getAllPokemon(pokemons).then(setAllPokemon);
      getGenerationData().then(setGenerationData);
    } catch (e) {
      console.error(e);
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  useEffect(() => {
    const filteredList = filterPokemons(
      allPokemon,
      search,
      filters.type,
      filters.generation,
      generationData
    );
    setFiltered(filteredList);
  }, [allPokemon, search, filters, generationData]);

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
  }, [totalPages, setCurrentPage]);

  const currentPokemons = filtered.slice(
    currentPage * pokemonsPerPage - pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  setTotalPages(Math.ceil(filtered.length / pokemonsPerPage));

  return currentPokemons.map((pokemon) => (
    <div
      className="search-card d-flex align-items-center justify-content-center m-2"
      key={pokemon.id}
    >
      <Link to={`/pokemon/${pokemon.id}`}>
        <Sprite pokemon={pokemon} size={100} />
      </Link>
    </div>
  ));
};

export default SearchPokemon;
