import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ShoppingBag, Tag, X } from "lucide-react";

interface EntryModalProps {
  onClose: () => void;
}

export default function EntryModal({ onClose }: EntryModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChoice = (type: "buy" | "sell") => {
    onClose();
    if (type === "buy") {
      navigate("/catalog");
    } else {
      navigate("/sell");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-background via-background to-[var(--gold)]/5 rounded-2xl border border-[var(--gold)]/30 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-300 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl" />

        <div className="relative p-12 md:p-16 ">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            ></motion.div>

            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("welcomeTitle")}
            </motion.h1>

            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {t("welcomeSubtitle")}
            </motion.p>
          </div>

          {/* Question */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-2xl md:text-3xl mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("whatIsYourGoal")}
          </motion.p>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => handleChoice("buy")}
              className="group relative p-8 rounded-2xl border-2 border-[var(--gold)]/30 bg-gradient-to-br from-secondary/30 to-transparent hover:border-[var(--gold)] hover:shadow-2xl hover:shadow-[var(--gold)]/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/0 to-[var(--gold)]/0 group-hover:from-[var(--gold)]/10 group-hover:to-[var(--gold)]/5 transition-all duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>

                <h3
                  className="text-2xl md:text-3xl mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t("buyLuxuryCar")}
                </h3>

                <p className="text-muted-foreground">
                  {t("explorePremiumCars")}
                </p>
              </div>
            </motion.button>

            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => handleChoice("sell")}
              className="group relative p-8 rounded-2xl border-2 border-[var(--gold)]/30 bg-gradient-to-br from-secondary/30 to-transparent hover:border-[var(--gold)] hover:shadow-2xl hover:shadow-[var(--gold)]/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/0 to-[var(--gold)]/0 group-hover:from-[var(--gold)]/10 group-hover:to-[var(--gold)]/5 transition-all duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-8 h-8 text-white" />
                </div>

                <h3
                  className="text-2xl md:text-3xl mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t("sellLuxuryCar")}
                </h3>

                <p className="text-muted-foreground">
                  {t("listLuxuryVehicle")}
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
