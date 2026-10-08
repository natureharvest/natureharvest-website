import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";

const certifications = [
  {
    name: "Halal",
    image: "https://natureharvest.co.in/home/icons/kosher-stamp.png",
  },
  {
    name: "ISO",
    image: "https://natureharvest.co.in/home/icons/ISO.png",
  },
  {
    name: "FDA",
    image:
      "https://natureharvest.co.in/home/icons/fda-the-food-and-drug-administration-logo-png_seeklogo-268773.png",
  },
  {
    name: "Kosher",
    image: "https://natureharvest.co.in/home/icons/kosher-stamp.png",
  },
  {
    name: "HACCP",
    image: "https://natureharvest.co.in/home/icons/logo-haccp-sm2.png",
  },
  {
    name: "APEDA",
    image: "https://natureharvest.co.in/home/icons/Apeda.png",
  },
  {
    name: "FSSAI",
    image: "https://natureharvest.co.in/home/icons/Fssai-Logo-Vector.png",
  },
  {
    name: "Halal",
    image: "https://natureharvest.co.in/home/icons/Halal_logo.svg.png",
  },
];

const features = [
  "Custom Import Solutions",
  "Rice Export",
  "Spices Supplier",
  "Cereals Export",
  "Pulses Trading",
  "Millets Distribution",
  "Agricultural Products",
];

const OurStory = () => {
  return (
    <section className="overflow-hidden bg-white">
      {/* Certification Slider */}
      <div className="overflow-hidden border-b border-gray-100 py-7 sm:py-9">
        <div className="certification-marquee flex w-max items-center">
          {[...certifications, ...certifications].map((certificate, index) => (
            <div
              key={`${certificate.name}-${index}`}
              className="flex h-20 w-[145px] shrink-0 items-center justify-center px-5 sm:w-[160px]"
            >
              <img
                src={certificate.image}
                alt={certificate.name}
                className="max-h-[70px] max-w-[105px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="
                relative
                h-[390px]
                overflow-hidden
                rounded-tr-[75px]
                rounded-bl-[75px]
                rounded-br-none
                shadow-[0_20px_55px_rgba(0,0,0,0.12)]
                sm:h-[480px]
                lg:h-[540px]
              "
            >
              <img
                src="/images/image2.png"
                alt="Nature Harvest agriculture"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#00534f]/60 via-transparent to-transparent" />

              {/* Social Stats */}
              <div
                className="
                  absolute bottom-0 left-[12%]
                  flex w-[76%]
                  items-center
                  rounded-tr-[55px]
                  bg-[#00534f]
                  px-3 py-4
                  text-white
                  sm:left-[22%] sm:w-[58%] sm:px-5 sm:py-5
                  lg:left-[25%] lg:w-[55%]
                "
              >
                <div className="flex flex-1 flex-col items-center">
                  <span className="text-3xl font-bold sm:text-4xl">2K</span>

                  <span className="mt-1 text-[10px] uppercase tracking-wider text-white/80 sm:text-xs">
                    Followers
                  </span>
                </div>

                <div className="h-10 w-px bg-white/25 sm:h-12" />

                <div className="flex flex-1 flex-col items-center">
                  <span className="text-3xl font-bold sm:text-4xl">23K</span>

                  <span className="mt-1 text-[10px] uppercase tracking-wider text-white/80 sm:text-xs">
                    Likes
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <SectionTitle
              label="Our Story"
              title="Welcome To Nature Harvest"
              align="left"
            />

            <div className="mt-7 space-y-4">
              <p className="text-[16px] leading-8 text-[#074f54] sm:text-[17px]">
                Nature Harvest is a premier agri-export brand delivering
                sustainably sourced, high-quality rice, spices, cereals, pulses,
                millets, and other agricultural products to buyers worldwide.
              </p>

              <p className="text-[16px] leading-8 text-[#074f54] sm:text-[17px]">
                With a trusted network of producers, we maintain rigorous
                quality standards and global compliance while creating reliable
                and customized solutions for our customers.
              </p>
            </div>

            <div className="mt-8">
              <Button to="/about/our-story">About Us</Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Slider */}
      <div className="overflow-hidden border-y border-[#0a6b68] bg-[#075b5b] py-4 sm:py-5">
        <div className="feature-marquee flex w-max items-center">
          {[...features, ...features].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-5 px-6 text-base font-semibold text-white sm:gap-7 sm:px-8 sm:text-lg"
            >
              <span className="text-xl text-[#f2a318] sm:text-2xl">🌾</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes certificationMarquee {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .certification-marquee {
          animation: certificationMarquee 22s linear infinite;
        }

        @keyframes featureMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .feature-marquee {
          animation: featureMarquee 25s linear infinite;
        }

        .feature-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default OurStory;
