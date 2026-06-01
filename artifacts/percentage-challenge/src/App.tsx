import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PercentageCard from "./components/PercentageCard";
import FloatingParticles from "./components/FloatingParticles";
import PopupReaction from "./components/PopupReaction";

function getRange(pct: number): number {
  if (pct === 0) return 0;
  if (pct <= 20) return 1;
  if (pct <= 40) return 2;
  if (pct <= 60) return 3;
  if (pct <= 80) return 4;
  if (pct < 100) return 5;
  return 6;
}

function App() {
  const [percentage, setPercentage] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupRange, setPopupRange] = useState(0);
  const prevRangeRef = useRef<number>(0);

  useEffect(() => {
    const newRange = getRange(percentage);
    if (newRange !== 0 && newRange !== prevRangeRef.current) {
      prevRangeRef.current = newRange;
      setPopupRange(newRange);
      setPopupVisible(true);
    }
    if (percentage === 0) {
      prevRangeRef.current = 0;
    }
  }, [percentage]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background:
            percentage === 100
              ? "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 40%, #ede9fe 100%)"
              : percentage >= 61
              ? "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fdf4ff 100%)"
              : "linear-gradient(135deg, #fff1f5 0%, #fce7f3 50%, #fdf2f8 100%)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(249,168,212,0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(216,180,254,0.25) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(252,231,243,0.3) 0%, transparent 70%)
          `,
        }}
      />

      <FloatingParticles percentage={percentage} />

      <div className="relative z-10 w-full max-w-sm mx-auto px-4 py-8">
        <PercentageCard percentage={percentage} onPercentageChange={setPercentage} />
      </div>

      <PopupReaction
        range={popupRange}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />
    </div>
  );
}

export default App;
