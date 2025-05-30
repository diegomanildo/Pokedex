import React from "react";
import Select from "../../common/Select";

const TYPES = [
  "All Types",
  "Normal",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

const GENERATIONS = [
  { label: "All Generations", value: "" },
  { label: "Generation 1", value: "generation-i" },
  { label: "Generation 2", value: "generation-ii" },
  { label: "Generation 3", value: "generation-iii" },
  { label: "Generation 4", value: "generation-iv" },
  { label: "Generation 5", value: "generation-v" },
  { label: "Generation 6", value: "generation-vi" },
  { label: "Generation 7", value: "generation-vii" },
  { label: "Generation 8", value: "generation-viii" },
  { label: "Generation 9", value: "generation-ix" },
];

const CATEROGIES = [
  { label: "All categories", value: "" },
  { label: "Physical", value: "physical" },
  { label: "Special", value: "special" },
  { label: "Status", value: "status" },
];

const Filters = ({
  filters,
  type,
  setType,
  generation,
  setGeneration,
  category,
  setCategory,
  setCurrentPage,
}) => (
  <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
    {filters.type !== undefined && (
      <Select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          setCurrentPage(1);
        }}
        options={TYPES}
      />
    )}

    {filters.generation !== undefined && (
      <Select
        value={generation}
        onChange={(e) => {
          setGeneration(e.target.value);
          setCurrentPage(1);
        }}
        options={GENERATIONS}
      />
    )}

    {filters.category !== undefined && (
      <Select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setCurrentPage(1);
        }}
        options={CATEROGIES}
      />
    )}
  </div>
);

export default Filters;
