import React from "react";

const Stats = ({ pokemonStats }) => {
  const maxBaseStat = 200;
  const maxTotal = 800;

  const totalStats = pokemonStats.reduce(
    (total, stat) => total + stat.base_stat,
    0
  );

  return (
    <section>
      <h2>Stats</h2>
      <div className="stats">
        {pokemonStats.map((stat) => (
          <div key={stat.stat.name} className="mb-2">
            <strong className="text-capitalize">
              {stat.stat.name.replace("-", " ")}:
            </strong>
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${(stat.base_stat / maxBaseStat) * 100}%` }}
                aria-valuenow={stat.base_stat}
                aria-valuemin="0"
                aria-valuemax={maxBaseStat}
              >
                {stat.base_stat}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <strong>Total:</strong>
          <div className="progress mt-1" style={{ height: "24px" }}>
            <div
              className="progress-bar bg-info"
              role="progressbar"
              style={{ width: `${(totalStats / maxTotal) * 100}%` }}
              aria-valuenow={totalStats}
              aria-valuemin="0"
              aria-valuemax={maxTotal}
            >
              {totalStats}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
