
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

// Add global declaration to fix missing intrinsic elements types in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      fog: any;
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
      icosahedronGeometry: any;
    }
  }
}

// Create a mesh of connected nodes representing a network
const NetworkMesh = ({ theme, intensity }: { theme: 'light' | 'dark', intensity: number }) => {
    const ref = useRef<THREE.Group>(null);
    const pointCount = 150;
    
    // Generate random points on a sphere surface
    const points = useMemo(() => {
        const p = new Float32Array(pointCount * 3);
        for (let i = 0; i < pointCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 3 + Math.random() * 0.5;
            p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            p[i * 3 + 2] = r * Math.cos(phi);
        }
        return p;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05 * (1 + intensity);
            ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
        }
    });

    const color = theme === 'dark' ? '#38BDF8' : '#1a1a1a';
    const secondaryColor = '#C5A059'; // Nobel Gold

    return (
        <group ref={ref}>
            <Points positions={points} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={theme === 'dark' ? 0.8 : 0.4}
                />
            </Points>
            {/* Create some visual connections/lines - simplified for performance */}
            <mesh>
                 <sphereGeometry args={[2.8, 16, 16]} />
                 <meshBasicMaterial color={color} wireframe transparent opacity={0.05} />
            </mesh>
            {/* "Core" of the network */}
            <mesh>
                 <icosahedronGeometry args={[1, 1]} />
                 <meshBasicMaterial color={secondaryColor} wireframe transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

export const CyberNetworkScene: React.FC<{ theme: 'light' | 'dark', intensity: number }> = ({ theme, intensity }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={theme === 'dark' ? 0.5 : 1} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#C5A059" />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
           <NetworkMesh theme={theme} intensity={intensity} />
        </Float>

        {theme === 'dark' && <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />}
        
        {/* Fog to blend into background */}
        <fog attach="fog" args={[theme === 'dark' ? '#0c0a09' : '#F9F8F4', 5, 15]} />
      </Canvas>
    </div>
  );
};
