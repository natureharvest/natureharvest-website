import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useAppContext } from "../context/AppContext";

type BlogCardProps = {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category?: string;
};

const BlogCard = ({
  slug,
  title,
  description,
  image,
  date,
  category = "Agriculture",
}: BlogCardProps) => {
  const { openBlogDetail } = useAppContext();

  const [day, month] = date.split(" ");

  const handleBlogClick = () => {
    openBlogDetail(slug);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group overflow-hidden rounded-tl-[55px] rounded-br-[55px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    >
      {/* Image */}
      <Link
        to={`/blogs/${slug}`}
        onClick={handleBlogClick}
        className="relative block h-[250px] overflow-hidden sm:h-[270px]"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[#075b5b]/10 transition duration-500 group-hover:bg-[#075b5b]/20" />

        {/* Date */}
        <div className="absolute bottom-0 left-0 flex h-[66px] w-[66px] flex-col items-center justify-center rounded-tr-[25px] bg-[#00595d] text-white shadow-lg">
          <span className="text-xl font-bold leading-none">
            {day}
          </span>

          <span className="mt-1 text-[10px] font-medium uppercase">
            {month}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 sm:p-7">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#f2a318]">
          {category}
        </span>

        <Link
          to={`/blogs/${slug}`}
          onClick={handleBlogClick}
        >
          <h3 className="mt-2 text-xl font-bold leading-snug text-[#00595d] transition-colors duration-300 group-hover:text-[#f2a318]">
            {title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>

        <Link
          to={`/blogs/${slug}`}
          onClick={handleBlogClick}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#00595d] transition-all duration-300 group-hover:gap-3"
        >
          Read More
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;