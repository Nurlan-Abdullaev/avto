import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Moon, Sun, Globe, User, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, signOut } from "../../utils/auth";
import { motion, AnimatePresence } from "framer-motion";
import la from "../assets/LA.png";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
    window.location.href = "/";
  };

  const navLinks = [
    { path: "/", label: t("home") },
    { path: "/catalog", label: t("catalog") },
    { path: "/sell", label: t("sell") },
  ];

  if (user?.role === "admin") {
    navLinks.push({ path: "/admin", label: t("admin") });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-[var(--gold)]/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300"> */}
            {/* <span className="text-2xl font-bold text-white">LA</span> */}
            <img className="w-20 h-20" src={la} alt="" />
            {/* </div> */}
            <div className="hidden md:block">
              <div
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Lux Auto
              </div>
              <div className="text-xs text-muted-foreground tracking-widest">
                LUXURY COLLECTION
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-[var(--gold)]"
                    : "text-foreground hover:text-[var(--gold)]"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--gold)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-300"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 rounded-lg bg-card border border-border shadow-2xl overflow-hidden backdrop-blur-xl"
                  >
                    {["en", "ru", "ky", "uz", "kz"].map((lng) => (
                      <button
                        key={lng}
                        onClick={() => changeLanguage(lng)}
                        className={`w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors duration-200 ${
                          i18n.language === lng
                            ? "text-[var(--gold)] bg-secondary/30"
                            : ""
                        }`}
                      >
                        {lng === "en"
                          ? "🇺🇸 english"
                          : lng === "ru"
                            ? "🇷🇺 russian"
                            : lng === "ky"
                              ? "🇰🇬 kyrgyz"
                              : lng === "uz"
                                ? "🇺🇿 uzbek"
                                : "🇰🇿 kazakh"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Favorites - Desktop */}
            {user && (
              <Link
                to="/favorites"
                className="hidden lg:block p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-300 relative"
                aria-label="Favorites"
              >
                <Heart
                  className={`w-5 h-5 ${location.pathname === "/favorites" ? "fill-[var(--gold)] text-[var(--gold)]" : ""}`}
                />
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors duration-300"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden xl:inline">{user.name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-lg border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white transition-all duration-300"
                >
                  {t("signOut")}
                </button>
              </div>
            ) : (
              <Link
                to="/profile"
                className="hidden lg:block px-6 py-2 rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-white hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300"
              >
                {t("signIn")}
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-border overflow-hidden backdrop-blur-xl bg-background/95"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/favorites"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors duration-300"
                  >
                    {t("favorites")}
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors duration-300"
                  >
                    {t("profile")}
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white transition-all duration-300"
                  >
                    {t("signOut")}
                  </button>
                </>
              ) : (
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-white text-center"
                >
                  {t("signIn")}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
