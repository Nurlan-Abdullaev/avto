import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Upload, X, CheckCircle } from "lucide-react";
import { getCurrentUser, signInWithGoogle } from "../../utils/auth";
import { createListing } from "../../utils/storage";
import { toast } from "sonner";
import { useSearchParams } from "react-router";
import { getListingById, updateListing } from "../../utils/storage";

export default function Sell() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const listingId = searchParams.get("id");

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    price: 100000,
    engineType: "",
    transmission: "",
    exteriorColor: "",
    interiorColor: "",
    description: "",
    location: "",
    contactDetails: "",
  });

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const newUser = await signInWithGoogle();
      setUser(newUser);
      toast.success("Successfully signed in!");
    } catch (error) {
      toast.error("Failed to sign in");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        if (newImages.length === files.length) {
          setImagePreview((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to create a listing");
      return;
    }

    if (formData.price < 100000) {
      toast.error(t("minPrice"));
      return;
    }

    if (imagePreview.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (listingId) {
        updateListing(listingId, {
          ...formData,
          images: imagePreview,
        });

        toast.success("Listing updated!");
        navigate(`/car/${listingId}`);
      } else {
        const listing = createListing({
          userId: user.id,
          ...formData,
          images: imagePreview,
          featured: false,
          status: "approved",
        });

        toast.success("Listing published!");
        navigate(`/car/${listing.id}`);
      }

      toast.success("Listing published successfully!");
      navigate(`/car/${listingId}`);
    } catch (error) {
      toast.error("Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (listingId) {
      const listing = getListingById(listingId);

      if (listing) {
        setFormData({
          brand: listing.brand,
          model: listing.model,
          year: listing.year,
          mileage: listing.mileage,
          price: listing.price,
          engineType: listing.engineType,
          transmission: listing.transmission,
          exteriorColor: listing.exteriorColor,
          interiorColor: listing.interiorColor,
          description: listing.description,
          location: listing.location,
          contactDetails: listing.contactDetails,
        });

        setImagePreview(listing.images);
      }
    }
  }, [listingId]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md w-full mx-4"
        >
          <div className="p-8 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
              <span className="text-3xl font-bold text-white">lA</span>
            </div>

            <h2
              className="text-3xl text-center mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("signIn")} {t("required")}
            </h2>

            <p className="text-center text-muted-foreground mb-8">
              {t("sellSignInText")}
            </p>

            <button
              onClick={handleGoogleSignIn}
              disabled={isAuthenticating}
              className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>
                {isAuthenticating ? t("loading") : t("continueWithGoogle")}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {listingId ? "Edit Listing" : "Create Listing"}
          </h1>
          <p className="text-xl text-muted-foreground">{t("sellSubtitle")}</p>
        </motion.div>

        <motion.form
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Information */}
          <div className="p-8 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
            <h3
              className="text-2xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("vehicleInformation")}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">{t("carBrand")} *</label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                  placeholder={t("brandExample")}
                />
              </div>

              <div>
                <label className="block mb-2">{t("model")} *</label>
                <input
                  type="text"
                  required
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                  placeholder={t("modelExample")}
                />
              </div>

              <div>
                <label className="block mb-2">{t("year")} *</label>
                <input
                  type="number"
                  required
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block mb-2">{t("mileage")} (miles) *</label>
                <input
                  type="number"
                  required
                  value={formData.mileage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mileage: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block mb-2">{t("price")} (USD) *</label>
                <input
                  type="number"
                  required
                  min="100000"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                />
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("minPrice")}
                </p>
              </div>

              <div>
                <label className="block mb-2">{t("engineType")} *</label>
                <input
                  type="text"
                  required
                  value={formData.engineType}
                  onChange={(e) =>
                    setFormData({ ...formData, engineType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                  placeholder="e.g., V12 Twin-Turbo"
                />
              </div>

              <div>
                <label className="block mb-2">{t("transmission")} *</label>
                <select
                  required
                  value={formData.transmission}
                  onChange={(e) =>
                    setFormData({ ...formData, transmission: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                >
                  <option value="">{t("select")}</option>
                  <option value="Automatic">{t("automatic")}</option>
                  <option value="Manual">{t("manual")}</option>
                  <option value="Semi-Automatic">{t("semiAutomatic")}</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">{t("exteriorColor")} *</label>
                <input
                  type="text"
                  required
                  value={formData.exteriorColor}
                  onChange={(e) =>
                    setFormData({ ...formData, exteriorColor: e.target.value })
                  }
                  placeholder={t("salonColorPlaceholder")}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block mb-2">{t("interiorColor")} *</label>
                <input
                  type="text"
                  required
                  value={formData.interiorColor}
                  onChange={(e) =>
                    setFormData({ ...formData, interiorColor: e.target.value })
                  }
                  placeholder={t("colorPlaceholder")}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block mb-2">{t("location")} *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                  placeholder={t("cityCountry")}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-2">{t("description")} *</label>
              <textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300 resize-none"
                placeholder={t("descriptionPlaceholder")}
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2">{t("contactDetails")} *</label>
              <input
                type="text"
                required
                value={formData.contactDetails}
                onChange={(e) =>
                  setFormData({ ...formData, contactDetails: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                placeholder={t("phoneOrEmail")}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="p-8 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
            <h3
              className="text-2xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("uploadImages")} *
            </h3>

            <div className="mb-6">
              <label className="block w-full p-12 border-2 border-dashed border-[var(--gold)]/50 rounded-2xl hover:border-[var(--gold)] transition-colors duration-300 cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-[var(--gold)] group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-lg mb-2">{t("clickUploadImages")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("uploadHighRes")}
                  </p>
                </div>
              </label>
            </div>

            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreview.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/catalog")}
              className="px-8 py-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors duration-300"
            >
              {t("cancel")}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-white hover:shadow-2xl hover:shadow-[var(--gold)]/30 transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t("publishing")}</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>{t("publishListing")}</span>
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
