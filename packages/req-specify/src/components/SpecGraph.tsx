import React, { useMemo, useCallback } from 'react';
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { Spec } from '../types/base';

interface SpecGraphProps {
  specs: Spec[];
  onNodeClick?: (specId: string) => void;
}

const nodeTypes = {};

export const SpecGraph: React.FC<SpecGraphProps> = ({ specs, onNodeClick }) => {
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = specs.map((spec, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      return {
        id: spec.id,
        type: 'default',
        position: { 
          x: col * 400 + 100 + Math.random() * 40 - 20,
          y: row * 180 + 100 + Math.random() * 30 - 15
        },
        data: { 
          label: (
            <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <p className="font-semibold text-base text-gray-900">{spec.id}</p>
              <p className="text-sm text-gray-900">{spec.name}</p>
              <p className="text-sm text-gray-500">우선순위: {spec.priority}</p>
            </div>
          )
        },
        style: {
          background: 'transparent',
          border: 'none',
          width: 'auto',
          height: 'auto',
        },
      };
    });

    const edges: Edge[] = [];
    
    specs.forEach((spec) => {
      if (spec.export) {
        spec.export.forEach((edge) => {
          edges.push({
            id: `${spec.id}-${edge.id}`,
            source: spec.id,
            target: edge.id,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 1 },
          });
        });
      }
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [specs]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      onNodeClick?.(node.id);
    },
    [onNodeClick]
  );

  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-lg bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}; 