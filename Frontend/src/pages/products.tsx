import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import Breadcrumb from "../components/Breadcrub";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import { BACKEND_URL, FALLBACK_IMG, getImageSrc } from "../utils/api";

const productCategories = [
  {
    id: "1",
    title: "Basmati Rice",
    description:
      "Premium Basmati Rice With Long Grains, Rich Aroma, And Fluffy Texture, Ideal For Luxurious Dishes Like Biryani And Pilaf.",
    image:
      "/images/basmati-rice.png",
  },
  {
    id: "2",
    title: "Non-Basmati Rice",
    description:
      "A Variety Of Non-Basmati Rice With Great Texture, Ideal For Everyday Meals And Versatile Cooking Needs.",
    image:
      "/images/non-basmati-rice.png",
  },
  {
    id: "3",
    title: "Spices",
    description:
      "A Wide Range Of Aromatic Spices, Including Cumin, Turmeric, And Cardamom, Providing Authentic Flavor To Your Dishes.",
    image:
      "/images/spices.png",
  },
  {
    id: "4",
    title: "Pulses and Lentils",
    description:
      "High-Quality Pulses And Lentils, Including Lentils, Chickpeas, And Beans, Perfect For Nutritious And Hearty Meals.",
    image:
      "/images/pulsess-and-lentils.png",
  },
  {
    id: "5",
    title: "Millets & Coarse Grains",
    description:
      "Healthy And Nutritious Millets And Coarse Grains, Perfect For Weight Management And Wholesome Meals.",
    image:
      "/images/millets&Coarse-grains.png",
  },
  {
    id: "6",
    title: "Dehydrated & Processed Items",
    description:
      "Convenient Dehydrated And Processed Foods Like Dried Fruits And Vegetables, Ideal For Snacks And Garnishes.",
    image:
      "/images/dehydrated1.png",
  },
  {
    id: "7",
    title: "Oil Seeds",
    description:
      "Premium Oil Seeds, Including Sunflower, Mustard, And Sesame, Perfect For Extracting Pure, Natural Oils.",
    image:
      "/images/oilseds.png",
  },
];

const globalStandards = [
  {
    id: 1,
    title: "Codex Alimentarius (Codex Standards)",
    content:
      "Ensuring international food safety and quality guidelines are met.",
  },
  {
    id: 2,
    title: "ISO 22000 (Food Safety Management System) - Supplier Compliance",
    content: "Comprehensive framework for food safety management.",
  },
  {
    id: 3,
    title:
      "HACCP (Hazard Analysis and Critical Control Points) - Supplier Compliance",
    content:
      "Preventive approach to food safety from biological, chemical, and physical hazards.",
  },
  {
    id: 4,
    title: "Phytosanitary Standards (ISPMs by IPPC)",
    content: "Preventing the introduction and spread of plant pests.",
  },
  {
    id: 5,
    title:
      "Organic Certifications (USDA Organic, EU Organic, India Organic) - For Organic Products",
    content: "Certified organic sourcing for global markets.",
  },
];

