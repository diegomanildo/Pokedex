import React, { useState, useEffect } from "react";
import Loading from "../../common/Loading";
import Filters from "./Filters";
import MovePageButtons from "./MovePageButtons";
import SearchPokemon from "./SearchPokemon";
import SearchType from "./SearchType";
import SearchMove from "./SearchMove";
import SearchItem from "./SearchItem";

function Search({ searchFor }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState(
    () => localStorage.getItem(`search:${searchFor}`) || ""
  );

  useEffect(() => {
    localStorage.setItem(`search:${searchFor}`, search);
  }, [search, searchFor]);

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = parseInt(
      localStorage.getItem(`currentPage:${searchFor}`),
      10
    );
    return isNaN(savedPage) ? 1 : savedPage;
  });

  useEffect(() => {
    localStorage.setItem(`currentPage:${searchFor}`, currentPage);
  }, [currentPage, searchFor]);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(1);
  }, [searchFor]);

  // Filters
  const [type, setType] = useState(
    () => localStorage.getItem(`type:${searchFor}`) || ""
  );
  const [generation, setGeneration] = useState(
    () => localStorage.getItem(`generation:${searchFor}`) || ""
  );
  const [category, setCategory] = useState(
    () => localStorage.getItem(`category${searchFor}`) || ""
  );

  useEffect(
    () => localStorage.setItem(`type:${searchFor}`, type),
    [type, searchFor]
  );
  useEffect(
    () => localStorage.setItem(`generation:${searchFor}`, generation),
    [generation, searchFor]
  );
  useEffect(
    () => localStorage.setItem(`category${searchFor}`, category),
    [category, searchFor]
  );

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  let list;

  switch (searchFor) {
    case "pokemon":
      list = (
        <SearchPokemon
          search={search}
          filters={{ type, generation }}
          setLoading={setLoading}
          setError={setError}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
        />
      );
      break;
    case "type":
      list = (
        <SearchType
          search={search}
          setLoading={setLoading}
          setError={setError}
        />
      );
      break;
    case "move":
      list = (
        <SearchMove
          search={search}
          filters={{ type, category }}
          setLoading={setLoading}
          setError={setError}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
        />
      );
      break;
    case "item":
      list = (
        <SearchItem
          search={search}
          setLoading={setLoading}
          setError={setError}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
        />
      );
      break;
    default:
      throw new Error("Invalid Search.searchFor property: " + searchFor);
  }

  const hasFilters = list.props.filters;

  return (
    <div className="container">
      <header className="text-center m-4">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex justify-content-center gap-2 mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder={`Search ${searchFor}...`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            {hasFilters && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  setSearch("");
                  setType("");
                  setGeneration("");
                  setCategory("");
                  setCurrentPage(1);
                  localStorage.clear();
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {hasFilters && (
            <Filters
              filters={list.props.filters}
              type={type}
              setType={setType}
              generation={generation}
              setGeneration={setGeneration}
              category={category}
              setCategory={setCategory}
              setCurrentPage={setCurrentPage}
            />
          )}
        </form>
        <MovePageButtons
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </header>

      <div className="container d-flex flex-wrap justify-content-center">
        {list}
      </div>
    </div>
  );
}

export default Search;
