import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
  rotation: number;
  amplitude: number;
}

interface FloatingParticlesProps {
  percentage: number;
}

const EMOJIS = ["❤️", "💖", "💕", "✨", "🌸", "💫", "🎀", "💝"];
const CONFETTI_EMOJIS = ["🎉", "🥳", "🎊", "⭐", "💥", "🌟", "🎈", "🏆"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateParticles(count: number, percentage: number): Particle[] {
  const emojis = percentage === 100 ? CONFETTI_EMOJIS : EMOJIS;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(5, 95),
    y: randomBetween(10, 90),
    size: randomBetween(14, 28),
    duration: randomBetween(3.5, 7),
    delay: randomBetween(0, 4),
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    rotation: randomBetween(-30, 30),
    amplitude: randomBetween(15, 40),
  }));
}

export default function FloatingParticles({ percentage }: FloatingParticlesProps) {
  const count = Math.max(6, Math.floor((percentage / 100) * 22) + 6);
  const [particles, setParticles] = useState<Particle[]>(() => generateParticles(count, percentage));
  const prevCountRef = useRef(count);
  const prevPercentageRef = useRef(percentage);

  useEffect(() => {
    const is100 = percentage === 100;
    const was100 = prevPercentageRef.current === 100;
    if (Math.abs(count - prevCountRef.current) >= 2 || is100 !== was100) {
      setParticles(generateParticles(count, percentage));
      prevCountRef.current = count;
      prevPercentageRef.current = percentage;
    }
  }, [count, percentage]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            opacity: 0.55 + (percentage / 100) * 0.35,
          }}
          animate={{
            y: [0, -p.amplitude, 0, p.amplitude * 0.5, 0],
            x: [0, p.amplitude * 0.4, 0, -p.amplitude * 0.4, 0],
            rotate: [0, p.rotation, 0, -p.rotation * 0.6, 0],
            scale: percentage === 100
              ? [1, 1.4, 1, 1.3, 1]
              : [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
