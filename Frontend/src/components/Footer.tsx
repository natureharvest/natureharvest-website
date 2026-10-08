 import { Link } from "react-router-dom";
import {
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const quickLinks = [
  ["Home", "/"],
  ["Our Story", "/about/our-story"],
  ["Products", "/products"],
  ["Contact Us", "/contact"],
  ["Privacy Policy", "/privacy-policy"],
];

const usefulLinks = [
  ["Blogs", "/blogs"],
  ["FAQs", "/faq"],
  ["Certifications", "/about/certificates"],
  ["BI", "/about/bi"],
  ["Term Conditions", "/terms"],
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-white text-[#075657]">
      {/* Contact Banner */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-bl-[90px] rounded-tr-[90px] bg-[#075657] md:grid-cols-2">
          <div className="flex min-h-[145px] items-center px-8 py-8 sm:px-12">
            <h2 className="max-w-2xl text-2xl font-medium text-white sm:text-3xl">
              Feel free to reach out if you have any question
            </h2>
          </div>

          <a
            href="tel:+918448028999"
            className="group flex min-h-[145px] items-center justify-center bg-[#f2a619] px-8 transition hover:bg-[#eda010]"
          >
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#075657]">
                <Phone className="h-6 w-6 text-[#075657]" />
              </div>

              <p className="text-2xl font-medium text-[#111] transition group-hover:scale-105 sm:text-3xl">
                +91 844 8028 999
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div
          className="
            grid
            grid-cols-2
            gap-x-8
            gap-y-12
            sm:gap-x-10
            lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]
            lg:gap-12
          "
        >
          {/* Logo */}
          <div className="col-span-2 flex items-start justify-center sm:col-span-1 lg:justify-start">
            <Link to="/" className="group">
              <img
                src="https://natureharvest.co.in/logo.png"
                alt="Nature Harvest"
                className="h-auto w-[180px] object-contain"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <FooterColumn
              title="Quick Links"
              links={quickLinks}
            />
          </div>

          {/* Useful Links */}
          <div className="col-span-1">
            <FooterColumn
              title="Useful Link"
              links={usefulLinks}
            />
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-7 text-xl font-bold">
              Contact Info
            </h3>

            <div className="space-y-5 text-[15px] leading-6 text-[#5c6575]">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#075657]" />

                <p>
                  Office No. 741, Emaar Emrald Plaza,
                  <br />
                  Golf Course Ext Rd, Sector 65,
                  <br />
                  Gurugram, Haryana 122018
                </p>
              </div>

              <a
                href="https://wa.me/918448028999"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 transition hover:text-[#075657]"
              >
                <MessageCircle className="h-6 w-6 text-[#075657]" />
                +91 844 8028 999
              </a>

              <a
                href="mailto:info@natureharvest.co.in"
                className="flex items-center gap-4 transition hover:text-[#075657]"
              >
                <Send className="h-6 w-6 text-[#075657]" />
                info@natureharvest.co.in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#e8e1d6]">
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-3
            px-6
            py-5
            text-sm
            text-[#697276]
            sm:flex-row
            lg:px-8
          "
        >
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Nature Harvest. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              to="/privacy-policy"
              className="transition hover:text-[#075657]"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-[#075657]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[][];
}) {
  return (
    <div>
      <h3 className="mb-7 text-xl font-bold">
        {title}
      </h3>

      <div className="space-y-4">
        {links.map(([name, path]) => (
          <Link
            key={path}
            to={path}
            className="
              group
              flex
              items-center
              gap-3
              text-[15px]
              text-[#5c6575]
              transition
              hover:translate-x-1
              hover:text-[#075657]
            "
          >
            <span className="text-[#f2a619] transition group-hover:rotate-12">
              ❯
            </span>

            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Footer;