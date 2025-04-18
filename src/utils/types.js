export async function getAllTypes() {
  const res = await fetch('https://pokeapi.co/api/v2/type');
  if (!res.ok) throw new Error('Error fetching types list');
  
  const { results } = await res.json();

  const types = await Promise.all(
    results.map(async (type) => {
      const typeRes = await fetch(type.url);
      if (!typeRes.ok) throw new Error(`Error fetching type details from ${type.url}`);
      return await typeRes.json();
    })
  );

  return types.filter(type => type.name !== "unknown");
}

export async function getType(typeName) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
  if (!res.ok) throw new Error(`Error fetching type: ${typeName}`);
  return await res.json();
}

const ALL_TYPES = new Set([
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
]);

export async function getPokemonRelations(typeNames) {
  const multipliers = {};

  ALL_TYPES.forEach((t) => {
    multipliers[t] = 1;
  });

  const responses = await Promise.all(typeNames.map((typeName) => getType(typeName)));

  responses.forEach((type) => {
    const rel = type.damage_relations;

    rel.double_damage_from.forEach((t) => {
      multipliers[t.name] *= 2;
    });

    rel.half_damage_from.forEach((t) => {
      multipliers[t.name] *= 0.5;
    });

    rel.no_damage_from.forEach((t) => {
      multipliers[t.name] *= 0;
    });
  });

  const relations = {
    x4: [],
    x2: [],
    x1: [],
    "x1/2": [],
    "x1/4": [],
    x0: [],
  };

  for (const [t, mult] of Object.entries(multipliers)) {
    if (mult === 4) relations["x4"].push(t);
    else if (mult === 2) relations["x2"].push(t);
    else if (mult === 1) relations["x1"].push(t);
    else if (mult === 0.5) relations["x1/2"].push(t);
    else if (mult === 0.25) relations["x1/4"].push(t);
    else if (mult === 0) relations["x0"].push(t);
  }

  return relations;
}
