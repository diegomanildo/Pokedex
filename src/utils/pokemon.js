import { capitalize } from "./utils";

export const getAllPokemon = async (limit) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await res.json();
  const detailedData = await Promise.all(
    data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
  );
  return detailedData;
};

export const getGenerationData = async () => {
  const gens = [
    "generation-i",
    "generation-ii",
    "generation-iii",
    "generation-iv",
    "generation-v",
    "generation-vi",
    "generation-vii",
    "generation-viii",
    "generation-ix",
  ];

  const results = await Promise.all(
    gens.map((gen) =>
      fetch(`https://pokeapi.co/api/v2/generation/${gen}`)
        .then((res) => res.json())
        .then((data) => ({
          name: gen,
          species: data.pokemon_species.map((s) => s.name),
        }))
    )
  );

  const genMap = {};
  results.forEach(({ name, species }) => {
    genMap[name] = species;
  });

  return genMap;
};

export const filterPokemons = (
  list,
  search,
  type,
  generation,
  generationData
) => {
  let filteredList = list;

  if (search) {
    const isNumber = /^\d+$/.test(search);
    filteredList = filteredList.filter((p) =>
      isNumber
        ? p.id === parseInt(search, 10)
        : p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (type) {
    filteredList = filteredList.filter((p) =>
      p.types.some((t) => t.type.name.toLowerCase() === type.toLowerCase())
    );
  }

  if (generation && generationData[generation]) {
    const genSpecies = generationData[generation];
    filteredList = filteredList.filter((p) => genSpecies.includes(p.name));
  }

  return filteredList;
};

export async function getPokemon(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) {
    throw new Error(`Pokemon "${name}" not found.`);
  }

  return await res.json();
}

export async function getEvolutionChain(pokemonSpeciesUrl) {
  const speciesRes = await fetch(pokemonSpeciesUrl);
  const species = await speciesRes.json();

  const evoRes = await fetch(species.evolution_chain.url);
  const evo = await evoRes.json();

  const paths = [];

  async function traverse(node, currentPath) {
    const data = await getPokemon(node.species.name);
    const newPath = [
      ...currentPath,
      {
        ...data,
        evolutionDetails: node.evolution_details?.[0] || null,
      },
    ];

    if (node.evolves_to.length === 0) {
      paths.push(newPath);
    } else {
      for (const next of node.evolves_to) {
        await traverse(next, newPath);
      }
    }
  }

  await traverse(evo.chain, []);

  return paths;
}

export function formatEvolutionMethod(details) {
  if (!details) return "Unknown";

  if (details.min_level) return `Level ${details.min_level}`;
  if (details.item) return `Using ${capitalize(details.item.name)}`;
  if (details.trigger?.name === "trade") return "Trade";
  if (details.trigger?.name === "use-item")
    return `Use ${capitalize(details.item.name)}`;
  if (details.known_move) return `Knows ${capitalize(details.known_move.name)}`;
  if (details.location) return `At ${capitalize(details.location.name)}`;

  return capitalize(details.trigger?.name || "Evolution");
}