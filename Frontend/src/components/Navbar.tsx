import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
const aboutLinks = [
  { name: "Our Story", path: "/about/our-story" },
  { name: "Certificates", path: "/about/certificates" },
  { name: "BI", path: "/about/bi" },
  { name: "Download Brochures", path: "/pdfs/Nature Harvest -Catalogue.pdf" },
];

const brochureLinks = [
  { name: "Catalogue", path: "/pdfs/Nature Harvest -Catalogue.pdf" },
  { name: "B2B Catalogue", path: "/pdfs/N.H - B2B Catalogue 2no.pdf" },
  {
    name: "Power Brand Catalogue",
    path: "/pdfs/N.H - Power Brand  Catalogue 3no.pdf",
  },
  {
    name: "Corporate Presentation",
    path: "/pdfs/N.H - Corporate Presentation 4no.pdf",
  },
  { name: "Rice Catalogue", path: "/pdfs/N.H - Rice Catalogue 5no.pdf" },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-[17px] font-medium transition-colors duration-200 ${
    isActive ? "text-[#075657]" : "text-[#075657] hover:text-[#f2a619]"
  }`;

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileAbout(false);
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobile}
            className="flex shrink-0 items-center"
          >
            <img
              src="https://natureharvest.co.in/logo.png"
              alt="Nature Harvest"
              className="h-[72px] w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-9 lg:flex">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            {/* About */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                type="button"
                className="text-[17px] font-medium text-[#075657] transition hover:text-[#f2a619]"
              >
                About Us
              </button>

              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full mt-5 w-[265px] -translate-x-1/2 rounded-2xl bg-white py-2 shadow-[0_10px_35px_rgba(0,0,0,0.12)]"
                  >
                    {/* Dropdown top pointer */}
                    <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />

                    {aboutLinks.map((item) =>
                      item.name === "Download Brochures" ? (
                        <div key={item.path} className="group relative">
                          <Link
                            to={item.path}
                            className="block px-6 py-4 text-[17px] font-medium text-[#075657] transition-colors duration-200 group-hover:bg-[#f2a619] group-hover:text-white"
                          >
                            {item.name}
                          </Link>

                          {/* Brochure Submenu */}
                          <div className="invisible absolute left-full top-0 w-[325px] rounded-2xl bg-white py-2 opacity-0 shadow-[0_10px_35px_rgba(0,0,0,0.12)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
                            {brochureLinks.map((brochure) => (
                              <a
                                key={brochure.path}
                                href={brochure.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-6 py-4 text-[17px] font-medium text-[#075657] transition-colors duration-200 hover:bg-[#f2a619] hover:text-white"
                              >
                                {brochure.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-6 py-4 text-[17px] font-medium text-[#075657] transition-colors duration-200 hover:bg-[#f2a619] hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ),
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products */}
            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>

            {/* Gallery */}
            <NavLink to="/gallery" className={navClass}>
              Gallery
            </NavLink>

            <NavLink to="/blogs" className={navClass}>
              Blogs
            </NavLink>

            <NavLink to="/contact" className={navClass}>
              Contact Us
            </NavLink>
            <NavLink to="/login" className={navClass}>
              Admin
            </NavLink>
            <div className="text-[17px] font-medium text-[#075657] transition hover:text-[#f2a619]">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-[#d8c8ad] lg:hidden"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <motion.span
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 8 : 0,
                }}
                className="h-0.5 w-full bg-[#075657]"
              />

              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="h-0.5 w-full bg-[#075657]"
              />

              <motion.span
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? -8 : 0,
                }}
                className="h-0.5 w-full bg-[#075657]"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="fixed left-0 right-0 top-[78px] z-50 max-h-[calc(100vh-78px)] overflow-y-auto bg-white px-6 py-5 shadow-xl lg:hidden"
            >
              <nav className="flex flex-col">
                <Link
                  to="/"
                  onClick={closeMobile}
                  className="border-b border-gray-200 py-4 font-bold text-[#075657]"
                >
                  Home
                </Link>

                {/* Mobile About */}
                <div className="border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => setMobileAbout((p) => !p)}
                    className="flex w-full justify-between py-4 font-bold text-[#075657]"
                  >
                    About Us
                    <span>{mobileAbout ? "−" : "+"}</span>
                  </button>

                  <AnimatePresence>
                    {mobileAbout && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-2"
                      >
                        {aboutLinks.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeMobile}
                            className="block py-3 pl-4 text-sm font-medium text-[#52615e]"
                          >
                            {item.name}
                          </Link>
                        ))}

                        <div className="ml-4 border-l border-[#f2a619] pl-4">
                          {brochureLinks.map((item) => (
                            <a
                              key={item.path}
                              href={item.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={closeMobile}
                              className="block py-2 text-sm text-[#52615e]"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Products */}
                <Link
                  to="/products"
                  onClick={closeMobile}
                  className="border-b border-gray-200 py-4 font-bold text-[#075657]"
                >
                  Products
                </Link>

                {/* Gallery */}
                <Link
                  to="/gallery"
                  onClick={closeMobile}
                  className="border-b border-gray-200 py-4 font-bold text-[#075657]"
                >
                  Gallery
                </Link>

                <Link
                  to="/blogs"
                  onClick={closeMobile}
                  className="border-b border-gray-200 py-4 font-bold text-[#075657]"
                >
                  Blogs
                </Link>

                <Link
                  to="/contact"
                  onClick={closeMobile}
                  className="border-b border-gray-200 py-4 font-bold text-[#075657]"
                >
                  Contact Us
                </Link>

                <div className="py-4 text-left font-bold text-[#075657]">
                  <LanguageSwitcher />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
