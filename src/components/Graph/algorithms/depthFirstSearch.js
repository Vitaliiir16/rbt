export const depthFirstSearch = async (
  nodesRef,
  edges,
  startId,
  endId,
  updateNodeState,
  setStepHistory,
  setStack,
  delay = 1000,
  isPausedRef
) => {
  const stack = [startId];
  setStack([...stack]);

  while (stack.length > 0) {
    if (isPausedRef.current) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!isPausedRef.current) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }

    const current = stack.pop();
    setStack([...stack]);
    const currentNode = nodesRef.current.find((node) => node.id === current);
    if (!currentNode || currentNode.state !== 'unvisited') {
      continue;
    }

    updateNodeState(current, 'processing');
    setStepHistory((prevHistory) => [...prevHistory, current]);
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (current === endId) {
      updateNodeState(current, 'target');
      alert(`Знайдено кінцеву вершину V${endId}`);
      return;
    }
    const neighbors = edges
      .filter((edge) => edge.from === current)
      .map((edge) => edge.to)
      .filter((neighborId) => {
        const neighbor = nodesRef.current.find((node) => node.id === neighborId);
        return neighbor && neighbor.state === 'unvisited';
      });

    neighbors.forEach((neighbor) => stack.push(neighbor));
    setStack([...stack]);

    updateNodeState(current, 'visited');
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  alert('Цільова вершина не знайдена');
};
