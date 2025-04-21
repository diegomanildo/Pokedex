import React, { useEffect, useState } from "react";
import { routes } from "../../utils/routes";
import Sprite from "../../common/Sprite";
import { getAllItems } from "../../utils/items";
import { Link } from "react-router-dom";

const SearchItem = ({
  search,
  setLoading,
  setError,
  currentPage,
  setCurrentPage,
  setTotalPages,
}) => {
  const itemsPerPage = 32;
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    try {
      setLoading(true), getAllItems().then(setItems);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [search, items]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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

  const currentItems = filteredItems.slice(
    currentPage * itemsPerPage - itemsPerPage,
    currentPage * itemsPerPage
  );

  setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));

  return currentItems.map((item) => (
    <Link to={routes.itemData.replace(":name", item.name)}>
      <div
        className="search-card d-flex align-items-center justify-content-center m-2"
        key={item.name}
      >
        <img
          className="lazy"
          src={item.sprites.default}
          alt={`${item.name} sprite`}
          width={70}
        />
      </div>
    </Link>
  ));
};

export default SearchItem;
