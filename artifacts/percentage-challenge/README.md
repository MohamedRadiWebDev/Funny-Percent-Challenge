# تحدي النسبة 💯 — Funny Percentage Challenge

موقع تفاعلي مستوحى من فلاتر السوشيال ميديا — بتحرك السلايدر وبيطلع لك تقييم مضحك مع صور رد فعل وبوب آب لكل مرحلة.

---

## الموقع فرونت إند بس؟

**نعم 100%.** مفيش سيرفر، مفيش قاعدة بيانات، مفيش API. كل الكود بيشتغل جوا المتصفح مباشرة.

---

## التقنيات المستخدمة

| التقنية | الاستخدام |
|---|---|
| **React 19** | بناء الواجهة |
| **TypeScript** | تايبينج قوي وآمن |
| **Vite** | Build tool سريع |
| **Tailwind CSS v4** | التصميم والستايل |
| **Framer Motion** | كل الأنيميشن والحركات |
| **Lucide React** | الأيقونات (زي أيقونة الـ X في البوب آب) |

---

## هيكل الملفات

```
artifacts/percentage-challenge/
│
├── src/
│   ├── App.tsx                        ← نقطة الدخول الرئيسية للتطبيق
│   ├── main.tsx                       ← تحميل React في الـ DOM
│   ├── index.css                      ← الستايلات العامة + Tailwind + الـ slider custom CSS
│   │
│   └── components/
│       ├── PercentageCard.tsx         ← الكارد الرئيسي اللي بيحتوي كل حاجة
│       ├── ReactionImage.tsx          ← صورة رد الفعل داخل الكارد (بتتغير بالـ range)
│       ├── AnimatedText.tsx           ← الجملة العربية اللي بتتغير بالـ range
│       ├── PercentageSlider.tsx       ← السلايدر المخصص مع الـ gradient
│       ├── FloatingParticles.tsx      ← القلوب والنجوم العايمة في الخلفية
│       ├── PopupReaction.tsx          ← البوب آب اللي بيطلع عند كل range جديدة
│       └── AnimatedImage.tsx          ← (موجود بس مش مستخدم حالياً — deprecated)
│
├── vite.config.ts                     ← Config لـ Replit (بيطلب PORT و BASE_PATH)
├── vite.config.vercel.ts              ← Config مخصصة لـ Vercel (بدون env vars)
├── vercel.json                        ← إعدادات Vercel (SPA routing + build command)
└── package.json                       ← الـ dependencies والـ scripts
```

---

## شرح كل كومبوننت

### `App.tsx`
المخ الرئيسي للتطبيق. بيدير:
- **state الـ percentage** (من 0 لـ 100)
- **state البوب آب** (ظاهر/مخفي + الـ range بتاعته)
- **كشف تغيير الـ range** — لما المستخدم يعدي من range لـ range جديدة بيفتح البوب آب أوتوماتيك
- الخلفية الـ gradient اللي بتتغير لونها مع الـ percentage
- بيعرض `FloatingParticles` و `PercentageCard` و `PopupReaction`

**منطق الـ range:**
```
0       → range 0 (مفيش بوب آب)
1–20    → range 1
21–40   → range 2
41–60   → range 3
61–80   → range 4
81–99   → range 5
100     → range 6
```

---

### `PercentageCard.tsx`
الكارد الأبيض في المنتصف. فيه:
- العنوان والـ subtitle
- `ReactionImage` — صورة رد الفعل
- `AnimatedText` — الجملة اللي بتتغير
- `PercentageSlider` — السلايدر
- الزرار السفلي اللي بيتغير كلامه مع كل range
- شريط التقدم السفلي (5 نقاط)
- Glassmorphism effect (backdrop-blur + شفافية)

**الزرار بيتغير كالآتي:**
| النسبة | نص الزرار |
|---|---|
| 0% | ابدأ 🚀 |
| 1–20% | حاول مرة كمان 😅 |
| 21–40% | ما استسلمتيش دلوقتي 💪 |
| 41–60% | كمل بقا متوقفيش 👀 |
| 61–80% | قرب أكتر مش هينفع 🔥 |
| 81–99% | خطوة واحدة بس 😍 |
| 100% | ابدأي من الأول 🔄 |

---

### `ReactionImage.tsx`
صورة رد الفعل داخل الكارد. كل range بيبقا ليه:
- Emoji مختلف (💀 😂 👀 🔥 😍 🥳)
- لون خلفية مختلف
- جملة تعليق أسفل الصورة

بيستخدم `AnimatePresence` عشان الانتقال بين الصور يبقا smooth (scale + rotate + fade).

---

