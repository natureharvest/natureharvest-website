import { motion } from "framer-motion";

type SectionTitleProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

const SectionTitle = ({
  label,
  title,
  description,
  align = "center",
  light = false,
}: SectionTitleProps) => {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${
        centered ? "mx-auto text-center" : "text-left"
      }`}
    >
      {label && (
        <span
          className="
            inline-flex
            h-[42px]
            items-center
            rounded-tr-full
            rounded-bl-full
            bg-[#fbe4b8]
            px-8
            text-[15px]
            font-medium
            uppercase
            tracking-[0.04em]
            text-[#173f40]
          "
        >
          {label}
        </span>
      )}

      <h2
        className={`mt-5 text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-[#075b5b]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base leading-7 ${
            light ? "text-white/80" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;