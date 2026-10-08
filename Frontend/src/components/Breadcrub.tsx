//  import { motion } from "framer-motion";
// import React from "react";

// type BreadcrumbProps = {
//   title?: string;
//   backgroundImage?: string;
//   children?: React.ReactNode;
// };

// const Breadcrumb = ({
//   title,
//   backgroundImage, // You can pass the women illustration here
//   children,
// }: BreadcrumbProps) => {
//   return (
//     <section className="relative w-full bg-white px-4 py-8">
//       {/* 
//         Main Banner Wrapper 
//         Added padding-right and padding-bottom to create space for the layered shadow effect
//       */}
//       <div className="relative mx-auto h-[220px] w-full max-w-7xl pr-[6px] pb-[10px] sm:h-[280px] lg:h-[320px]">
        
//         {/* --- LAYER 1: The Outer Cyan/Turquoise Border --- */}
//         <div 
//           className="
//             absolute bottom-[-10px] left-0 right-[-8px] top-[10px] 
//             rounded-tl-none rounded-br-[20px] rounded-bl-[100px] rounded-tr-[100px] 
//             bg-[#35B8AD] 
//             sm:rounded-bl-[130px] sm:rounded-tr-[130px] lg:rounded-bl-[160px] lg:rounded-tr-[160px]
//           " 
//         />

//         {/* --- LAYER 2: The Dark Green Middle Border --- */}
//         <div 
//           className="
//             absolute bottom-[-5px] left-0 right-[-4px] top-[5px] 
//             rounded-tl-none rounded-br-[20px] rounded-bl-[100px] rounded-tr-[100px] 
//             bg-[#1A4B45] 
//             sm:rounded-bl-[130px] sm:rounded-tr-[130px] lg:rounded-bl-[160px] lg:rounded-tr-[160px]
//           " 
//         />

//         {/* --- LAYER 3: Main Background Container --- */}
//         <div 
//           className="
//             absolute inset-0 
//             overflow-hidden 
//             rounded-tl-none rounded-br-[20px] rounded-bl-[100px] rounded-tr-[100px] 
//             bg-gradient-to-r from-[#59938B] via-[#48837A] to-[#366861] 
//             shadow-inner
//             sm:rounded-bl-[130px] sm:rounded-tr-[130px] lg:rounded-bl-[160px] lg:rounded-tr-[160px]
//           "
//         >
//           {/* Background Watermark/Image (Optional: Pass the women illustration here) */}
//           {backgroundImage && (
//             <div 
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 mix-blend-color-burn"
//               style={{ backgroundImage: `url(${backgroundImage})` }}
//             />
//           )}

//           {/* 1. Top-Left White Light Flare */}
//           <div className="absolute -left-[5%] -top-[30%] h-[350px] w-[350px] rounded-full bg-white/50 blur-[70px]" />

//           {/* 2. Top-Left Concentric Circles */}
//           <div className="absolute -left-[50px] top-[15%] flex h-[200px] w-[200px] items-center justify-center sm:-left-[30px] sm:top-[20%]">
//             <div className="absolute h-[190px] w-[190px] rounded-full border border-white/10" />
//             <div className="absolute h-[160px] w-[160px] rounded-full border border-white/20" />
//             <div className="absolute h-[130px] w-[130px] rounded-full border border-white/30" />
//             <div className="absolute h-[100px] w-[100px] rounded-full border-[1.5px] border-white/40" />
//             <div className="absolute h-[70px] w-[70px] rounded-full border-[1.5px] border-white/50" />
//             <div className="absolute h-[40px] w-[40px] rounded-full border-[2px] border-white/60" />
//           </div>

//           {/* 3. Bottom-Right Golden Light Flare */}
//           <div className="absolute -bottom-[20%] right-[3%] h-[300px] w-[300px] rounded-full bg-[#FFB800]/40 blur-[75px]" />

//           {/* 4. Bottom-Right Sparkle/Star Icon */}
//           <svg 
//             className="absolute bottom-[20%] right-[8%] h-7 w-7 text-white/70 sm:right-[10%]" 
//             viewBox="0 0 24 24" 
//             fill="currentColor"
//           >
//             <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
//           </svg>

//           {/* 5. Golden Wheat Decor */}
//           <Wheat />

//           {/* 6. Text/Content Wrapper (If you want to pass Title/Text inside it) */}
//           <div className="relative z-20 flex h-full items-center px-10 sm:px-20">
//             {title && (
//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl"
//               >
//                 {title}
//               </motion.h1>
//             )}
//             {children}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* --- Wheat Component (Optimized & Positioned for Bottom Right) --- */
// const Wheat = () => {
//   return (
//     <div
//       className="
//         absolute bottom-[-20px] right-[12%] z-30 
//         h-[180px] w-[120px] rotate-[10deg] scale-90 
//         sm:right-[15%] sm:scale-100 lg:right-[18%] lg:scale-110
//       "
//     >
//       {/* Main Stem */}
//       <span className="absolute bottom-0 left-[55px] h-[150px] w-[3px] rotate-[21deg] rounded-full bg-gradient-to-t from-[#e89500] to-[#ffc34d]" />
//       {/* Left Branch */}
//       <span className="absolute bottom-[35px] left-[39px] h-[80px] w-[2px] rotate-[-32deg] rounded-full bg-[#f2a318]" />
//       {/* Right Branch */}
//       <span className="absolute bottom-[48px] left-[68px] h-[90px] w-[2px] rotate-[34deg] rounded-full bg-[#f2a318]" />