### `AnimatedText.tsx`
الجملة العربية اللي بتظهر تحت الصورة. بتتغير مع كل range وبتدخل بـ:
- Fade (opacity)
- Slide (Y position)
- Blur effect

---

### `PercentageSlider.tsx`
السلايدر المخصص. فيه:
- Track بـ gradient بيتغير لونه مع الـ percentage (وردي فاتح → وردي غامق → بنفسجي)
- Thumb دايري أبيض مع shadow
- عداد النسبة المئوية في الوسط فوق السلايدر بـ spring animation
- نقاط (0، 25، 50، 75، 100) قابلة للضغط للقفز مباشرة

---

### `FloatingParticles.tsx`
الجزيئات العايمة في الخلفية. بيتحكم فيها الـ percentage:
- **عددها بيزيد** مع الـ percentage
- **أكتر وضوح** مع الـ percentage
- **في 100%** بتتحول من قلوب (❤️ 💖 🌸) لـ confetti (🎉 🥳 🎊 ⭐)
- كل جزيء ليه حركة عشوائية (amplitude + rotation + duration) مختلفة

---

### `PopupReaction.tsx`
البوب آب اللي بيطلع كل ما المستخدم يعدي range جديدة. فيه:
- **Backdrop** معتم مع blur بيقفل البوب آب لو ضغطت عليه
- **كارد** في المنتصف مع emoji كبير + عنوان + جملة
- **زرار** بكلام مختلف لكل range
- **زرار X** في الركن عشان تقفله

**محتوى البوب آب لكل range:**

| Range | Emoji | العنوان | الزرار |
|---|---|---|---|
| 1–20% | 💀 | ده مش تقييم ده إهانة 😭 | حاول مرة كمان 😅 |
| 21–40% | 🤦 | لسه بدري أوي يا حبيبتي 😂 | ما استسلمتيش دلوقتي 💪 |
| 41–60% | 👀 | وسط الطريق.. مش هنا مش هناك! | كمل بقا متوقفيش 🚀 |
| 61–80% | 🔥 | جامدة جداً! محمد محظوظ 🔥 | قربي أكتر مش هينفع 😤 |
| 81–99% | 😍 | فاضل خطوة واحدة بس!! | دي آخر فرصة 😍 |
| 100% | 🥳 | مبروك وصلتي 100%! ❤️ | ابدأي من الأول 🔄 |

---

## إزاي يشتغل على Replit

الموقع شغال خلاص على Replit بدون أي إعداد. الـ workflow بيشتغل أوتوماتيك.

```bash
# لو عايز تشغله يدوياً
pnpm --filter @workspace/percentage-challenge run dev
```

---

## رفعه على Vercel

### الطريقة الأسهل — Vercel CLI

```bash
# 1. روح على الفولدر
cd artifacts/percentage-challenge

# 2. نصب الـ dependencies
npm install

# 3. ابني المشروع
npm run build:vercel

# 4. ارفعه
npx vercel --prod
```

### من الـ Dashboard

1. ادخل على [vercel.com](https://vercel.com) وعمل import للـ repo
2. **Root Directory:** `artifacts/percentage-challenge`
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build:vercel`
5. **Output Directory:** `dist`
6. اضغط Deploy ✅

> الـ `vercel.json` الموجود في الفولدر بيعمل الإعداد ده أوتوماتيك.

---

## تخصيص المحتوى

### تغيير الجمل والنصوص

**الجمل داخل الكارد** → `src/components/AnimatedText.tsx` — دالة `getTextForPercentage`

**صور رد الفعل داخل الكارد** → `src/components/ReactionImage.tsx` — دالة `getReaction`

**نصوص البوب آب** → `src/components/PopupReaction.tsx` — object الـ `POPUP_CONFIGS`

**نصوص الزرار في الكارد** → `src/components/PercentageCard.tsx` — دالة `getButtonConfig`

### تغيير الألوان

الألوان الرئيسية في `src/index.css` جوا الـ `:root`:
```css
--primary: 340 75% 65%;   /* اللون الوردي الرئيسي */
--ring: 340 75% 65%;
```

---

## ملاحظات مهمة

- `AnimatedImage.tsx` موجود في المشروع لكنه **مش مستخدم** حالياً — اتعوض بـ `ReactionImage.tsx`
- الـ `vite.config.ts` الأصلي بيطلب `PORT` و `BASE_PATH` — دول بيجوا من Replit فقط
- للـ Vercel استخدم `vite.config.vercel.ts` اللي بيشتغل بدون أي env vars
- الـ `vercel.json` بيعمل rewrite لكل الـ routes لـ `index.html` عشان الـ SPA يشتغل صح
