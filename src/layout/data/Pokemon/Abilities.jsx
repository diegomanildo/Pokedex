import React, { useEffect, useState } from "react";
import FoldableCard from "../../../common/FoldableCard";

function Abilities({ abilities }) {
  const [abilitiesData, setAbilitiesData] = useState([]);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const results = await Promise.all(
          abilities.map(async ({ ability, is_hidden }) => {
            const res = await fetch(ability.url);
            const data = await res.json();

            const effectEntry = data.effect_entries.find(
              (e) => e.language.name === "en"
            );

            return {
              name: ability.name,
              effect: effectEntry?.short_effect || "No description",
              is_hidden,
            };
          })
        );
        setAbilitiesData(results);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchAbilities();
  }, [abilities]);

  return (
    <FoldableCard title="Abilities">
      <ul className="list-group">
        {abilitiesData.map((ab, i) => (
          <li key={i}>
            <h5 className="d-inline text-capitalize">
              {ab.name.replace("-", " ")}
            </h5>{" "}
            {ab.is_hidden && <em>(Hidden)</em>}
            <p className="mb-0">{ab.effect}</p>
          </li>
        ))}
      </ul>
    </FoldableCard>
  );
}

export default Abilities;
