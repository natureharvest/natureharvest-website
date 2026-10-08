export type Product = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  image: string;
  origin: string;
  packaging: string;
  quality: string;
  availability: string;
};

export type ProductVariant = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  keyFeatures: string[];
  globalQualityStandards: string[];
  qualityStandards: string[];
  rating: number;
  reviews: number;
};



export const products: Product[] = [
  {
    id: "1",
    number: "01",
    name: "Basmati Rice",
    category: "Basmati Rice",
    description:
      "Premium Indian Basmati Rice known for its long slender grains, natural aroma, delicate texture and excellent cooking quality.",
    image: "/images/basmati-rice.jpg",
    origin: "India",
    packaging: "Available as per buyer requirement",
    quality: "Premium Export Quality",
    availability: "Global Supply",
  },

  {
    id: "2",
    number: "02",
    name: "Non-Basmati Rice",
    category: "Non-Basmati Rice",
    description:
      "High-quality Non-Basmati Rice sourced from trusted agricultural regions of India.",
    image: "/images/non-basmati-rice.jpg",
    origin: "India",
    packaging: "Available as per buyer requirement",
    quality: "Export Quality",
    availability: "Global Supply",
  },

  {
    id: "3",
    number: "03",
    name: "Spices",
    category: "Spices",
    description:
      "A wide range of carefully sourced Indian spices selected for authentic flavour, aroma, colour and quality.",
    image: "/images/spices.jpg",
    origin: "India",
    packaging: "Available as per buyer requirement",
    quality: "Premium Quality",
    availability: "Global Supply",
  },

  {
    id: "4",
    number: "04",
    name: "Pulses & Lentils",
    category: "Pulses and Lentils",
    description:
      "Premium pulses and lentils sourced through reliable agricultural networks.",
    image: "/images/pulses.jpg",
    origin: "India",
    packaging: "Available as per buyer requirement",
    quality: "Export Quality",
    availability: "Global Supply",
  },

  {
    id: "5",
    number: "05",
    name: "Millets & Coarse Grains",
    category: "Millets & Coarse Grains",
    description:
      "Nutritious and sustainably sourced millets and coarse grains.",
    image: "/images/millets.jpg",
    origin: "India",
    packaging: "Available as per buyer requirement",
    quality: "Premium Quality",
    availability: "Global Supply",
  },

  {
    id: "6",
    number: "06",
    name: "Dehydrated & Processed Items",
    category: "Dehydrated & Processed Items",
    description:
      "Quality dehydrated and processed agricultural products prepared for international buyers.",
    image: "/images/dehydrated-items.jpg",
    origin: "India",
    packaging: "Available as per buyer requirement",
    quality: "Export Quality",
    availability: "Global Supply",
  },

  {
    id: "7",
    number: "07",
    name: "Oil Seeds",
    category: "Oil Seeds",
    description:
      "Carefully sourced oil seeds selected for quality and consistency.",
    image: "/images/oil-seeds.jpg",
    origin: "India",
    packaging: "Available as per buyer requirement",
    quality: "Premium Quality",
    availability: "Global Supply",
  },
];

