import React from 'react';

const RepresentationControls = ({ setView, currentView }) => (
  <div className="representation-controls">
    <button
      onClick={() => setView('matrix')}
      disabled={currentView === 'matrix'}
    >
      Матриця Суміжності
    </button>
    <button
      onClick={() => setView('edges')}
      disabled={currentView === 'edges'}
    >
      Список Ребер
    </button>
  </div>
);

export default RepresentationControls;
