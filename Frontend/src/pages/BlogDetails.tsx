import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Breadcrumb from "../components/Breadcrub";
import Button from "../components/Button";

// ─── Backend URL & Helpers ───────────────────────────────────────────────────
const BACKEND_URL = (
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_BACKEND_URL ||
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_API_URL ||
  "http://localhost:3000"
).replace(/\/+$/, "");

type BlogItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  day: string;
  month: string;
  category: string;
  content: string[];
};

const staticBlogs: BlogItem[] = [
  {
    slug: "growing-demand-for-millets",
    title: "The Growing Demand for Millets in the Global Market",
    description:
      "Explore the growing global demand for millets and their importance in healthy and sustainable food systems.",
    image: "https://natureharvest.co.in/blog-millets.png",
    date: "03 February, 2025",
    day: "03",
    month: "FEB",
    category: "Agriculture",
    content: [
      "Millets are becoming increasingly important in the global food market because of their nutritional value and versatility.",
      "As consumers become more conscious about healthy and sustainable food choices, the demand for millet-based products continues to grow.",
      "Millets can play an important role in building resilient food systems while supporting farmers and sustainable agricultural practices.",
    ],
  },
  {
    slug: "choose-right-rice",
    title: "How to Choose the Right Rice for Your Needs",
    description:
      "Learn how to choose the right rice based on quality, texture, aroma, cooking style, and your specific requirements.",
    image: "https://natureharvest.co.in/blog-rice.png",
    date: "23 January, 2025",
    day: "23",
    month: "JAN",
    category: "Rice",
    content: [
      "Choosing the right rice starts with understanding the characteristics that matter for your intended use.",
      "Different varieties offer different textures, aromas, grain lengths, and cooking properties. These differences make certain varieties better suited for particular dishes and markets.",
      "Quality, consistency, aroma, appearance, and cooking performance are important factors when selecting rice for everyday consumption or commercial requirements.",
    ],
  },
  {
    slug: "sustainable-agricultural-products",
    title: "The Benefits of Sourcing Sustainable Agricultural Products",
    description:
      "Discover why sustainable sourcing matters and how responsible agricultural practices create long-term value.",
    image: "https://natureharvest.co.in/blog-sustainable.png",
    date: "23 January, 2025",
    day: "23",
    month: "JAN",
    category: "Sustainability",
    content: [
      "Sustainable agricultural sourcing focuses on creating long-term value while using natural resources responsibly.",
      "Responsible sourcing can support farmers, encourage better agricultural practices, and help create more resilient supply chains.",
      "For businesses and consumers, choosing sustainably sourced agricultural products is an important step toward a more responsible food system.",
    ],
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

const parseDate = (createdAt?: string, fallbackDate = "03 February, 2025") => {
  if (!createdAt) {
    return { day: "03", month: "FEB", fullDate: fallbackDate };
  }
  const d = new Date(createdAt);
  if (isNaN(d.getTime())) {
    const parts = createdAt.trim().split(/\s+/);
    return {
      day: parts[0] || "01",
      month: (parts[1] || "JAN").slice(0, 3).toUpperCase(),
      fullDate: createdAt,
    };
  }
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const fullDate = `${day} ${d.toLocaleString("en-US", { month: "long" })}, ${d.getFullYear()}`;
  return { day, month, fullDate };
};

const parseContent = (contentRaw: unknown, fallbackExcerpt?: string): string[] => {
  if (Array.isArray(contentRaw)) {
    return contentRaw.map(String).filter((s) => s.trim().length > 0);
  }
  if (typeof contentRaw === "string" && contentRaw.trim()) {
    return contentRaw
      .split(/\r?\n\r?\n|\r?\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }
  if (fallbackExcerpt) {
    return [fallbackExcerpt];
  }
  return [];
};

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogItem[]>(staticBlogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (!slug) {
      setLoading(false);
      return;
    }

    // 1. Fetch the single blog
    const fetchSingle = axios
      .get(`${BACKEND_URL}/api/blogs/${encodeURIComponent(slug)}`)
      .then(({ data }) => {
        if (!isMounted) return null;
        if (data.success && data.blog) {
          const b = data.blog;
          const { day, month, fullDate } = parseDate(b.createdAt);
          const mapped: BlogItem = {
            slug: b.slug || b._id,
            title: b.title,
            description: b.excerpt || b.title,
            image: getImageSrc(b.image),
            date: fullDate,
            day,
            month,
            category: b.category || "General",
            content: parseContent(b.content, b.excerpt),
          };
          return mapped;
        }
        return null;
      })
      .catch((err) => {
        console.warn("Could not fetch blog from backend by slug:", err?.message);
        return null;
      });

    // 2. Fetch all blogs for "Related Blogs" section
    const fetchList = axios
      .get(`${BACKEND_URL}/api/blogs/list`)
      .then(({ data }) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
          const mappedList: BlogItem[] = data.blogs.map((b: {
            _id?: string;
            slug?: string;
            title: string;
            excerpt?: string;
            image?: string;
            createdAt?: string;
            category?: string;
            content?: unknown;
          }) => {
            const { day, month, fullDate } = parseDate(b.createdAt);
            return {
              slug: b.slug || b._id || "",
              title: b.title,
              description: b.excerpt || b.title,
              image: getImageSrc(b.image),
              date: fullDate,
              day,
              month,
              category: b.category || "General",
              content: parseContent(b.content, b.excerpt),
            };
          });
          setAllBlogs(mappedList);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch blog list:", err?.message);
      });

    Promise.all([fetchSingle, fetchList]).then(([foundBlog]) => {
      if (!isMounted) return;
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        // Fallback: check static blogs
        const local = staticBlogs.find((item) => item.slug === slug);
        setBlog(local || null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <>
        <Breadcrumb title="Blog Details" backgroundImage="/images/breadcrumb.jpg" />
        <section className="overflow-hidden bg-white px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="h-[280px] w-full animate-pulse rounded-tl-[70px] rounded-br-[70px] bg-gray-200 sm:h-[400px] lg:h-[500px]" />
            <div className="mx-auto max-w-4xl pt-10 space-y-4">
              <div className="h-6 w-32 animate-pulse rounded-full bg-gray-200" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Breadcrumb title="Blog Details" />

        <section className="px-5 py-20 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-[#075b5b]">
              Blog Not Found
            </h1>

            <p className="mt-4 text-gray-600">
              The blog you are looking for does not exist.
            </p>

            <div className="mt-8">
              <Button to="/blogs">Back to Blogs</Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  const relatedBlogs = allBlogs
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 2);

  return (
    <>
      <Breadcrumb
        title="Blog Details"
        backgroundImage="/images/breadcrumb.jpg"
      />

      <section className="overflow-hidden bg-white px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[280px] overflow-hidden rounded-tl-[70px] rounded-br-[70px] sm:h-[400px] lg:h-[500px]"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/blog-sustainable.png";
              }}
            />

            <div className="absolute inset-0 bg-[#075b5b]/10" />

            {/* Date */}
            <div className="absolute bottom-0 left-0 flex h-[78px] w-[78px] flex-col items-center justify-center rounded-tr-[28px] bg-[#00595d] text-white shadow-lg">
              <span className="text-2xl font-bold leading-none">
                {blog.day}
              </span>

              <span className="mt-1 text-xs font-semibold uppercase">
                {blog.month}
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto max-w-4xl pt-10"
          >
            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-[#fbe4b8] px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#075b5b]">
                {blog.category}
              </span>

              <span className="text-sm font-medium text-gray-500">
                {blog.date}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#075b5b] sm:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {blog.description}
            </p>

            <div className="mt-8 h-[3px] w-20 rounded-full bg-[#f2a318]" />

            <div className="mt-8 space-y-6">
              {blog.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-8 text-gray-700 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Back Button */}
            <div className="mt-10">
              <Button to="/blogs">← Back to Blogs</Button>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="bg-[#f7f8f5] px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="inline-flex min-h-[42px] items-center rounded-tl-[28px] rounded-tr-[28px] bg-[#fbe4b8] px-7 py-2.5 text-[15px] font-medium uppercase tracking-[0.05em] text-[#173f40]">
                Explore More
              </span>

              <h2 className="mt-5 text-3xl font-bold text-[#075b5b] sm:text-4xl">
                Related Blogs
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.slug}
                  to={`/blogs/${item.slug}`}
                  className="group overflow-hidden rounded-tl-[45px] rounded-br-[45px] bg-white shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="h-[220px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/blog-sustainable.png";
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#f2a318]">
                      {item.category}
                    </span>

                    <h3 className="mt-2 text-xl font-bold leading-snug text-[#075b5b]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-2">
                      {item.description}
                    </p>

                    <span className="mt-4 inline-block text-sm font-bold text-[#075b5b]">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogDetails;