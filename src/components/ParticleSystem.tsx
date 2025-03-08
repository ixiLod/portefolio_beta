'use client';

import { useEffect, useRef } from 'react';
import { Points, BufferGeometry, BufferAttribute, ShaderMaterial } from 'three';
import { vertexShader, fragmentShader } from '@/app/shaders/particleSystemShaders';
interface ParticleSystemProps {
  isEjecting: boolean;
}

const ParticleSystem = ({ isEjecting }: ParticleSystemProps) => {
  const particlesRef = useRef<Points>(null);
  const particleCount = 1000;
  const positions = useRef(new Float32Array(particleCount * 3));
  const velocities = useRef(new Float32Array(particleCount * 3));

  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      positions.current[i * 3] = 0;
      positions.current[i * 3 + 1] = 0;
      positions.current[i * 3 + 2] = 0;

      velocities.current[i * 3] = 0;
      velocities.current[i * 3 + 1] = 0;
      velocities.current[i * 3 + 2] = 0;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions.current, 3));

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    (particlesRef.current as Points | null) = new Points(geometry, material);

    const animate = () => {
      requestAnimationFrame(animate);

      for (let i = 0; i < particleCount; i++) {
        positions.current[i * 3] += velocities.current[i * 3];
        positions.current[i * 3 + 1] += velocities.current[i * 3 + 1];
        positions.current[i * 3 + 2] += velocities.current[i * 3 + 2];

        velocities.current[i * 3] += (Math.random() - 0.5) * 0.01;
        velocities.current[i * 3 + 1] += (Math.random() - 0.5) * 0.01;
        velocities.current[i * 3 + 2] += (Math.random() - 0.5) * 0.01;
      }

      geometry.attributes.position.needsUpdate = true;
    };

    animate();

    const particles = particlesRef.current;

    return () => {
      if (particles) {
        particles.geometry.dispose();

        const material = particles.material;
        if (Array.isArray(material)) {
          material.forEach((mat) => mat.dispose());
        } else {
          material.dispose();
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isEjecting) {
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random();
        positions.current[i * 3] = Math.cos(angle) * radius;
        positions.current[i * 3 + 1] = Math.sin(angle) * radius;
        positions.current[i * 3 + 2] = (Math.random() - 0.5) * 5;

        velocities.current[i * 3] = Math.cos(angle) * 0.09;
        velocities.current[i * 3 + 1] = Math.sin(angle) * 0.09;
        velocities.current[i * 3 + 2] = (Math.random() - 0.5) * 0.09;
      }
    } else {
      for (let i = 0; i < particleCount; i++) {
        velocities.current[i * 3] = -positions.current[i * 3] * 0.5;
        velocities.current[i * 3 + 1] = -positions.current[i * 3 + 1] * 0.5;
        velocities.current[i * 3 + 2] = -positions.current[i * 3 + 2] * 0.5;
      }
    }
  }, [isEjecting]);

  return particlesRef.current ? <primitive object={particlesRef.current} /> : null;
};

export default ParticleSystem;
