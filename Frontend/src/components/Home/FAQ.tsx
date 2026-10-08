 import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SectionTitle from "../SectionTitle";
import Button from "../Button";

const faqs = [
  {
    question: "What is Nature Harvest?",
    answer:
      "Nature Harvest is a premium agri-export brand specializing in quality rice, spices, cereals, pulses, and other agro products. We focus on sustainability, global compliance, and delivering exceptional value to our partners worldwide.",
  },
  {
    question: "Where is Nature Harvest based?",
    answer:
      "Nature Harvest is based in Gurugram, Haryana, India, with a global network for sourcing and exporting agricultural products.",
  },
  {
    question: "Are your products certified for global markets?",
    answer:
      "Yes. Our products follow applicable food safety, quality, and international export standards.",
  },
  {
    question: "Do you offer organic products?",
    answer:
      "Yes, organic product options are available depending on product category and customer requirements.",
  },
  {
    question: "Can you customize the packaging for our brand?",
    answer:
      "Yes. We offer customized packaging solutions according to product, quantity, market, and branding requirements.",
  },
];

const faqImages = [
  {
    image:
      "/faq2.jpg",
    alt: "Farmers working in rice field",
  },
  {
    image: "faq1.jpg",
    alt: "Agricultural farming",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <SectionTitle
            label="Frequently Asked Questions"
            title="Below Are Some Frequently Asked Question And Answers"
            description="Find quick answers to common questions about our services, products, and processes. We have compiled essential information to help you make informed decisions with ease and confidence."
            align="left"
          />

          {/* FAQ Accordion */}
          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = open === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-r-[25px] rounded-bl-[25px] bg-[#fff3d7]"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className={`
                      flex w-full items-center justify-between
                      px-5 py-4
                      text-left
                      transition-all duration-300
                      sm:px-6 sm:py-5
                      ${
                        isOpen
                          ? "bg-[#f2a318] text-[#075657]"
                          : "text-[#075657]"
                      }
                    `}
                  >
                    <span className="pr-4 text-sm font-semibold sm:text-[15px]">
                      Q: {faq.question}
                    </span>

                    <span className="shrink-0 text-xl font-medium">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-5 pb-5 pt-3 text-sm leading-6 text-[#075657] sm:px-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-9">
            <Button
              to="/contact"
              className="
                min-w-[190px]
                
                !text-white
                hover:!bg-[#f2a318]
                hover:!text-[#075657]
              "
            >
              View All FAQs
            </Button>
          </div>
        </motion.div>

        {/* Right Images */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 lg:space-y-10"
        >
          {faqImages.map((item, index) => (
            <motion.div
              key={item.image}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="
                group
                overflow-hidden
                rounded-tr-[90px]
                rounded-bl-[90px]
                shadow-[0_15px_35px_rgba(0,0,0,0.08)]
              "
            >
              <img
                src={item.image}
                alt={item.alt}
                className="
                  h-[280px]
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                  sm:h-[340px]
                "
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;