import React, { useEffect, useState } from "react";
import FoldableCard from "../../../common/FoldableCard";
import TypeIcon from "../../../common/TypeIcon";
import Loading from "../../../common/Loading";
import { getPokemonRelations } from "../../../utils/types"

const Damages = ({ types }) => {
  const [damages, setDamages] = useState({});
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchDamageRelations = async () => {
      try {
        setLoading(true);
        const relations = await getPokemonRelations(types);
        setDamages(relations);
      } catch (error) {
        console.error("Error fetching damage relations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (types && types.length > 0) {
      fetchDamageRelations();
    }
  }, [types]);

  if (Object.keys(damages).length === 0) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <FoldableCard title="Damages">
      <table cellPadding="4">
        <thead>
          <tr>
            <th>Damage</th>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(damages)
            .filter(([, types]) => types.length > 0)
            .map(([category, types]) => (
              <tr key={category}>
                <td className={category.replace("/", "-")}>
                  <strong>{category}</strong>
                </td>
                <td>
                  {types.map((name) => (
                    <TypeIcon key={name} name={name} />
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </FoldableCard>
  );
};

export default Damages;
