import React from 'react';
import './EdgeList.css';

function EdgeList({ edges }) {
  return (
    <div className="edge-list">
      <h3>Список Ребер</h3>
      <ul>
        {edges.map((edge, index) => (
          <li key={index}>
            ({edge.from} → {edge.to})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EdgeList;
