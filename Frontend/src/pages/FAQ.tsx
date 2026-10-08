import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SectionTitle from "../components/SectionTitle";
import Breadcrumb from "../components/Breadcrub";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What is Nature Harvest?",
    answer:
      "Nature Harvest is a premium agri-export brand specializing in high-quality rice, spices, cereals, pulses, millets, and other agro products. We focus on sustainability, global compliance, and delivering exceptional value to our partners worldwide.",
  },
  {
    question: "Where is Nature Harvest based?",
    answer:
      "Nature Harvest is based in Gurugram, Haryana, India, with a focus on serving global agricultural markets.",
  },
  {
    question: "Are your products certified for global markets?",
    answer:
      "Yes. Our products are sourced and processed with a strong focus on quality, compliance, and international market requirements.",
  },
  {
    question: "Do you offer organic products?",
    answer:
      "We can provide organic and specially sourced products based on availability and buyer requirements.",
  },
  {
    question: "Can you customize the packaging for our brand?",
    answer:
      "Yes. Packaging can be customized according to buyer requirements, including private-label and branding requirements.",
  },
  {
    question: "Do you offer sample shipments?",
    answer:
      "Yes. Sample shipments can be arranged depending on the product, quantity, destination, and buyer requirements.",
  },
  {
    question: "What makes Nature Harvest different from other agri-export companies?",
    answer:
      "Nature Harvest focuses on quality, sustainability, transparency, global standards, and long-term relationships with its partners.",
  },
  {
    question: "To which countries do you export?",
    answer:
      "We serve international buyers and markets across different regions. Export destinations depend on product availability and current buyer requirements.",
  },
  {
    question: "What are your shipping terms?",
    answer:
      "Shipping terms are discussed according to the product, destination, order quantity, and buyer requirements.",
  },
  {
    question: "What is the usual delivery timeframe?",
    answer:
      "Delivery time depends on the product, order quantity, destination, documentation, and shipping schedule.",
  },
  {
    question: "Can you handle bulk and small orders?",
    answer:
      "Yes. We work with different order sizes depending on the product and buyer requirements.",
  },
  {
    question: "How is pricing determined?",
    answer:
      "Pricing depends on the product, quality, quantity, packaging, destination, market conditions, and shipping requirements.",
  },
  {
    question: "How do you ensure sustainable sourcing?",
    answer:
      "We focus on responsible sourcing practices, reliable agricultural networks, quality control, and long-term sustainable partnerships.",
  },
  {
    question: "How do you handle delays or unforeseen circumstances?",
    answer:
      "We maintain communication with our partners and coordinate closely to manage documentation, logistics, shipping schedules, and unforeseen circumstances.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const leftColumn = faqItems.slice(0, 7);
  const rightColumn = faqItems.slice(7);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  const renderFAQ = (
    item: FAQItem,
    index: number,
    offset: number
  ) => {
    const actualIndex = index + offset;
    const isOpen = openIndex === actualIndex;

    return (
      <motion.div
        key={item.question}
        layout
        className={`overflow-hidden rounded-[6px] bg-white shadow-[0_5px_20px_rgba(0,0,0,0.06)] ${
          isOpen ? "border-r-[3px] border-[#f2a318]" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFAQ(actualIndex)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          aria-expanded={isOpen}
        >
          <span className="text-[12px] font-semibold leading-5 text-[#075b5b]">
            {item.question}
          </span>

          <span
            className={`flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-[#f2a318] text-[13px] font-bold text-white transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <div className="px-5 pb-5">
                <p className="text-[10px] leading-[1.7] text-gray-600">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        title="Frequently Asked Questions"
        backgroundImage="/images/breadcrumb.jpg"
      />

      {/* FAQ Section */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[820px]">
          <SectionTitle
            label="FAQ"
            title="Frequently Asked Questions"
            description="Find answers to some of the most common questions about Nature Harvest, our products and global agri-export services."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            <div className="space-y-4">
              {leftColumn.map((item, index) =>
                renderFAQ(item, index, 0)
              )}
            </div>

            <div className="space-y-4">
              {rightColumn.map((item, index) =>
                renderFAQ(item, index, 7)
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;