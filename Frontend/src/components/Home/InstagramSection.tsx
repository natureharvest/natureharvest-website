 import { motion } from "framer-motion";
import Button from "../Button";

const instagramImages = [
  "https://images.pexels.com/photos/11678442/pexels-photo-11678442.jpeg",
  "https://images.pexels.com/photos/1206593/pexels-photo-1206593.jpeg",
  "https://images.pexels.com/photos/5180291/pexels-photo-5180291.jpeg",
  "https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg",
];

const InstagramSection = () => {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5">
            <div className="text-4xl text-[#e1306c] sm:text-5xl">
              ◎
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#00595d] sm:text-4xl">
                Follow Us on Instagram
              </h2>

              <p className="mt-1 text-sm font-medium text-[#f2a318]">
                @natureharvest.in
              </p>
            </div>
          </div>

          <Button href="https://www.instagram.com/natureharvest.in/">
            Follow Us
          </Button>
        </div>

        {/* Instagram Images */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {instagramImages.map((image, index) => (
            <motion.a
              key={image}
              href="https://www.instagram.com/natureharvest.in/"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className={`group block h-[230px] overflow-hidden shadow-sm sm:h-[280px] ${
                index % 2 === 0
                  ? "rounded-tl-[35px] rounded-br-[35px]"
                  : "rounded-tr-[35px] rounded-bl-[35px]"
              }`}
            >
              <img
                src={image}
                alt={`Nature Harvest Instagram ${index + 1}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InstagramSection;