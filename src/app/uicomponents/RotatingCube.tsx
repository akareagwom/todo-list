"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface RotatingCubeProps {
  onAnimationComplete?: () => void;
}

export default function RotatingCube({ onAnimationComplete }: RotatingCubeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x0070f3 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    let rotationCount = 0;
    const totalRotations = 1; // Rotate one full turn (360°)

    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate the cube
      if (rotationCount < totalRotations) {
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        // Approx rotation tracking
        if (cube.rotation.x >= Math.PI * 2 * (rotationCount + 1)) {
          rotationCount++;
          if (rotationCount === totalRotations && onAnimationComplete) {
            onAnimationComplete();
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = mountRef.current?.clientWidth || 1;
      const height = mountRef.current?.clientHeight || 1;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [onAnimationComplete]);

  return <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none" ref={mountRef}></div>;
}
