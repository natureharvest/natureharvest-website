import { motion } from "framer-motion";

import SectionTitle from "../SectionTitle";
import Button from "../Button";

type Product = {
  id: string;
  number: string;
  name: string;
  description: string;
  image: string;
  dark?: boolean;
  position: "left" | "right";
  gridClass: string; // desktop (lg) mein card kis column/row mein jayega
};

// Order important hai:
// Mobile pe yehi order dikhta hai -> 01, 02, (Farmer), 03, 04
const products: Product[] = [
  {
    id: "rice",
    number: "01.",
    name: "Rice",
    description:
      "Premium basmati rice with long grains, rich aroma, and perfect fluffiness. Ideal for luxurious dishes like biryani and pilafs.",
    image: "/rice.png",
    dark: true,
    position: "left",
    gridClass: "lg:col-start-1 lg:row-start-1",
  },
  {
    id: "pulses-lentils",
    number: "02.",
    name: "Pulses",
    description:
      "High-quality pulses and lentils, including lentils, chickpeas, and beans, perfect for nutritious and hearty meals.",
    image: "/moong-dal.png",
    position: "right",
    gridClass: "lg:col-start-3 lg:row-start-1",
  },
  {
    id: "spices",
    number: "03.",
    name: "Spices",
    description:
      "A wide range of aromatic spices, including cumin, turmeric, and cardamom, providing authentic flavor to your dishes.",
    image: "/cardamom-green.png",
    position: "left",
    gridClass: "lg:col-start-1 lg:row-start-2",
  },
  {
    id: "millets",
    number: "04.",
    name: "Millets",
    description:
      "Healthy and nutritious millets and coarse grains, perfect for weight management and wholesome meals.",
    image: "/millets.png",
    dark: true,
    position: "right",
    gridClass: "lg:col-start-3 lg:row-start-2",
  },
];

const FARMER_IMG =
  "https://res.cloudinary.com/drc0gwhz9/image/upload/v1788773396/Screenshot_2026-09-07_143517_qa4gq3.png";

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: (index % 2) * 0.1 },
  }),
};

type ProductCardProps = {
  product: Product;
  index: number;
};

const ProductCard = ({ product, index }: ProductCardProps) => {
  const isDark = product.dark;
  const isLeft = product.position === "left";

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`
        group relative mx-auto flex w-full max-w-[560px] items-center
        min-h-[240px] overflow-hidden
        sm:h-[275px] lg:h-[290px] lg:max-w-none
        ${product.gridClass}
        ${isLeft ? "flex-row" : "flex-row-reverse"}
        ${isDark ? "bg-[#075b5b] text-white" : "bg-[#f6ad00] text-black"}
        ${isLeft
          ? "rounded-bl-[50px] rounded-tr-[50px] sm:rounded-bl-[80px] sm:rounded-tr-[80px]"
          : "rounded-br-[50px] rounded-tl-[50px] sm:rounded-br-[80px] sm:rounded-tl-[80px]"
        }
      `}
    >
      {/* Text */}
      <div
        className={`
          flex min-w-0 flex-1 flex-col justify-center py-5
          ${isLeft ? "pl-6 pr-2 sm:pl-10 sm:pr-3" : "pl-2 pr-6 sm:pl-3 sm:pr-10"}
        `}
      >
        <span className="text-[20px] font-bold leading-none sm:text-[26px]">
          {product.number}
        </span>

        <h3 className="mt-2 text-[24px] font-normal leading-none sm:text-[34px]">
          {product.name}
        </h3>

        <p
          className={`
            mt-3 text-[12px] leading-[1.5]
            sm:mt-4 sm:max-w-[230px] sm:text-[14px] sm:leading-[1.55]
            ${isDark ? "text-white/90" : "text-black/85"}
          `}
        >
          {product.description}
        </p>
      </div>

      {/* Product Image */}

      <div
        className={`
    relative h-[150px] w-[105px] shrink-0 overflow-hidden
    sm:h-[190px] sm:w-[145px]
    ${isLeft ? "mr-3 sm:mr-6" : "ml-3 sm:ml-6"}
  `}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 sm:object-cover"
        />

        <img
          src="https://res.cloudinary.com/drc0gwhz9/image/upload/a_90/v1791539681/Group_13_izj3l9.png"
          alt=""
          className="absolute right-0 top-0 h-20 w-20 object-contain"
        />
      </div>

    </motion.div>
  );
};

const ProductsSection = () => {
  return (
    <section
      id="products"
      className="overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1300px]">
        {/* Heading */}
        <SectionTitle label="Products" title="Our Products" align="left" />

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-7 max-w-[1100px] space-y-4"
        >
          <p className="flex gap-3 text-[13px] leading-7 text-[#075657] sm:text-[14px]">
            <span className="mt-1 shrink-0 text-lg text-[#f2a318]">❯</span>
            <span>
              At Nature Harvest, we deliver premium agricultural
              products—including rice, spices, pulses, millets, oil seeds,
              and other agro products—sustainably sourced and rigorously
              tested to meet global quality standards.
            </span>
          </p>

          <p className="flex gap-3 text-[13px] leading-7 text-[#075657] sm:text-[14px]">
            <span className="mt-1 shrink-0 text-lg text-[#f2a318]">❯</span>
            <span>
              With a focus on transparency, ethical sourcing, and
              customer-first solutions, we ensure seamless processes,
              tailored offerings, and unmatched reliability. Choose Nature
              Harvest for products that embody purity, consistency, and a
              steadfast commitment to excellence.
            </span>
          </p>
        </motion.div>

        {/*
          Products
          Mobile : 01, 02  ->  Farmer  ->  03, 04  (ek column)
          Desktop: left column (01, 03) | Farmer | right column (02, 04)
        */}
        <div className="relative mt-14 grid items-center gap-8 lg:grid-cols-[1fr_230px_1fr] lg:gap-x-10 lg:gap-y-9">
          {/* Upar ke 2 cards */}
          {products.slice(0, 2).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}

          {/* Farmer (beech mein) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 35 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[620px]"
          >
            <img
              src={FARMER_IMG}
              alt="Farmer"
              className="h-72 w-auto object-contain sm:h-80 lg:h-full lg:w-full"
            />
          </motion.div>

          {/* Niche ke 2 cards */}
          {products.slice(2).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index + 2}
            />
          ))}
        </div>

        {/* Button */}
        <div className="mt-14 flex justify-center">
          <Button
            to="/products"
            className="
              min-w-[260px]
              border
              border-[#f2a318]
              bg-white
              !text-[#075657]
              shadow-none
              hover:!bg-[#f2a318]
              hover:!text-[#075657]
            "
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;