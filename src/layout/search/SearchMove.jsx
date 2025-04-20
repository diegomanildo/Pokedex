import React, { useEffect, useState } from "react";
import { getAllMoves } from "../../utils/moves";
import { Link } from "react-router-dom";
import TypeIcon from "../../common/TypeIcon";
import { routes } from "../../utils/routes";

const SearchMove = ({ search, filters, setLoading, setError, currentPage, setCurrentPage, setTotalPages }) => {
  const movesPerPage = 32;
  const [moves, setMoves] = useState([]);
  const [filteredMoves, setFilteredMoves] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      getAllMoves().then(setMoves);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  useEffect(() => {
    const searchTerm = search.replace(" ", "-").toLowerCase();

    const filtered = moves.filter((move) => {
      const matchesName = move.name.toLowerCase().includes(searchTerm);
      const matchesType = filters.type
        ? move.type.name.toLowerCase() === filters.type.toLowerCase()
        : true;
      const matchesCategory = filters.category
        ? move.damage_class.name.toLowerCase() ===
          filters.category.toLowerCase()
        : true;

      return matchesName && matchesType && matchesCategory;
    });

    setFilteredMoves(filtered);
  }, [search, filters, moves]);
  
    const totalPages = Math.ceil(filteredMoves.length / movesPerPage);
  
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
  
    const currentMoves = filteredMoves.slice(
      currentPage * movesPerPage - movesPerPage,
      currentPage * movesPerPage
    );
  
    setTotalPages(Math.ceil(filteredMoves.length / movesPerPage));

  return currentMoves.map((move) => (
    <Link
      to={routes.moveData.replace(":/name", move.id)}
      key={move.id}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className="search-card d-flex flex-column align-items-center justify-content-center m-2 text-center"
        style={{ minWidth: "100px" }}
      >
        <strong className="text-capitalize mt-1">
          {move.name.replace("-", " ")}
        </strong>
        <TypeIcon name={move.type.name} hasLink={false} />
      </div>
    </Link>
  ));
};

export default SearchMove;
