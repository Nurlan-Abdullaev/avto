import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShieldCheck,
  Gauge,
  Fuel,
  Calendar,
  Settings2,
  MapPin,
  Phone,
  Mail,
  Star,
  ChevronDown,
  Eye,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import {
  getApprovedListings,
  isFavorite,
  toggleFavorite,
  type CarListing,
} from "../../utils/storage";
import { getCurrentUser } from "../../utils/auth";

// ── Gallery ───────────────────────────────────────────────────────────────────
function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () =>
    setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="rounded-2xl bg-zinc-900 aspect-[16/9] flex items-center justify-center text-zinc-600">
        No images
      </div>
    );
  }

  return (
    <>
      {/* Main image */}
      <div
        className="relative rounded-2xl overflow-hidden bg-zinc-900 aspect-[16/9] cursor-zoom-in group"
        onClick={() => setLightboxOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx]}
            alt={`${alt} — ${activeIdx + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 text-white text-sm">
            <Eye className="w-4 h-4" />
            <span>View full screen</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-sm font-light tracking-widest">
          {activeIdx + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200
                ${i === activeIdx ? "border-[var(--gold)] opacity-100" : "border-transparent opacity-50 hover:opacity-75"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors text-xl"
              onClick={() => setLightboxOpen(false)}
            >
              ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <motion.img
              key={activeIdx}
              src={images[activeIdx]}
              alt={alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            <div className="absolute bottom-6 text-white/50 text-sm">
              {activeIdx + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Spec Badge ────────────────────────────────────────────────────────────────
function SpecBadge({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/[0.08] hover:border-[var(--gold)]/30 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
        <Icon className="w-5 h-5 text-[var(--gold)]" />
      </div>
      <span className="text-[11px] uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

// ── Accordion ────────────────────────────────────────────────────────────────
function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.08]">
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-base font-medium text-white">{title}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-5 h-5 text-zinc-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-zinc-400 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [car, setCar] = useState<CarListing | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [fav, setFav] = useState(false);
  const [copied, setCopied] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // parallax ready

  const user = getCurrentUser();

  useEffect(() => {
    const listings = getApprovedListings();
    const found = listings.find((c) => c.id === id);
    if (!found) {
      setNotFound(true);
      return;
    }
    setCar(found);
    if (user) setFav(isFavorite(user.id, found.id));
  }, [id]);

  const handleFav = () => {
    if (!car) return;
    if (!user) {
      navigate("/profile");
      return;
    }
    toggleFavorite(user.id, car.id);
    setFav((f) => !f);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  // ── Not found ──
  if (notFound) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Vehicle not found.</p>
          <button
            onClick={() => navigate("/catalog")}
            className="px-6 py-3 rounded-xl bg-[var(--gold)] text-black font-semibold"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  // ── Loading ──
  if (!car) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--gold)] border-t-transparent animate-spin" />
      </div>
    );
  }

  // ── Spec rows ──
  const specs = [
    {
      icon: Gauge,
      label: "Mileage",
      value: `${car.mileage.toLocaleString()} mi`,
    },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: Fuel, label: "Fuel", value: (car as any).fuel ?? "Petrol" },
    { icon: Calendar, label: "Year", value: String(car.year) },
  ];

  const tableRows: [string, string][] = [
    ["Make", car.brand],
    ["Model", car.model],
    ["Year", String(car.year)],
    ["Mileage", `${car.mileage.toLocaleString()} miles`],
    ["Transmission", car.transmission],
    ["Fuel Type", (car as any).fuel ?? "Petrol"],
    ...((car as any).engine
      ? [["Engine", (car as any).engine] as [string, string]]
      : []),
    ...((car as any).exteriorColor
      ? [["Exterior Color", (car as any).exteriorColor] as [string, string]]
      : []),
    ...((car as any).interiorColor
      ? [["Interior Color", (car as any).interiorColor] as [string, string]]
      : []),
    ...((car as any).driveType
      ? [["Drive Type", (car as any).driveType] as [string, string]]
      : []),
    ...((car as any).condition
      ? [["Condition", (car as any).condition] as [string, string]]
      : []),
    ...((car as any).vin
      ? [["VIN", (car as any).vin] as [string, string]]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ── Sticky top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/[0.08]"
      >
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center transition-colors relative"
            >
              <Share2 className="w-4 h-4 text-zinc-400" />
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-zinc-800 text-white px-2 py-1 rounded whitespace-nowrap"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={handleFav}
              className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${fav ? "fill-[var(--gold)] text-[var(--gold)]" : "text-zinc-400"}`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* ── Left ── */}
          <div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                {car.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[var(--gold)] text-black">
                    Featured
                  </span>
                )}
                <span className="text-zinc-500 text-sm uppercase tracking-widest">
                  {(car as any).condition ?? "Pre-owned"}
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {car.brand} {car.model}
              </h1>
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Bishkek, KG</span>
                <span className="mx-2">·</span>
                <Eye className="w-4 h-4" />
                <span>107 views</span>
              </div>
            </motion.div>

            <motion.div
              ref={heroRef}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-6"
            >
              <Gallery
                images={car.images ?? []}
                alt={`${car.brand} ${car.model}`}
              />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h2
                className="text-xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Key Specifications
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {specs.map((s) => (
                  <SpecBadge
                    key={s.label}
                    icon={s.icon}
                    label={s.label}
                    value={s.value}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-10"
            >
              <Accordion title="Description">
                <p>{car.description}</p>
              </Accordion>
              <Accordion title="Full Specifications">
                <div>
                  {tableRows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between py-3 border-b border-white/5 last:border-0"
                    >
                      <span className="text-zinc-500">{label}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
              <Accordion title="Vehicle History & Condition">
                <div className="space-y-3">
                  {[
                    "Clean title — no accidents reported",
                    "Service records available on request",
                    "Pre-sale inspection completed",
                    "Non-smoker vehicle",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
            </motion.div>
          </div>

          {/* ── Right (sticky CTA) ── */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="lg:sticky lg:top-20"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-white/[0.08]">
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-1">
                  Asking Price
                </div>
                <div
                  className="text-4xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ${car.price.toLocaleString()}
                </div>
                <div className="mt-2 text-sm text-zinc-500">
                  Est. ${Math.round(car.price / 60).toLocaleString()}/mo with
                  financing
                </div>
              </div>

              <div className="p-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-700 flex items-center justify-center text-black font-bold text-sm">
                    LA
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Lux Auto Bishkek
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-[var(--gold)] text-[var(--gold)]"
                        />
                      ))}
                      <span className="text-xs text-zinc-500 ml-1">
                        4.9 (128 reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Bishkek, Kyrgyzstan</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-[var(--gold)] text-black text-sm font-bold tracking-wide hover:opacity-90 transition-opacity"
                >
                  Schedule a Test Drive
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl border border-white/15 text-white text-sm font-semibold hover:border-white/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Dealer
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl border border-white/15 text-white text-sm font-semibold hover:border-white/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Send Inquiry
                </motion.button>
              </div>

              <div className="px-6 pb-6 grid grid-cols-3 gap-2">
                {[
                  { icon: ShieldCheck, text: "Verified" },
                  { icon: CheckCircle2, text: "Inspected" },
                  { icon: Star, text: "Top Rated" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white/5 text-center"
                  >
                    <Icon className="w-4 h-4 text-[var(--gold)]" />
                    <span className="text-[10px] text-zinc-500 leading-tight">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
