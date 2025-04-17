import React from 'react'
import Type from '../../common/Type';

const Damages = ({ damageRelations }) => {
  return Object.keys(damageRelations).length === 0 ? null : (
    <section>
      <h2>Damages</h2>
      <table cellPadding="4">
        <thead>
          <tr>
            <th>Damage</th>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(damageRelations)
            .filter(([, types]) => types.length > 0)
            .map(([category, types]) => (
              <tr key={category}>
                <td className={category.replace("/", "-")}>
                  <strong>{category}</strong>
                </td>
                <td>
                  {types.map((name) => (
                    <Type name={name} />
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Damages
