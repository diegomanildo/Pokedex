import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sprite from "../../../common/Sprite";
import { IconArrowBigRightLinesFilled } from "@tabler/icons-react";
import FoldableCard from "../../../common/FoldableCard";
import {
  formatEvolutionMethod,
  getEvolutionChain,
} from "../../../utils/pokemon";
import { routes } from "../../../utils/routes";

const EvolutionStage = ({ evo, showShiny }) => (
  <div className="evolution-stage d-flex flex-column align-items-center text-center">
    <Link to={routes.pokemonData.replace(":name", evo.name)}>
      <Sprite pokemon={evo} showShiny={showShiny} size="" />
    </Link>
    <p className="text-capitalize">{evo.name}</p>
  </div>
);

const EvolutionArrow = ({ method }) => (
  <div className="d-flex flex-column align-items-center mx-2">
    <IconArrowBigRightLinesFilled />
    <small>{formatEvolutionMethod(method)}</small>
  </div>
);

const EvolutionLine = ({ line, showShiny }) => (
  <div className="evolution-chain d-flex flex-wrap align-items-center justify-content-center gap-3">
    {line.map((evo, idx) => (
      <React.Fragment key={evo.id}>
        <EvolutionStage evo={evo} showShiny={showShiny} />
        {idx < line.length - 1 && (
          <EvolutionArrow method={line[idx + 1].evolutionDetails} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const Evolutions = ({ species, showShiny }) => {
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        const chain = await getEvolutionChain(species.url);
        setEvolutionChain(chain);
      } catch (err) {
        console.error("Error fetching evolution chain:", err);
      }
    };

    if (species.url) fetchEvolutionData();
  }, [species.url]);

  if (
    evolutionChain.length === 0 ||
    (evolutionChain.length === 1 && evolutionChain[0].length === 1)
  )
    return null;

  return (
    <FoldableCard title="Evolutions">
      <div className="evolution-lines d-flex flex-column align-items-center gap-4">
        {evolutionChain.map((line, i) => (
          <EvolutionLine key={i} line={line} showShiny={showShiny} />
        ))}
      </div>
    </FoldableCard>
  );
};

export default Evolutions;
