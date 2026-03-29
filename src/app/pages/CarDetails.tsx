import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  getListingById,
  isFavorite,
  toggleFavorite,
  CarListing,
} from "../../utils/storage";
import { getCurrentUser } from "../../utils/auth";
import { toast } from "sonner";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarListing | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const [hovered, setHovered] = useState(false);
  const user = getCurrentUser();
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    const listing = getListingById(id);
    if (!listing) return;
    setCar(listing);
    const currentUser = getCurrentUser();
    if (currentUser) setIsFav(isFavorite(currentUser.id, id));
  }, [id]);

  // Auto-play: switch every 3s, pause on hover
  useEffect(() => {
    if (!car || car.images.length <= 1 || hovered) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [car, hovered]);

  const handleToggleFavorite = () => {
    if (!user) {
      navigate("/profile");
      return;
    }
    if (!id) return;
    toggleFavorite(user.id, id);
    setIsFav(!isFav);
    toast.success(isFav ? t("removeFromFavorites") : t("addToFavorites"));
  };

  const nextImage = () => {
    if (car) setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    if (car)
      setCurrentImageIndex(
        (prev) => (prev - 1 + car.images.length) % car.images.length,
      );
  };

  const handleContact = () => {
    if (!user) {
      navigate("/profile");
      return;
    }
    setShowContactModal(true);
  };

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Vehicle not found</h2>
          <Link to="/catalog" className="text-[var(--gold)] hover:underline">
            Return to catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-8"
        >
          <Link
            to="/catalog"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-[var(--gold)] transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>{t("back")} to catalog</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            {/* Main Image with AnimatePresence */}
            <div
              className="relative aspect-video rounded-2xl overflow-hidden bg-secondary group"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={currentImageIndex}
                  src={car.images[currentImageIndex]}
                  alt={`${car.brand} ${car.model}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, x: 60, scale: 1.04 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-sm text-white text-sm">
                {currentImageIndex + 1} / {car.images.length}
              </div>

              {/* Dot indicators */}
              {car.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                  {car.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300
                        ${i === currentImageIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                    />
                  ))}
                </div>
              )}

              {/* Auto-play progress bar */}
              {car.images.length > 1 && !hovered && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-10">
                  <motion.div
                    key={currentImageIndex}
                    className="h-full bg-white/70"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index
                        ? "border-[var(--gold)] scale-95"
                        : "border-transparent hover:border-[var(--gold)]/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              {car.featured && (
                <div className="inline-block px-4 py-2 mb-4 rounded-lg bg-[var(--gold)] text-white text-sm font-bold">
                  FEATURED
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1
                    className="text-4xl md:text-5xl mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {car.brand}
                  </h1>
                  <p className="text-2xl text-muted-foreground">{car.model}</p>
                </div>

                <button
                  onClick={handleToggleFavorite}
                  className="p-4 rounded-full border border-[var(--gold)]/50 hover:bg-[var(--gold)]/10 transition-colors duration-300"
                >
                  <Heart
                    className={`w-6 h-6 ${isFav ? "fill-[var(--gold)] text-[var(--gold)]" : ""}`}
                  />
                </button>
              </div>

              <div className="text-4xl text-[var(--gold)] mb-6">
                ${car.price.toLocaleString()}
              </div>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{car.location}</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
              <h3
                className="text-2xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("specifications")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[var(--gold)]" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("year")}</p>
                    <p>{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Gauge className="w-5 h-5 text-[var(--gold)]" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("mileage")}
                    </p>
                    <p>{car.mileage.toLocaleString()} mi</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel className="w-5 h-5 text-[var(--gold)]" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("engineType")}
                    </p>
                    <p>{car.engineType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-[var(--gold)]" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("transmission")}
                    </p>
                    <p>{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Palette className="w-5 h-5 text-[var(--gold)]" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("exteriorColor")}
                    </p>
                    <p>{car.exteriorColor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Palette className="w-5 h-5 text-[var(--gold)]" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("interiorColor")}
                    </p>
                    <p>{car.interiorColor}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
              <h3
                className="text-2xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("description")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Contact Seller */}
            <div className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
              <h3
                className="text-2xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("sellerContact")}
              </h3>
              <div className="space-y-4">
                <button
                  onClick={handleContact}
                  className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-white flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>{t("contactSeller")}</span>
                </button>
                <button className="w-full px-6 py-4 rounded-lg border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-300 flex items-center justify-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>{t("scheduleViewing")}</span>
                </button>
                {user && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      Contact Information:
                    </p>
                    <p className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-[var(--gold)]" />
                      <span>{car.contactDetails}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-background rounded-2xl p-6 w-full max-w-md border border-[var(--gold)]/20">
            <h2 className="text-2xl mb-4 text-center">{t("sellerContact")}</h2>
            <div className="space-y-4">
              <a
                href={`tel:${car.contactDetails}`}
                onClick={() => setShowContactModal(false)}
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg bg-[var(--gold)] text-white"
              >
                <Phone className="w-5 h-5" />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/${car.contactDetails}`}
                target="_blank"
                onClick={() => setShowContactModal(false)}
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg border border-[var(--gold)] text-[var(--gold)]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://t.me/${car.contactDetails}`}
                target="_blank"
                onClick={() => setShowContactModal(false)}
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg border border-[var(--gold)] text-[var(--gold)]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Telegram</span>
              </a>
            </div>
            <button
              onClick={() => setShowContactModal(false)}
              className="mt-6 w-full py-2 text-muted-foreground hover:text-white"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
