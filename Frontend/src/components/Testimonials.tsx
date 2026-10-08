import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  company: string;
  message: string;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    company: "Global Foods Pvt. Ltd.",
    message:
      "Nature Harvest has consistently delivered excellent quality products. Their professionalism and timely service make them a trusted partner for our business.",
  },
  {
    name: "Michael Anderson",
    company: "International Foods",
    message:
      "The quality of their agricultural products is outstanding. We appreciate their commitment to quality, transparency, and reliable international supply.",
  },
  {
    name: "Amit Sharma",
    company: "Fresh Trade Solutions",
    message:
      "Working with Nature Harvest has been a great experience. Their products meet high standards and their team is always responsive and supportive.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#f8f5ed] px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#f2a318]">
            Testimonials
          </span>

          <h2 className="mt-2 text-3xl font-bold text-[#075b5b] sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Our customers trust us for quality products, reliable service,
            and long-term business relationships.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              className="group relative overflow-hidden rounded-tl-[55px] rounded-br-[55px] bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Quote */}
              <div className="text-5xl font-serif leading-none text-[#f2a318]">
                “
              </div>

              {/* Message */}
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {testimonial.message}
              </p>

              {/* Rating */}
              <div className="mt-5 flex gap-1 text-[#f2a318]">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>

              {/* Client */}
              <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-5">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#075b5b] text-lg font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-[#075b5b]">
                    {testimonial.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#f2a318]/10 transition duration-500 group-hover:scale-150" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;