import Sprite from "../../../common/Sprite";
import Cry from "./Cry";
import TypeIcon from "../../../common/TypeIcon";

const Pokemon = ({ pokemon, showShiny }) => (
  <header className="d-flex flex-column align-items-center">
    <h1 className="mb-2 text-capitalize">
      {pokemon.name.replace("-", " ")} #{pokemon.id}
    </h1>

    <Sprite pokemon={pokemon} showShiny={showShiny} size="150px" />
  </header>
);

const Types = ({ pokemonTypes }) => (
  <section className="mt-3">
    <h2 className="text-start">Types</h2>
    <div className="col">
      {pokemonTypes.map((slot) => (
        <TypeIcon key={slot.slot} name={slot.type.name} />
      ))}
    </div>
  </section>
);

const Cries = ({ pokemonCries }) => (
  <section className="mt-3">
    <h2 className="text-start">Cries</h2>
    <Cry cries={pokemonCries} />
  </section>
);

const Description = ({ pokemon, showShiny }) => (
  <div className="card p-4 mt-3 w-100 text-center shadow">
    <Pokemon pokemon={pokemon} showShiny={showShiny} />
    <Types pokemonTypes={pokemon.types} />
    <Cries pokemonCries={pokemon.cries} />
  </div>
);

export default Description;
