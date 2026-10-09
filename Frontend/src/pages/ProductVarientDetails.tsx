import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Breadcrumb from "../components/Breadcrub";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";

import { products, productVariants } from "../data/products";
import { BACKEND_URL, getImageSrc } from "../utils/api";

type TabType = "description" | "features" | "quality";

interface ProductItem {
  id: string;
  _id?: string;
  name: string;
  category?: string;
  description: string;
  image?: string;
}

interface VariantItem {
  id: string;
  _id?: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  keyFeatures?: string[];
  globalQualityStandards?: string[];
  qualityStandards?: string[] | string;
  rating?: number;
  reviews?: number;
}

const ProductVariantDetails = () => {
  const { id, variantId } = useParams<{
    id: string;
    variantId: string;
  }>();

  const [activeTab, setActiveTab] = useState<TabType>("description");

  const [product, setProduct] = useState<ProductItem | null>(() => {
    const found = products.find((item) => String(item.id) === String(id));
    return found ? { ...found } : null;
  });

  const [variant, setVariant] = useState<VariantItem | null>(() => {
    const found = productVariants.find(
      (item) =>
        String(item.id) === String(variantId) &&
        String(item.categoryId) === String(id)
    );
    return found ? { ...found } : null;
  });

  const [similarProducts, setSimilarProducts] = useState<VariantItem[]>(() => {
    return productVariants
      .filter(
        (item) =>
          String(item.categoryId) === String(id) &&
          String(item.id) !== String(variantId)
      )
      .map((item) => ({ ...item }));
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.allSettled([
      axios.get(`${BACKEND_URL}/api/products/list`),
      axios.get(`${BACKEND_URL}/api/products/variant/list`),
    ]).then(([prodRes, varRes]) => {
      if (!isMounted) return;

      const backendProducts: any[] =
        prodRes.status === "fulfilled" &&
          prodRes.value.data?.success &&
          Array.isArray(prodRes.value.data?.products)
          ? prodRes.value.data.products
          : [];

      const backendVariants: any[] =
        varRes.status === "fulfilled" &&
          varRes.value.data?.success &&
          Array.isArray(varRes.value.data?.variants)
          ? varRes.value.data.variants
          : [];

      // 1. Find Product
      let currentProd: ProductItem | null = null;
      const matchedBackendProd = backendProducts.find((p: any) => {
        const pMongoId = String(p._id || "").toLowerCase();
        const pId = String(p.id || "").toLowerCase();
        const pNum = String(p.number || "").toLowerCase();
        const pName = String(p.name || "").toLowerCase();
        const searchId = String(id || "").toLowerCase();
        return (
          pMongoId === searchId ||
          pId === searchId ||
          pNum === searchId ||
          pName === searchId
        );
      });

      if (matchedBackendProd) {
        currentProd = {
          id: matchedBackendProd._id || matchedBackendProd.id,
          _id: matchedBackendProd._id,
          name: matchedBackendProd.name,
          category: matchedBackendProd.category,
          description: matchedBackendProd.description,
          image: getImageSrc(matchedBackendProd.image),
        };
      } else {
        const staticP = products.find((item) => String(item.id) === String(id));
        if (staticP) {
          currentProd = { ...staticP };
        }
      }

      setProduct(currentProd);

      // 2. Find Variant
      let currentVar: VariantItem | null = null;
      const matchedBackendVar = backendVariants.find((v: any) => {
        const vMongoId = String(v._id || "").toLowerCase();
        const vId = String(v.id || "").toLowerCase();
        const searchVarId = String(variantId || "").toLowerCase();
        return vMongoId === searchVarId || vId === searchVarId;
      });

      if (matchedBackendVar) {
        currentVar = {
          id: matchedBackendVar._id || matchedBackendVar.id,
          _id: matchedBackendVar._id,
          categoryId: matchedBackendVar.categoryId,
          name: matchedBackendVar.name,
          description: matchedBackendVar.description,
          image: getImageSrc(matchedBackendVar.image),
          keyFeatures: Array.isArray(matchedBackendVar.keyFeatures)
            ? matchedBackendVar.keyFeatures
            : [],
          globalQualityStandards: Array.isArray(
            matchedBackendVar.globalQualityStandards
          )
            ? matchedBackendVar.globalQualityStandards
            : [],
          qualityStandards: Array.isArray(matchedBackendVar.qualityStandards)
            ? matchedBackendVar.qualityStandards
            : matchedBackendVar.qualityStandards
              ? [matchedBackendVar.qualityStandards]
              : [],
          rating: Number(matchedBackendVar.rating) || 0,
          reviews: Number(matchedBackendVar.reviews) || 0,
        };
      } else {
        const staticV = productVariants.find(
          (item) => String(item.id) === String(variantId)
        );
        if (staticV) {
          currentVar = {
            ...staticV,
            image: getImageSrc(staticV.image),
          };
        }
      }

      setVariant(currentVar);

      // 3. Similar Products
      if (currentProd) {
        const matchingBackendSimilar = backendVariants
          .filter((v: any) => {
            const catId = String(v.categoryId || "").trim().toLowerCase();
            const targetMongoId = String(currentProd?._id || "").trim().toLowerCase();
            const targetId = String(currentProd?.id || "").trim().toLowerCase();
            const targetNum = String(currentProd?.name || "").trim().toLowerCase();
            const searchParam = String(id || "").trim().toLowerCase();
            const isSameCat =
              catId === targetMongoId ||
              catId === targetId ||
              catId === targetNum ||
              catId === searchParam;
            const isDiff =
              String(v._id) !== String(currentVar?._id || currentVar?.id) &&
              String(v.id) !== String(currentVar?._id || currentVar?.id);
            return isSameCat && isDiff;
          })
          .map((item: any, idx: number) => ({
            id: item._id || item.id || String(idx + 1),
            _id: item._id,
            categoryId: item.categoryId,
            name: item.name,
            description: item.description,
            image: getImageSrc(item.image),
          }));

        if (matchingBackendSimilar.length > 0) {
          setSimilarProducts(matchingBackendSimilar);
        } else {
          const staticSimilar = productVariants
            .filter(
              (item) =>
                String(item.categoryId) === String(currentProd?.id || id) &&
                String(item.id) !== String(currentVar?.id || variantId)
            )
            .map((item) => ({
              ...item,
              image: getImageSrc(item.image),
            }));
          setSimilarProducts(staticSimilar);
        }
      }

      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [id, variantId]);

  /* ================= NOT FOUND ================= */
  if ((!product || !variant) && !loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#075b5b] sm:text-4xl">
            Product Not Found
          </h1>

          <Link
            to="/products"
            className="
              mt-5
              inline-block
              font-bold
              text-[#f2a318]
              transition-colors
              duration-300
              hover:text-[#075b5b]
            "
          >
            ← Back To Products
          </Link>
        </div>
      </section>
    );
  }

  if (!product || !variant) {
    return null;
  }

  /* ================= TABS ================= */
  const tabs: {
    id: TabType;
    label: string;
  }[] = [
      {
        id: "description",
        label: "Description",
      },
      {
        id: "features",
        label: "Key Features",
      },
      {
        id: "quality",
        label: "Global Quality Standards",
      },
    ];

  return (
    <>
      {/* ================= BREADCRUMB ================= */}
      <Breadcrumb
        title={variant.name}
        backgroundImage="/images/breadcrumb.jpg"
      />

      {/* content  */}
      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div
            className="
        grid
        gap-10
        md:grid-cols-[420px_1fr]
        md:items-center
        lg:grid-cols-[500px_1fr]
        lg:gap-16
      "
          >
            {/* ================= PRODUCT IMAGE ================= */}
            <div
              className="
          w-full
          overflow-hidden
          rounded-xl
          border-2
          border-[#f2a318]
          p-3
          shadow-[0_6px_25px_rgba(0,0,0,0.08)]
        "
            >
              {/* <div
                className="
            overflow-hidden
            rounded-tr-[45px]
            rounded-bl-[45px]
            bg-gray-100
          "
              >
                <img
                  src={variant.image}
                  alt={variant.name}
                  loading="lazy"
                  className="
              h-[330px]
              w-full
              object-cover
              transition-transform
              duration-500
              hover:scale-105
              sm:h-[380px]
              lg:h-[420px]
            "
                />
              </div> */}

<div className="relative overflow-hidden rounded-tr-[65px] rounded-bl-[45px] rounded-tl-[0px] rounded-br-[0px] bg-gray-100">
  <img
    src={variant.image}
    alt={variant.name}
    loading="lazy"
    onError={(e) => {
      e.currentTarget.style.visibility = "hidden";
    }}
    className="
      h-[330px]
      w-full
      object-cover
      transition-transform
      duration-500
      hover:scale-105
      sm:h-[380px]
      lg:h-[420px]
    "
  />

  {/* Decorative Logo */}
  <div className="absolute left-1 top-1 z-10 h-24 w-24 sm:h-28 sm:w-28">
    <img
      src="https://res.cloudinary.com/drc0gwhz9/image/upload/v1791539681/Group_13_izj3l9.png"
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  </div>
</div>
            </div>

            {/* ================= PRODUCT CONTENT ================= */}
            <div className="flex flex-col">
              {/* Category */}
              <span
                className="
            inline-flex
            w-fit
            rounded-tl-[22px]
            rounded-br-[22px]
            bg-[#fbe4b8]
            px-6
            py-2.5
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-[#173f40]
          "
              >
                {product.name}
              </span>

              {/* Product Name */}
              <h1
                className="
            mt-5
            text-3xl
            font-bold
            leading-tight
            text-[#075b5b]
            sm:text-4xl
            lg:text-5xl
          "
              >
                {variant.name}
              </h1>

              {/* Product Type */}
              <div className="mt-6">
                <span
                  className="
              inline-flex
              max-w-full
              rounded-tr-[30px]
              rounded-bl-[30px]
              bg-[#f2a318]
              px-7
              py-3.5
              text-base
              font-semibold
              leading-relaxed
              text-black
              sm:text-lg
            "
                >
                  {Array.isArray(variant.qualityStandards)
                    ? variant.qualityStandards.join(" | ")
                    : variant.qualityStandards || ""}
                </span>
              </div>

              {/* Rating and Reviews */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.round(Number(variant.rating) || 0)
                        ? "fill-[#f2a318] text-[#f2a318]"
                        : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                </div>

                <span className="text-sm text-gray-500 sm:text-base">
                  {(Number(variant.rating) || 0).toFixed(1)} from {variant.reviews || 0} Reviews
                </span>
              </div>

              {/* Contact Button */}
              <div className="mt-8">
                <Button
                  href="https://wa.me/918448028999"
                  className="min-h-[52px] min-w-[190px] px-8 py-3 text-sm"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TABS ================= */}
      <section className="px-5 pb-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div
            className="
              overflow-hidden
              rounded-[10px]
              border
              border-gray-200
              bg-white
              shadow-[0_4px_15px_rgba(0,0,0,0.04)]
            "
          >
            {/* ================= TAB BUTTONS ================= */}
            <div
              className="
                flex
                overflow-x-auto
                border-b
                border-gray-200
                bg-gray-50
              "
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      shrink-0
                      border-r
                      border-gray-200
                      px-5
                      py-3
                      text-xs
                      font-medium
                      transition-all
                      duration-300
                      sm:px-6
                      ${isActive
                        ? "bg-[#075b5b] font-bold text-white"
                        : "bg-white text-gray-600 hover:bg-[#fbe4b8] hover:text-[#075b5b]"
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* ================= TAB CONTENT ================= */}
            <div className="min-h-[200px] p-6 sm:p-8">
              {/* ================= DESCRIPTION ================= */}
              {activeTab === "description" && (
                <div>
                  <h3 className="mb-4 text-lg font-bold text-[#075b5b]">
                    {variant.name}
                  </h3>

                  <p className="text-sm leading-7 text-gray-600">
                    {variant.description}
                  </p>
                </div>
              )}

              {/* ================= KEY FEATURES ================= */}
              {activeTab === "features" && (
                <div>
                  <h3 className="mb-5 text-lg font-bold text-[#075b5b]">
                    Key Features
                  </h3>

                  {variant.keyFeatures && variant.keyFeatures.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {variant.keyFeatures.map((feature) => (
                        <div
                          key={feature}
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-lg
                            bg-[#f8faf9]
                            px-4
                            py-3
                          "
                        >
                          <span
                            className="
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[#f2a318]
                              text-xs
                              font-bold
                              text-white
                            "
                          >
                            ✓
                          </span>

                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No key features available.
                    </p>
                  )}
                </div>
              )}

              {/* ================= GLOBAL QUALITY ================= */}
              {activeTab === "quality" && (
                <div>
                  <h3 className="mb-5 text-lg font-bold text-[#075b5b]">
                    Global Quality Standards
                  </h3>

                  {variant.globalQualityStandards && variant.globalQualityStandards.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {variant.globalQualityStandards.map((standard) => (
                        <div
                          key={standard}
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-lg
                            bg-[#f8faf9]
                            px-4
                            py-3
                          "
                        >
                          <span
                            className="
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[#f2a318]
                              text-xs
                              font-bold
                              text-white
                            "
                          >
                            ✓
                          </span>

                          <span className="text-sm text-gray-600">
                            {standard}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No global quality standards available.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BACK BUTTON ================= */}
      <div className="flex justify-center pb-12">
        <Button
          to={`/products/${product.id}`}
          className="
            min-h-[40px]
            min-w-[165px]
            px-6
            py-2
            text-xs
          "
        >
          Back To {product.name}
        </Button>
      </div>

      {/* ================= SIMILAR PRODUCTS ================= */}
      {similarProducts.length > 0 && (
        <section className="px-5 pb-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            {/* Heading */}
            <div className="mb-7">
              <h2
                className="
                  text-2xl
                  font-bold
                  text-[#075b5b]
                  sm:text-3xl
                "
              >
                Similar Products
              </h2>
            </div>

            {/* Product Grid */}
            <div
              className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {similarProducts.slice(0, 6).map((item, index) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  number={String(index + 1).padStart(2, "0")}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  linkTo={`/products/${product.id}/${item.id}`}
                  position={index % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductVariantDetails;
