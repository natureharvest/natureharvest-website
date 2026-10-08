import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";

// ─── Backend URL ─────────────────────────────────────────────────────────────
const BACKEND_URL = (
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_BACKEND_URL ||
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_API_URL ||
  "http://localhost:3000"
).replace(/\/+$/, "");

const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const contactDetails = [
  {
    id: 1,
    icon: MapPin,
    title: "Visit Our Office",
    content: (
      <>
        Office No. 741, Emaar Emerald Plaza,
        <br />
        Golf Course Extension Road, Sector 65,
        <br />
        Gurugram, Haryana 122018
      </>
    ),
  },
  {
    id: 2,
    icon: Mail,
    title: "Send Email",
    content: (
      <a
        href="mailto:info@natureharvest.co.in"
        className="transition-colors hover:text-[#f2a318]"
      >
        info@natureharvest.co.in
      </a>
    ),
  },
  {
    id: 3,
    icon: Phone,
    title: "Call Anytime",
    content: (
      <a
        href="tel:+918448028999"
        className="transition-colors hover:text-[#f2a318]"
      >
        +91 844 8028 999
      </a>
    ),
  },
];

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/email/sendMail`,
        formData
      );

      if (data.success) {
        setStatus({
          type: "success",
          message:
            data.message ||
            "Thank you! Your message has been sent successfully. We will get back to you soon.",
        });
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to send message.",
        });
        toast.error(data.message || "Failed to send message");
      }
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to send message. Please try again later.";
      setStatus({
        type: "error",
        message: errorMsg,
      });
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <ToastContainer position="top-right" autoClose={4000} />

      {/* LOCATION MAP */}
      <section className="px-5 pb-4 pt-10 sm:px-8 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="
              group relative overflow-hidden border border-[#075657]/10 bg-[#075657]
              shadow-[0_20px_50px_rgba(7,86,87,0.18)]
              rounded-tl-[72px] rounded-tr-[32px]
              rounded-bl-[32px] rounded-br-none
            "
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.200494838349!2d77.08814509999999!3d28.413206499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23f6625b4641%3A0xe22439d94ce081ee!2sNature%20Harvest!5e0!3m2!1sen!2sin!4v1789297092612!5m2!1sen!2sin"
              title="Nature Harvest location"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="
                h-[320px] w-full grayscale transition duration-700
                group-hover:grayscale-0 sm:h-[430px] lg:h-[500px]
              "
              style={{ border: 0 }}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#075657]/45 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 max-w-[290px] bg-[#075657] px-6 py-5 text-white sm:px-8 sm:py-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#f2a318]" />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f2a318]">
                    Visit Us
                  </p>

                  <p className="mt-1 text-sm font-medium leading-6 text-white/95">
                    Emaar Emerald Plaza, Sector 65, Gurugram
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* LEFT SIDE */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col"
          >
            <SectionTitle
              label="Contact Now"
              title="Have An Enquiry Or Some Feedback?"
              description="We would love to hear from you. Share your question, feedback, or business enquiry and our team will get back to you as soon as possible."
              align="left"
            />

            <div className="mt-12 flex flex-col gap-8">
              {contactDetails.map(({ id, icon: Icon, title, content }) => (
                <div key={id} className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#075657] text-white shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{title}</p>

                    <div className="mt-1 text-base font-semibold leading-relaxed text-[#075657]">
                      {content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] bg-[#075657] p-7 shadow-xl sm:p-10 lg:p-12">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2a318]">
                  Get In Touch
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Send Us A Message
                </h2>
              </div>

              {/* Status Message Banner */}
              {status && (
                <div
                  className={`mb-6 flex items-start gap-3 rounded-lg p-4 text-sm leading-relaxed ${
                    status.type === "success"
                      ? "border border-green-400/40 bg-green-500/20 text-green-100"
                      : "border border-red-400/40 bg-red-500/20 text-red-100"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    required
                    className="
                      w-full rounded-md bg-white px-4 py-3.5 text-sm text-gray-800
                      outline-none placeholder:text-gray-500
                      focus:ring-2 focus:ring-[#f2a318]
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    className="
                      w-full rounded-md bg-white px-4 py-3.5 text-sm text-gray-800
                      outline-none placeholder:text-gray-500
                      focus:ring-2 focus:ring-[#f2a318]
                    "
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="
                      w-full rounded-md bg-white px-4 py-3.5 text-sm text-gray-800
                      outline-none placeholder:text-gray-500
                      focus:ring-2 focus:ring-[#f2a318]
                    "
                  />

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject *"
                    required
                    className="
                      w-full rounded-md bg-white px-4 py-3.5 text-sm text-gray-800
                      outline-none placeholder:text-gray-500
                      focus:ring-2 focus:ring-[#f2a318]
                    "
                  />
                </div>

                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message *"
                  required
                  className="
                    w-full resize-y rounded-md bg-white px-4 py-4 text-sm text-gray-800
                    outline-none placeholder:text-gray-500
                    focus:ring-2 focus:ring-[#f2a318]
                  "
                />

                <div className="mt-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-black" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
