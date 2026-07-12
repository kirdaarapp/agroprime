"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

const EGG_COLORS = [
  { shell: "#f7f2e4" },
  { shell: "#9c6a3e" },
] as const;

const GROUND_Y = -1.6;
const START_Y = 6;
const GRAVITY = 9;

function randomRange(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function createEggGeometry() {
  const segments = 24;
  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= segments; i++) {
    const v = i / segments;
    const y = v * 2 - 1;
    let r = Math.sqrt(Math.max(0, 1 - y * y));
    r *= 1 - 0.22 * y;
    points.push(new THREE.Vector2(Math.max(r, 0.0001) * 0.62, y * 0.85));
  }
  const geo = new THREE.LatheGeometry(points, 28);
  geo.computeVertexNormals();
  return geo;
}

function createShardGeometry() {
  return new THREE.SphereGeometry(0.32, 6, 4, 0, Math.PI * 0.6, 0, Math.PI * 0.5);
}

type Phase = "falling" | "landed" | "cracking" | "splat" | "gone";

interface ShardData {
  dir: THREE.Vector3;
  rotSpeed: THREE.Vector3;
}

interface EggState {
  phase: Phase;
  x: number;
  z: number;
  y: number;
  crackY: number;
  vy: number;
  rotSpeed: THREE.Vector3;
  colorIdx: number;
  timer: number;
  crackT: number;
  shardData: ShardData[];
  scale: number;
  landDuration: number;
  waitDuration: number;
}

function makeShardData(): ShardData[] {
  return Array.from({ length: 7 }).map(() => ({
    dir: new THREE.Vector3(
      randomRange(-1, 1),
      randomRange(0.4, 1.4),
      randomRange(-1, 1)
    ).normalize(),
    rotSpeed: new THREE.Vector3(
      randomRange(-4, 4),
      randomRange(-4, 4),
      randomRange(-4, 4)
    ),
  }));
}

function makeEggState(startY = START_Y): EggState {
  return {
    phase: "falling",
    x: randomRange(-3.6, 3.6),
    z: randomRange(-1.5, 1.2),
    y: startY,
    crackY: GROUND_Y,
    vy: 0,
    rotSpeed: new THREE.Vector3(
      randomRange(-1.5, 1.5),
      randomRange(-1.5, 1.5),
      randomRange(-1.5, 1.5)
    ),
    colorIdx: Math.random() < 0.5 ? 0 : 1,
    timer: 0,
    crackT: 0,
    shardData: makeShardData(),
    scale: randomRange(0.85, 1.15),
    landDuration: randomRange(0.5, 1.2),
    waitDuration: randomRange(0.4, 1.3),
  };
}

