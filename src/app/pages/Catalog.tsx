import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getApprovedListings,
  CarListing,
  isFavorite,
  toggleFavorite,
} from "../../utils/storage";
import { getCurrentUser } from "../../utils/auth";

// ─── Image Carousel ───────────────────────────────────────────────────────────
function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Auto-play: switch every 2.5s when not hovered
  useEffect(() => {
    if (images.length <= 1 || hovered) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images.length, hovered]);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

  const goTo = (i: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(i);
  };

  if (!images || images.length === 0) {
    return <div className="w-full h-full bg-secondary" />;
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-secondary group/carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={current}
          src={images[current]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, x: 60, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        />
      </AnimatePresence>

      {/* Nav buttons — show only if more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                       w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm
                       flex items-center justify-center
                       opacity-0 group-hover/carousel:opacity-100
                       transition-opacity duration-200 hover:bg-black/70"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                       w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm
                       flex items-center justify-center
                       opacity-0 group-hover/carousel:opacity-100
                       transition-opacity duration-200 hover:bg-black/70"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          {/* Counter */}
          <div
            className="absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded-full
                          bg-black/50 backdrop-blur-sm text-white text-xs font-light tracking-widest"
          >
            {current + 1} / {images.length}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => goTo(i, e)}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Catalog ──────────────────────────────────────────────────────────────────
export default function Catalog() {
  const { t } = useTranslation();
  const [listings, setListings] = useState<CarListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<CarListing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    100000, 1000000,
  ]);
  const [yearRange, setYearRange] = useState<[number, number]>([2020, 2024]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [user] = useState(() => getCurrentUser());

  useEffect(() => {
    const cars = getApprovedListings();
    setListings(cars);
    setFilteredListings(cars);

    if (!user) return;

    const favs = new Set<string>();
    cars.forEach((car) => {
      if (isFavorite(user.id, car.id)) favs.add(car.id);
    });
    setFavorites(favs);
  }, [user]);

  useEffect(() => {
    let filtered = listings;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (car) =>
          car.brand.toLowerCase().includes(term) ||
          car.model.toLowerCase().includes(term) ||
          car.description.toLowerCase().includes(term),
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter((car) => car.brand === selectedBrand);
    }

    filtered = filtered.filter(
      (car) => car.price >= priceRange[0] && car.price <= priceRange[1],
    );

    filtered = filtered.filter(
      (car) => car.year >= yearRange[0] && car.year <= yearRange[1],
    );

    setFilteredListings(filtered);
  }, [searchTerm, selectedBrand, priceRange, yearRange, listings]);

  const brands = Array.from(new Set(listings.map((car) => car.brand))).sort();

  const handleToggleFavorite = (carId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = "/profile";
      return;
    }
    toggleFavorite(user.id, carId);
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      if (newFavs.has(carId)) newFavs.delete(carId);
      else newFavs.add(carId);
      return newFavs;
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("luxuryCatalog")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("catalogSubtitle")}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 rounded-lg border border-border hover:border-[var(--gold)] bg-background transition-colors duration-300 flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden md:inline">{t("filterBy")}</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-6 rounded-lg border border-[var(--gold)]/20 bg-gradient-to-br from-secondary/30 to-transparent"
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t("filters")}
                </h3>
                <button
                  onClick={() => {
                    setSelectedBrand("");
                    setPriceRange([100000, 1000000]);
                    setYearRange([2020, 2024]);
                  }}
                  className="text-sm text-[var(--gold)] hover:underline"
                >
                  {t("resetAll")}
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Brand Filter */}
                <div>
                  <label className="block mb-2 text-sm text-muted-foreground">
                    {t("carBrand")}
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                  >
                    <option value="">{t("allBrands")}</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block mb-2 text-sm text-muted-foreground">
                    {t("priceRange")}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="100000"
                      max="1000000"
                      step="10000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block mb-2 text-sm text-muted-foreground">
                    {t("year")}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="2015"
                      max="2024"
                      value={yearRange[0]}
                      onChange={(e) =>
                        setYearRange([parseInt(e.target.value), yearRange[1]])
                      }
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>{yearRange[0]}</span>
                      <span>{yearRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-muted-foreground">
          {filteredListings.length} {t("vehiclesFound")}
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3
              className="text-2xl mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("noResults")}
            </h3>
            <p className="text-muted-foreground">{t("adjustFilters")}</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/car/${car.id}`}
                  className="group block rounded-2xl overflow-hidden border border-border bg-white dark:bg-background hover:shadow-xl transition-all duration-300 relative"
                >
                  {/* ── Carousel ── */}
                  <div className="relative h-56">
                    <ImageCarousel
                      images={car.images ?? []}
                      alt={`${car.brand} ${car.model}`}
                    />

                    {/* Rating badge */}
                    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-1.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                      <span className="text-sm font-semibold text-white">
                        107
                      </span>
                    </div>

                    {car.featured && (
                      <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-lg bg-[var(--gold)] text-white text-xs font-bold">
                        {t("featured")}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className="text-xl font-bold text-gray-900 dark:text-white mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {car.brand} {car.model}
                    </h3>

                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                      <svg
                        width="12"
                        height="14"
                        viewBox="0 0 12 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" />
                        <circle
                          cx="6"
                          cy="5"
                          r="1.2"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                      <span>Bishkek, KG</span>
                    </div>

                    <hr className="border-gray-100 dark:border-border mb-4" />

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="8" cy="8" r="6.5" />
                          <path d="M8 4v4l3 2" />
                          <path d="M4.5 4.5 l1.5 1.5" strokeLinecap="round" />
                        </svg>
                        <span>{car.mileage.toLocaleString()} mi</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="4" cy="4" r="2" />
                          <circle cx="12" cy="4" r="2" />
                          <circle cx="8" cy="12" r="2" />
                          <path
                            d="M4 6v4M12 6v4M8 10V8M4 10h8"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="2" y="3" width="8" height="11" rx="1.5" />
                          <path
                            d="M10 7h1.5a1.5 1.5 0 0 1 1.5 1.5v2a1 1 0 0 0 2 0V6l-2-2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>Petrol</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="1" y="3" width="14" height="11" rx="1.5" />
                          <path
                            d="M1 7h14M5 3V1M11 3V1"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>{car.year}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400">From </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          ${car.price.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/car/${car.id}`;
                        }}
                        className="px-5 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-80 transition-opacity"
                      >
                        View Car
                      </button>
                    </div>
                  </div>

                  {/* Favorite */}
                  <button
                    onClick={(e) => handleToggleFavorite(car.id, e)}
                    className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(car.id)
                          ? "fill-[var(--gold)] text-[var(--gold)]"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
