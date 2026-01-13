import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
  opacity: 1;
`;

const Constellation = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = event => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    // Track mouse on the whole window or just canvas?
    // Since it's a background, let's track it on the section/window to be more reactive.
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();

    const particles = [];
    const particleCount = 80;
    const colorsDark = ['#E07A5F', '#ff6b6b', '#f7df1e', '#57cbff', '#f57dff'];
    const colorsLight = ['#B15D44', '#8B3E2F', '#7A4A3A', '#415A77', '#2A6F97'];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 3 + 1.5;
        this.pulse = Math.random() * Math.PI;
        this.opacityBase = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
        }

        // Interactive effect: Magnetic pull/push
        if (mouse.current.x !== null) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.current.radius) {
            const force = (mouse.current.radius - distance) / mouse.current.radius;
            const angle = Math.atan2(dy, dx);
            // Gentle acceleration towards/away from mouse
            this.x -= Math.cos(angle) * force * 2;
            this.y -= Math.sin(angle) * force * 2;
          }
        }

        this.pulse += 0.03;
      }

      draw(isLightMode) {
        const pulseFactor = Math.sin(this.pulse) * 0.5 + 0.5;
        const currentRadius = this.radius * (0.8 + pulseFactor * 0.4);

        const palette = isLightMode ? colorsLight : colorsDark;
        const colorIndex = Math.floor((this.x + this.y) % palette.length);
        const color = palette[colorIndex];

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);

        ctx.shadowBlur = isLightMode ? 5 : 15;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.globalAlpha = isLightMode ? this.opacityBase + 0.25 : this.opacityBase;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      const isLightMode = document.body.classList.contains('light-mode');
      const themeGreen =
        getComputedStyle(document.documentElement).getPropertyValue('--green').trim() || '#E07A5F';

      // Helper to convert hex to RGB
      const hexToRgb = hex => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
          : '177, 93, 68';
      };

      const rgbGreen = hexToRgb(themeGreen);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw(isLightMode);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            // Make connections more visible in light mode
            const baseAlpha = isLightMode ? 0.5 : 0.3;
            const alpha = (1 - distance / 150) * baseAlpha;

            ctx.strokeStyle = `rgba(${rgbGreen}, ${alpha})`;
            ctx.lineWidth = isLightMode ? 1.5 : 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default Constellation;
