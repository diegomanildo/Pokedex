import React from "react";
import "./Stats.css";

const formatStatName = (name) => {
  switch (name) {
    case "special-attack":
      return "Sp. Atk";
    case "special-defense":
      return "Sp. Def";
    default:
      return name;
  }
};

const StatBar = ({ name, value, max }) => (
  <div className="stat-bar-container d-flex flex-column align-items-center">
    <div className="stat-bar-wrapper">
      <div
        className={`stat-bar ${name}`}
        style={{ height: `${(value / max) * 100}%` }}
      />
    </div>

    <small className="mt-2 fw-bold">{value}</small>

    <small
      className="text-capitalize text-center"
      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
    >
      {formatStatName(name)}
    </small>
  </div>
);

const stats = 6;
const maxBaseStat = 200;
const totalStat = maxBaseStat * stats;

const Stats = ({ pokemonStats }) => {
  const total = pokemonStats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <section className="card p-4 mt-4 w-100 shadow">
      <h2>Stats</h2>
      <div className="d-flex justify-content-center align-items-end gap-4 mt-4 flex-wrap">
        {pokemonStats.map((stat) => (
          <StatBar
            key={stat.stat.name}
            name={stat.stat.name}
            value={stat.base_stat}
            max={maxBaseStat}
          />
        ))}

        <StatBar name="total" value={total} max={totalStat} />
      </div>
    </section>
  );
};

export default Stats;
