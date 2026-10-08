// import { motion } from "framer-motion";

// const Loader = () => {
//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#075b5b]">
//       <div className="flex flex-col items-center">
//         {/* Logo / Loader Circle */}
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{
//             duration: 1.5,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//           className="h-16 w-16 rounded-full border-4 border-white/30 border-t-[#f2a318]"
//         />

//         {/* Brand Name */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="mt-5 text-xl font-bold tracking-wide text-white"
//         >
//           Nature Harvest
//         </motion.p>

//         <motion.p
//           animate={{ opacity: [0.4, 1, 0.4] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="mt-1 text-sm text-white/80"
//         >
//           Loading...
//         </motion.p>
//       </div>
//     </div>
//   );
// };

// export default Loader;