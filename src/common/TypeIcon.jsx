import React from "react";
import { capitalize } from "../utils/utils";
import { Link } from "react-router-dom";
import { routes } from "../utils/routes";

const BoolLink = ({ hasLink, children, ...other }) =>
  hasLink ? <Link {...other}>{children}</Link> : <>{ children }</>;

const TypeIcon = React.memo(
  ({ name, width = "60px", hasLink = true, ...other }) => (
    <BoolLink hasLink={hasLink} to={routes.typeData.replace(":name", name)}>
      <img
        className="lazy px-1"
        src={`https://play.pokemonshowdown.com/sprites/types/${capitalize(
          name
        )}.png`}
        alt={name}
        width={width}
        {...other}
      />
    </BoolLink>
  )
);

export default TypeIcon;
