import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { type AxiosInstance, type AxiosProgressEvent } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GalleryImage {
  _id?: string;
  id?: string;
  name?: string;
  image?: string;
  [key: string]: unknown;
}

interface ProductDoc {
  _id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  image: string;
  origin: string;
  packaging: string;
  quality: string;
  availability: string;
}

interface VariantDoc {
  _id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  keyFeatures: string[];
  globalQualityStandards: string[];
  qualityStandards: string[];
  rating: number;
  reviews: number;
}

interface BlogDoc {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const BACKEND_URL = (
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_BACKEND_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const LOGIN_ROUTE = "/login";

const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
      '<rect width="100%" height="100%" fill="#e5e7eb"/>' +
      '<text x="50%" y="50%" fill="#9ca3af" font-family="sans-serif" ' +
      'font-size="18" text-anchor="middle" dominant-baseline="middle">No Image</text>' +
      "</svg>"
  );

// ─── Axios factory ────────────────────────────────────────────────────────────
function makeApi(path: string): AxiosInstance {
  const instance = axios.create({ baseURL: BACKEND_URL + path });
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      // Use direct header assignment — works with all axios v1 versions
      config.headers["token"] = token;
    }
    return config;
  });
  return instance;
}

const galleryApi = makeApi("/api/gallery");
const productApi = makeApi("/api/products");
const blogApi = makeApi("/api/blogs");

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Return a safe displayable image URL. Cloudinary https:// URLs are returned as-is. */
function getImageSrc(raw: unknown): string {
  if (!raw || typeof raw !== "string" || !raw.trim()) return FALLBACK_IMG;
  const s = raw.trim();
  // Already an absolute URL or data/blob URI → return directly
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:") || s.startsWith("blob:")) {
    return s;
  }
  // Relative path → prepend backend origin
  return BACKEND_URL + "/" + s.replace(/\\/g, "/").replace(/^\.?\/+/, "");
}

async function compressImage(file: File, maxWidth = 1600, quality = 0.8): Promise<File> {
  if (file.size < 300 * 1024) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, maxWidth / bmp.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    bmp.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (blob && blob.size < file.size) {
      return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", {
        type: "image/jpeg",
      });
    }
    return file;
  } catch {
    return file;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const ImageCard: React.FC<{ src: string; label?: string; onDelete: () => void }> = ({
  src,
  label,
  onDelete,
}) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
    <img
      src={src}
      alt={label || "image"}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FALLBACK_IMG;
      }}
      className="w-full h-44 object-cover"
    />
    <div className="p-3">
      {label && (
        <p className="text-sm font-medium text-gray-700 mb-2" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {label}
        </p>
      )}
      <button
        onClick={onDelete}
        className="text-xs text-red-500 hover:text-red-700 transition font-medium"
      >
        Delete
      </button>
    </div>
  </div>
);

