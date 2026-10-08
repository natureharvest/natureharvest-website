// import React from "react";
// import { motion } from "framer-motion";
// import { BarChart3, TrendingUp, Globe, PieChart, ArrowRight } from "lucide-react";
// import Breadcrumb from "../components/Breadcrub";
// import SectionTitle from "../components/SectionTitle";

// // --- MOCK DATA FOR MAPPING ---
// const biStats = [
//   { value: "45+", label: "Global Markets" },
//   { value: "120K", label: "Tons Exported" },
//   { value: "98%", label: "Quality Compliance" },
// ];

// const biFeatures = [
//   {
//     title: "Market Analytics",
//     description: "Deep dive into global agricultural trends, pricing forecasts, and demand cycles to ensure optimal export timing.",
//     icon: <BarChart3 className="h-6 w-6" />,
//   },
//   {
//     title: "Supply Chain Tracking",
//     description: "End-to-end visibility of our procurement and distribution networks, ensuring transparency from farm to port.",
//     icon: <Globe className="h-6 w-6" />,
//   },
//   {
//     title: "Performance Metrics",
//     description: "Quarterly reviews of yield quality, sustainability targets, and overall operational efficiency.",
//     icon: <PieChart className="h-6 w-6" />,
//   },
//   {
//     title: "Growth Forecasting",
//     description: "Predictive models helping partners scale their inventory and manage long-term strategic planning.",
//     icon: <TrendingUp className="h-6 w-6" />,
//   },
// ];

// // --- ANIMATION VARIANTS ---
// const fadeUpContainer = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15 },
//   },
// };

// const fadeUpItem = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// const BI = () => {
//   return (
//     <div className="min-h-screen bg-[#f8f9fa] pb-16 lg:pb-24">
//       {/* Breadcrumb Navigation */}
//       <Breadcrumb
//         title="Business Intelligence"
//         items={[
//           { label: "Home", path: "/" },
//           { label: "BI & Reports" },
//         ]}
//       />

//       {/* Hero Overview Section */}
//       <section className="px-5 pt-12 sm:px-8 lg:px-10 lg:pt-16">
//         <div className="mx-auto max-w-7xl">
//           <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
//             <motion.div
//               initial={{ opacity: 0, x: -40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//             >
//               <SectionTitle
//                 label="DATA & INSIGHTS"
//                 title="Driving Decisions with Intelligence"
//                 align="left"
//               />
//               <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
//                 At Nature Harvest, we leverage real-time data and market intelligence 
//                 to optimize our agricultural exports. By analyzing global trends and 
//                 supply chain metrics, we provide our partners with the reliability 
//                 and foresight needed in today's dynamic market.
//               </p>

//               {/* Quick Stats */}
//               <div className="mt-10 flex flex-wrap gap-6 sm:gap-10">
//                 {biStats.map((stat, idx) => (
//                   <div key={idx} className="flex flex-col">
//                     <span className="text-3xl font-extrabold text-[#00595d] sm:text-4xl">
//                       {stat.value}
//                     </span>
//                     <span className="mt-1 text-sm font-medium text-[#f2a318] uppercase tracking-wide">
//                       {stat.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Featured Image */}
//             <motion.div
//               initial={{ opacity: 0, x: 40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//               className="group relative h-[350px] w-full sm:h-[450px]"
//             >
//               <div className="absolute inset-0 overflow-hidden rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl shadow-xl border-4 border-white">
//                 <img
//                   src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
//                   alt="Business Intelligence Dashboard"
//                   className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-[#075657]/10" />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Data Cards Section */}
//       <section className="px-5 pt-20 sm:px-8 lg:px-10 lg:pt-28">
//         <div className="mx-auto max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center md:text-left"
//           >
//             <h2 className="text-2xl font-bold text-[#075657] sm:text-3xl">
//               Core Analytics Areas
//             </h2>
//           </motion.div>

//           <motion.div
//             variants={fadeUpContainer}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: "-50px" }}
//             className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
//           >
//             {biFeatures.map((feature, idx) => (
//               <BICard key={idx} {...feature} />
//             ))}
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// // --- MODULAR UI COMPONENTS ---
// type BICardProps = {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
// };

