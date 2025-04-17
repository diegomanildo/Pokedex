import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/utils";
import { IconArrowNarrowLeftDashed } from "@tabler/icons-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="btn btn-secondary px-4" onClick={() => navigate("/")}>
        <IconArrowNarrowLeftDashed stroke={2} />
      </button>
    </div>
  );
};

const Forms = ({ forms, pokemon, setPokemon }) => {
  return (
    forms.length > 1 && (
      <div className="form-group d-flex align-items-center">
        <label htmlFor="formSelect" className="me-2 mb-0 text-nowrap">
          Form:
        </label>
        <select
          id="formSelect"
          className="form-select bg-dark text-light text-center border-secondary"
          style={{ minWidth: "220px" }}
          value={pokemon.name}
          onChange={(e) => {
            const form = forms.find((f) => f.name === e.target.value);
            if (form) setPokemon(form);
          }}
        >
          {forms.map((form) => (
            <option
              className="text-capitalize"
              key={form.name}
              value={form.name}
            >
              {capitalize(form.name.replaceAll("-", " "))}
            </option>
          ))}
        </select>
      </div>
    )
  );
};

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

const Header = ({ showShiny, setShowShiny, forms, pokemon, setPokemon }) => {
  return (
    <header className="container">
      <div className="col-12 d-flex justify-content-between align-items-center mt-2 flex-wrap">
        <BackButton />
        <Forms forms={forms} pokemon={pokemon} setPokemon={setPokemon} />
        <ShinyCheckbox showShiny={showShiny} setShowShiny={setShowShiny} />
      </div>
    </header>
  );
};

export default Header;
