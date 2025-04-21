import React, { useState } from "react";
import {
  IconArrowsSort,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";

const SortableTable = ({ children, ...props }) => {
  const [sortConfig, setSortConfig] = useState({
    index: null,
    direction: null,
  });

  const table = children;
  const [thead, tbody] = table.props.children;

  const rows = React.Children.toArray(tbody.props.children);

  const sortedRows = [...rows];
  if (sortConfig.index !== null && sortConfig.direction) {
    sortedRows.sort((a, b) => {
      const getText = (row, idx) => {
        const cell = row.props.children[idx];
        const content = cell?.props?.children;
        if (Array.isArray(content)) {
          return content
            .map((child) =>
              typeof child === "string" ? child : child?.props?.children ?? ""
            )
            .join(" ");
        }
        return typeof content === "string"
          ? content
          : content?.props?.children ?? "";
      };
      const aText = getText(a, sortConfig.index);
      const bText = getText(b, sortConfig.index);

      const aVal = isNaN(aText)
        ? aText.toString().toLowerCase()
        : parseFloat(aText);
      const bVal = isNaN(bText)
        ? bText.toString().toLowerCase()
        : parseFloat(bText);

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (index) => {
    let direction = "asc";
    if (sortConfig.index === index) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = null;
      else direction = "asc";
    }
    setSortConfig({ index: direction ? index : null, direction });
  };

  const renderArrow = (index) => {
    if (sortConfig.index !== index) {
      return <IconArrowsSort stroke={2} />;
    }

    if (sortConfig.direction === "asc") {
      return <IconSortAscendingLetters stroke={2} />;
    }

    if (sortConfig.direction === "desc") {
      return <IconSortDescendingLetters stroke={2} />;
    }

    return null;
  };

  const renderHeader = () => {
    const headerRow = React.Children.toArray(thead.props.children)[0];
    return React.cloneElement(thead, {
      children: React.cloneElement(headerRow, {
        children: React.Children.map(headerRow.props.children, (th, index) => {
          return (
            <th
              className="px-3 py-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleSort(index)}
            >
              <div className="d-flex align-items-center justify-content-between">
                {th.props.children}
                {renderArrow(index)}
              </div>
            </th>
          );
        }),
      }),
    });
  };

  return (
    <table {...props}>
      {renderHeader()}
      <tbody>{sortedRows}</tbody>
    </table>
  );
};

export default SortableTable;
