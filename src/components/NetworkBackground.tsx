import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Route = {
  from: number;
  to: number;
  progress: number;
  speed: number;
};

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const nodes: Node[] = [];
    const routes: Route[] = [];

    const NODE_COUNT = 14;
    const MAX_ROUTE_COUNT = 3;

    const initNetwork = () => {
      nodes.length = 0;
      routes.length = 0;

      for (let i = 0; i < NODE_COUNT; i += 1) {
        nodes.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.04,
          vy: (Math.random() - 0.5) * 0.04,
        });
      }

      for (let i = 0; i < MAX_ROUTE_COUNT; i += 1) {
        const from = Math.floor(Math.random() * NODE_COUNT);
        let to = Math.floor(Math.random() * NODE_COUNT);
        if (to === from) {
          to = (to + 1) % NODE_COUNT;
        }
        routes.push({
          from,
          to,
          progress: Math.random(),
          speed: 0.03 + Math.random() * 0.03,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;

      const displayWidth = rect.width || window.innerWidth;
      const displayHeight = rect.height || 360;

      canvas.width = displayWidth * pixelRatio;
      canvas.height = displayHeight * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      width = displayWidth;
      height = displayHeight;
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const deltaSeconds = Math.min((time - lastTime) / 1000, 0.033);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Update node positions
      const velocityScale = Math.min(width, height) * 0.01;
      nodes.forEach((node) => {
        node.x += node.vx * deltaSeconds * velocityScale;
        node.y += node.vy * deltaSeconds * velocityScale;

        if (node.x < 0 || node.x > 1) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(1, node.x));
        }

        if (node.y < 0 || node.y > 1) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(1, node.y));
        }
      });

      // Draw connections
      const maxDistance = Math.min(width, height) * 0.28;
      ctx.lineWidth = 0.7;

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const ax = a.x * width;
        const ay = a.y * height;

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const bx = b.x * width;
          const by = b.y * height;

          const dx = ax - bx;
          const dy = ay - by;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.16;
            ctx.strokeStyle = `rgba(15, 23, 42, ${opacity.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = "rgba(15, 23, 42, 0.35)";
      const nodeRadius = 1.8;
      nodes.forEach((node) => {
        const x = node.x * width;
        const y = node.y * height;
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw moving "transport" dots along a few routes
      routes.forEach((route) => {
        const from = nodes[route.from];
        const to = nodes[route.to];

        const startX = from.x * width;
        const startY = from.y * height;
        const endX = to.x * width;
        const endY = to.y * height;

        route.progress += route.speed * deltaSeconds;
        if (route.progress > 1) {
          route.progress = 0;
          route.from = Math.floor(Math.random() * NODE_COUNT);
          route.to = Math.floor(Math.random() * NODE_COUNT);
          if (route.to === route.from) {
            route.to = (route.to + 1) % NODE_COUNT;
          }
        }

        const t = route.progress;
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t;

        ctx.beginPath();
        ctx.fillStyle = "rgba(37, 99, 235, 0.6)";
        ctx.arc(x, y, nodeRadius + 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    initNetwork();
    resize();
    animationFrameId = window.requestAnimationFrame(render);

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default NetworkBackground;

