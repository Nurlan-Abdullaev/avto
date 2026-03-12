import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Heart, X } from "lucide-react";
import {
  getApprovedListings,
  CarListing,
  isFavorite,
  toggleFavorite,
} from "../../utils/storage";
import { getCurrentUser } from "../../utils/auth";

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
  const [price, setPrice] = useState("");

  useEffect(() => {
    const cars = getApprovedListings();
    setListings(cars);
    setFilteredListings(cars);

    if (!user) return;

    const favs = new Set<string>();

    cars.forEach((car) => {
      if (isFavorite(user.id, car.id)) {
        favs.add(car.id);
      }
    });

    setFavorites(favs);
  }, [user]);

  useEffect(() => {
    let filtered = listings;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();

      filtered = filtered.filter((car) => {
        const brand = car.brand.toLowerCase();
        const model = car.model.toLowerCase();
        const desc = car.description.toLowerCase();

        return (
          brand.includes(term) || model.includes(term) || desc.includes(term)
        );
      });
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter((car) => car.brand === selectedBrand);
    }

    // Price filter
    filtered = filtered.filter(
      (car) => car.price >= priceRange[0] && car.price <= priceRange[1],
    );

    // Year filter
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
      if (newFavs.has(carId)) {
        newFavs.delete(carId);
      } else {
        newFavs.add(carId);
      }
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
          {/* Search Bar */}
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
                  className="group block rounded-2xl overflow-hidden border border-[var(--gold)]/20 hover:border-[var(--gold)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--gold)]/20 relative"
                >
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => handleToggleFavorite(car.id, e)}
                    className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors duration-300"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(car.id)
                          ? "fill-[var(--gold)] text-[var(--gold)]"
                          : "text-white"
                      }`}
                    />
                  </button>

                  <div className="relative h-64 overflow-hidden bg-secondary">
                    <img
                      src={car.images[0]}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {car.featured && (
                      <div className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-[var(--gold)] text-white text-sm font-bold">
                        {t("featured")}
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-gradient-to-br from-background to-secondary/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className="text-2xl"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {car.brand}
                      </h3>
                      <span className="text-[var(--gold)]">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">{car.model}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{car.year}</span>
                      <span>{car.mileage.toLocaleString()} mi</span>
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
