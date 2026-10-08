 import { motion } from "framer-motion";
import SectionTitle from "../SectionTitle";
import BlogCard from "../BlogCard";

const blogs = [
  {
    slug: "growing-demand-for-millets",
    title: "The Growing Demand for Millets in the Global Market",
    description:
      "Explore the growing global demand for millets and their importance in healthy and sustainable food systems.",
    image: "/blog-millets.png",
    date: "03 FEB",
    category: "Agriculture",
  },
  {
    slug: "choose-right-rice",
    title: "How to Choose the Right Rice for Your Needs",
    description:
      "Learn how to choose the right rice based on quality, texture, aroma, cooking style, and your specific requirements.",
    image: "/blog-rice.png",
    date: "23 JAN",
    category: "Rice",
  },
  {
    slug: "sustainable-agricultural-products",
    title: "The Benefits of Sourcing Sustainable Agricultural Products",
    description:
      "Discover why sustainable sourcing matters and how responsible agricultural practices create long-term value.",
    image: "/blog-sustainable.png",
    date: "23 JAN",
    category: "Sustainability",
  },
];

const BlogsSection = () => {
  return (
    <section className="overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle
              label="News & Blogs"
              title="Featured News & Blogs"
              align="left"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl text-base leading-7 text-[#075657] lg:pt-8"
          >
            Stay updated with the latest news and insights from the world of
            agriculture. Explore our featured blogs on sustainable farming,
            healthy eating, and market trends, and discover how Nature Harvest
            is shaping the future of agri-exports.
          </motion.p>
        </div>

        {/* Blog Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.slug}
              {...blog}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;