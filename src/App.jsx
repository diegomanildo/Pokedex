import { Route, Routes } from "react-router-dom";
import "./App.css";
import Search from "./layout/search/Search";
import Pokemon from "./layout/data/Pokemon";
import Type from "./layout/data/Type";
import NotFound from "./layout/search/NotFound";
import { routes } from "./utils/routes";
import SearchLayout from "./common/SearchLayout";
import Move from "./layout/data/Move";

function App() {
  return (
    <Routes>
      {/* Search */}
      <Route element={<SearchLayout />}>
        <Route path={routes.default} element={<Search searchFor="pokemon" />} />
        <Route path={routes.searchType} element={<Search searchFor="type" />} />
        <Route path={routes.searchMove} element={<Search searchFor="move" />} />
      </Route>

      {/* Data */}
      <Route path={routes.pokemonData} element={<Pokemon />} />
      <Route path={routes.typeData} element={<Type />} />
      <Route path={routes.moveData} element={<Move />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