/* Individual products inside each category */
export const productVariants: ProductVariant[] = [
  /* ================= BASMATI RICE ================= */

  {
    id: "basmati-1121",
    categoryId: "1",
    name: "1121 Basmati Rice",

    description:
      "1121 Basmati Rice is a premium rice variety celebrated for its extra-long grains, exceptional elongation, natural aroma and delicate texture. It is widely preferred for biryani, pulao and premium culinary applications.",

    image: "/images/1121 BASMATI RICE.png",

    keyFeatures: [
      "Extra-long grains with exceptional elongation",
      "Rich, natural basmati aroma",
      "Non-sticky, fluffy texture after cooking",
      "Aged for 12-24 months for enhanced fragrance",
      "Ideal for biryani, pilaf, and fine dining",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
      "Phytosanitary Certified",
    ],

    qualityStandards: ["Steam", "Golden", "Creamy Sella"],

    rating: 4.4,
    reviews: 315,
  },

  {
    id: "basmati-1401",
    categoryId: "1",
    name: "1401 Basmati Rice",
    description:
      "1401 Basmati Rice is prized for its authentic aroma, classic flavour, soft texture and excellent cooking characteristics, making it suitable for premium food applications.",

    image: "/images/1401.png",

    keyFeatures: [
      "Long slender grains",
      "Authentic basmati aroma",
      "Soft and delicate texture",
      "Excellent cooking performance",
      "Naturally aromatic",
      "Suitable for premium dishes",
    ],

    globalQualityStandards: [
      "Premium quality selection",
      "Strict quality inspection",
      "Hygienically processed",
      "Export-quality standards",
      "Consistent product quality",
      "International market suitability",
    ],
    qualityStandards: ["Steam", "Creamy Sella"],
    rating: 4.3,
    reviews: 418,
  },

  {
    id: "basmati-1509",
    categoryId: "1",
    name: "1509 Basmati Rice",
    description:
      "1509 Basmati Rice is a popular export variety known for its quick cooking time, mild aroma, and consistent quality. It is a cost-effective choice for bulk catering, food processing, and large-scale distribution worldwide. Despite its affordability, 1509 Basmati does not compromise on quality. Its medium-long grains elongate well upon cooking, making it a reliable choice for restaurants, hotels, and foodservice businesses looking for value-for-money rice.",

    image: "/images/1509 Basmati Rice.png",

    keyFeatures: [
      "Quick cooking time — ideal for catering",
      "Medium-long grains with good elongation",
      "Mild, pleasant aroma",
      "Consistent quality across large batches",
      "Cost-effective for bulk exports",
      "APEDA-compliant quality standards",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["Steam Golden Sella ", "Creamy Sella"],
    rating: 4.2,
    reviews: 310,
  },

  {
    id: "pusa-basmati",
    categoryId: "1",
    name: "Pusa Basmati Rice",
    description:
      "Pusa Basmati Rice is a modern, high-yield variety that combines the best of tradition and innovation. With slender grains and a pleasant aroma, it is one of the most widely cultivated and exported basmati varieties from India. Pusa Basmati is renowned for its versatility — equally suited for home cooking and commercial kitchens. Its consistent grain quality, reliable elongation, and balanced flavor make it a top choice for retailers and distributors worldwide.",
    image: "/images/Pusa Basmati Rice.png",

    keyFeatures: [
      "Slender, long grains with good elongation",
      "Pleasant aromatic profile",
      "High-yield and consistent crop quality",
      "Suitable for home and commercial use",
      "Widely exported globally",
      "Sustainably sourced from certified farms",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["Steam", "Golden Sella", "Creamy Sella"],
    rating: 4.2,
    reviews: 310,
  },

  /* ================= NON-BASMATI RICE ================= */

  {
    id: "nonbasmati-sona-masuri1",
    categoryId: "2",
    name: "Sona Masoori Rice",
    description:
      "Sona Masoori is a lightweight and aromatic medium-grain rice. It is unpolished and contains less starch than other varieties, making it highly digestible and a popular choice for health-conscious consumers. Known as the 'Pearls of South India,' it is perfect for sweet pongal, biryani, idlis, and everyday meals. Its pleasant aroma and distinct flavor make it a premium non-basmati option.",
    image: "/images/IR64.png",

    keyFeatures: [
      "Lightweight and highly digestible",
      "Low starch content",
      "Aromatic medium-grain rice",
      "Ideal for daily consumption and health diets",
      "Perfect for sweet and savory dishes",
      "100% natural and unpolished options available",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["Steam", "Raw"],
    rating: 4.6,
    reviews: 421,
  },

   {
  id: "IR64",
  categoryId: "2",
  name: "IR64 Rice",
  description:
    "A medium-grain rice variety known for its affordability, consistent quality, and high starch content.",
  image: "/images/IR64.png",
  keyFeatures: [
    "Excellent cooking characteristics",
    "Good grain integrity",
    "Firm cooked texture",
    "Suitable for bulk requirements",
    "Long-lasting quality",
    "Ideal for international markets",
  ],
  globalQualityStandards: [
    "Export-quality product",
    "Strict quality control",
    "Hygienic processing",
    "Carefully selected grains",
    "Consistent quality",
    "International buyer requirements",
  ],
  qualityStandards: ["Steam", "Raw"],
  rating: 4.6,
  reviews: 421,
},
  {
    id: "nonbasmati",
    categoryId: "2",
    name: "PR 11 Rice",
    description:
      "PR 11 Rice is a medium-grain, high-starch rice that offers affordability, consistent quality, and versatility. Primarily used in bulk catering, industrial food production, and processed foods, it is valued for its cost-effectiveness and high yield. It is commonly used in ready-to-eat meals, snacks, and South Indian cuisine, serving as an essential ingredient in African, Asian, and Latin American food markets.",
    image: "/images/pr-11.jpeg",

    keyFeatures: [
      "Medium-grain, high-starch rice",
      "Economical and budget-friendly",
      "Consistent quality and high yield",
      "Ideal for industrial food production and catering",
      "Popular in South Indian, African, and Latin American markets",
      "Versatile for ready-to-eat meals and snacks",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["Steam", "Golden", "Creamy Sella"],
    rating: 4.6,
    reviews: 421,
  },

  /* ================= SPICES ================= */

  {
    id: "spices-cumin1",
    categoryId: "3",
    name: "Chili (Whole and Powdered)",
    description:
      "Chili is a globally loved spice known for its fiery heat, deep red color, and bold flavor. Sourced from the best chili-growing regions, our chili variants range from mildly pungent to extremely hot, making them suitable for diverse cuisines. Chili powder is commonly used in Indian, Mexican, and Asian dishes, adding a spicy kick to curries, marinades, and sauces. Whole chilies are widely used in seasoning blends, pickles, and infused oils, enhancing both flavor and presentation.",
    image: "/images/Red Chilli.png",

    keyFeatures: [
      "Vivid red color and bold flavor",
      "Available in various heat levels (mild to extra hot)",
      "Sourced from premium chili-growing regions",
      "Essential for Indian, Mexican, and Asian cuisines",
      "Available in whole, crushed, and powdered forms",
      "Rich in vitamins and antioxidants",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.5,
    reviews: 582,
  },

  {
    id: "spices-cumin2",
    categoryId: "3",
    name: "Turmeric (Whole and Powdered)",
    description:
      "Turmeric is a bright yellow spice with a warm, earthy flavor and a distinctive aroma. It is prized globally not only for its culinary applications but also for its powerful health benefits, driven by its high curcumin content. Used extensively in curries, rice dishes, and health drinks like 'Golden Milk', turmeric acts as a natural food coloring and a potent anti-inflammatory agent. We offer premium turmeric in both whole root and finely milled powder forms.",
    image: "/images/turmeric.png",

    keyFeatures: [
      "High curcumin content for maximum health benefits",
      "Vibrant golden color and earthy aroma",
      "Natural anti-inflammatory and antioxidant properties",
      "Available in whole fingers and fine powder",
      "100% natural, no added colors or preservatives",
      "Widely used in culinary and medicinal applications",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "Spices Board of India Registered",
      "ISO 22000 Compliant",
      "Organic Certification Available",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.5,
    reviews: 462,
  },

  {
    id: "spices-cumin3",
    categoryId: "3",
    name: "Cumin Seeds",
    description:
      "Cumin seeds are an essential spice characterized by their distinct aromatic, earthy, and slightly bitter flavor. They are a foundational ingredient in spice blends like Garam Masala, Taco Seasoning, and Curry Powder. Our cumin seeds are carefully harvested and cleaned to ensure maximum purity and flavor retention. They are widely used in tempering (tadka) for dals, roasted for seasoning, or ground into powder for marinades and soups.",
    image: "/images/Cumin Seeds.png",

    keyFeatures: [
      "Intense earthy and warm flavor profile",
      "High essential oil content",
      "Available whole or ground",
      "Aids in digestion and gut health",
      "Machine-cleaned for 99% purity",
      "A staple in Latin American, Middle Eastern, and Indian cuisines",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "Spices Board of India Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.5,
    reviews: 582,
  },
  {
    id: "spices-cumin4",
    categoryId: "3",
    name: "Coriander Seeds",
    description:
      "Coriander seeds offer a warm, nutty, and slightly citrusy flavor, making them one of the most versatile spices in the culinary world. They are the dried fruit of the cilantro plant and are universally used in curries, pickling spices, and sausages. Our coriander seeds are selected for their bright color, bold size, and high volatile oil content, ensuring a fresh and aromatic addition to any dish.",
    image: "/images/Coriander Seeds.png",

    keyFeatures: [
      "Warm, mild, and citrusy flavor",
      "Rich in dietary fiber and antioxidants",
      "Available whole or finely ground",
      "Essential ingredient in curry powders",
      "Used extensively in pickling and baking",
      "Sourced directly from premium farms",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "Spices Board of India Registered",
      "ISO 22000 Compliant",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.5,
    reviews: 582,
  },
  {
    id: "spices-cumin5",
    categoryId: "3",
    name: "Black Pepper",
    description:
      'Black Pepper, often referred to as the "King of Spices," is the most widely traded spice in the world. Our Indian black pepper is celebrated for its sharp, pungent aroma and robust, biting flavor, owed to its high piperine content. It is an indispensable seasoning used in almost every culinary tradition, enhancing the flavor of meats, soups, salads, and even desserts. We offer various grades of black pepper, from bold whole peppercorns to freshly ground powder.',
    image: "/images/Black Pepper.png",

    keyFeatures: [
      "High piperine content for a sharp, bold bite",
      "Premium 'bold' size peppercorns available",
      "Rich aroma and strong flavor profile",
      "Natural digestive aid",
      "Available in whole, cracked, and powdered forms",
      "Sourced from the Malabar coast of India",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "Spices Board of India Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
      "Rainforest Alliance Certified (Select Lots)",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.5,
    reviews: 482,
  },
  {
    id: "spices-cumin",
    categoryId: "3",
    name: "Black Pepper",
    description:
      'Known as the "Queen of Spices," green cardamom is highly valued for its complex, sweet, and floral fragrance with hints of mint and lemon. It is one of the most expensive spices by weight but requires only a small amount to impart its intense flavor. Cardamom is incredibly versatile, featuring prominently in traditional Indian sweets, Scandinavian baking, Middle Eastern coffee, and savory curries. Our cardamom pods are hand-picked to ensure optimal ripeness and color retention.',
    image: "/images/Cardamom (Green).png",

    keyFeatures: [
      "Sweet, floral, and highly aromatic flavor",
      "Premium green pods with full seeds",
      "Essential for desserts, baking, and beverages",
      "Natural breath freshener and digestive",
      "Carefully hand-picked and graded by size",
      "Available as whole pods or ground powder",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "Spices Board of India Registered",
      "ISO 22000 Compliant",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.5,
    reviews: 421,
  },

  // Pulses & Lentils

  {
    id: "pulse",
    categoryId: "4",
    name: "Toor Dal (Pigeon Pea)",
    description:
      '"Toor Dal, also known as Pigeon Pea, is a nutrient-rich, protein-packed lentil that forms the backbone of South Asian, African, and Latin American cuisines. With its earthy, mildly sweet flavor and creamy texture, it is widely used in Indian dals, curries, and soups. It absorbs spices beautifully, making it a perfect base for richly flavored dishes. Toor Dal is a great source of plant-based protein, fiber, and essential vitamins, supporting digestive health, heart health, and muscle repair. Due to its easy digestibility, it is ideal for children and elderly individuals. It is also extensively used in processed food industries for manufacturing ready-to-eat meals, flour blends, and protein supplements."',
    image: "/images/Toor Dal.png",

    keyFeatures: [
      "Rich in plant-based protein and dietary fiber",
      "Earthy, mildly sweet flavor",
      "Cooks to a soft, creamy texture",
      "Easily digestible",
      "Essential for traditional Indian dishes like Sambar and Dal Tadka",
      "Available unpolished for maximum nutritional value",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.5,
    reviews: 432,
  },
  {
    id: "Black Pepper",
    categoryId: "4",
    name: "Masoor Dal (Red Lentils)",
    description:
      '"Masoor Dal, or Red Lentils, are quick-cooking, soft-textured lentils prized for their slightly sweet and nutty flavor profile. Unlike many other legumes, they do not require pre-soaking and break down easily when cooked, making them perfect for thick soups, stews, and purees. Packed with iron, protein, and folate, Masoor Dal is an excellent choice for a healthy, balanced diet. It is widely consumed across the Middle East, India, and the Mediterranean."',
    image: "/images/Masoor Dal.png",

    keyFeatures: [
      "Quick cooking, no pre-soaking required",
      "Sweet, nutty flavor profile",
      "Excellent source of iron and folate",
      "Breaks down easily for smooth soups and purees",
      "Low glycemic index",
      "Highly versatile in global cuisines",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.5,
    reviews: 421,
  },
  {
    id: "pulse",
    categoryId: "4",
    name: "Kabuli Chickpeas",
    description:
      "Kabuli Chickpeas are large, light-colored legumes known for their thin skin, creamy interior, and buttery, nutty flavor. They are a staple in Mediterranean, Middle Eastern, and Indian cuisines, famously used to make hummus, falafel, and Chana Masala. Our Kabuli Chickpeas are carefully sorted by size to ensure uniformity and quality. They are an excellent source of vegan protein, complex carbohydrates, and fiber, keeping you full and energized for longer.",
    image: "/images/Kabuli Chickpeas.png",

    keyFeatures: [
      "Large, uniform size with a smooth skin",
      "Creamy, buttery texture when cooked",
      "High in protein, fiber, and complex carbs",
      "Essential for hummus, falafel, and curries",
      "Retains shape well in salads and stews",
      "Machine sorted and cleaned for premium quality",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.5,
    reviews: 512,
  },
  {
    id: "pulse",
    categoryId: "4",
    name: "Moong Dal (Green Lentils)",
    description:
      "Moong Dal, derived from the green mung bean, is one of the most popular and nutritious lentils in Asian cuisines. Known for its light, slightly sweet flavor and ease of digestion, it is a go-to ingredient for everyday cooking across India and Southeast Asia. Our premium Moong Dal is available in whole, split, and hulled forms. The hulled variety (yellow moong dal) cooks quickly and has a mild, creamy texture — ideal for khichdi, soups, and baby food. Whole green moong is perfect for sprouting and salads. Rich in protein, folate, and antioxidants, Moong Dal is one of the most health-friendly pulses available.",
    image: "/images/moong dal.png",

    keyFeatures: [
      "Extremely light and easy to digest",
      "Rich in plant protein, folate, and antioxidants",
      "Available in whole, split, and hulled varieties",
      "Mild, slightly sweet flavor profile",
      "Cooks quickly without pre-soaking (hulled variety)",
      "Ideal for everyday meals, soups, and baby food",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.2,
    reviews: 378,
  },

  // millets

  {
    id: "millet",
    categoryId: "5",
    name: "Pearl Millet (Bajra)",
    description:
      "Bajra, or Pearl Millet, is an ancient supergrain, rich in iron, fiber, and antioxidants. This gluten-free grain is widely consumed in India, Africa, and the Middle East, forming the base for flatbreads, porridges, and traditional dishes. It has a slightly nutty, earthy flavor and offers numerous health benefits, including improved digestion, blood sugar control, and bone strength. Bajra is also used in baby food formulas, health supplements, and snack industries due to its high nutritional value.",
    image: "/images/Pearl Millet.png",

    keyFeatures: [
      "100% Gluten-free supergrain",
      "Exceptionally high in iron and dietary fiber",
      "Low glycemic index for better blood sugar control",
      "Nutty, earthy flavor profile",
      "Ideal for flatbreads (roti), porridges, and baking",
      "Drought-resistant and sustainably grown",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.2,
    reviews: 378,
  },
  {
    id: "millets",
    categoryId: "5",
    name: "Pearl Millet (Bajra)",
    description:
      "Sorghum, known locally as Jowar, is a highly nutritious, gluten-free cereal grain that has been a dietary staple in dryland regions for centuries. It is packed with protein, fiber, and complex carbohydrates, making it a fantastic wheat alternative for those with celiac disease or gluten sensitivity. Sorghum has a mild, sweet flavor and a versatile texture. It can be ground into flour for baking, popped like popcorn, or cooked whole like quinoa or rice.",
    image: "/images/Sorghum.png",

    keyFeatures: [
      "Gluten-free wheat alternative",
      "Rich in protein and antioxidants",
      "Mild, slightly sweet flavor",
      "Highly versatile — can be popped, boiled, or milled",
      "Supports heart health and digestion",
      "Sustainably cultivated with low water footprint",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.2,
    reviews: 378,
  },

  // Dehydrated & Processed Items

  {
    id: "millet",
    categoryId: "6",
    name: "Dehydrated Onions (Flakes, Powder, Granules)",
    description:
      "Dehydrated onions are a highly convenient and flavorful substitute for fresh onions, designed for the food processing and culinary industries. By removing the moisture content while retaining the essential oils and flavor compounds, these dehydrated products offer an extended shelf life without compromising on taste. Available in flakes (kibbled), minced, chopped, granulated, and powder forms, they rehydrate quickly and are perfect for ready-to-eat meals, spice blends, sauces, soups, and marinades. They eliminate the hassle of peeling, chopping, and weeping, saving valuable prep time in commercial kitchens.",
    image: "/images/Dehydrated Onion.png",

    keyFeatures: [
      "Retains the pungent flavor and aroma of fresh onions",
      "Extended shelf life up to 12-24 months",
      "Zero prep time required (no peeling or chopping)",
      "Available in flakes, granules, minced, and powder forms",
      "Rehydrates rapidly in liquids",
      "Space-saving and cost-effective for commercial use",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "HACCP Certified",
      "Kosher & Halal Certified (Select Facilities)",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.3,
    reviews: 512,
  },

  {
    id: "millets",
    categoryId: "6",
    name: "Dehydrated Garlic (Flakes, Powder, Granules)",
    description:
      "Dehydrated garlic delivers the robust, sharp flavor of fresh garlic in a shelf-stable, easy-to-use format. Produced from high-quality garlic cloves that are carefully dried to preserve their intense aroma and natural health benefits, this product is a staple in food manufacturing worldwide. Whether you need garlic flakes for hearty stews, granulated garlic for dry rubs and seasoning blends, or fine garlic powder for smooth sauces and dressings, our dehydrated garlic ensures consistent flavor profiles across your recipes without the mess of fresh garlic preparation.",
    image: "/images/Dehydrated Garlic.png",

    keyFeatures: [
      "Concentrated, intense garlic flavor and aroma",
      "Significantly longer shelf life than fresh garlic",
      "Consistent flavor profile year-round",
      "Available in flakes, granules, minced, and fine powder",
      "Reduces labor costs and prep time",
      "Maintains nutritional benefits like allicin",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.2,
    reviews: 378,
  },

  // Oil Seeds

  {
    id: "millets",
    categoryId: "7",
    name: "Sesame Seeds (White and Hulled)",
    description:
      "Sesame seeds are tiny, oil-rich seeds that have been cultivated for thousands of years. We supply premium natural white, hulled, and black sesame seeds that are prized for their delicate, nutty flavor and satisfying crunch. Hulled sesame seeds have their outer coat removed, resulting in a uniform white color and a softer, sweeter flavor, making them ideal for baking, confectionery (like tahini and halva), and garnishing. Natural and black sesame seeds retain their hulls, offering a slightly more robust flavor and higher calcium content.",
    image: "/images/Sesame Seeds.png",

    keyFeatures: [
      "High oil content (approx. 50%)",
      "Rich source of plant protein, calcium, and healthy fats",
      "Available in natural white, hulled, and black varieties",
      "Delicate, sweet, and nutty flavor profile",
      "Perfect for baking, tahini paste, and Asian cooking",
      "Machine cleaned and optically sorted for 99.9% purity",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.2,
    reviews: 378,
  },
  {
    id: "millet",
    categoryId: "7",
    name: "Sesame Seeds (White and Hulled)",
    description:
      "Sesame seeds are tiny, oil-rich seeds that have been cultivated for thousands of years. We supply premium natural white, hulled, and black sesame seeds that are prized for their delicate, nutty flavor and satisfying crunch. Hulled sesame seeds have their outer coat removed, resulting in a uniform white color and a softer, sweeter flavor, making them ideal for baking, confectionery (like tahini and halva), and garnishing. Natural and black sesame seeds retain their hulls, offering a slightly more robust flavor and higher calcium content.",
    image: "/images/Groundnuts.png",

    keyFeatures: [
      "High oil content (approx. 50%)",
      "Rich source of plant protein, calcium, and healthy fats",
      "Available in natural white, hulled, and black varieties",
      "Delicate, sweet, and nutty flavor profile",
      "Perfect for baking, tahini paste, and Asian cooking",
      "Machine cleaned and optically sorted for 99.9% purity",
    ],

    globalQualityStandards: [
      "FSSAI Certified",
      "APEDA Registered",
      "ISO 22000 Compliant",
      "Phytosanitary Certified",
    ],
    qualityStandards: ["premium quality"],
    rating: 4.3,
    reviews: 310,
  },
];

export default products;
