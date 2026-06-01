import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface PopupConfig {
  emoji: string;
  bgFrom: string;
  bgTo: string;
  title: string;
  subtitle: string;
  btnLabel: string;
}

const POPUP_CONFIGS: Record<number, PopupConfig> = {
  1: {
    emoji: "💀",
    bgFrom: "#fce7f3",
    bgTo: "#f9a8d4",
    title: "ده مش تقييم ده إهانة 😭",
    subtitle: "محمد يستحق أحسن من كده بكتير!",
    btnLabel: "حاول مرة كمان 😅",
  },
  2: {
    emoji: "🤦",
    bgFrom: "#fdf4ff",
    bgTo: "#f0abfc",
    title: "لسه بدري أوي يا حبيبتي 😂",
    subtitle: "ارفعيه شوية.. محمد بيستنى!",
    btnLabel: "ما استسلمتيش دلوقتي 💪",
  },
  3: {
    emoji: "👀",
    bgFrom: "#fff7ed",
    bgTo: "#fed7aa",
    title: "وسط الطريق.. مش هنا مش هناك!",
    subtitle: "قررت إيه؟ هتكملي ولا لأ؟",
    btnLabel: "كمل بقا متوقفيش 🚀",
  },
  4: {
    emoji: "🔥",
    bgFrom: "#fef3c7",
    bgTo: "#fde68a",
    title: "جامدة جداً! محمد محظوظ 🔥",
    subtitle: "بس لسه ناقص شوية.. هتكملي؟",
    btnLabel: "قربي أكتر مش هينفع 😤",
  },
  5: {
    emoji: "😍",
    bgFrom: "#ecfdf5",
    bgTo: "#a7f3d0",
    title: "فاضل خطوة واحدة بس!!",
    subtitle: "100% بتستنى.. هتوصلي؟",
    btnLabel: "دي آخر فرصة 😍",
  },
  6: {
    emoji: "🥳",
    bgFrom: "#ede9fe",
    bgTo: "#c4b5fd",
    title: "مبروك وصلتي 100%! ❤️",
    subtitle: "محمد ♾️ دايماً وأبداً 🎊",
    btnLabel: "ابدأي من الأول 🔄",
  },
};

interface PopupReactionProps {
  range: number;
  visible: boolean;
  onClose: () => void;
}

export default function PopupReaction({ range, visible, onClose }: PopupReactionProps) {
  const config = POPUP_CONFIGS[range] ?? POPUP_CONFIGS[1];

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: "rgba(15,10,30,0.55)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          <motion.div
            key="popup"
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            initial={{ opacity: 0, scale: 0.6, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 60 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            <div
              className="relative w-full max-w-xs rounded-[32px] flex flex-col items-center gap-4 px-6 py-8"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: "1.5px solid rgba(255,255,255,0.9)",
                boxShadow: "0 24px 80px rgba(219,39,119,0.25), 0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <motion.button
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "#fce7f3", border: "none" }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
              >
                <X size={16} color="#be185d" strokeWidth={2.5} />
              </motion.button>

              <motion.div
                className="w-[140px] h-[140px] rounded-[28px] flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${config.bgFrom}, ${config.bgTo})`,
                  border: "2.5px solid rgba(255,255,255,0.85)",
                  boxShadow: "0 8px 32px rgba(219,39,119,0.18)",
                }}
                animate={{
                  rotate: [0, -6, 6, -4, 4, 0],
                  scale: [1, 1.06, 1],
                }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <span style={{ fontSize: 76, lineHeight: 1, userSelect: "none" }}>
                  {config.emoji}
                </span>
              </motion.div>

              <div className="text-center" style={{ direction: "rtl" }}>
                <motion.h2
                  className="text-lg font-black leading-snug"
                  style={{ color: "#be185d" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {config.title}
                </motion.h2>
                <motion.p
                  className="text-sm text-pink-400 mt-1 font-medium"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                >
                  {config.subtitle}
                </motion.p>
              </div>

              <motion.button
                className="w-full py-3.5 rounded-2xl text-white font-bold text-base cursor-pointer select-none mt-1"
                style={{
                  background: range === 6
                    ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                    : "linear-gradient(135deg, #db2777, #ec4899)",
                  border: "none",
                  direction: "rtl",
                  boxShadow: "0 6px 24px rgba(219,39,119,0.38)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, type: "spring", stiffness: 260, damping: 18 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.93 }}
                onClick={onClose}
              >
                {config.btnLabel}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
