export async function getAllItems() {
  const res = await fetch("https://pokeapi.co/api/v2/item?limit=1000");
  if (!res.ok) throw new Error("Error fetching item list");

  const { results } = await res.json();

  const detailedData = await Promise.all(
    results.map((item) => fetch(item.url).then((res) => res.json()))
  );

  return detailedData;
}

export async function getItem(itemName) {
  const res = await fetch(`https://pokeapi.co/api/v2/item/${itemName}`);
  if (!res.ok) throw new Error(`Error fetching item: ${itemName}`);
  return await res.json();
}
