import { useRef, useEffect } from "react";

export function Particulas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Función para inicializar tamaño
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    let width = canvas.width;
    let height = canvas.height;

    // Colores que combinan con tu marca roja
    const colors = {
      primary: "#dc2626", // rojo
      secondary: "#f97316", // naranja
      accent: "#fbbf24", // ámbar
      glow: "rgba(220, 38, 38, 0.6)",
    };

    const particles = [];
    const shootingStars = [];
    const mouse = { x: null, y: null, radius: 150 };

    function randomBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    // Crear partículas
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        vx: randomBetween(-0.3, 0.3),
        vy: randomBetween(-0.3, 0.3),
        size: randomBetween(2, 5),
        color: [colors.primary, colors.secondary, colors.accent][
          Math.floor(Math.random() * 3)
        ],
        alpha: randomBetween(0.4, 1),
        pulseSpeed: randomBetween(0.01, 0.03),
        pulsePhase: randomBetween(0, Math.PI * 2),
      });
    }

    // Crear meteoros ocasionales
    function createShootingStar() {
      if (shootingStars.length < 3 && Math.random() < 0.02) {
        shootingStars.push({
          x: randomBetween(0, width),
          y: randomBetween(0, height * 0.5),
          length: randomBetween(80, 200),
          speed: randomBetween(8, 15),
          angle: randomBetween(0.2, 0.6),
          opacity: 1,
          color: Math.random() > 0.5 ? colors.secondary : colors.accent,
        });
      }
    }

    function drawParticles() {
      // Fondo con gradiente sutil
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width,
      );
      gradient.addColorStop(0, "rgba(30, 20, 25, 0.95)");
      gradient.addColorStop(1, "rgba(12, 12, 15, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Dibujar partículas con glow
      for (let p of particles) {
        p.pulsePhase += p.pulseSpeed;
        const pulse = 0.7 + Math.sin(p.pulsePhase) * 0.3;
        const currentAlpha = p.alpha * pulse;

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);

        // Gradiente radial en la partícula
        const particleGradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * pulse,
        );
        particleGradient.addColorStop(0, p.color);
        particleGradient.addColorStop(1, "transparent");
        ctx.fillStyle = particleGradient;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // Dibujar líneas de constelación
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Gradiente en la línea
            const lineGradient = ctx.createLinearGradient(
              p1.x,
              p1.y,
              p2.x,
              p2.y,
            );
            lineGradient.addColorStop(0, p1.color);
            lineGradient.addColorStop(1, p2.color);
            ctx.strokeStyle = lineGradient;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Dibujar líneas al mouse
      if (mouse.x !== null && mouse.y !== null) {
        for (let p of particles) {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist < mouse.radius) {
            const opacity = (1 - dist / mouse.radius) * 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);

            const mouseGradient = ctx.createLinearGradient(
              p.x,
              p.y,
              mouse.x,
              mouse.y,
            );
            mouseGradient.addColorStop(0, p.color);
            mouseGradient.addColorStop(1, colors.accent);
            ctx.strokeStyle = mouseGradient;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Dibujar meteoros
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        // Cola del meteoro
        const meteorGradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        meteorGradient.addColorStop(0, "transparent");
        meteorGradient.addColorStop(1, s.color);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = meteorGradient;
        ctx.globalAlpha = s.opacity;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();

        // Cabeza brillante
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = s.opacity;
        ctx.fill();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.015;

        if (s.opacity <= 0 || s.x > width + 200 || s.y > height + 200) {
          shootingStars.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;
    }

    function updateParticles() {
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Rebote suave
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interacción con mouse - alejar
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            p.vx -= (dx / dist) * 0.02;
            p.vy -= (dy / dist) * 0.02;
          }
        }

        // Fricción para limitar velocidad
        p.vx *= 0.99;
        p.vy *= 0.99;
      }
    }

    function animate() {
      updateParticles();
      drawParticles();
      createShootingStar();
      requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      resizeCanvas();
      width = canvas.width;
      height = canvas.height;
    }

    function handleMouse(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleMouseOut() {
      mouse.x = null;
      mouse.y = null;
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
