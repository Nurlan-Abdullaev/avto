import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { getCurrentUser } from "../../utils/auth";
import {
  getFavorites,
  getListingById,
  toggleFavorite,
  CarListing,
} from "../../utils/storage";
import { toast } from "sonner";

export default function Favorites() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [favoriteCars, setFavoriteCars] = useState<CarListing[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/profile");
      return;
    }

    const favoriteIds = getFavorites(user.id);
    const cars = favoriteIds
      .map((id) => getListingById(id))
      .filter((car): car is CarListing => car !== undefined);

    setFavoriteCars(cars);
  }, []);

  const handleRemoveFavorite = (carId: string) => {
    if (!user) return;

    toggleFavorite(user.id, carId);
    setFavoriteCars((prev) => prev.filter((car) => car.id !== carId));
    toast.success(t("removeFromFavorites"));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("favorites")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("favoritesSubtitle")}
          </p>
        </motion.div>

        {favoriteCars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("noFavorites")}
            </h3>
            <p className="text-muted-foreground mb-8">{t("startCollection")}</p>
            <Link
              to="/catalog"
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-white hover:shadow-2xl hover:shadow-[var(--gold)]/30 transition-all duration-300"
            >
              {t("exploreCatalog")}
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link
                  to={`/car/${car.id}`}
                  className="block rounded-2xl overflow-hidden border border-[var(--gold)]/20 hover:border-[var(--gold)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--gold)]/20"
                >
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

                <button
                  onClick={() => handleRemoveFavorite(car.id)}
                  className="w-full mt-4 px-4 py-3 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{t("removeFromFavorites")}</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