const StatCard: React.FC<{ label: string; value: number; sub: string }> = ({
  label,
  value,
  sub,
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <p className="text-gray-500 text-sm">{label}</p>
    <h2 className="text-4xl font-bold text-gray-900 mt-2">{value}</h2>
    <p className="text-gray-400 text-sm mt-1">{sub}</p>
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
type Tab = "gallery" | "products" | "variants" | "blogs";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("gallery");

  // Gallery
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [galName, setGalName] = useState("");
  const [galImage, setGalImage] = useState<File | null>(null);
  const [galLoading, setGalLoading] = useState(false);
  const [galProgress, setGalProgress] = useState(0);
  const galFormRef = useRef<HTMLFormElement>(null);

  // Products
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [pLoading, setPLoading] = useState(false);
  const pFormRef = useRef<HTMLFormElement>(null);
  const [pForm, setPForm] = useState({
    number: "",
    name: "",
    category: "",
    description: "",
    origin: "India",
    packaging: "Available as per buyer requirement",
    quality: "Premium Export Quality",
    availability: "Global Supply",
  });
  const [pImage, setPImage] = useState<File | null>(null);

  // Variants
  const [variants, setVariants] = useState<VariantDoc[]>([]);
  const [vLoading, setVLoading] = useState(false);
  const vFormRef = useRef<HTMLFormElement>(null);
  const [vForm, setVForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    keyFeatures: "",
    globalQualityStandards: "",
    qualityStandards: "",
    rating: "",
    reviews: "",
  });
  const [vImage, setVImage] = useState<File | null>(null);

  // Blogs
  const [blogs, setBlogs] = useState<BlogDoc[]>([]);
  const [bLoading, setBLoading] = useState(false);
  const bFormRef = useRef<HTMLFormElement>(null);
  const [bForm, setBForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Nature Harvest",
    category: "General",
    tags: "",
  });
  const [bImage, setBImage] = useState<File | null>(null);

  // ── Error handler ──────────────────────────────────────────────────────────
  const handleError = (error: unknown, fallback: string) => {
    const err = error as { response?: { status: number; data?: { message?: string } }; message?: string };
    console.error(fallback, err?.response?.data || err?.message);
    if (err?.response?.status === 401) {
      localStorage.removeItem("adminToken");
      toast.error("Session expired. Please login again");
      navigate(LOGIN_ROUTE);
      return;
    }
    toast.error(err?.response?.data?.message || fallback);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate(LOGIN_ROUTE);
  };

  // ── Gallery ────────────────────────────────────────────────────────────────
  const fetchImages = async () => {
    try {
      const { data } = await galleryApi.get("/listimage");
      if (data.success) setImages(data.images || []);
    } catch (e) {
      handleError(e, "Failed to load images");
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galImage) return void toast.error("Please select an image");
    setGalLoading(true);
    setGalProgress(0);
    try {
      const fd = new FormData();
      fd.append("name", galName);
      fd.append("image1", await compressImage(galImage));
      const { data } = await galleryApi.post("/addimage", fd, {
        onUploadProgress: (ev: AxiosProgressEvent) =>
          ev.total && setGalProgress(Math.round((ev.loaded * 100) / ev.total)),
      });
      if (data.success) {
        toast.success("Image uploaded!");
        setGalName("");
        setGalImage(null);
        galFormRef.current?.reset();
        fetchImages();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (e) {
      handleError(e, "Failed to upload image");
    } finally {
      setGalLoading(false);
      setGalProgress(0);
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const { data } = await galleryApi.post("/removeimage", { id });
      if (data.success) {
        toast.success("Image deleted");
        setImages((prev) => prev.filter((img) => (img._id || img.id) !== id));
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (e) {
      handleError(e, "Failed to delete image");
    }
  };

  // ── Products ───────────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    try {
      const { data } = await productApi.get("/list");
      if (data.success) setProducts(data.products || []);
    } catch (e) {
      handleError(e, "Failed to load products");
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pImage) return void toast.error("Please select an image");
    setPLoading(true);
    try {
      const fd = new FormData();
      (Object.entries(pForm) as [string, string][]).forEach(([k, v]) => fd.append(k, v));
      fd.append("image1", await compressImage(pImage));
      const { data } = await productApi.post("/add", fd);
      if (data.success) {
        toast.success("Product added!");
        setPImage(null);
        pFormRef.current?.reset();
        setPForm({
          number: "", name: "", category: "", description: "",
          origin: "India", packaging: "Available as per buyer requirement",
          quality: "Premium Export Quality", availability: "Global Supply",
        });
        fetchProducts();
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (e) {
      handleError(e, "Failed to add product");
    } finally {
      setPLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { data } = await productApi.post("/remove", { id });
      if (data.success) {
        toast.success("Product deleted");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (e) {
      handleError(e, "Failed to delete product");
    }
  };

  // ── Variants ───────────────────────────────────────────────────────────────
  const fetchVariants = async () => {
    try {
      const { data } = await productApi.get("/variant/list");
      if (data.success) setVariants(data.variants || []);
    } catch (e) {
      handleError(e, "Failed to load variants");
    }
  };

  const handleVariantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vImage) return void toast.error("Please select an image");
    setVLoading(true);
    try {
      const fd = new FormData();
      (Object.entries(vForm) as [string, string][]).forEach(([k, v]) => fd.append(k, v));
      fd.append("image1", await compressImage(vImage));
      const { data } = await productApi.post("/variant/add", fd);
      if (data.success) {
        toast.success("Variant added!");
        setVImage(null);
        vFormRef.current?.reset();
        setVForm({ categoryId: "", name: "", description: "", keyFeatures: "", globalQualityStandards: "", qualityStandards: "", rating: "", reviews: "" });
        fetchVariants();
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (e) {
      handleError(e, "Failed to add variant");
    } finally {
      setVLoading(false);
    }
  };

  const handleDeleteVariant = async (id: string) => {
    try {
      const { data } = await productApi.post("/variant/remove", { id });
      if (data.success) {
        toast.success("Variant deleted");
        setVariants((prev) => prev.filter((v) => v._id !== id));
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (e) {
      handleError(e, "Failed to delete variant");
    }
  };

  // ── Blogs ──────────────────────────────────────────────────────────────────
  const fetchBlogs = async () => {
    try {
      const { data } = await blogApi.get("/list");
      if (data.success) setBlogs(data.blogs || []);
    } catch (e) {
      handleError(e, "Failed to load blogs");
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bImage) return void toast.error("Please select an image");
    setBLoading(true);
    try {
      const fd = new FormData();
      (Object.entries(bForm) as [string, string][]).forEach(([k, v]) => fd.append(k, v));
      fd.append("image1", await compressImage(bImage));
      const { data } = await blogApi.post("/add", fd);
      if (data.success) {
        toast.success("Blog published!");
        setBImage(null);
        bFormRef.current?.reset();
        setBForm({ title: "", excerpt: "", content: "", author: "Nature Harvest", category: "General", tags: "" });
        fetchBlogs();
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (e) {
      handleError(e, "Failed to add blog");
    } finally {
      setBLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      const { data } = await blogApi.post("/remove", { id });
      if (data.success) {
        toast.success("Blog deleted");
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (e) {
      handleError(e, "Failed to delete blog");
    }
  };

  const handleToggleBlog = async (id: string) => {
    try {
      const { data } = await blogApi.post("/toggle-published", { id });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message || "Toggle failed");
      }
    } catch (e) {
      handleError(e, "Failed to toggle blog");
    }
  };

  // ── Init ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate(LOGIN_ROUTE);
      return;
    }
    fetchImages();
    fetchProducts();
    fetchVariants();
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Tabs config ──────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; count: number; sub: string }[] = [
    { id: "gallery",  label: "🖼️ Gallery",         count: images.length,   sub: "images in gallery" },
    { id: "products", label: "📦 Products",         count: products.length, sub: "product categories" },
    { id: "variants", label: "🔖 Variants",         count: variants.length, sub: "product variants" },
    { id: "blogs",    label: "📝 Blogs",            count: blogs.length,    sub: "blog posts" },
  ];

  // ─── Shared input classes ─────────────────────────────────────────────────
  const inputCls = "border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black w-full text-sm";
  const btnPrimary = "bg-black text-white rounded-lg px-5 py-3 font-medium hover:bg-gray-800 transition disabled:opacity-50 text-sm";

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage gallery, products and blogs</p>
          </div>
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="bg-white border border-gray-300 text-gray-800 rounded-lg px-5 py-2.5 font-medium hover:bg-gray-100 transition text-sm"
          >
            Logout
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {tabs.map((t) => (
            <StatCard key={t.id} label={t.label} value={t.count} sub={t.sub} />
          ))}
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition ${
                activeTab === t.id
                  ? "bg-gray-900 text-white shadow"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ══ GALLERY TAB ══════════════════════════════════════════════════════ */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            {/* Add form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-5">Add Gallery Image</h2>
              <form
                ref={galFormRef}
                onSubmit={handleGallerySubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <input
                  id="gallery-name"
                  type="text"
                  placeholder="Image name (optional)"
                  value={galName}
                  onChange={(e) => setGalName(e.target.value)}
                  className={inputCls}
                />
                <input
                  id="gallery-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGalImage(e.target.files?.[0] || null)}
                  className={inputCls}
                />
                <button id="gallery-submit" type="submit" disabled={galLoading} className={btnPrimary}>
                  {galLoading
                    ? galProgress > 0 && galProgress < 100
                      ? `Uploading ${galProgress}%`
                      : "Please wait..."
                    : "Add Image"}
                </button>
              </form>
              {galLoading && (
                <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-black transition-all" style={{ width: `${galProgress}%` }} />
                </div>
              )}
            </div>

            {/* List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-5">
                Gallery Images ({images.length})
              </h2>
              {images.length === 0 ? (
                <p className="text-center py-10 text-gray-400">No images yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {images.map((img, i) => {
                    const id = (img._id || img.id) as string;
                    return (
                      <ImageCard
                        key={id || i}
                        src={getImageSrc(img.image)}
                        label={img.name}
                        onDelete={() => handleDeleteImage(id)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ PRODUCTS TAB ═════════════════════════════════════════════════════ */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Add form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-5">Add Product Category</h2>
              <form
                ref={pFormRef}
                onSubmit={handleProductSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input id="p-number" type="text" placeholder="Number (e.g. 01)" required value={pForm.number}
                  onChange={(e) => setPForm({ ...pForm, number: e.target.value })} className={inputCls} />
                <input id="p-name" type="text" placeholder="Product name" required value={pForm.name}
                  onChange={(e) => setPForm({ ...pForm, name: e.target.value })} className={inputCls} />
                <input id="p-category" type="text" placeholder="Category" required value={pForm.category}
                  onChange={(e) => setPForm({ ...pForm, category: e.target.value })} className={inputCls} />
                <input id="p-origin" type="text" placeholder="Origin" value={pForm.origin}
                  onChange={(e) => setPForm({ ...pForm, origin: e.target.value })} className={inputCls} />
                <input id="p-quality" type="text" placeholder="Quality" value={pForm.quality}
                  onChange={(e) => setPForm({ ...pForm, quality: e.target.value })} className={inputCls} />
                <input id="p-availability" type="text" placeholder="Availability" value={pForm.availability}
                  onChange={(e) => setPForm({ ...pForm, availability: e.target.value })} className={inputCls} />
                <textarea id="p-description" placeholder="Description" required rows={3} value={pForm.description}
                  onChange={(e) => setPForm({ ...pForm, description: e.target.value })}
                  className={inputCls + " md:col-span-2 resize-none"} />
                <input id="p-packaging" type="text" placeholder="Packaging" value={pForm.packaging}
                  onChange={(e) => setPForm({ ...pForm, packaging: e.target.value })} className={inputCls} />
                <input id="p-image" type="file" accept="image/*" required
                  onChange={(e) => setPImage(e.target.files?.[0] || null)} className={inputCls} />
                <button id="p-submit" type="submit" disabled={pLoading}
                  className={btnPrimary + " md:col-span-2"}>
                  {pLoading ? "Adding..." : "Add Product"}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-5">Product List ({products.length})</h2>
              {products.length === 0 ? (
                <p className="text-center py-10 text-gray-400">No products yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-gray-500 text-xs uppercase tracking-wide">
                        <th className="pb-3 pr-4">Image</th>
                        <th className="pb-3 pr-4">No.</th>
                        <th className="pb-3 pr-4">Name</th>
                        <th className="pb-3 pr-4">Category</th>
                        <th className="pb-3 pr-4">Origin</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 pr-4">
                            <img src={getImageSrc(p.image)} alt={p.name}
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
                              className="w-12 h-12 rounded-lg object-cover" />
                          </td>
                          <td className="py-3 pr-4 text-gray-500">{p.number}</td>
                          <td className="py-3 pr-4 font-medium">{p.name}</td>
                          <td className="py-3 pr-4 text-gray-500">{p.category}</td>
                          <td className="py-3 pr-4 text-gray-500">{p.origin}</td>
                          <td className="py-3">
                            <button onClick={() => handleDeleteProduct(p._id)}
                              className="text-red-500 hover:text-red-700 font-medium text-xs transition">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ VARIANTS TAB ═════════════════════════════════════════════════════ */}
        {activeTab === "variants" && (
          <div className="space-y-6">
            {/* Add form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-2">Add Product Variant</h2>
              <p className="text-sm text-gray-400 mb-5">
                Link a variant to a product using the Product's MongoDB <code className="bg-gray-100 px-1 rounded">_id</code>.
                Comma-separate multiple features/standards.
              </p>
              <form
                ref={vFormRef}
                onSubmit={handleVariantSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input id="v-categoryId" type="text" placeholder="Category ID (Product _id)" required value={vForm.categoryId}
                  onChange={(e) => setVForm({ ...vForm, categoryId: e.target.value })} className={inputCls} />
                <input id="v-name" type="text" placeholder="Variant name" required value={vForm.name}
                  onChange={(e) => setVForm({ ...vForm, name: e.target.value })} className={inputCls} />
                <textarea id="v-description" placeholder="Description" required rows={3} value={vForm.description}
                  onChange={(e) => setVForm({ ...vForm, description: e.target.value })}
                  className={inputCls + " md:col-span-2 resize-none"} />
                <input id="v-keyFeatures" type="text" placeholder="Key features (comma separated)" value={vForm.keyFeatures}
                  onChange={(e) => setVForm({ ...vForm, keyFeatures: e.target.value })}
                  className={inputCls + " md:col-span-2"} />
                <input id="v-globalQuality" type="text" placeholder="Global quality standards (comma separated)" value={vForm.globalQualityStandards}
                  onChange={(e) => setVForm({ ...vForm, globalQualityStandards: e.target.value })} className={inputCls} />
                <input id="v-qualityStandards" type="text" placeholder="Quality standards (e.g. Steam, Golden)" value={vForm.qualityStandards}
                  onChange={(e) => setVForm({ ...vForm, qualityStandards: e.target.value })} className={inputCls} />
                <input id="v-rating" type="number" step="0.1" min="0" max="5" placeholder="Rating (e.g. 4.5)" value={vForm.rating}
                  onChange={(e) => setVForm({ ...vForm, rating: e.target.value })} className={inputCls} />
                <input id="v-reviews" type="number" placeholder="Reviews count" value={vForm.reviews}
                  onChange={(e) => setVForm({ ...vForm, reviews: e.target.value })} className={inputCls} />
                <input id="v-image" type="file" accept="image/*" required
                  onChange={(e) => setVImage(e.target.files?.[0] || null)} className={inputCls} />
                <button id="v-submit" type="submit" disabled={vLoading} className={btnPrimary}>
                  {vLoading ? "Adding..." : "Add Variant"}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-5">Variant List ({variants.length})</h2>
              {variants.length === 0 ? (
                <p className="text-center py-10 text-gray-400">No variants yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-gray-500 text-xs uppercase tracking-wide">
                        <th className="pb-3 pr-4">Image</th>
                        <th className="pb-3 pr-4">Name</th>
                        <th className="pb-3 pr-4">Category ID</th>
                        <th className="pb-3 pr-4">Rating</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((v) => (
                        <tr key={v._id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 pr-4">
                            <img src={getImageSrc(v.image)} alt={v.name}
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
                              className="w-12 h-12 rounded-lg object-cover" />
                          </td>
                          <td className="py-3 pr-4 font-medium">{v.name}</td>
                          <td className="py-3 pr-4 text-gray-400 font-mono text-xs break-all">{v.categoryId}</td>
                          <td className="py-3 pr-4 text-gray-500">⭐ {v.rating}</td>
                          <td className="py-3">
                            <button onClick={() => handleDeleteVariant(v._id)}
                              className="text-red-500 hover:text-red-700 font-medium text-xs transition">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ BLOGS TAB ════════════════════════════════════════════════════════ */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            {/* Add form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-5">Add Blog Post</h2>
              <form
                ref={bFormRef}
                onSubmit={handleBlogSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input id="b-title" type="text" placeholder="Blog title" required value={bForm.title}
                  onChange={(e) => setBForm({ ...bForm, title: e.target.value })}
                  className={inputCls + " md:col-span-2"} />
                <input id="b-author" type="text" placeholder="Author" value={bForm.author}
                  onChange={(e) => setBForm({ ...bForm, author: e.target.value })} className={inputCls} />
                <input id="b-category" type="text" placeholder="Category" value={bForm.category}
                  onChange={(e) => setBForm({ ...bForm, category: e.target.value })} className={inputCls} />
                <input id="b-tags" type="text" placeholder="Tags (comma separated)" value={bForm.tags}
                  onChange={(e) => setBForm({ ...bForm, tags: e.target.value })}
                  className={inputCls + " md:col-span-2"} />
                <textarea id="b-excerpt" placeholder="Short excerpt / summary" required rows={2} value={bForm.excerpt}
                  onChange={(e) => setBForm({ ...bForm, excerpt: e.target.value })}
                  className={inputCls + " md:col-span-2 resize-none"} />
                <textarea id="b-content" placeholder="Full blog content (HTML or plain text)" required rows={6} value={bForm.content}
                  onChange={(e) => setBForm({ ...bForm, content: e.target.value })}
                  className={inputCls + " md:col-span-2 resize-none"} />
                <input id="b-image" type="file" accept="image/*" required
                  onChange={(e) => setBImage(e.target.files?.[0] || null)} className={inputCls} />
                <button id="b-submit" type="submit" disabled={bLoading} className={btnPrimary}>
                  {bLoading ? "Publishing..." : "Publish Blog"}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-5">Blog List ({blogs.length})</h2>
              {blogs.length === 0 ? (
                <p className="text-center py-10 text-gray-400">No blogs yet.</p>
              ) : (
                <div className="space-y-4">
                  {blogs.map((b) => (
                    <div key={b._id}
                      className="flex gap-4 items-start border border-gray-100 rounded-xl p-4 hover:bg-gray-50">
                      <img src={getImageSrc(b.image)} alt={b.title}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
                        className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {b.title}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            {b.published ? "Published" : "Draft"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {b.author} · {b.category} · {new Date(b.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1"
                          style={{ overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                          {b.excerpt}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 font-mono">/{b.slug}</p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0 text-right">
                        <button onClick={() => handleToggleBlog(b._id)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium transition">
                          {b.published ? "Unpublish" : "Publish"}
                        </button>
                        <button onClick={() => handleDeleteBlog(b._id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium transition">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
