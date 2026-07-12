const allColors = [
  { name: "أسود", hex: "#000000" },
  { name: "أبيض", hex: "#FFFFFF" },
  { name: "رمادي فاتح", hex: "#D9D9D9" },
  { name: "رمادي غامق", hex: "#555555" },
  { name: "كحلي", hex: "#1B3A6B" },
  { name: "أزرق ملكي", hex: "#4169E1" },
  { name: "أزرق سماوي", hex: "#87CEEB" },
  { name: "تركواز", hex: "#40E0D0" },
  { name: "تيفاني", hex: "#81D8D0" },
  { name: "أخضر طبي", hex: "#4E7D65" },
  { name: "أخضر فاتح", hex: "#90EE90" },
  { name: "أخضر زيتوني", hex: "#556B2F" },
  { name: "مينت", hex: "#98FF98" },
  { name: "بنفسجي", hex: "#8D6A8E" },
  { name: "لافندر", hex: "#C8A2C8" },
  { name: "ليلكي", hex: "#B39DDB" },
  { name: "وردي", hex: "#D6B3BC" },
  { name: "وردي فاتح", hex: "#FFC0CB" },
  { name: "روز", hex: "#E8A0BF" },
  { name: "فوشيا", hex: "#FF1493" },
  { name: "بيج", hex: "#F5F5DC" },
  { name: "أوف وايت", hex: "#FAF9F6" },
  { name: "كاميل", hex: "#C19A6B" },
  { name: "بني", hex: "#8B4513" },
  { name: "أحمر", hex: "#DC143C" },
  { name: "نبيتي", hex: "#800020" },
  { name: "برتقالي", hex: "#FF8C00" },
  { name: "أصفر", hex: "#FFD700" }
];

