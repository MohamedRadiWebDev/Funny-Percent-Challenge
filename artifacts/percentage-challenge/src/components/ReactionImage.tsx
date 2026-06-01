import { AnimatePresence, motion } from "framer-motion";

interface Reaction {
  key: string;
  emoji: string;
  bgFrom: string;
  bgTo: string;
  label: string;
}

function getReaction(pct: number): Reaction {
  if (pct === 0)
    return { key: "zero", emoji: "😶", bgFrom: "#fce7f3", bgTo: "#fbcfe8", label: "ابدأي التقييم عشان نعرف!" };
  if (pct <= 20)
    return { key: "r1", emoji: "😶", bgFrom: "#fce7f3", bgTo: "#f9a8d4", label: "لسه واخدة موقف محترم 😭" };
  if (pct <= 40)
    return { key: "r2", emoji: "🤔", bgFrom: "#fdf4ff", bgTo: "#f0abfc", label: "الدنيا بدأت تهدى شوية 👀" };
  if (pct <= 60)
    return { key: "r3", emoji: "🙂", bgFrom: "#fff7ed", bgTo: "#fed7aa", label: "المنطقة الرمادية 😅" };
  if (pct <= 80)
    return { key: "r4", emoji: "😊", bgFrom: "#fef3c7", bgTo: "#fde68a", label: "الصلح قرب أهو 🥹" };
  if (pct < 100)
    return { key: "r5", emoji: "🥰", bgFrom: "#ecfdf5", bgTo: "#a7f3d0", label: "يا ساتر... قربنا أوي 😌" };
  return { key: "r100", emoji: "❤️", bgFrom: "#ede9fe", bgTo: "#c4b5fd", label: "تم اعتماد الصلح رسميًا 🎉" };
}

interface ReactionImageProps {
  percentage: number;
}

export default function ReactionImage({ percentage }: ReactionImageProps) {
  const reaction = getReaction(percentage);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={reaction.key}
          initial={{ scale: 0.4, opacity: 0, rotate: -15, y: 20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
          exit={{ scale: 0.4, opacity: 0, rotate: 15, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            className="w-[130px] h-[130px] rounded-[28px] flex items-center justify-center shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${reaction.bgFrom}, ${reaction.bgTo})`,
              border: "2.5px solid rgba(255,255,255,0.85)",
            }}
            animate={{ rotate: [0, -3, 3, -2, 2, 0] }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span style={{ fontSize: 68, lineHeight: 1, userSelect: "none" }}>
              {reaction.emoji}
            </span>
          </motion.div>

          <motion.p
            className="text-sm font-bold text-center px-2"
            style={{ color: "#be185d", direction: "rtl" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            {reaction.label}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
