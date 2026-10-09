// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import Breadcrumb from "../components/Breadcrub";
// import Button from "../components/Button";
// import SectionTitle from "../components/SectionTitle";
// import { BACKEND_URL, FALLBACK_IMG, getImageSrc } from "../utils/api";



// const fadeUp = {
//   hidden: {
//     opacity: 0,
//     y: 30,
//   },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//     },
//   },
// };

// const staggerContainer = {
//   hidden: {
//     opacity: 0,
//   },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// interface ProductItem {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
// }

// const Products = () => {
//   const [productList, setProductList] = useState<ProductItem[]>([]);

//   useEffect(() => {
//     let isMounted = true;
//     axios
//       .get(`${BACKEND_URL}/api/products/list`)
//       .then(({ data }) => {
//         if (!isMounted) return;
//         if (data.success && Array.isArray(data.products) && data.products.length > 0) {
//           const mapped: ProductItem[] = data.products.map(
//             (product: {
//               _id?: string;
//               id?: string;
//               number?: string;
//               name?: string;
//               category?: string;
//               description?: string;
//               image?: string;
//               images?: string[];
//             }, index: number) => {
//               const rawImg =
//                 product.image ||
//                 (Array.isArray(product.images) && product.images[0]) ||
//                 "";
//               return {
//                 id: product._id || product.id || String(product.number || index + 1),
//                 title: product.name || product.category || "Product",
//                 description: product.description || "",
//                 image: getImageSrc(rawImg),
//               };
//             }
//           );
//           setProductList(mapped);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to load products from backend:", err);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-white pb-20">
//       {/* Breadcrumb */}
//       <Breadcrumb title="Products" />

//       {/* =========================================
//           SECTION 1: OUR PRODUCT CATEGORIES
//       ========================================= */}
//       <section className="mx-auto w-full max-w-7xl px-5 pt-16 sm:px-8 lg:px-10 lg:pt-24">
//         {/* Header */}
//         <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeUp}
//           >
//             <SectionTitle
//               label="Products"
//               title=" "
//               align="left"
//             />

//             <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#075657] sm:text-5xl">
//               Our Product
//               <br className="hidden sm:block" />
//               Categories
//             </h2>
//           </motion.div>

//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeUp}
//           >
//             <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
//               We offer a wide range of premium agricultural products, including
//               various rice varieties, pulses, spices, millets, and more. Our
//               products are sourced sustainably, ensuring the highest quality for
//               our customers worldwide.
//             </p>
//           </motion.div>
//         </div>

