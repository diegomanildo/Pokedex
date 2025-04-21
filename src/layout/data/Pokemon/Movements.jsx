import React, { useEffect, useState } from "react";
import FoldableCard from "../../../common/FoldableCard";
import TypeIcon from "../../../common/TypeIcon";
import SortableTable from "../../../common/SortableTable.jsx";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/routes.js";

const Movements = ({ moves }) => {
  const [movesWithTypes, setMovesWithTypes] = useState([]);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const detailedMoves = await Promise.all(
          moves.map(async (slot) => {
            const res = await fetch(slot.move.url);
            const data = await res.json();
            return {
              ...slot,
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
    <FoldableCard
      title="Movements"
      opened={false}
      className="card p-4 mt-4 w-100 shadow"
    >
      <div className="d-flex justify-content-center">
        <SortableTable
          style={{ width: "75%" }}
          className="justify-content-center"
          cellPadding="4"
        >
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {movesWithTypes.map((slot) => {
                const details = slot.version_group_details[0];

                return (
                  <tr key={slot.move.name}>
                    <td className="text-capitalize">
                      <span className="d-none">{slot.type}</span>
                      <TypeIcon name={slot.type} />
                    </td>
                    <td className="text-capitalize">
                      <Link
                        to={routes.moveData.replace(":name", slot.move.name)}
                      >
                        {slot.move.name.replace("-", " ")}
                      </Link>
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
        </SortableTable>
      </div>
    </FoldableCard>
  );
};

export default Movements;
