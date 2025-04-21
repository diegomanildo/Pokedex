import React, { useEffect, useState } from "react";
import { getAllTypes } from "../../utils/types";
import TypeIcon from "../../common/TypeIcon";
import { routes } from "../../utils/routes";
import { Link } from "react-router-dom";

const SearchType = ({ search, setLoading, setError }) => {
  const [types, setTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      getAllTypes().then(setTypes);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  useEffect(() => {
    const filtered = types.filter((type) =>
      type.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTypes(filtered);
  }, [search, types]);

  return filteredTypes.map((type) => (
    <Link to={routes.typeData.replace(":name", type.name)}>
      <div
        className="search-card d-flex align-items-center justify-content-center m-2"
        key={type.name}
      >
        <TypeIcon
          key={type.name}
          name={type.name}
          hasLink={false}
          width="70px"
        />
      </div>
    </Link>
  ));
};

export default SearchType;
