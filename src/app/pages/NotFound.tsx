import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center px-4"
      >
        <div className="mb-8">
          <div
            className="text-9xl font-bold text-[var(--gold)] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            404
          </div>
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The luxury you seek cannot be found at this destination
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-white hover:shadow-2xl hover:shadow-[var(--gold)]/30 transition-all duration-300 flex items-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/catalog"
            className="px-8 py-4 rounded-lg border-2 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
