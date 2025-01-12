import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  initialDelay: number;
}

interface Connection {
  id: string;
  from: number;
  to: number;
  initialDelay: number;
}

const NeuralVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes: Node[] = [];
      for (let i = 0; i < 40; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          initialDelay: Math.random() * 2,
        });
      }
      setNodes(newNodes);

      const newConnections: Connection[] = [];
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          if (Math.random() > 0.85) {
            newConnections.push({
              id: `${i}-${j}`,
              from: i,
              to: j,
              initialDelay: Math.random() * 2,
            });
          }
        }
      }
      setConnections(newConnections);
    };

    generateNodes();
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-[600px] relative"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BE95FF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FF7C00" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#BE95FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {connections.map(({ id, from, to, initialDelay }) => (
            <motion.line
              key={id}
              x1={`${nodes[from]?.x || 0}%`}
              y1={`${nodes[from]?.y || 0}%`}
              x2={`${nodes[to]?.x || 0}%`}
              y2={`${nodes[to]?.y || 0}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                delay: initialDelay,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}

          {nodes.map(({ id, x, y, size, initialDelay }) => (
            <motion.circle
              key={id}
              cx={`${x}%`}
              cy={`${y}%`}
              r={size}
              fill="#BE95FF"
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: initialDelay,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))}

        </svg>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#BE95FF]/5 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#FF7C00]/5 to-transparent opacity-30" />
      </motion.div>
    </motion.div>
  );
};

export default NeuralVisualization;
