import React, { useEffect, useState } from "react";
import Type from "../../common/Type";
import FoldableCard from "../../common/FoldableCard";

const Movements = ({ moves }) => {
  const [movesWithTypes, setMovesWithTypes] = useState([]);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const detailedMoves = await Promise.all(
          moves.map(async (move) => {
            const res = await fetch(move.move.url);
            const data = await res.json();
            return {
              ...move,
              type: data.type.name,
            };
          })
        );
        
        detailedMoves.sort((a, b) => {
          const nameA = a.move.name.toUpperCase();
          const nameB = b.move.name.toUpperCase();
          return nameA.localeCompare(nameB);
        });

        setMovesWithTypes(detailedMoves);
      } catch (err) {
        console.error("Error loading move types:", err);
      }
    };

    fetchMoves();
  }, [moves]);

  if (!moves || moves.length === 0) return null;

  return (
    <FoldableCard title="Movements" opened={false} className="card p-4 mt-4 w-100 shadow">
      <table cellPadding="4">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Name</th>
            <th style={{ width: "50%" }}>Method</th>
          </tr>
        </thead>
        <tbody>
          {movesWithTypes.map((move) => {
            const details = move.version_group_details[0];

            return (
              <tr key={move.move.name}>
                <td className="text-capitalize text-start">
                  <Type name={move.type} />{move.move.name.replace("-", " ")}
                </td>
                <td className="text-capitalize">
                  {details.move_learn_method.name === "level-up"
                    ? "At level " + details.level_learned_at
                    : details.move_learn_method.name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </FoldableCard>
  );
};

export default Movements;
