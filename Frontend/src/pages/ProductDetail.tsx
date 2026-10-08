import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Breadcrumb from "../components/Breadcrub";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";

import { products, productVariants } from "../data/products";
import { useAppContext } from "../context/AppContext";
import { BACKEND_URL, getImageSrc } from "../utils/api";

interface ProductDetailItem {
  id: string;
  _id?: string;
  number?: string;
  name: string;
  category?: string;
  description: string;
  image: string;
  origin?: string;
  packaging?: string;
  quality?: string;
  availability?: string;
}

interface VariantDisplayItem {
  id: string;
  _id?: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  keyFeatures?: string[];
  globalQualityStandards?: string[];
  qualityStandards?: string[];
  rating?: number;
  reviews?: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedProductId } = useAppContext();

  const productId = id || selectedProductId;

  const [product, setProduct] = useState<ProductDetailItem | null>(() => {
    const found = products.find(
      (item) => String(item.id) === String(productId)
    );
    return found ? { ...found } : null;
  });

  const [categoryProducts, setCategoryProducts] = useState<VariantDisplayItem[]>(() => {
    return productVariants
      .filter((item) => String(item.categoryId) === String(productId))
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
      let foundProd: ProductDetailItem | null = null;

      const matchedBackendProd = backendProducts.find((p: any) => {
        const pMongoId = String(p._id || "").toLowerCase();
        const pId = String(p.id || "").toLowerCase();
        const pNum = String(p.number || "").toLowerCase();
        const pName = String(p.name || "").toLowerCase();
        const searchId = String(productId || "").toLowerCase();
        return (
          pMongoId === searchId ||
          pId === searchId ||
          pNum === searchId ||
          pName === searchId
        );
      });

      if (matchedBackendProd) {
        foundProd = {
          id: matchedBackendProd._id || matchedBackendProd.id,
          _id: matchedBackendProd._id,
          number: matchedBackendProd.number,
          name: matchedBackendProd.name,
          category: matchedBackendProd.category,
          description: matchedBackendProd.description,
          image: getImageSrc(
            matchedBackendProd.image ||
              (Array.isArray(matchedBackendProd.images) && matchedBackendProd.images[0])
          ),
          origin: matchedBackendProd.origin,
          packaging: matchedBackendProd.packaging,
          quality: matchedBackendProd.quality,
          availability: matchedBackendProd.availability,
        };
      } else {
        const staticP = products.find(
          (item) => String(item.id) === String(productId)
        );
        if (staticP) {
          foundProd = { ...staticP };
        }
      }

      setProduct(foundProd);

      if (foundProd) {
        // 2. Find Variants for this Product
        const matchingBackendVars = backendVariants.filter((v: any) => {
          const catId = String(v.categoryId || "").trim().toLowerCase();
          const targetMongoId = String(foundProd?._id || "").trim().toLowerCase();
          const targetId = String(foundProd?.id || "").trim().toLowerCase();
          const targetNum = String(foundProd?.number || "").trim().toLowerCase();
          const targetName = String(foundProd?.name || "").trim().toLowerCase();
          const targetCat = String(foundProd?.category || "").trim().toLowerCase();
          const searchParam = String(productId || "").trim().toLowerCase();

          return (
            catId === targetMongoId ||
            catId === targetId ||
            catId === targetNum ||
            catId === targetName ||
            catId === targetCat ||
            catId === searchParam
          );
        });

        if (matchingBackendVars.length > 0) {
          const mapped: VariantDisplayItem[] = matchingBackendVars.map(
            (item: any, idx: number) => ({
              id: item._id || item.id || String(idx + 1),
              _id: item._id,
              categoryId: item.categoryId,
              name: item.name,
              description: item.description,
              image: getImageSrc(item.image),
              keyFeatures: Array.isArray(item.keyFeatures) ? item.keyFeatures : [],
              globalQualityStandards: Array.isArray(item.globalQualityStandards)
                ? item.globalQualityStandards
                : [],
              qualityStandards: Array.isArray(item.qualityStandards)
                ? item.qualityStandards
                : [],
              rating: Number(item.rating) || 0,
              reviews: Number(item.reviews) || 0,
            })
          );
          setCategoryProducts(mapped);
        } else {
          // Fallback to static variants
          const staticVars = productVariants
            .filter(
              (item) =>
                String(item.categoryId) === String(foundProd?.id) ||
                String(item.categoryId) === String(productId)
            )
            .map((item) => ({
              ...item,
              image: getImageSrc(item.image),
            }));
          setCategoryProducts(staticVars);
        }
      } else {
        setCategoryProducts([]);
      }

      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  /* Product Not Found */
  if (!product && !loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#075b5b] sm:text-4xl">
            Product Not Found
          </h1>

          <Link
            to="/products"
            className="
              mt-6
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

  if (!product) {
    return null;
  }

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        title={product.name}
        backgroundImage="/images/breadcrumb.jpg"
      />

      {/* Category Header */}
      <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div
            className="
              grid
              gap-7
              md:grid-cols-2
              md:items-center
            "
          >
            {/* Heading */}
            <div>
              <span
                className="
                  inline-flex
                  rounded-tl-[20px]
                  rounded-br-[20px]
                  bg-[#fbe4b8]
                  px-5
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[#173f40]
                "
              >
                Products
              </span>

              <h1
                className="
                  mt-4
                  text-3xl
                  font-bold
                  leading-tight
                  text-[#075b5b]
                  sm:text-4xl
                "
              >
                {product.name}
              </h1>
            </div>

            {/* Category Description */}
            <p
              className="
                text-sm
                leading-7
                text-gray-600
              "
            >
              {product.description}
            </p>
          </div>
        </div>
      </section>

      {/* Category Products */}
      <section className="px-5 pb-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          {categoryProducts.length > 0 ? (
            <>
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
                {categoryProducts.map((item, index) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    number={String(index + 1).padStart(2, "0")}
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    linkTo={`/products/${product.id}/${item.id}`}
                    position={
                      index % 2 === 0
                        ? "left"
                        : "right"
                    }
                  />
                ))}
              </div>
            </>
          ) : (
            /* No Products */
            <div
              className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-10
                text-center
                shadow-[0_4px_15px_rgba(0,0,0,0.03)]
              "
            >
              <p className="text-sm text-gray-500">
                No products available in this category.
              </p>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-10 flex justify-center">
            <Button
              to="/products"
              className="
                min-h-[40px]
                min-w-[165px]
                px-6
                py-2
                text-xs
              "
            >
              ← Back To Product Page
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;