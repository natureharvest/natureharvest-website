import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

import Breadcrumb from "../components/Breadcrub";

// ─── Backend URL & Helpers ───────────────────────────────────────────────────
const BACKEND_URL = (
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_BACKEND_URL ||
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_API_URL ||
  "http://localhost:3000"
).replace(/\/+$/, "");

export interface BlogPostItem {
  id: string | number;
  slug: string;
  title: string;
  date: string;
  month: string;
  image: string;
  category?: string;
  excerpt?: string;
}

// Fallback initial data in case database is empty or offline
const initialBlogPosts: BlogPostItem[] = [
  {
    id: 1,
    slug: "growing-demand-for-millets",
    title: "The Growing Demand for Millets in the Global Market",
    date: "03 February, 2025",
    month: "February",
    image: "/blog-sustainable.png",
  },
  {
    id: 2,
    slug: "choose-right-rice",
    title: "How to Choose the Right Rice for Your Needs",
    date: "23 January, 2025",
    month: "January",
    image: "/blog-rice.png",
  },
  {
    id: 3,
    slug: "sustainable-agricultural-products",
    title: "The Benefits of Sourcing Sustainable Agricultural Products",
    date: "23 January, 2025",
    month: "January",
    image: "/blog-millets.png",
  },
];

const getImageSrc = (raw?: string): string => {
  if (!raw || typeof raw !== "string" || !raw.trim()) {
    return "/blog-sustainable.png";
  }
  const s = raw.trim();
  if (/^(https?:)?\/\//i.test(s) || /^(data|blob):/i.test(s)) {
    return s;
  }
  return `${BACKEND_URL}/${s.replace(/\\/g, "/").replace(/^\.?\/+/, "")}`;
};

const formatDateInfo = (createdAt?: string) => {
  if (!createdAt) {
    return { date: "Recent", month: "Recent" };
  }
  const d = new Date(createdAt);
  if (isNaN(d.getTime())) {
    return { date: "Recent", month: "Recent" };
  }
  const day = String(d.getDate()).padStart(2, "0");
  const monthName = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();
  return {
    date: `${day} ${monthName}, ${year}`,
    month: monthName,
  };
};

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPostItem[]>(initialBlogPosts);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch blogs from backend
  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${BACKEND_URL}/api/blogs/list`)
      .then(({ data }) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
          const mapped: BlogPostItem[] = data.blogs.map(
            (item: {
              _id?: string;
              id?: string;
              slug?: string;
              title: string;
              excerpt?: string;
              content?: string;
              image?: string;
              category?: string;
              createdAt?: string;
            }) => {
              const { date, month } = formatDateInfo(item.createdAt);
              return {
                id: item._id || item.id || item.slug || Math.random(),
                slug: item.slug || item._id || "",
                title: item.title,
                date,
                month,
                image: getImageSrc(item.image),
                category: item.category,
                excerpt: item.excerpt,
              };
            }
          );
          setBlogs(mapped);
        }
      })
      .catch((err) => {
        console.warn("Using local blog list, backend error:", err?.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter months dynamically from available blogs
  const uniqueMonths = Array.from(
    new Set(blogs.map((b) => b.month).filter(Boolean))
  );
  const filterMonths = ["All", ...uniqueMonths];

  // Filter Logic
  const filteredBlogs = blogs.filter((post) =>
    selectedMonth === "All" ? true : post.month === selectedMonth
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Breadcrumb */}
      <Breadcrumb
        title="Blogs"
        backgroundImage="/images/breadcrumb.jpg"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Header & Filter */}
        <div className="mb-8 flex items-end justify-end">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex w-44 items-center justify-between rounded-t-md bg-[#075657] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#064a4b]"
            >
              Filter Blogs
              <motion.div
                animate={{
                  rotate: isDropdownOpen ? 180 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute right-0 top-full z-20 w-44 overflow-hidden rounded-b-md border-x border-b border-gray-200 bg-white shadow-lg"
                >
                  <ul className="py-1">
                    {filterMonths.map((month) => (
                      <li key={month}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedMonth(month);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                            selectedMonth === month
                              ? "bg-[#075657] text-white hover:bg-[#075657]"
                              : "text-gray-700"
                          }`}
                        >
                          {month}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="h-56 w-full animate-pulse bg-gray-200 sm:h-64" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Entire Card Clickable */}
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="block"
                  >
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden sm:h-64">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "/blog-sustainable.png";
                        }}
                      />

                      {/* Green Hover Screen */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#075657]/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full border border-white px-5 py-2 text-sm font-semibold text-white">
                          Read Article
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>

                      {/* Date Badge */}
                      <div className="absolute bottom-3 left-3 z-20 rounded bg-[#f2a318] px-3 py-1 text-xs font-bold text-white shadow-sm">
                        {post.date}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex min-h-[100px] flex-1 flex-col p-5">
                      <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-gray-800 transition-colors duration-300 group-hover:text-[#075657]">
                        {post.title}
                      </h3>

                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#075657]">
                        Read More
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500">
                No blogs found for {selectedMonth}.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blogs;