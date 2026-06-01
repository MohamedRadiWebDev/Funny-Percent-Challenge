import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

interface TextConfig {
  text: string;
  key: string;
}

function getTextForPercentage(pct: number): TextConfig {
  if (pct === 0) return { text: "حركي السلايدر وقولي الصراحة 🔪", key: "zero" };
  if (pct <= 20) return { text: "شكلك لسه متضايقة أوي 😅", key: "0-20" };
  if (pct <= 40) return { text: "فيه أمل... بس بالعافية 😂", key: "21-40" };
  if (pct <= 60) return { text: "أهو بنتحرك في الاتجاه الصح", key: "41-60" };
  if (pct <= 80) return { text: "كده الكلام الحلو بقا ❤️", key: "61-80" };
  if (pct < 100) return { text: "خلاص فاضل خطوة صغيرة جدًا", key: "81-99" };
  return { text: "خلاص كده اتصالحنا 🤝❤️", key: "100" };
}

interface AnimatedTextProps {
  percentage: number;
}

export default function AnimatedText({ percentage }: AnimatedTextProps) {
  const config = useMemo(() => getTextForPercentage(percentage), [percentage]);

  return (
    <div className="relative h-14 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={config.key}
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -22, filter: "blur(6px)" }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          className="text-center text-xl font-bold leading-snug px-2"
          style={{
            color:
              percentage === 100
                ? "#7c3aed"
                : percentage >= 61
                ? "#be185d"
                : "#db2777",
            direction: "rtl",
            textShadow: "0 1px 6px rgba(219,39,119,0.12)",
          }}
        >
          {config.text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