//         {/* Product Cards */}
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, margin: "-50px" }}
//           className="mt-16 grid gap-8 md:grid-cols-3"
//         >
//           {productList.map((product) => (
//             <motion.div
//               key={product.id}
//               variants={fadeUp}
//               className="group flex flex-col items-center overflow-hidden rounded-tl-[55px] rounded-br-[55px] border-2 border-[#f2a318] bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] sm:p-6"
//             >
//               {/* Image */}
//               <div className="relative mb-6 h-56 w-full overflow-hidden rounded-tr-[50px] rounded-bl-[50px] rounded-br-none rounded-tl-none sm:h-64">
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   onError={(e) => {
//                     e.currentTarget.onerror = null;
//                     e.currentTarget.src = FALLBACK_IMG;
//                   }}
//                   className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 {/* Decorative Icon */}
//                 <div className="absolute left-1 top-1 flex h-20 w-20 items-center justify-center">
//                   <img src="https://res.cloudinary.com/drc0gwhz9/image/upload/v1791539681/Group_13_izj3l9.png" alt="" />
//                 </div>
//               </div>

//               {/* Content */}
//               <h3 className="mb-3 text-xl font-bold text-[#075657]">
//                 {product.title}
//               </h3>

//               <p className="mb-8 line-clamp-3 text-center text-sm leading-relaxed text-gray-500">
//                 {product.description}
//               </p>

//               {/* Reusable Button */}
//               <Button
//                 to={`/products/${product.id}`}
//                 className="mt-auto px-8 py-3 text-sm !text-[#075657]"
//               >
//                 Know More
//               </Button>
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>


//     </div>
//   );
// };



// export default Products;


import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import Breadcrumb from "../components/Breadcrub";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import {
  BACKEND_URL,
  FALLBACK_IMG,
  getImageSrc,
} from "../utils/api";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
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

interface ProductItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ApiProduct {
  _id?: string;
  id?: string;
  number?: string | number;
  name?: string;
  category?: string;
  description?: string;
  image?: string;
  images?: string[];
}

interface ProductsApiResponse {
  success: boolean;
  products?: ApiProduct[];
  message?: string;
}

const DECORATIVE_IMAGE =
  "https://res.cloudinary.com/drc0gwhz9/image/upload/v1791539681/Group_13_izj3l9.png";

const Products = () => {
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get<ProductsApiResponse>(
          `${BACKEND_URL}/api/products/list`
        );

        if (!isMounted) return;

        const products = response.data?.products;

        if (
          response.data?.success &&
          Array.isArray(products)
        ) {
          const mappedProducts: ProductItem[] = products.map(
            (product, index) => {
              const rawImage =
                product.image ||
                product.images?.find(
                  (image) =>
                    typeof image === "string" &&
                    image.trim().length > 0
                ) ||
                "";

              let imageUrl = FALLBACK_IMG;

              if (rawImage) {
                try {
                  imageUrl = getImageSrc(rawImage) || FALLBACK_IMG;
                } catch (imageError) {
                  console.error(
                    "Failed to process product image:",
                    rawImage,
                    imageError
                  );
                }
              }

              return {
                id: String(
                  product._id ||
                    product.id ||
                    product.number ||
                    index + 1
                ),
                title:
                  product.name ||
                  product.category ||
                  "Product",
                description: product.description || "",
                image: imageUrl,
              };
            }
          );

          setProductList(mappedProducts);
        } else {
          setProductList([]);
          setError(
            response.data?.message ||
              "Products could not be loaded."
          );
        }
      } catch (err) {
        console.error("Failed to load products:", err);

        if (isMounted) {
          setError(
            "Unable to load products. Please try again later."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumb title="Products" />

      <section className="mx-auto w-full max-w-7xl px-5 pt-16 sm:px-8 lg:px-10 lg:pt-24">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionTitle
              label="Products"
              title=" "
              align="left"
            />

            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#075657] sm:text-5xl">
              Our Product
              <br className="hidden sm:block" />
              Categories
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
              We offer a wide range of premium agricultural
              products, including various rice varieties,
              pulses, spices, millets, and more. Our products
              are sourced sustainably, ensuring the highest
              quality for our customers worldwide.
            </p>
          </motion.div>
        </div>

        {/* Product Cards */}
        {loading ? (
          <div
            className="mt-16 grid gap-8 md:grid-cols-3"
            aria-live="polite"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-tl-[55px] rounded-br-[55px] border-2 border-gray-200 p-5 sm:p-6"
              >
                <div className="mb-6 h-56 w-full rounded-tr-[50px] bg-gray-200 sm:h-64" />
                <div className="mx-auto mb-3 h-6 w-1/2 rounded bg-gray-200" />
                <div className="mb-2 h-4 rounded bg-gray-100" />
                <div className="mx-auto h-4 w-3/4 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-16 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-base text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-[#075657] px-6 py-3 font-semibold text-white transition hover:bg-[#064445]"
            >
              Try Again
            </button>
          </div>
        ) : productList.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-gray-200 p-10 text-center">
            <h3 className="text-xl font-bold text-[#075657]">
              No Products Available
            </h3>
            <p className="mt-2 text-gray-500">
              Products will appear here once they are added.
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            {productList.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                className="group flex flex-col items-center overflow-hidden rounded-tl-[55px] rounded-br-[55px] border-2 border-[#f2a318] bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] sm:p-6"
              >
                {/* Product Image */}
                <div className="relative mb-6 h-56 w-full overflow-hidden rounded-tr-[50px] rounded-bl-[50px] sm:h-64">
                  <img
                    src={product.image || FALLBACK_IMG}
                    alt={product.title}
                    loading="lazy"
                    onError={(event) => {
                      const image = event.currentTarget;

                      if (
                        image.dataset.fallbackApplied !== "true"
                      ) {
                        image.dataset.fallbackApplied = "true";
                        image.src = FALLBACK_IMG;
                      }
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Decorative Icon */}
                  <div className="absolute left-1 top-1 flex h-20 w-20 items-center justify-center">
                    <img
                      src={DECORATIVE_IMAGE}
                      alt=""
                      aria-hidden="true"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <h3 className="mb-3 text-center text-xl font-bold text-[#075657]">
                  {product.title}
                </h3>

                <p className="mb-8 line-clamp-3 text-center text-sm leading-relaxed text-gray-500">
                  {product.description}
                </p>

                {/* Product Details Navigation */}
                <Button
                  to={`/products/${encodeURIComponent(product.id)}`}
                  className="mt-auto px-8 py-3 text-sm !text-[#075657]"
                >
                  Know More
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Products;