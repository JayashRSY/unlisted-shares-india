import React from "react";

const Table = ({ data }: { data: string[][] }) => {
  return (
    <table>
      <tbody className=" border-gray-500 rounded-2xl">
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b rounded-2xl border-gray-500"
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={`p-2 ${
                  rowIndex === 0 && cellIndex === 0 ? "rounded-tl-2xl" : ""
                } ${
                  rowIndex === 0 && cellIndex === row.length - 1
                    ? "rounded-tr-2xl"
                    : ""
                } ${
                  rowIndex === data.length - 1 && cellIndex === 0
                    ? "rounded-bl-2xl"
                    : ""
                } ${
                  rowIndex === data.length - 1 && cellIndex === row.length - 1
                    ? "rounded-br-2xl"
                    : ""
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
