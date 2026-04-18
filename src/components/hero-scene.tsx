"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 2.1;
const MOUSE_RADIUS = 2.0;
const DEAD_ZONE_RADIUS = 1.5;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { pointer, viewport } = useThree();
  const reduced = useReducedMotion();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random positions in a sphere of radius 4, but outside the dead zone
      let x, y, z, r;
      do {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        r = DEAD_ZONE_RADIUS + (4 - DEAD_ZONE_RADIUS) * Math.cbrt(Math.random());
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      } while (Math.sqrt(x * x + y * y + z * z) < DEAD_ZONE_RADIUS);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, []);

  const particlePositions = useRef(new Float32Array(positions));
  const linePositions = useRef(new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6));
  const lineColors = useRef(new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6));

  // Shader for small, sharp circular particles
  const particleMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color("#ffffff") },
          uAccent: { value: new THREE.Color("#6872D6") },
        },
        vertexShader: `
          varying float vDist;
          void main() {
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 2.5 * (300.0 / -mvPos.z);
            gl_Position = projectionMatrix * mvPos;
            vDist = length(position) / 4.0;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform vec3 uAccent;
          varying float vDist;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.15, d);
            vec3 color = mix(uAccent, uColor, 0.7);
            gl_FragColor = vec4(color, alpha * 0.7);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const frameCount = useRef(0);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;
    frameCount.current++;

    const pos = particlePositions.current;

    // Mouse position in world space (approximate)
    const mouseX = (pointer.x * viewport.width) / 2;
    const mouseY = (pointer.y * viewport.height) / 2;

    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      pos[ix] += velocities[ix];
      pos[ix + 1] += velocities[ix + 1];
      pos[ix + 2] += velocities[ix + 2];

      // Contain within outer sphere
      const dist = Math.sqrt(pos[ix] ** 2 + pos[ix + 1] ** 2 + pos[ix + 2] ** 2);
      if (dist > 4.5) {
        velocities[ix] *= -1;
        velocities[ix + 1] *= -1;
        velocities[ix + 2] *= -1;
      }

      // Push out of dead zone
      if (dist < DEAD_ZONE_RADIUS && dist > 0.01) {
        const pushFactor = (DEAD_ZONE_RADIUS - dist) / dist * 0.05;
        pos[ix] += pos[ix] * pushFactor;
        pos[ix + 1] += pos[ix + 1] * pushFactor;
        pos[ix + 2] += pos[ix + 2] * pushFactor;
      }

      // Mouse attraction (only on non-reduced-motion)
      if (!reduced) {
        const dx = mouseX - pos[ix];
        const dy = mouseY - pos[ix + 1];
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        if (mouseDist < MOUSE_RADIUS && mouseDist > 0.1) {
          pos[ix] += dx * 0.03;
          pos[ix + 1] += dy * 0.03;
        }
      }
    }

    // Update points geometry
    const geom = pointsRef.current.geometry;
    (geom.attributes.position as THREE.BufferAttribute).set(pos);
    geom.attributes.position.needsUpdate = true;

    // Compute connections (every 2nd frame for performance)
    if (frameCount.current % 2 === 0) {
      const linePos = linePositions.current;
      const lineCol = lineColors.current;
      let lineIdx = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (d < CONNECTION_DISTANCE) {
            const alpha = (1 - d / CONNECTION_DISTANCE) * 0.5;
            const baseIdx = lineIdx * 6;

            linePos[baseIdx] = pos[i * 3];
            linePos[baseIdx + 1] = pos[i * 3 + 1];
            linePos[baseIdx + 2] = pos[i * 3 + 2];
            linePos[baseIdx + 3] = pos[j * 3];
            linePos[baseIdx + 4] = pos[j * 3 + 1];
            linePos[baseIdx + 5] = pos[j * 3 + 2];

            // Accent color with distance-based alpha
            const r = 0.408 * alpha;
            const g = 0.447 * alpha;
            const b = 0.839 * alpha;
            lineCol[baseIdx] = r;
            lineCol[baseIdx + 1] = g;
            lineCol[baseIdx + 2] = b;
            lineCol[baseIdx + 3] = r;
            lineCol[baseIdx + 4] = g;
            lineCol[baseIdx + 5] = b;

            lineIdx++;
          }
        }
      }

      const linesGeom = linesRef.current.geometry;
      linesGeom.setDrawRange(0, lineIdx * 2);
      (linesGeom.attributes.position as THREE.BufferAttribute).set(linePos);
      linesGeom.attributes.position.needsUpdate = true;
      (linesGeom.attributes.color as THREE.BufferAttribute).set(lineCol);
      linesGeom.attributes.color.needsUpdate = true;
    }
  });

  const maxLines = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;

  return (
    <>
      <points ref={pointsRef} material={particleMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions.current, 3]}
            count={PARTICLE_COUNT}
          />
        </bufferGeometry>
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions.current, 3]}
            count={maxLines * 2}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors.current, 3]}
            count={maxLines * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </>
  );
}

function Scene() {
  const reduced = useReducedMotion();
  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.4}
        enableRotate={false}
      />
      <Particles />
    </>
  );
}

export default function HeroScene() {
  if (typeof window === "undefined") return null;

  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ pointerEvents: "auto" }}
        gl={{ alpha: true, antialias: false }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