// const BICard = ({ title, description, icon }: BICardProps) => {
//   return (
//     <motion.div
//       variants={fadeUpItem}
//       className="group relative flex flex-col justify-between overflow-hidden rounded-2xl rounded-tr-[50px] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(7,86,87,0.08)] sm:p-8"
//     >
//       <div>
//         <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#edf3f3] text-[#075657] transition-colors duration-300 group-hover:bg-[#f2a318] group-hover:text-white">
//           {icon}
//         </div>
//         <h3 className="mb-3 text-lg font-bold text-[#00595d]">{title}</h3>
//         <p className="text-sm leading-relaxed text-gray-600">{description}</p>
//       </div>

//       <div className="mt-8 flex items-center text-sm font-semibold text-[#f2a318] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//         View Report <ArrowRight className="ml-2 h-4 w-4" />
//       </div>
//     </motion.div>
//   );
// };

// export default BI;





import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Globe,
  PieChart,
  ArrowRight,
} from "lucide-react";

import Breadcrumb from "../components/Breadcrub";
import SectionTitle from "../components/SectionTitle";

const biStats = [
  { value: "45+", label: "Global Markets" },
  { value: "120K", label: "Tons Exported" },
  { value: "98%", label: "Quality Compliance" },
];

const biFeatures = [
  {
    title: "Market Analytics",
    description:
      "Deep dive into global agricultural trends, pricing forecasts, and demand cycles to ensure optimal export timing.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    title: "Supply Chain Tracking",
    description:
      "End-to-end visibility of our procurement and distribution networks, ensuring transparency from farm to port.",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: "Performance Metrics",
    description:
      "Quarterly reviews of yield quality, sustainability targets, and overall operational efficiency.",
    icon: <PieChart className="h-6 w-6" />,
  },
  {
    title: "Growth Forecasting",
    description:
      "Predictive models helping partners scale their inventory and manage long-term strategic planning.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

const fadeUpContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const BI = () => {
  return (
    <div className="min-h-screen bg-none pb-16 lg:pb-24">
      {/* Breadcrumb */}
      <Breadcrumb
        title="Business Intelligence"
        backgroundImage="/images/breadcrumb.jpg"
      />

      {/* Hero Overview */}
      <section className="px-5 pt-12 sm:px-8 lg:px-10 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionTitle
                label="DATA & INSIGHTS"
                title="Driving Decisions with Intelligence"
                align="left"
              />

              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                At Nature Harvest, we leverage real-time data and market
                intelligence to optimize our agricultural exports. By
                analyzing global trends and supply chain metrics, we provide
                our partners with the reliability and foresight needed in
                today's dynamic market.
              </p>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap gap-6 sm:gap-10">
                {biStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-3xl font-extrabold text-[#00595d] sm:text-4xl">
                      {stat.value}
                    </span>

                    <span className="mt-1 text-sm font-medium uppercase tracking-wide text-[#f2a318]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group relative h-[350px] w-full sm:h-[450px]"
            >
              <div className="absolute inset-0 overflow-hidden rounded-bl-none rounded-br-[80px] rounded-tl-[80px] rounded-tr-none border-4 border-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                  alt="Business Intelligence Dashboard"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-[#075657]/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Areas */}
      <section className="px-5 pt-20 sm:px-8 lg:px-10 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl font-bold text-[#075657] sm:text-3xl">
              Core Analytics Areas
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUpContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {biFeatures.map((feature) => (
              <BICard key={feature.title} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

type BICardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const BICard = ({ title, description, icon }: BICardProps) => {
  return (
    <motion.div
      variants={fadeUpItem}
      className="
        group relative flex flex-col justify-between
        overflow-hidden rounded-2xl rounded-tr-[50px]
        bg-white p-6 shadow-sm
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-[0_15px_30px_rgba(7,86,87,0.08)]
        sm:p-8
      "
    >
      <div>
        <div
          className="
            mb-6 flex h-12 w-12 items-center justify-center
            rounded-full bg-[#edf3f3] text-[#075657]
            transition-colors duration-300
            group-hover:bg-[#f2a318]
            group-hover:text-white
          "
        >
          {icon}
        </div>

        <h3 className="mb-3 text-lg font-bold text-[#00595d]">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>

      <div
        className="
          mt-8 flex items-center
          text-sm font-semibold text-[#f2a318]
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      >
        View Report
        <ArrowRight className="ml-2 h-4 w-4" />
      </div>
    </motion.div>
  );
};

export default BI;