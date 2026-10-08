import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import Certificates from "./pages/Certificates";
import BI from "./pages/BI";
// import Brochures from "./pages/Brochures";
import Products from "./pages/products";
import ProductDetails from "./pages/ProductDetail";

import Gallery from "./pages/Gallery";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";

import { AppProvider } from "./context/AppContext";
import ProductVariantDetails from "./pages/ProductVarientDetails";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";

import Privacy from "./pages/Privacy";
import TermAndCondition from "./pages/TermAndCondition";
import Login from "./pages/Login";
import DashBord from "./pages/DashBord";
import ProtectedRoute from "./pages/ProtecteRoute";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-white text-gray-900">
          <Navbar />

          <ScrollTop />

          <main className="pt-20">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />
              {/* About */}
              <Route path="/about/our-story" element={<OurStory />} />
              <Route path="/about/certificates" element={<Certificates />} />
              <Route path="/about/bi" element={<BI />} />
              {/* Products */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route
                path="/products/:id/:variantId"
                element={<ProductVariantDetails />}
              />
              {/* Gallery */}
              <Route path="/gallery" element={<Gallery />} />
              {/* Blogs */}
              <Route path="/blogs" element={<Blogs />} />
              {/* Blog Details */}
              <Route path="/blogs/:slug" element={<BlogDetails />} />
              {/* Contact */}
              <Route path="/contact" element={<Contact />} />
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
              {/* Privacy Policy */}
              <Route path="/privacy-policy" element={<Privacy />} />
              {/* FAQ */}
              <Route path="/faq" element={<FAQ />} />
              Term and Conditions
              <Route path="/terms" element={<TermAndCondition />} />
              {/* Admin login */}
              <Route path="/login" element={<Login />} />
              {/* admin DashBoard  */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/dashboard" element={<DashBord />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
