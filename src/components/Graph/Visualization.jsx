import React from 'react';

const Visualization = ({ nodes, edges }) => (
  <svg width="800" height="600">
    {edges.map((edge, index) => {
      const fromNode = nodes.find((node) => node.id === edge.from);
      const toNode = nodes.find((node) => node.id === edge.to);
      if (!fromNode || !toNode) return null;
      return (
        <line
          key={index}
          x1={fromNode.x}
          y1={fromNode.y}
          x2={toNode.x}
          y2={toNode.y}
          stroke="black"
          markerEnd="url(#arrowhead)"
        />
      );
    })}
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="10"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" />
      </marker>
    </defs>
    {nodes.map((node) => (
      <g key={node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r="20"
          fill={
            node.state === 'target'
              ? 'green'
              : node.state === 'processing'
              ? 'orange'
              : node.state === 'visited'
              ? 'black'
              : 'gray'
          }
        />
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="15"
        >
          {node.label}
        </text>
      </g>
    ))}
  </svg>
);

export default Visualization;
