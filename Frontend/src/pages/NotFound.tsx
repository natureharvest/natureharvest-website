import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl text-center"
      >
        <p className="text-8xl font-bold leading-none text-[#f2a318] sm:text-9xl">
          404
        </p>

        <h1 className="mt-5 text-3xl font-bold text-[#075b5b] sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500">
          Sorry, the page you are looking for does not exist or may have been
          moved.
        </p>

        <Link
          to="/"
          className="
            mt-8
            inline-flex
            min-h-[48px]
            min-w-[160px]
            items-center
            justify-center
            rounded-tl-[6px]
            rounded-tr-[40px]
            rounded-br-[6px]
            rounded-bl-[40px]
            bg-[#f2a318]
            px-7
            py-3
            text-sm
            font-bold
            text-black
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#d98d0b]
          "
        >
          ← Back To Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;