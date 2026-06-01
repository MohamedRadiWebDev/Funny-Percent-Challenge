import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ReactionImage from "./ReactionImage";
import AnimatedText from "./AnimatedText";
import PercentageSlider from "./PercentageSlider";

interface ButtonConfig {
  label: string;
  key: string;
}

function getButtonConfig(pct: number): ButtonConfig {
  if (pct === 0) return { label: "ابدأ 🚀", key: "zero" };
  if (pct <= 20) return { label: "حاول مرة كمان 😅", key: "0-20" };
  if (pct <= 40) return { label: "ما استسلمتش دلوقتي 💪", key: "21-40" };
  if (pct <= 60) return { label: "كمل بقا متوقفش 👀", key: "41-60" };
  if (pct <= 80) return { label: "قرب أكتر مش هينفعك 🔥", key: "61-80" };
  if (pct < 100) return { label: "خطوة واحدة بس 😍", key: "81-99" };
  return { label: "ابدأ من الأول 🔄", key: "100" };
}

function getButtonGradient(pct: number): string {
  if (pct === 100) return "linear-gradient(135deg, #7c3aed, #a855f7)";
  if (pct >= 81) return "linear-gradient(135deg, #9d174d, #be185d)";
  if (pct >= 61) return "linear-gradient(135deg, #be185d, #db2777)";
  if (pct >= 41) return "linear-gradient(135deg, #db2777, #ec4899)";
  if (pct >= 21) return "linear-gradient(135deg, #ec4899, #f472b6)";
  return "linear-gradient(135deg, #f472b6, #f9a8d4)";
}

interface PercentageCardProps {
  percentage: number;
  onPercentageChange: (v: number) => void;
}

export default function PercentageCard({ percentage, onPercentageChange }: PercentageCardProps) {
  const btnConfig = getButtonConfig(percentage);
  const [btnPressed, setBtnPressed] = useState(false);

  const handleButtonClick = () => {
    setBtnPressed(true);
    setTimeout(() => setBtnPressed(false), 200);
    if (percentage < 100) {
      onPercentageChange(Math.min(100, percentage + Math.floor(Math.random() * 15) + 5));
    } else {
      onPercentageChange(0);
    }
  };

  return (
    <motion.div
      className="glass-card relative w-full max-w-sm mx-auto rounded-[32px] px-7 py-8 flex flex-col items-center gap-5 z-10"
      initial={{ opacity: 0, y: 60, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.1 }}
      style={{
        boxShadow:
          "0 8px 48px rgba(219, 39, 119, 0.18), 0 2px 12px rgba(219,39,119,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        animate={{
          boxShadow:
            percentage === 100
              ? "0 0 60px rgba(124,58,237,0.35), 0 0 120px rgba(168,85,247,0.18)"
              : percentage >= 61
              ? "0 0 40px rgba(219,39,119,0.22)"
              : "none",
        }}
        transition={{ duration: 0.6 }}
      />
      <div className="w-full text-center">
        <h1
          className="text-xl font-black tracking-tight"
          style={{ color: "#be185d", direction: "rtl" }}
        >
    
          مؤشر الصلح
        <br></br>
          علي السكة تقييمك ل محمد بعد اخر خناقة </h1>
        <p className="text-pink-400 mt-0.5 text-[16px] font-bold" style={{ direction: "rtl" }}>
          حركي السلايدر وقولي الصراحة متخافيش🔪
        </p>
      </div>
      <ReactionImage percentage={percentage} />
      <AnimatedText percentage={percentage} />
      <div className="w-full">
        <PercentageSlider value={percentage} onChange={onPercentageChange} />
      </div>
      <AnimatePresence mode="wait">
        <motion.button
          key={btnConfig.key}
          initial={{ opacity: 0, scale: 0.75, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: -10 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.93 }}
          onClick={handleButtonClick}
          className="w-full py-3.5 rounded-2xl text-white font-bold text-base tracking-wide cursor-pointer select-none"
          style={{
            background: getButtonGradient(percentage),
            boxShadow: btnPressed
              ? "0 2px 8px rgba(219,39,119,0.3)"
              : "0 6px 24px rgba(219,39,119,0.38), 0 2px 8px rgba(219,39,119,0.18)",
            border: "none",
            direction: "rtl",
            transition: "box-shadow 0.15s ease",
          }}
        >
          {btnConfig.label}
        </motion.button>
      </AnimatePresence>
      <div className="w-full flex justify-center gap-1.5 mt-1">
        {[20, 40, 60, 80, 100].map((threshold) => (
          <motion.div
            key={threshold}
            className="h-1.5 flex-1 rounded-full"
            animate={{
              backgroundColor: percentage >= threshold ? "#db2777" : "#fce7f3",
              scale: percentage >= threshold ? 1 : 0.95,
            }}
            transition={{ duration: 0.25 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
