import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Search from "./layout/search/Search";
import Pokemon from "./layout/data/Pokemon";
import Type from "./layout/data/Type";
import NotFound from "./layout/search/NotFound";
import { routes } from "./utils/routes";
import SearchLayout from "./common/SearchLayout";
import Move from "./layout/data/Move";
import Item from "./layout/data/Item";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };

    window.addEventListener('beforeunload', clearLocalStorage);

    return () => {
      window.removeEventListener('beforeunload', clearLocalStorage);
    };
  }, []);
  
  return (
    <Routes>
      <Route element={<SearchLayout />}>
        {/* Search */}
        <Route path={routes.default} element={<Search searchFor="pokemon" />} />
        <Route path={routes.main} element={<Navigate to={routes.default} />} />
        <Route path={routes.searchType} element={<Search searchFor="type" />} />
        <Route path={routes.searchMove} element={<Search searchFor="move" />} />
        <Route path={routes.searchItem} element={<Search searchFor="item" />} />

        {/* Data */}
        <Route path={routes.pokemonData} element={<Pokemon />} />
        <Route path={routes.typeData} element={<Type />} />
        <Route path={routes.moveData} element={<Move />} />
        <Route path={routes.itemData} element={<Item />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
