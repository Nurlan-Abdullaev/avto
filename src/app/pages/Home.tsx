import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Shield, Award } from "lucide-react";
import EntryModal from "../components/EntryModal";
import { getFeaturedListings, CarListing } from "../../utils/storage";

export default function Home() {
  const { t } = useTranslation();
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [featuredCars, setFeaturedCars] = useState<CarListing[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };
  const cards = [
    {
      icon: Star,
      titleKey: "curatedExcellence",
      descKey: "verifiedAuthenticityDesc",
    },
    {
      icon: Shield,
      titleKey: "verifiedAuthenticity",
      descKey: "verifiedAuthenticityDesc",
    },
    { icon: Award, titleKey: "eliteService", descKey: "eliteServiceDesc" },
  ];

  useEffect(() => {
    const hasVisited = localStorage.getItem("elite_motors_visited");
    if (!hasVisited) {
      setShowEntryModal(true);
      localStorage.setItem("elite_motors_visited", "true");
    }
    setFeaturedCars(getFeaturedListings());
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {showEntryModal && (
          <EntryModal onClose={() => setShowEntryModal(false)} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1920&q=80"
            alt="Luxury Car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gold)]/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-6 py-2 mb-6 rounded-full border border-[var(--gold)]/50 bg-[var(--gold)]/10 backdrop-blur-sm">
              <span className="text-[var(--gold)] tracking-widest text-sm">
                {t("luxuryRedefined")}
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl mb-6 text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              lux Auto
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              {t("discoverLuxury")}
              <br />
              {t("excellenceMeets")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/catalog"
                className="group px-8 py-4 rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-white hover:shadow-2xl hover:shadow-[var(--gold)]/30 transition-all duration-300 flex items-center space-x-2"
              >
                <span>{t("exploreCollection")}</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <button
                onClick={() => setShowEntryModal(true)}
                className="px-8 py-4 rounded-lg border-2 border-[var(--gold)] text-white hover:bg-[var(--gold)]/10 transition-all duration-300"
              >
                {t("getStarted")}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[var(--gold)]/50 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-background to-secondary/50 border border-[var(--gold)]/20 hover:border-[var(--gold)]/50 transition-colors duration-300"
                >
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className="text-2xl mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-muted-foreground">{t(card.descKey)}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile карусель */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-background to-secondary/50 border border-[var(--gold)]/20"
                >
                  {(() => {
                    const Icon = cards[current].icon;
                    return (
                      <>
                        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3
                          className="text-2xl mb-4"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {t(cards[current].titleKey)}
                        </h3>
                        <p className="text-muted-foreground">
                          {t(cards[current].descKey)}
                        </p>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-[var(--gold)] w-4"
                      : "bg-muted-foreground/40 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      {featuredCars.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("featuredCollection")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("featuredCollectionDesc")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/car/${car.id}`}
                    className="group block rounded-2xl overflow-hidden border border-border bg-white dark:bg-background hover:shadow-xl transition-all duration-300 relative"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-secondary">
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Rating badge */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-1.5">
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

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[var(--gold)] text-white text-xs font-bold">
                        {t("featured")}
                      </div>
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
                          onClick={(e) => e.preventDefault()}
                          className="px-5 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-80 transition-opacity"
                        >
                          View Car
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/catalog"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg border-2 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white transition-all duration-300"
              >
                <span>{t("viewFullCollection")}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            <h2
              className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("readyLuxury")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("joinCommunity")}
            </p>
            <button
              onClick={() => setShowEntryModal(true)}
              className="px-12 py-5 rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-white text-lg hover:shadow-2xl hover:shadow-[var(--gold)]/30 transition-all duration-300"
            >
              {t("getStartedToday")}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
