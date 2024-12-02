import React from 'react';
import './AdjacencyMatrix.css';

function AdjacencyMatrix({ nodes, edges }) {
  const matrixSize = nodes.length;
  const matrix = Array(matrixSize)
    .fill(0)
    .map(() => Array(matrixSize).fill(0));

  edges.forEach((edge) => {
    const fromIndex = nodes.findIndex((node) => node.id === edge.from);
    const toIndex = nodes.findIndex((node) => node.id === edge.to);

    if (fromIndex !== -1 && toIndex !== -1) {
      matrix[fromIndex][toIndex] = 1;
    } else {
      console.warn(`Ребро з невідомими вершинами: ${edge.from} -> ${edge.to}`);
    }
  });

  return (
    <div className="adjacency-matrix">
      <h3>Матриця Суміжності</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            {nodes.map((node) => (
              <th key={node.id}>{node.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nodes.map((node, i) => (
            <tr key={node.id}>
              <td>{node.label}</td>
              {matrix[i].map((val, j) => (
                <td key={j} className={val === 0 ? 'zero-cell' : 'one-cell'}>
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdjacencyMatrix;
