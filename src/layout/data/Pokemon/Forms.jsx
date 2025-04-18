import React, { useEffect, useState } from "react";
import { getPokemon } from "../../../utils/pokemon";
import { capitalize } from "../../../utils/utils";

const Forms = ({ species, pokemon, setPokemon }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch(species.url);
        const data = await res.json();

        const varietyForms = await Promise.all(
          data.varieties.map(async (variety) => {
            return await getPokemon(variety.pokemon.name);
          })
        );

        setForms(varietyForms);
      } catch (error) {
        console.error("Error loading forms:", error);
      }
    };

    if (species.url) fetchForms();
  }, [species.url]);

  if (forms.length <= 1) return null;

  return (
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
          <option className="text-capitalize" key={form.name} value={form.name}>
            {capitalize(form.name.replaceAll("-", " "))}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Forms;
