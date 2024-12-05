// src/components/Graph/edgeList/EdgeList.jsx

import React from 'react';
import './EdgeList.css';

const EdgeList = ({ edges }) => (
  <div className="edge-list">
    <h3>Список Ребер</h3>
    <ul>
      {edges.map((edge, index) => (
        <li key={index}>
          V{edge.from} → V{edge.to}
        </li>
      ))}
    </ul>
  </div>
);

export default EdgeList;
