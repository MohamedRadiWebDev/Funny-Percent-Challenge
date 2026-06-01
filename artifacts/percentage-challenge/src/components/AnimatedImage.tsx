import { motion } from "framer-motion";

interface AnimatedImageProps {
  percentage: number;
}

const scale = (pct: number) => 1 + (pct / 100) * 0.4;

const ringColor = (pct: number) => {
  if (pct === 0) return "#f9a8d4";
  if (pct <= 20) return "#f472b6";
  if (pct <= 40) return "#ec4899";
  if (pct <= 60) return "#db2777";
  if (pct <= 80) return "#be185d";
  if (pct < 100) return "#9d174d";
  return "#7c3aed";
};

export default function AnimatedImage({ percentage }: AnimatedImageProps) {
  const s = scale(percentage);
  const color = ringColor(percentage);
  const glow = percentage > 60
    ? `0 0 ${8 + (percentage / 100) * 24}px ${color}88`
    : "none";

  return (
    <div className="flex justify-center mb-4">
      <motion.div
        animate={{ scale: s }}
        transition={{ type: "spring", stiffness: 160, damping: 22 }}
        style={{ transformOrigin: "center center" }}
      >
        <motion.div
          className="relative rounded-full p-[4px]"
          animate={{
            boxShadow: glow,
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: `linear-gradient(135deg, ${color}, #f9a8d4, ${color})`,
          }}
        >
          <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-[3px] border-white bg-pink-100">
            <svg
              viewBox="0 0 110 110"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fce7f3" />
                  <stop offset="100%" stopColor="#fbcfe8" />
                </radialGradient>
                <radialGradient id="faceGrad" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#fde8d8" />
                  <stop offset="100%" stopColor="#f9c4a8" />
                </radialGradient>
              </defs>
              <rect width="110" height="110" fill="url(#bgGrad)" />
              <ellipse cx="55" cy="68" rx="32" ry="26" fill="#7c3aed" opacity="0.13" />
              <ellipse cx="55" cy="60" rx="28" ry="32" fill="url(#faceGrad)" />
              <ellipse cx="45" cy="54" rx="4.5" ry="5.5" fill="white" />
              <ellipse cx="65" cy="54" rx="4.5" ry="5.5" fill="white" />
              <circle cx="45" cy="55" r="2.5" fill="#1e293b" />
              <circle cx="65" cy="55" r="2.5" fill="#1e293b" />
              <circle cx="46" cy="53.5" r="1" fill="white" opacity="0.8" />
              <circle cx="66" cy="53.5" r="1" fill="white" opacity="0.8" />
              <ellipse cx="42" cy="62" rx="5" ry="3" fill="#f9a8d4" opacity="0.7" />
              <ellipse cx="68" cy="62" rx="5" ry="3" fill="#f9a8d4" opacity="0.7" />
              {percentage < 100 ? (
                <path
                  d="M 45 66 Q 55 73 65 66"
                  fill="none"
                  stroke="#be185d"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path
                    d="M 43 64 Q 55 76 67 64"
                    fill="#fda4af"
                    stroke="#be185d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <ellipse cx="55" cy="67" rx="8" ry="4" fill="#fb7185" opacity="0.6" />
                </>
              )}
              <ellipse cx="55" cy="36" rx="22" ry="18" fill="#7c3aed" opacity="0.18" />
              <ellipse cx="55" cy="32" rx="18" ry="14" fill="#c084fc" opacity="0.22" />
              <ellipse cx="44" cy="30" rx="7" ry="11" fill="#a855f7" opacity="0.15" />
              <ellipse cx="66" cy="30" rx="7" ry="11" fill="#a855f7" opacity="0.15" />
            </svg>
          </div>

          {percentage === 100 && (
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
            >
              👑
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
