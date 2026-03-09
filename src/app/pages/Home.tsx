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
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-background to-secondary/50 border border-[var(--gold)]/20 hover:border-[var(--gold)]/50 transition-colors duration-300"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-2xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("curatedExcellence")}
              </h3>
              <p className="text-muted-foreground">
                {t("verifiedAuthenticityDesc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-background to-secondary/50 border border-[var(--gold)]/20 hover:border-[var(--gold)]/50 transition-colors duration-300"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-2xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("verifiedAuthenticity")}
              </h3>
              <p className="text-muted-foreground">
                {t("verifiedAuthenticityDesc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-background to-secondary/50 border border-[var(--gold)]/20 hover:border-[var(--gold)]/50 transition-colors duration-300"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-2xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("eliteService")}
              </h3>
              <p className="text-muted-foreground">{t("eliteServiceDesc")}</p>
            </motion.div>
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
                    className="group block rounded-2xl overflow-hidden border border-[var(--gold)]/20 hover:border-[var(--gold)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--gold)]/20"
                  >
                    <div className="relative h-64 overflow-hidden bg-secondary">
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      <div className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-[var(--gold)] text-white text-sm font-bold">
                        {t("featured")}
                      </div>
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
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
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