function EggInstance({
  eggGeo,
  shardGeo,
  startDelay,
}: {
  eggGeo: THREE.BufferGeometry;
  shardGeo: THREE.BufferGeometry;
  startDelay: number;
}) {
  const initial = useMemo(() => makeEggState(START_Y + startDelay), []);
  const state = useRef<EggState>(initial);

  const wholeRef = useRef<THREE.Mesh>(null);
  const wholeMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const yolkRef = useRef<THREE.Mesh>(null);
  const yolkMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const splashRef = useRef<THREE.Mesh>(null);
  const splashMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const shardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const shardMatRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);

  const crack = () => {
    const s = state.current;
    if (s.phase === "falling" || s.phase === "landed") {
      s.crackY = Math.max(s.y, GROUND_Y);
      s.phase = "cracking";
      s.crackT = 0;
    }
  };

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const s = state.current;

    if (s.phase === "falling") {
      s.vy -= GRAVITY * delta;
      s.y += s.vy * delta;
      if (s.y <= GROUND_Y) {
        s.y = GROUND_Y;
        s.phase = "landed";
        s.timer = 0;
      }
    } else if (s.phase === "landed") {
      s.timer += delta;
      if (s.timer > s.landDuration) crack();
    } else if (s.phase === "cracking") {
      s.crackT += delta / 0.45;
      if (s.crackT >= 1) {
        s.crackT = 1;
        s.phase = "splat";
        s.timer = 0;
      }
    } else if (s.phase === "splat") {
      s.timer += delta;
      if (s.timer > 1.5) {
        s.phase = "gone";
        s.timer = 0;
      }
    } else if (s.phase === "gone") {
      s.timer += delta;
      if (s.timer > s.waitDuration) {
        const colors = EGG_COLORS;
        Object.assign(s, makeEggState(START_Y));
        wholeMatRef.current?.color.set(colors[s.colorIdx].shell);
        shardMatRefs.current.forEach((mat) => mat?.color.set(colors[s.colorIdx].shell));
      }
    }

    if (wholeRef.current) {
      const visible = s.phase === "falling" || s.phase === "landed";
      wholeRef.current.visible = visible;
      if (visible) {
        wholeRef.current.position.set(s.x, s.y, s.z);
        wholeRef.current.rotation.x += s.rotSpeed.x * delta * (s.phase === "landed" ? 0.15 : 1);
        wholeRef.current.rotation.y += s.rotSpeed.y * delta * (s.phase === "landed" ? 0.15 : 1);
        wholeRef.current.rotation.z += s.rotSpeed.z * delta * (s.phase === "landed" ? 0.15 : 1);
        const squash =
          s.phase === "landed" ? 1 - 0.2 * Math.max(0, 1 - s.timer * 5) : 1;
        wholeRef.current.scale.set(s.scale, s.scale * squash, s.scale);
      }
    }

    const crackVisible = s.phase === "cracking" || s.phase === "splat";
    const eased = 1 - Math.pow(1 - s.crackT, 3);
    let fadeOpacity = 1;
    if (s.phase === "splat" && s.timer > 0.9) {
      fadeOpacity = Math.max(0, 1 - (s.timer - 0.9) / 0.6);
    }

    if (yolkRef.current) {
      yolkRef.current.visible = crackVisible;
      if (crackVisible) {
        const yolkScale = Math.min(eased * 1.3, 1) * s.scale * 0.5;
        yolkRef.current.scale.set(yolkScale, yolkScale * 0.5, yolkScale);
        yolkRef.current.position.set(s.x, s.crackY - 0.1, s.z);
        if (yolkMatRef.current) yolkMatRef.current.opacity = fadeOpacity;
      }
    }

    if (splashRef.current) {
      splashRef.current.visible = crackVisible;
      if (crackVisible) {
        const splashScale = Math.min(eased * 1.7, 1) * s.scale;
        splashRef.current.scale.set(splashScale, splashScale, splashScale);
        splashRef.current.position.set(s.x, s.crackY - 0.13, s.z);
        if (splashMatRef.current) splashMatRef.current.opacity = 0.85 * fadeOpacity;
      }
    }

    shardRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = s.shardData[i];
      const visible = s.phase === "cracking" || (s.phase === "splat" && s.timer < 0.35);
      mesh.visible = visible;
      if (!visible || !data) return;
      const t = s.phase === "cracking" ? s.crackT : s.crackT + s.timer;
      const dist = t * 1.9;
      mesh.position.set(
        s.x + data.dir.x * dist,
        s.crackY + Math.max(-0.3, data.dir.y * dist * 1.6 - t * t * 4.5),
        s.z + data.dir.z * dist
      );
      mesh.rotation.x += data.rotSpeed.x * delta;
      mesh.rotation.y += data.rotSpeed.y * delta;
      mesh.rotation.z += data.rotSpeed.z * delta;
      const mat = shardMatRefs.current[i];
      if (mat) mat.opacity = Math.max(0, 1 - t * 0.85);
    });
  });

  return (
    <group
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        crack();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <mesh ref={wholeRef} geometry={eggGeo}>
        <meshStandardMaterial
          ref={wholeMatRef}
          color={EGG_COLORS[initial.colorIdx].shell}
          roughness={0.35}
          metalness={0.04}
        />
      </mesh>

      <mesh ref={yolkRef} visible={false}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          ref={yolkMatRef}
          color="#e8a33d"
          roughness={0.25}
          transparent
        />
      </mesh>

      <mesh ref={splashRef} visible={false} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 24]} />
        <meshStandardMaterial
          ref={splashMatRef}
          color="#fffaf0"
          roughness={0.4}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {initial.shardData.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            shardRefs.current[i] = el;
          }}
          geometry={shardGeo}
          visible={false}
        >
          <meshStandardMaterial
            ref={(el) => {
              shardMatRefs.current[i] = el;
            }}
            color={EGG_COLORS[initial.colorIdx].shell}
            roughness={0.4}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  useFrame((rootState) => {
    const targetX = rootState.pointer.x * 0.7;
    const targetY = 1.1 + rootState.pointer.y * 0.35;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, -0.3, 0);
  });
  return null;
}

const EGG_COUNT_DESKTOP = 6;
const EGG_COUNT_MOBILE = 4;

export default function EggHero3D() {
  const eggGeo = useMemo(() => createEggGeometry(), []);
  const shardGeo = useMemo(() => createShardGeometry(), []);
  const [eggCount, setEggCount] = useState(EGG_COUNT_DESKTOP);

  useEffect(() => {
    setEggCount(window.innerWidth < 768 ? EGG_COUNT_MOBILE : EGG_COUNT_DESKTOP);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 1.1, 8], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.8]}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.6} color="#eaf5ee" />
      <directionalLight position={[4, 6, 4]} intensity={1.3} color="#f3d98a" />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#2f6b4c" />
      <Rig />
      {Array.from({ length: eggCount }).map((_, i) => (
        <EggInstance
          key={i}
          eggGeo={eggGeo}
          shardGeo={shardGeo}
          startDelay={i * 2.4}
        />
      ))}
    </Canvas>
  );
}
