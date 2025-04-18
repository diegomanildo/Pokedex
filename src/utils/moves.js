export async function getAllMoves() {
  const res = await fetch("https://pokeapi.co/api/v2/move?limit=1000000");
  if (!res.ok) throw new Error("Error fetching moves list");

  const { results } = await res.json();

  const moves = await Promise.all(
    results.map(async (move) => {
      const moveRes = await fetch(move.url);
      if (!moveRes.ok)
        throw new Error(`Error fetching move details from ${move.url}`);
      return await moveRes.json();
    })
  );

  return moves.filter(move => move.type.name !== "shadow");
}

export async function getMove(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/move/${name}`);
  if (!res.ok) throw new Error(`Movement ${name} not found`);
  return await res.json();
}
