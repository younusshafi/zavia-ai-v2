"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "input", label: "Input", x: 50, y: 30 },
  { id: "claude", label: "Claude", x: 200, y: 120 },
  { id: "rag", label: "RAG", x: 100, y: 210 },
  { id: "n8n", label: "n8n", x: 300, y: 210 },
  { id: "output", label: "Output", x: 200, y: 300 },
];

const connections = [
  { from: "input", to: "claude" },
  { from: "claude", to: "rag" },
  { from: "claude", to: "n8n" },
  { from: "rag", to: "output" },
  { from: "n8n", to: "output" },
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="relative w-full max-w-[400px] mx-auto aspect-square"
    >
      <svg
        viewBox="0 0 400 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6872D6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Connection lines with animated dashes */}
        {connections.map((conn, i) => {
          const from = getNode(conn.from);
          const to = getNode(conn.to);
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#line-grad)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              filter="url(#glow)"
              className="animate-dash"
            />
          );
        })}

        {/* Ambient connection dots (small circles at midpoints) */}
        {connections.map((conn, i) => {
          const from = getNode(conn.from);
          const to = getNode(conn.to);
          const mx = (from.x + to.x) / 2;
          const my = (from.y + to.y) / 2;
          return (
            <circle
              key={`dot-${i}`}
              cx={mx}
              cy={my}
              r="2"
              fill="#6872D6"
              opacity="0.5"
              className="animate-pulse-dot"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isClaude = node.id === "claude";
          const r = isClaude ? 32 : 24;
          return (
            <g key={node.id}>
              {/* Outer glow for Claude node */}
              {isClaude && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={44}
                  fill="none"
                  stroke="#6872D6"
                  strokeWidth="1"
                  opacity="0.15"
                  className="animate-claude-pulse"
                />
              )}
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={isClaude ? "rgba(104, 114, 214, 0.15)" : "rgba(255, 255, 255, 0.04)"}
                stroke={isClaude ? "#6872D6" : "rgba(255, 255, 255, 0.1)"}
                strokeWidth={isClaude ? "1.5" : "1"}
                filter={isClaude ? "url(#glow-strong)" : "url(#glow)"}
              />
              {/* Node label */}
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill={isClaude ? "#8B93E5" : "#8A8F98"}
                fontSize={isClaude ? "11" : "10"}
                fontFamily="JetBrains Mono, monospace"
                fontWeight={isClaude ? "500" : "400"}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Decorative dots — constellation effect */}
        {[
          [340, 50], [360, 150], [30, 160], [350, 280], [20, 290],
          [170, 40], [320, 100], [60, 100], [280, 320], [140, 340],
        ].map(([cx, cy], i) => (
          <circle
            key={`star-${i}`}
            cx={cx}
            cy={cy}
            r="1"
            fill="#6872D6"
            opacity={0.2 + (i % 3) * 0.1}
          />
        ))}
      </svg>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; r: 2; }
          50% { opacity: 0.8; r: 3; }
        }
        @keyframes claude-pulse {
          0%, 100% { opacity: 0.15; r: 44; }
          50% { opacity: 0.3; r: 48; }
        }
        :global(.animate-dash) {
          animation: dash-flow 1.5s linear infinite;
        }
        :global(.animate-pulse-dot) {
          animation: pulse-dot 3s ease-in-out infinite;
        }
        :global(.animate-claude-pulse) {
          animation: claude-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}
