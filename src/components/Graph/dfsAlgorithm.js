async function dfsAlgorithm(nodes, edges, startNodeId, setNodesState) {
  const visited = {};
  const stack = [];
  const nodeMap = {};
  nodes.forEach((node) => {
    nodeMap[node.id] = { ...node, state: 'unvisited' };
  });

  stack.push(startNodeId);

  while (stack.length > 0) {
    const currentNodeId = stack.pop();
    const currentNode = nodeMap[currentNodeId];

    if (!visited[currentNodeId]) {
      visited[currentNodeId] = true;
      currentNode.state = 'processing';
      setNodesState(Object.values(nodeMap));
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Затримка для анімації

      const neighbors = edges
        .filter((edge) => edge.from === currentNodeId)
        .map((edge) => edge.to);

      for (let neighborId of neighbors) {
        if (!visited[neighborId]) {
          stack.push(neighborId);
        }
      }

      currentNode.state = 'completed';
      setNodesState(Object.values(nodeMap));
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Затримка для анімації
    }
  }
}

export default dfsAlgorithm;
