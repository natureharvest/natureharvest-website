 import { useEffect, useRef, useState } from "react";

// ================= 5 LANGUAGES (yahan se badal sakte hain) =================
// code = Google Translate ka language code
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "Arabic" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
];

const SCRIPT_ID = "google-translate-script";
const HOST_ID = "google_translate_element";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

// Google har translation ke baad "googtrans" cookie set karta hai.
// Isko page load pe hata dete hain -> refresh karne par website English mein khulegi.
const clearTranslateCookie = () => {
  const past = "Thu, 01 Jan 1970 00:00:00 UTC";
  const host = window.location.hostname;
  document.cookie = `googtrans=; expires=${past}; path=/`;
  document.cookie = `googtrans=; expires=${past}; path=/; domain=${host}`;
  document.cookie = `googtrans=; expires=${past}; path=/; domain=.${host}`;
};

// Ye line har page load (refresh) pe ek baar chalti hai
clearTranslateCookie();

let widgetReady = false;

// Google ka widget (hidden) banata hai, jisse asli translation hoti hai
const initWidget = () => {
  if (widgetReady || !window.google?.translate?.TranslateElement) return;
  widgetReady = true;
 

  let host = document.getElementById(HOST_ID);
  if (!host) {
    host = document.createElement("div");
    host.id = HOST_ID;
    host.style.display = "none";
    document.body.appendChild(host);
  }

  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: LANGUAGES.map((l) => l.code).join(","),
      autoDisplay: false,
    },
    HOST_ID
  );
};

// Google ke hidden dropdown ko select karke language badalta hai
const applyLanguage = (code: string, tries = 0) => {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");

  // Combo tabhi ready hai jab uske andar languages ke options aa jayein
  if (combo && combo.options.length > 1) {
    console.log("[Lang] Language badli ja rahi hai:", code);
    combo.value = code;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }

  if (tries < 40) {
    // Script abhi load ho rahi hai, thodi der baad dobara try karo
    setTimeout(() => applyLanguage(code, tries + 1), 250);
  } else {
    console.warn(
      "[Lang] Google Translate ready nahi hua. Net/adblock/VPN check karein."
    );
  }
};

type Props = { className?: string };

const LanguageSwitcher = ({ className = "" }: Props) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Google Translate script ek baar load karo
  useEffect(() => {
    if (window.google?.translate?.TranslateElement) {
      initWidget();
      return;
    }

    window.googleTranslateElementInit = initWidget;

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () =>
        console.error(
          "[Lang] Google script load NAHI hui (net / adblock / VPN block kar raha hai)"
        );
      document.body.appendChild(script);
    }
  }, []);

  // Bahar click ya Escape dabane par dropdown band
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleSelect = (code: string) => {
    setOpen(false);
    if (code === current) return;

    if (code === "en") {
      // English = original page. Cookie hatao aur reload karo (sabse pakka tareeka)
      clearTranslateCookie();
      window.location.reload();
      return;
    }

    applyLanguage(code);
    setCurrent(code);
  };

  const currentLabel = LANGUAGES.find((l) => l.code === current)?.label;

  return (
    // notranslate: Google language ke naam ko translate na kare
    <div
      ref={wrapperRef}
      translate="no"
      className={`notranslate relative ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-[#f2a318] bg-white px-3 py-1.5 text-sm font-medium text-[#075657] transition hover:bg-[#f2a318]/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-4 w-4"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
        <span>{currentLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === current}>
              <button
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-[#f2a318]/10 ${
                  lang.code === current
                    ? "font-semibold text-[#075657]"
                    : "text-gray-700"
                }`}
              >
                {lang.label}
                {lang.code === current && <span className="text-[#f2a318]">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;