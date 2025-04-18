export function capitalize(str) {
  if (!str || typeof str !== "string") return str;

  return str
    .split(" ")
    .map((word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}