//       {/* Grains */}
//       <Grain className="left-[22px] top-[47px] rotate-[-48deg]" />
//       <Grain className="left-[16px] top-[66px] rotate-[-45deg]" />
//       <Grain className="left-[21px] top-[86px] rotate-[-42deg]" />
      
//       <Grain className="left-[37px] top-[27px] rotate-[-36deg]" />
//       <Grain className="left-[34px] top-[47px] rotate-[-38deg]" />
//       <Grain className="left-[40px] top-[67px] rotate-[-35deg]" />

//       <Grain className="right-[18px] top-[10px] rotate-[35deg]" />
//       <Grain className="right-[10px] top-[30px] rotate-[38deg]" />
//       <Grain className="right-[5px] top-[51px] rotate-[40deg]" />
//       <Grain className="right-[1px] top-[72px] rotate-[43deg]" />

//       <Grain className="left-[51px] top-[6px] rotate-[16deg]" />
//       <Grain className="left-[57px] top-[28px] rotate-[23deg]" />
//     </div>
//   );
// };

// const Grain = ({ className = "" }: { className?: string }) => {
//   return (
//     <span
//       className={`
//         absolute h-[22px] w-[9px] rounded-full 
//         bg-gradient-to-br from-[#FFD15B] to-[#ED9700] 
//         shadow-[0_2px_4px_rgba(0,0,0,0.15)]
//         ${className}
//       `}
//     />
//   );
// };

// export default Breadcrumb;




import { motion } from "framer-motion";
import React from "react";

type BreadcrumbProps = {
  title?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
};

const Breadcrumb = ({
  title,
  backgroundImage,
  children,
}: BreadcrumbProps) => {
  return (
    <section className="relative w-full bg-white px-4 py-8">
      <div className="relative mx-auto h-[220px] w-full max-w-7xl pr-[6px] pb-[10px] sm:h-[280px] lg:h-[320px]">
        {/* Outer Cyan Border */}
        <div
          className="
            absolute bottom-[-10px] left-0 right-[-8px] top-[10px]
             rounded-bl-[100px] rounded-tr-[100px]
            bg-[#35B8AD]
            sm:rounded-bl-[130px] sm:rounded-tr-[130px]
            lg:rounded-bl-[160px] lg:rounded-tr-[160px]
          "
        />

        {/* Dark Green Border */}
        <div
          className="
            absolute bottom-[-5px] left-0 right-[-4px] top-[5px]
            rounded-br-[20px] rounded-bl-[100px] rounded-tr-[100px]
            bg-[#1A4B45]
            sm:rounded-bl-[130px] sm:rounded-tr-[130px]
            lg:rounded-bl-[160px] lg:rounded-tr-[160px]
          "
        />

        {/* Main Banner */}
        <div
          className="
            absolute inset-0 overflow-hidden
            rounded-br-[20px] rounded-bl-[100px] rounded-tr-[100px]
            bg-gradient-to-r from-[#59938B] via-[#48837A] to-[#366861]
            shadow-inner
            sm:rounded-bl-[130px] sm:rounded-tr-[130px]
            lg:rounded-bl-[160px] lg:rounded-tr-[160px]
          "
        >
          {/* Background Image */}
          {backgroundImage && (
            <div
              className="
                absolute inset-0
                bg-cover bg-center bg-no-repeat
                opacity-10 mix-blend-color-burn
              "
              style={{
                backgroundImage: `url(${backgroundImage})`,
              }}
            />
          )}

          {/* Light Flare */}
          <div className="absolute -left-[5%] -top-[30%] h-[350px] w-[350px] rounded-full bg-white/50 blur-[70px]" />

          {/* Concentric Circles */}
          <div
            className="
              absolute -left-[50px] top-[15%]
              flex h-[200px] w-[200px]
              items-center justify-center
              sm:-left-[30px] sm:top-[20%]
            "
          >
            <div className="absolute h-[190px] w-[190px] rounded-full border border-white/10" />
            <div className="absolute h-[160px] w-[160px] rounded-full border border-white/20" />
            <div className="absolute h-[130px] w-[130px] rounded-full border border-white/30" />
            <div className="absolute h-[100px] w-[100px] rounded-full border-[1.5px] border-white/40" />
            <div className="absolute h-[70px] w-[70px] rounded-full border-[1.5px] border-white/50" />
            <div className="absolute h-[40px] w-[40px] rounded-full border-[2px] border-white/60" />
          </div>

          {/* Golden Light */}
          <div className="absolute -bottom-[20%] right-[3%] h-[300px] w-[300px] rounded-full bg-[#FFB800]/40 blur-[75px]" />

          {/* Wheat */}
          {/* <Wheat /> */}

          {/* Content */}
          <div className="relative z-20 flex h-full items-center px-10 sm:px-20">
            {title && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl"
              >
                {title}
              </motion.h1>
            )}

            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;