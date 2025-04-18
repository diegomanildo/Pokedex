import React from "react";

const MoveCategoryIcon = ({ name, width = "60px", ...other }) => {
  let type;

  switch (name) {
    case "physical":
      type =
        "https://images.wikidexcdn.net/mwuploads/wikidex/d/d0/latest/20230130142516/Clase_f%C3%ADsico_Masters.png";
      break;
    case "special":
      type =
        "https://images.wikidexcdn.net/mwuploads/wikidex/3/3a/latest/20230130141405/Clase_especial_Masters.png";
      break;
    case "status":
      type =
        "https://images.wikidexcdn.net/mwuploads/wikidex/6/6d/latest/20230130142334/Clase_estado_Masters.png";
      break;
    default:
      throw new Error("Move type does not exists: " + name);
  }

  return (
    <img className="lazy px-1" src={type} alt={name} width={width} {...other} />
  );
};

export default MoveCategoryIcon;
