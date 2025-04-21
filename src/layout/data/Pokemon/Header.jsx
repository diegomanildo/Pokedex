import React from "react";
import Forms from "./Forms";
import BackButton from "../../../common/BackButton";

const ShinyCheckbox = ({ showShiny, setShowShiny }) => (
  <div className="d-flex align-items-center">
    <input
      className="form-check-input me-2"
      type="checkbox"
      checked={showShiny}
      onChange={() => setShowShiny(!showShiny)}
      id="shinyToggle"
    />
    <label htmlFor="shinyToggle" className="mb-0">
      Shiny sprites
    </label>
  </div>
);

const Header = ({ pokemon, setPokemon, showShiny, setShowShiny }) => (
  <header className="container">
    <div className="col-12 d-flex justify-content-between align-items-center mt-2 flex-wrap">
      <BackButton />
      <Forms
        species={pokemon.species}
        pokemon={pokemon}
        setPokemon={setPokemon}
      />
      <ShinyCheckbox showShiny={showShiny} setShowShiny={setShowShiny} />
    </div>
  </header>
);

export default Header;
