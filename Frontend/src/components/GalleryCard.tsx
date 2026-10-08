import { motion } from "framer-motion";

type GalleryCardProps = {
  image: string;
  title: string;
  category?: string;
  onClick?: () => void;
};

const GalleryCard = ({
  image,
  title,
  category = "Nature Harvest",
  onClick,
}: GalleryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative h-[280px] cursor-pointer overflow-hidden rounded-tl-[55px] rounded-br-[55px] bg-[#075b5b] shadow-md sm:h-[330px]"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#075b5b]/90 via-[#075b5b]/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 translate-y-5 p-6 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#f2a318]">
          {category}
        </span>

        <h3 className="mt-1 text-xl font-bold">
          {title}
        </h3>
      </div>

      {/* Plus Icon */}
      <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f2a318] text-2xl font-light text-white opacity-0 transition duration-500 group-hover:opacity-100">
        +
      </div>
    </motion.div>
  );
};

export default GalleryCard;