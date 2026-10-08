import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

type Social = {
  name: string;
  href: string;
  bg: string;
  icon: string;
};

type Contact = {
  name: string;
  href: string;
  icon: string;
  external?: boolean;
};

const socials: Social[] = [
  { name: "Facebook", href: "https://www.facebook.com/people/Nature-Harvest/61572611409322/", bg: "#1877F2", icon: "f" },
  { name: "Twitter", href: "https://x.com/NatureHarvestIn", bg: "#111", icon: "𝕏" },
  {
    name: "Instagram",
    href: "https://www.instagram.com/natureharvest.in/",
    bg: "#E1306C",
    icon: "◎",
  },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/achinta-banerjie-83a158a/", bg: "#0077B5", icon: "in" },
  { name: "YouTube", href: "https://www.youtube.com/@NatureHarvestIndia", bg: "#FF0000", icon: "▶" },
];

const contacts: Contact[] = [
  { name: "Call Us", href: "tel:+918448028999", icon: "☎" },
  {
    name: "WhatsApp",
    href: "https://wa.me/918448028999",
    icon: "◉",
    external: true,
  },
  {
    name: "Email Us",
    href: "mailto:info@natureharvest.co.in",
    icon: "✉",
  },
  { name: "Send Enquiry", href: "/contact", icon: "▤" },
];

const stats = [
  ["100%", "Quality"],
  ["Global", "Reach"],
  ["Farm", "Sourced"],
];

const Hero = () => {
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#eef5f4]">
      {/* Background Decorations */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#f2a318]/10 blur-3xl" />
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#00595d]/5 blur-3xl" />

      {/* Hero Container */}
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1500px] items-center px-5 py-12 sm:px-8 lg:px-10 xl:px-14">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-16">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[380px] w-full overflow-hidden rounded-tr-[95px] rounded-bl-[95px] bg-black shadow-[0_25px_60px_rgba(0,70,70,0.15)] sm:h-[450px] lg:h-[500px] xl:h-[540px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              >
                <source
                  src="https://natureharvest.co.in/videos/2.mp4"
                  type="video/mp4"
                />
              </video>

              <div className="absolute inset-0 bg-gradient-to-tr from-[#003f42]/20 via-transparent to-white/10" />
 
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-[620px]"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#e99c00] sm:text-sm">
                QUALITY AGRO EXPORT
              </span>
            </div>

            <h1 className="text-[38px] font-bold leading-[1.08] tracking-[-1.5px] text-[#00595d] sm:text-[48px] lg:text-[52px] xl:text-[57px]">
              Sustainably Sourced,
              <span className="mt-1 block">
                <span className="relative inline-block">Globally Trusted</span>
              </span>
            </h1>

            <p className="mt-7 max-w-[590px] text-[16px] leading-[1.8] text-[#145e61] sm:text-[18px]">
              Delivering the finest agricultural products from India to the
              world with unmatched quality and trust. Every grain, every spice —
              carefully sourced, rigorously tested, and expertly delivered.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <p className="text-base font-medium text-[#d99300] sm:text-lg">
                Nature Harvest — where purity meets performance.
              </p>
            </div>

            {/* Buttons */}
<div className="mt-8 flex w-full flex-nowrap items-center justify-center gap-2 px-3 sm:ml-8 sm:w-auto sm:justify-start sm:gap-4 sm:px-0">
  <Button
    to="/products"
    className="flex-1 justify-center whitespace-nowrap !px-3 !py-2 text-center !text-xs hover:!text-[#ffffff] sm:flex-none sm:!px-8 sm:!py-3 sm:!text-base"
  >
    Our Products
  </Button>

  <Button
    to="/about/our-story"
    className="flex-1 justify-center whitespace-nowrap border-2 border-[#f2a318] bg-white/30 !px-3 !py-2 text-center !text-xs !text-[#00595d] hover:!bg-[#f2a318] hover:!text-black sm:flex-none sm:!px-8 sm:!py-3 sm:!text-base"
  >
    Our Story
  </Button>
</div>

            {/* Stats */}
            <div className="mt-8 ml-8 items-center flex flex-wrap gap-6 border-t border-[#00595d]/10 pt-6">
              {stats.map(([value, label], index) => (
                <div key={label} className="flex items-center gap-6">
                  {index > 0 && <span className="h-10 w-px bg-[#00595d]/15" />}

                  <div>
                    <p className="text-2xl font-bold text-[#00595d]">{value}</p>

                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#557b7b]">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Media */}
      <div className="fixed right-0 top-1/2 z-[80] flex -translate-y-1/2 flex-col overflow-hidden rounded-l-md shadow-lg">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={social.name}
            className="flex h-8 w-8 items-center justify-center text-white transition-all hover:w-12 sm:h-12 sm:w-12"
            style={{ backgroundColor: social.bg }}
          >
            <span className="text-xs font-bold sm:text-base">
              {social.icon}
            </span>
          </a>
        ))}
      </div>

      {/* Connect Now */}
      <div className="fixed bottom-5 right-5 z-[100]">
        <div
          className={`absolute bottom-[72px] right-0 flex flex-col items-end gap-3 transition-all duration-500 ${
            connectOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-8 opacity-0"
          }`}
        >
          {contacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noreferrer" : undefined}
              className="group flex items-center gap-3 transition duration-300 hover:-translate-x-1"
            >
              {/* <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#00595d] shadow-lg">
                {contact.name}
              </span> */}

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6a51b] text-xl text-white shadow-lg transition group-hover:scale-110 sm:h-14 sm:w-14">
                {contact.icon}
              </span>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setConnectOpen((open) => !open)}
          aria-expanded={connectOpen}
          className="flex h-12 min-w-[140px] items-center justify-center gap-2 rounded-lg bg-[#f6a51b] px-4 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#ee9f0d] active:scale-95 sm:h-13 sm:min-w-[170px] sm:px-5 sm:text-base"
        >
          <span className="text-lg">{connectOpen ? "×" : ""}</span>

          {connectOpen ? "Close" : "Connect Now"}
        </button>
      </div>
    </section>
  );
};

export default Hero;
