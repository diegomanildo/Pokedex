import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/utils";
import { IconArrowNarrowLeftDashed } from "@tabler/icons-react";

const Header = ({ showShiny, setShowShiny, forms, pokemon, setPokemon }) => {
  const navigate = useNavigate();
  
  return (
    <header className="container">
      <div className="row align-items-center mb-2">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            <IconArrowNarrowLeftDashed stroke={2} />
          </button>
        </div>
      </div>

      <div className="col-12 d-flex justify-content-end align-items-center mt-2 gap-3 flex-wrap">
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

        {forms.length > 1 && (
          <div className="form-group d-flex align-items-center">
            <label htmlFor="formSelect" className="me-2 mb-0 text-nowrap">
              Form:
            </label>
            <select
              id="formSelect"
              className="form-select bg-dark text-light border-secondary"
              style={{ minWidth: "180px" }}
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
        )}
      </div>
    </header>
  );
};

export default Header;
