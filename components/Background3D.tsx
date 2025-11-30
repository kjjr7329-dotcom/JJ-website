import React, { useEffect, useRef } from 'react';

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use visual viewport size if available, fallback to window inner size
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set canvas size
    const setSize = () => {
      canvas.width = width;
      canvas.height = height;
    };
    setSize();

    // 3D Point Interface
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    // Stars (Particles)
    const stars: Point3D[] = [];
    const numStars = 150; // Reduced count for mobile performance

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width
      });
    }

    // Cube Vertices
    const cubeSize = 150;
    const cubeNodes: Point3D[] = [
      { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 },
    ].map(p => ({ x: p.x * cubeSize, y: p.y * cubeSize, z: p.z * cubeSize }));

    // Edges connecting vertices
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting lines
    ];

    let angleX = 0;
    let angleY = 0;
    let animationId: number;

    const render = () => {
      // Clear canvas
      ctx.fillStyle = '#0f172a'; // Base background color (Slate 900)
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw Stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(star => {
        // Move star closer
        star.z -= 0.5;
        if (star.z <= 0.1) { // Prevent z becoming 0 or negative
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // Project 3D to 2D
        // Safety check for z
        const safeZ = Math.max(0.1, star.z);
        const k = 128.0 / safeZ;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          // Fix: Ensure size is not negative to prevent IndexSizeError
          const rawSize = (1 - safeZ / width) * 2.5;
          const size = Math.max(0, rawSize);
          const alpha = Math.max(0, Math.min(1, (1 - safeZ / width)));
          
          if (size > 0.1) { // Only draw visible stars
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      ctx.globalAlpha = 1.0;

      // 2. Draw Rotating Cube
      angleX += 0.002;
      angleY += 0.003;

      const rotatedNodes = cubeNodes.map(node => {
        // Rotate X
        let y = node.y * Math.cos(angleX) - node.z * Math.sin(angleX);
        let z = node.y * Math.sin(angleX) + node.z * Math.cos(angleX);
        let x = node.x;

        // Rotate Y
        let xx = x * Math.cos(angleY) + z * Math.sin(angleY);
        let zz = -x * Math.sin(angleY) + z * Math.cos(angleY);

        return { x: xx, y, z: zz + 800 }; // Push back in Z
      });

      ctx.strokeStyle = '#3b82f6'; // Blue-500
      ctx.lineWidth = 1.5;
      
      // Draw edges
      cubeEdges.forEach(([i, j]) => {
        const p1 = rotatedNodes[i];
        const p2 = rotatedNodes[j];

        // Project with safety check
        const z1 = Math.max(0.1, p1.z);
        const z2 = Math.max(0.1, p2.z);

        const k1 = 600 / z1;
        const x1 = p1.x * k1 + cx;
        const y1 = p1.y * k1 + cy;

        const k2 = 600 / z2;
        const x2 = p2.x * k2 + cx;
        const y2 = p2.y * k2 + cy;

        // Basic clipping check to ensure lines are in front
        if (p1.z > 0 && p2.z > 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          
          // Constant opacity for wireframe
          ctx.globalAlpha = 0.3;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // On mobile, browser address bar hide/show triggers resize.
      // We only want to reset canvas if width changes (orientation change)
      // or if height changes significantly.
      if (width !== newWidth || Math.abs(height - newHeight) > 100) {
        width = newWidth;
        height = newHeight;
        setSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default Background3D;