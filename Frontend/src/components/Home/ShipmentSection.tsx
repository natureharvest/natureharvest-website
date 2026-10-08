import { motion } from "framer-motion";

import SectionTitle from "../SectionTitle";
import Button from "../Button";

const ShippingSection = () => {
  return (
    <section className="overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="
            overflow-hidden
            rounded-tr-[90px]
            rounded-bl-[90px]
            shadow-[0_20px_50px_rgba(0,0,0,0.10)]
          "
        >
          <img
            src="/shipment.png"
            alt="Shipment and Delivery"
            className="
              h-[330px]
              w-full
              object-cover
              transition-transform
              duration-700
              hover:scale-105
              sm:h-[420px]
              lg:h-[500px]
            "
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <SectionTitle
            label="Shipment & Delivery"
            title="Shipment And Delivery Information"
            align="left"
          />

          <p className="mt-7 max-w-xl text-[15px] leading-7 text-[#075657] sm:text-[17px]">
            At Nature Harvest, we are committed to delivering the highest
            standards of quality, reliability, and flexibility to meet your
            shipment and delivery needs. From customized packaging to quality
            certifications, we ensure every step of the process aligns with
            your requirements.
          </p>

          <div className="mt-8">
            <Button
              to="/shipment-delivery"
              className="
                min-w-[235px]
                border border-[#f2a318]
                bg-white
                !text-[#075657]
                shadow-none
                hover:!bg-[#f2a318]
                hover:!text-[#075657]
              "
            >
              Learn More About Shipping
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ShippingSection;