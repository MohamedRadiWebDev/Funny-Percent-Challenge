import { motion } from "framer-motion";
import { useRef } from "react";

interface PercentageSliderProps {
  value: number;
  onChange: (value: number) => void;
}

function getTrackGradient(pct: number): string {
  if (pct <= 20) return `linear-gradient(to right, #f9a8d4, #f472b6 ${pct}%, #fce7f3 ${pct}%, #fce7f3)`;
  if (pct <= 40) return `linear-gradient(to right, #f472b6, #ec4899 ${pct}%, #fce7f3 ${pct}%, #fce7f3)`;
  if (pct <= 60) return `linear-gradient(to right, #f472b6, #db2777 ${pct}%, #fce7f3 ${pct}%, #fce7f3)`;
  if (pct <= 80) return `linear-gradient(to right, #ec4899, #be185d ${pct}%, #fce7f3 ${pct}%, #fce7f3)`;
  if (pct < 100) return `linear-gradient(to right, #db2777, #9d174d ${pct}%, #fce7f3 ${pct}%, #fce7f3)`;
  return `linear-gradient(to right, #db2777, #7c3aed 100%)`;
}

export default function PercentageSlider({ value, onChange }: PercentageSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full px-1">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-pink-400 tracking-wide">0%</span>
        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-2xl font-black tabular-nums"
          style={{
            color: value === 100 ? "#7c3aed" : value >= 61 ? "#be185d" : "#db2777",
            letterSpacing: "-0.02em",
          }}
        >
          {value}%
        </motion.span>
        <span className="text-xs font-semibold text-pink-400 tracking-wide">100%</span>
      </div>

      <div className="relative h-8 flex items-center" ref={trackRef}>
        <div
          className="absolute inset-y-0 flex items-center w-full"
          style={{ top: 0, bottom: 0 }}
        >
          <div
            className="w-full h-2.5 rounded-full"
            style={{ background: getTrackGradient(value) }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-thumb relative w-full appearance-none bg-transparent cursor-pointer z-10"
          style={{
            background: "transparent",
            WebkitAppearance: "none",
          }}
        />
      </div>

      <div className="flex justify-between mt-1 px-0.5">
        {[0, 25, 50, 75, 100].map((mark) => (
          <motion.div
            key={mark}
            className="flex flex-col items-center gap-0.5 cursor-pointer"
            onClick={() => onChange(mark)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className="w-0.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ background: value >= mark ? "#db2777" : "#f9a8d4" }}
            />
            <span
              className="text-[10px] font-medium transition-colors duration-300"
              style={{ color: value >= mark ? "#db2777" : "#f9a8d4" }}
            >
              {mark}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