const indiaStandards = [
  {
    id: 6,
    title:
      "APEDA Registration (Agricultural and Processed Food Products Export Development Authority)",
    content: "Registered and certified for Indian agricultural exports.",
  },
  {
    id: 7,
    title: "FSSAI Compliance (Food Safety and Standards Authority of India)",
    content: "Meeting India's stringent food safety regulations.",
  },
  {
    id: 8,
    title:
      "Phytosanitary Certification from the Directorate of Plant Protection, Quarantine & Storage (DPPQS)",
    content: "Mandatory export quality checks cleared.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

interface ProductItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Products = () => {
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
  const [productList, setProductList] = useState<ProductItem[]>(productCategories);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${BACKEND_URL}/api/products/list`)
      .then(({ data }) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          const mapped: ProductItem[] = data.products.map(
            (product: {
              _id?: string;
              id?: string;
              number?: string;
              name?: string;
              category?: string;
              description?: string;
              image?: string;
              images?: string[];
            }, index: number) => {
              const rawImg =
                product.image ||
                (Array.isArray(product.images) && product.images[0]) ||
                "";
              return {
                id: product._id || product.id || String(product.number || index + 1),
                title: product.name || product.category || "Product",
                description: product.description || "",
                image: getImageSrc(rawImg),
              };
            }
          );
          setProductList(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to load products from backend:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleAccordion = (id: number) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <Breadcrumb title="Products" />

      {/* =========================================
          SECTION 1: OUR PRODUCT CATEGORIES
      ========================================= */}
      <section className="mx-auto w-full max-w-7xl px-5 pt-16 sm:px-8 lg:px-10 lg:pt-24">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
                          <SectionTitle
                label="Products"
                title=" "
                align="left"
              />

            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#075657] sm:text-5xl">
              Our Product
              <br className="hidden sm:block" />
              Categories
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
              We offer a wide range of premium agricultural products, including
              various rice varieties, pulses, spices, millets, and more. Our
              products are sourced sustainably, ensuring the highest quality for
              our customers worldwide.
            </p>
          </motion.div>
        </div>

        {/* Product Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {productList.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              className="group flex flex-col items-center overflow-hidden rounded-tl-[55px] rounded-br-[55px] border-2 border-[#f2a318] bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] sm:p-6"
            >
              {/* Image */}
              <div className="relative mb-6 h-56 w-full overflow-hidden rounded-tr-[50px] rounded-bl-[50px] rounded-br-none rounded-tl-none sm:h-64">
                <img
                  src={product.image}
                  alt={product.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Green Overlay */}
                <div className="absolute inset-0 bg-[#075b5b]/10 transition duration-500 group-hover:bg-[#075b5b]/20" />

                {/* Decorative Icon */}
                {/* <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" />
                  </svg>
                </div> */}
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-[#075657]">
                {product.title}
              </h3>

              <p className="mb-8 line-clamp-3 text-center text-sm leading-relaxed text-gray-500">
                {product.description}
              </p>

              {/* Reusable Button */}
              <Button
                to={`/products/${product.id}`}
                className="mt-auto px-8 py-3 text-sm !text-[#075657]"
              >
                Know More 
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </section> 

      {/* =========================================
          SECTION 2: GLOBAL QUALITY STANDARDS
      ========================================= */}
      <section className="mx-auto mt-20 w-full max-w-7xl px-5 sm:px-8 lg:mt-32 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="inline-block rounded-full bg-[#f5e8cd] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#075657]">
                What We Follow
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-snug text-[#075657] sm:text-4xl">
                Global Quality Standards Compliance – Nature Harvest
              </h2>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-5">
              <div className="h-48 w-full overflow-hidden rounded-tr-[70px] rounded-bl-[70px] bg-gray-100 shadow-md sm:h-56">
                <img
                  src="/images/global1.webp"
                  alt="Quality Control Expert"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="h-48 w-full overflow-hidden rounded-tl-[70px] rounded-br-[70px] bg-gray-100 shadow-md sm:h-56">
                <img
                  src="/images/scientific.jpeg"
                  alt="Field Inspection"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="mb-10 text-base leading-relaxed text-gray-600 sm:text-lg">
              Nature Harvest is a trusted export house specializing in premium
              agro-commodity exports from India. As a sourcing and trade
              partner, we ensure that all our products meet global food safety,
              quality, and regulatory requirements, guaranteeing seamless market
              access for our international buyers.
            </p>

            {/* Global Standards */}
            <h3 className="mb-6 text-xl font-bold text-[#075657] sm:text-2xl">
              Compliance Standards for Agro-Commodity Exports
            </h3>

            <div className="mb-10 flex flex-col">
              {globalStandards.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openAccordionId === item.id}
                  onClick={() => toggleAccordion(item.id)}
                />
              ))}
            </div>

            {/* India Standards */}
            <h3 className="mb-6 text-xl font-bold text-[#075657] sm:text-2xl">
              India-Specific Export Compliance
            </h3>

            <div className="flex flex-col">
              {indiaStandards.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openAccordionId === item.id}
                  onClick={() => toggleAccordion(item.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

type AccordionItemProps = {
  item: {
    id: number;
    title: string;
    content: string;
  };
  isOpen: boolean;
  onClick: () => void;
};

const AccordionItem = ({ item, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between text-left transition-colors hover:text-[#075657]"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f2a318] text-sm font-bold text-white shadow-sm">
            {item.id}
          </span>

          <span
            className={`text-sm sm:text-base ${
              isOpen ? "font-bold text-[#075657]" : "font-medium text-gray-700"
            }`}
          >
            {item.title}
          </span>
        </div>

        <span className="ml-4 shrink-0 text-2xl font-light text-[#f2a318]">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden"
          >
            <p className="ml-12 mt-3 text-sm leading-relaxed text-gray-500">
              {item.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
