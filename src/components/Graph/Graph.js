import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Graph.css';
import AdjacencyMatrix from './AdjacencyMatrix';
import AdjacencyList from './AdjacencyList';
import EdgeList from './EdgeList';
import dfsAlgorithm from './dfsAlgorithm';

function Graph() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [nodesState, setNodesState] = useState([]);
  const [message, setMessage] = useState('');
  const [representation, setRepresentation] = useState('matrix');
  const [history, setHistory] = useState([]);

  // Функція для збереження поточного стану в історію
  const saveHistory = () => {
    setHistory([
      ...history,
      {
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges)),
      },
    ]);
  };

  // Додавання вершини
  const addNode = () => {
    if (nodes.length >= 15) {
      alert('Максимальна кількість вершин досягнута');
      return;
    }
    const nodeId = nodes.length + 1;
    const newNode = {
      id: nodeId,
      label: `V${nodeId}`,
      x: Math.random() * 700 + 50,
      y: Math.random() * 500 + 50,
      state: 'unvisited',
    };
    saveHistory();
    setNodes([...nodes, newNode]);
  };

  // Видалення вершини
  const deleteNode = () => {
    const nodeIdInput = prompt('Введіть ID вершини для видалення:');
    const nodeId = parseInt(nodeIdInput);

    if (isNaN(nodeId)) {
      alert('Будь ласка, введіть коректний числовий ID вершини.');
      return;
    }

    const nodeExists = nodes.some((node) => node.id === nodeId);

    if (!nodeExists) {
      alert('Вершина з таким ID не знайдена.');
      return;
    }

    saveHistory();
    setNodes(nodes.filter((node) => node.id !== nodeId));
    setEdges(edges.filter((edge) => edge.from !== nodeId && edge.to !== nodeId));
  };

  // Додавання ребра
  const addEdge = (fromId, toId) => {
    const fromNode = nodes.find((node) => node.id === fromId);
    const toNode = nodes.find((node) => node.id === toId);

    if (!fromNode || !toNode) {
      alert('Вершина з таким ID не знайдена');
      return;
    }

    if (edges.filter((edge) => edge.from === fromId).length >= 14) {
      alert('Максимальна кількість ребер з цієї вершини досягнута');
      return;
    }

    const newEdge = { from: fromId, to: toId };
    saveHistory();
    setEdges([...edges, newEdge]);
  };

  // Видалення ребра
  const deleteEdge = () => {
    const fromInput = prompt('З якої вершини видалити ребро (ID)?');
    const toInput = prompt('До якої вершини видалити ребро (ID)?');
    const from = parseInt(fromInput);
    const to = parseInt(toInput);

    if (isNaN(from) || isNaN(to)) {
      alert('Будь ласка, введіть коректні числові значення ID вершин.');
      return;
    }

    const edgeExists = edges.some((edge) => edge.from === from && edge.to === to);

    if (!edgeExists) {
      alert('Ребро між цими вершинами не знайдено.');
      return;
    }

    saveHistory();
    setEdges(edges.filter((edge) => !(edge.from === from && edge.to === to)));
  };

  // Запуск алгоритму DFS
  const startDFS = async () => {
    if (nodes.length === 0) {
      alert('Граф порожній');
      return;
    }
    const startNodeLabel = prompt('Введіть початкову вершину (наприклад, V1):');
    const startNode = nodes.find((node) => node.label === startNodeLabel);
    if (!startNode) {
      alert('Початкова вершина не знайдена');
      return;
    }
    setIsRunning(true);
    setMessage('Виконується алгоритм DFS...');
    await dfsAlgorithm(nodes, edges, startNode.id, setNodesState);
    setIsRunning(false);
    setMessage('Алгоритм завершено');
  };

  // Відкат до попереднього стану
  const undo = () => {
    if (history.length === 0) {
      alert('Немає попередніх станів для відкату.');
      return;
    }

    const previousState = history[history.length - 1];
    setNodes(previousState.nodes);
    setEdges(previousState.edges);
    setHistory(history.slice(0, history.length - 1));
  };

  useEffect(() => {
    if (nodesState.length > 0) {
      setNodes(nodesState);
    }
  }, [nodesState]);

  // Відображення графу
  const renderGraph = () => {
    return (
      <svg width="800" height="600">
        {/* Ребра */}
        {edges.map((edge, index) => {
          const fromNode = nodes.find((node) => node.id === edge.from);
          const toNode = nodes.find((node) => node.id === edge.to);
          if (fromNode && toNode) {
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
          }
          return null;
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
        {/* Вершини */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={
                node.state === 'unvisited'
                  ? 'gray'
                  : node.state === 'processing'
                  ? 'green'
                  : 'black'
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
  };

  // Функція для перемикання представлення
  const handleRepresentationChange = (type) => {
    setRepresentation(type);
  };

  return (
    <div className="graph-container">
      <h1>Алгоритм Глибокого Пошуку (DFS)</h1>
      <div className="graph-area">{renderGraph()}</div>

      {/* Кнопки для перемикання представлень */}
      <div className="representation-controls">
        <button onClick={() => handleRepresentationChange('matrix')}>
          Матриця Суміжності
        </button>
        <button onClick={() => handleRepresentationChange('list')}>
          Список Суміжності
        </button>
        <button onClick={() => handleRepresentationChange('edges')}>
          Список Ребер
        </button>
      </div>

      {/* Відображення вибраного представлення */}
      {representation === 'matrix' && <AdjacencyMatrix nodes={nodes} edges={edges} />}
      {representation === 'list' && <AdjacencyList nodes={nodes} edges={edges} />}
      {representation === 'edges' && <EdgeList edges={edges} />}

      {/* Кнопки управління */}
      <div className="controls">
        <button onClick={addNode}>Додати Вершину</button>
        <button onClick={deleteNode}>Видалити Вершину</button>
        <button
          onClick={() => {
            const fromInput = prompt('З якої вершини (ID)?');
            const toInput = prompt('До якої вершини (ID)?');
            const from = parseInt(fromInput);
            const to = parseInt(toInput);

            if (isNaN(from) || isNaN(to)) {
              alert('Будь ласка, введіть коректні числові значення ID вершин.');
              return;
            }

            addEdge(from, to);
          }}
        >
          Додати Ребро
        </button>
        <button onClick={deleteEdge}>Видалити Ребро</button>
        <button onClick={startDFS} disabled={isRunning}>
          Start
        </button>
        <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={undo}>Назад</button>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Graph;
