import React from 'react';
import './AdjacencyList.css';

function AdjacencyList({ nodes, edges }) {
  const adjacencyList = {};

  nodes.forEach((node) => {
    adjacencyList[node.label] = [];
  });

  edges.forEach((edge) => {
    const fromNode = nodes.find((node) => node.id === edge.from);
    const toNode = nodes.find((node) => node.id === edge.to);
    if (fromNode && toNode) {
      adjacencyList[fromNode.label].push(toNode.label);
    }
  });

  return (
    <div className="adjacency-list">
      <h3>Список Суміжності</h3>
      <ul>
        {Object.keys(adjacencyList).map((nodeLabel) => (
          <li key={nodeLabel}>
            {nodeLabel}: {adjacencyList[nodeLabel].join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdjacencyList;
