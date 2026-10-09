 import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Button from "../components/Button";

type ProductCardProps = {
  id: string;
  number?: string;
  name: string;
  description: string;
  image: string;
  dark?: boolean;
  position?: "left" | "right";
  linkTo?: string;
};

const ProductCard = ({
  id,
  name,
  description,
  image,
  linkTo,
}: ProductCardProps) => {
  const { openProductDetail } = useAppContext();

  const productUrl = linkTo || `/products/${id}`;

  const handleClick = () => {
    if (!linkTo) {
      openProductDetail(id);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
        group
        flex
        w-full
        flex-col
        overflow-hidden
        rounded-tl-[22px]
        rounded-br-[22px]
        rounded-tr-none
        rounded-bl-none
        border-2
        border-[#f2a318]
        bg-white
        p-[18px]
        shadow-[0_3px_12px_rgba(0,0,0,0.04)]
        transition-all
        duration-300
        hover:shadow-[0_8px_22px_rgba(0,0,0,0.10)]
      "
    >
      {/* Product Image */}
      <Link
        to={productUrl}
        onClick={handleClick}
        aria-label={`View ${name}`}
        className="block"
      >
        <div className="overflow-hidden rounded-tr-[45px] rounded-bl-[45px] bg-gray-100 relative h-[230px] w-full">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />

          <img
            src="https://res.cloudinary.com/drc0gwhz9/image/upload/v1791539681/Group_13_izj3l9.png"
            alt=""
            aria-hidden="true"
            className="absolute left-1 top-1 h-20 w-20 object-contain"
          />
        </div>
      </Link>

      {/* Product Content */}
      <div
        className="
          flex
          flex-1
          flex-col
          items-center
          px-2
          pt-5
          text-center
        "
      >
        {/* Product Name */}
        <Link
          to={productUrl}
          onClick={handleClick}
          className="block"
        >
          <h3
            className="
              min-h-[30px]
              text-[18px]
              font-bold
              leading-6
              text-[#075b5b]
              transition-colors
              duration-300
              group-hover:text-[#f2a318]
            "
          >
            {name}
          </h3>
        </Link>

        {/* Product Description */}
        <p
          className="
            mt-3
            min-h-[72px]
            max-w-[330px]
            line-clamp-3
            text-[14px]
            leading-6
            text-[#5f6878]
          "
        >
          {description}
        </p>

        {/* Know More Button */}
        <div className="mt-5 flex justify-center">
          <Button
            to={productUrl}
            onClick={handleClick}
            className="
              min-h-[50px]
              min-w-[165px]
              rounded-tl-none
              rounded-tr-[35px]
              rounded-br-none
              rounded-bl-[35px]
              bg-[#f2a318]
              px-7
              py-3
              text-[15px]
              font-bold
              text-black
              shadow-none
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#d98d0b]
              hover:shadow-[0_5px_12px_rgba(242,163,24,0.25)]
            "
          >
            Know More
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;