export const products = [
  {
    id: 1,
    name: "سكراب RIVA الكلاسيكي",
    brand: "RIVA Med",
    category: "women",
    badge: " خصم",
    price: 1200,
    rating: 4.9,
    reviews: 218,
    addedDate: 2024,
    colors: allColors,
    sizes: ["XS","S","M","L","XL","2XL"],
    images: [
      
"https://i.ibb.co/8Dc19Z3n/IMG-20260515-WA0054.jpg",
"https://i.ibb.co/394XBwvB/IMG-20260702-WA0027.jpg",
"https://i.ibb.co/DPNQQqTh/IMG-20260702-WA0029-1.jpg",
"https://i.ibb.co/93m2FMQg/IMG-20260702-WA0028.jpg",
"https://i.ibb.co/S7HrbQV4/IMG-20260711-WA0135.jpg",
"https://i.ibb.co/DPNQQqTh/IMG-20260702-WA0029-1.jpg",
"https://i.ibb.co/cSHHJ3yn/IMG-20260515-WA0048.jpg",
"https://i.ibb.co/YB0n8RLQ/IMG-20260515-WA0050.jpg",

    ],
    description: "سكراب نسائي كلاسيكي فاخر من RIVA.",
    fabric: "روزالين مستورد",
    features: ["مرونة 4 اتجاهات","مضاد للبكتيريا","جيبين جانبيين","سهل الغسيل","ألوان ثابتة"]
  },

  {
    id: 2,
    name: "سكراب RIVA Premium",
    brand: "RIVA Med",
    category: "women",
    badge: "خصم",
    price: 1200,
    rating: 4.8,
    reviews: 156,
    addedDate: 2024,
    colors: allColors,
    sizes: ["XS","S","M","L","XL","2XL"],
    images: [
     
"https://i.ibb.co/5gmcg8gH/IMG-20260703-WA0063.jpg",
"https://i.ibb.co/wFTw5tCF/IMG-20260703-WA0065.jpg",
"https://i.ibb.co/RGGKKm4f/IMG-20260711-WA0155.jpg",
"https://i.ibb.co/twb4sSXf/IMG-20260703-WA0062.jpg",
"https://i.ibb.co/ccwcmHp9/IMG-20260703-WA0067.jpg",
"https://i.ibb.co/KzFfXTbH/IMG-20260703-WA0064.jpg",

    ],
    description: "سكراب بريميوم بخامة مرنة ومريحة.",
    fabric: "روزالين مستورد ",
    features: ["خفيف","مرن","ألوان ثابتة","جيوب واسعة","مناسب للشيفت"]
  },

  {
    id: 3,
    name: "سكراب RIVA Flex",
    brand: "RIVA Med",
    category: "men",
    badge: "خصم",
    price: 1150,
    rating: 4.7,
    reviews: 132,
    addedDate: 2024,
    colors: allColors,
    sizes: ["S","M","L","XL","2XL","3XL"],
    images: [
     
"https://i.ibb.co/hzNNSXz/IMG-20260703-WA0023.jpg",
"https://i.ibb.co/VWb1Z2Lh/IMG-20260703-WA0022.jpg",

    ],
    description: "سكراب رجالي عملي ومريح.",
    fabric: "روزالين مستورد",
    
    features: ["مضاد للتجعد","مرن","جيوب متعددة","تهوية ممتازة","خفيف"]
  },

  {
    id: 4,
    name: "سكراب RIVA Elite",
    brand: "RIVA Med",
    category: "women",
    badge: "خصم",
    price: 1200,
    rating: 5.0,
    reviews: 301,
    addedDate: 2024,
    colors: allColors,
    sizes: ["S","M","L","XL","2XL","3XL"],
    images: [
      
"https://i.ibb.co/NdWb6Sw1/IMG-20260515-WA0062.jpg",
"https://i.ibb.co/rR2Fp63x/IMG-20260515-WA0065.jpg",
"https://i.ibb.co/HSXG2td/IMG-20260515-WA0066.jpg",
"https://i.ibb.co/9HRsFpS0/IMG-20260515-WA0063.jpg",
"https://i.ibb.co/fGXTzsvx/IMG-20260515-WA0064.jpg",
"https://i.ibb.co/WWrzx1Jf/IMG-20260515-WA0061.jpg",

    ],
    description: "أفضل سكراب من RIVA بخامة فاخرة.",
    fabric: "روزالين مستورد",
    
    features: ["خامة مستوردة","ألوان ثابتة","مضاد للبكتيريا","مرونة عالية","مناسب لجميع الأطباء"]
  },

   {
    id: 5,
    name: "سكراب RIVA Flex",
    brand: "RIVA Med",
    category: "women",
    badge: "خصم",
    price: 1400,
    rating: 4.7,
    reviews: 132,
    addedDate: 2024,
    colors: allColors,
    sizes: ["S","M","L","XL","2XL","3XL"],
    images: [
      "https://i.ibb.co/3y6XpQyX/IMG-20260707-WA0036.jpg",
"https://i.ibb.co/rRYy8w4b/IMG-20260707-WA0037.jpg",
"https://i.ibb.co/XkKGHggS/IMG-20260707-WA0038.jpg",


       ],
    description: "سكراب رجالي عملي ومريح.",
    fabric: "روزالين مستورد",
    
    features: ["مضاد للتجعد","مرن","جيوب متعددة","تهوية ممتازة","خفيف"]
  },

   {
    id: 6,
    name: "سكراب RIVA Flex",
    brand: "RIVA Med",
    category: "men",
    badge: "خصم",
    price: 1150,
    rating: 4.7,
    reviews: 132,
    addedDate: 2024,

    colors: allColors,

    sizes: ["S","M","L","XL","2XL","3XL"],

    images: [
      "https://i.ibb.co/nNRRHRZ9/IMG-20260701-WA0070.jpg",
      "https://i.ibb.co/SwSXGws9/IMG-20260701-WA0069.jpg"
    ],

    description: "سكراب رجالي عملي ومريح.",

    fabric: "روزالين مستورد",

    features: [
      "مضاد للتجعد",
      "مرن",
      "جيوب متعددة",
      "تهوية ممتازة",
      "خفيف"
    ],

    // جديد
    requireCustomerCode: true,
    customerCodeLabel: "كود العميل"
},
];
