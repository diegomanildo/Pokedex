import React from "react";
import { formatEvolutionMethod } from "../../utils/utils";
import { Link } from "react-router-dom";
import Sprite from "../../common/Sprite";
import { IconArrowBigRightLinesFilled } from "@tabler/icons-react";
import FoldableCard from "../../common/FoldableCard";

const EvolutionStage = ({ evo, showShiny }) => (
  <div className="evolution-stage d-flex flex-column align-items-center text-center">
    <Link to={`/pokemon/${evo.name}`}>
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

const Evolutions = ({ evolutionChain, showShiny }) => {
  return evolutionChain.length === 0 || (evolutionChain.length === 1 && evolutionChain[0].length === 1) ? null : (
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
