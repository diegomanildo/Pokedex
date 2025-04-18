import React, { useEffect, useState } from "react";
import { getAllMoves } from "../../utils/moves";
import { Link } from "react-router-dom";
import TypeIcon from "../../common/TypeIcon";

const SearchMove = ({ search, filters, setLoading, setError }) => {
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

  return filteredMoves.map((move) => (
    <Link
      to={`/move/${move.id}`}
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
