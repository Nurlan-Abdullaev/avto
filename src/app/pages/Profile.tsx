import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  Crown,
  Heart,
  Plus,
  Car,
  Search,
  Star,
  Bell,
  Pencil,
  Trash2,
  Instagram,
  Send,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Facebook,
} from "lucide-react";
import { getCurrentUser, signInWithGoogle, signOut } from "../../utils/auth";
import { getAllListings, deleteListing } from "../../utils/storage";
import { toast } from "sonner";

// ── Fade-up wrapper ───────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-[var(--gold)]/30 hover:bg-white/[0.05] transition-all duration-300 group h-full">
      <div className="w-12 h-12 mb-5 rounded-2xl bg-gradient-to-br from-[var(--gold)]/20 to-amber-600/10 flex items-center justify-center border border-[var(--gold)]/20">
        <Icon className="w-6 h-6 text-[var(--gold)]" />
      </div>
      <h3
        className="text-xl font-bold text-white mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Reusable Auto Slider Component ─────────────────────────────────────────────
// ── Универсальный Авто-Слайдер ────────────────────────────────────────────────
function AutoSlider({
  items,
  renderItem,
  interval = 3000,
  startDelay = 0,
}: {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  interval?: number;
  startDelay?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % items.length);
      }, interval);
      return () => clearInterval(timer);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [items.length, interval, startDelay]);

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {renderItem(items[index])}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              i === index ? "w-8 bg-[var(--gold)]" : "w-2 bg-zinc-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Sign-in screen ────────────────────────────────────────────────────────────
function SignInScreen({
  onSignIn,
  loading,
}: {
  onSignIn: () => void;
  loading: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full"
      >
        <div className="p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-amber-700 flex items-center justify-center">
            <span
              className="text-2xl font-bold text-black"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              LA
            </span>
          </div>
          <h2
            className="text-3xl text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("welcome")}
          </h2>
          <p className="text-zinc-500 mb-8 text-sm">{t("signInPrompt")}</p>
          <button
            onClick={onSignIn}
            disabled={loading}
            className="w-full px-6 py-4 rounded-xl bg-white text-gray-900 font-semibold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? t("loading") : t("signInWithGoogle")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [userListings, setUserListings] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      setUserListings(
        getAllListings().filter((l) => l.userId === currentUser.id),
      );
    }
  }, []);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const newUser = await signInWithGoogle();
      setUser(newUser);
      toast.success("Successfully signed in!");
    } catch {
      toast.error("Failed to sign in");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handleDelete = (id: string) => {
    deleteListing(id);
    setUserListings(getAllListings().filter((l) => l.userId === user?.id));
    toast.success("Listing deleted");
  };

  if (!user)
    return <SignInScreen onSignIn={handleSignIn} loading={isAuthenticating} />;

  const stats = [
    {
      icon: Search,
      title: t("curatedExcellence"),
      desc: t("verifiedAuthenticityDesc"),
    },
    {
      icon: Star,
      title: t("verifiedAuthenticity"),
      desc: t("verifiedAuthenticityDesc"),
    },
    { icon: Bell, title: t("eliteService"), desc: t("eliteServiceDesc") },
    {
      icon: ShieldCheck,
      title: "Verified & Safe",
      desc: "All transactions are secured and verified",
    },
  ];

  const quickActions = [
    {
      icon: Heart,
      title: t("favorites"),
      desc: t("viewSavedVehicles"),
      path: "/favorites",
    },
    {
      icon: Plus,
      title: t("listYourCar"),
      desc: t("createNewListing"),
      path: "/sell",
    },
  ];

  const approved = userListings.filter((l) => l.status === "approved");
  const totalViews = userListings.length * 107;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12">
      <div className="container mx-auto px-4 max-w-5xl space-y-10">
        {/* ── Header ── */}
        <FadeUp>
          <div className="text-center pt-4">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("profile")}
            </h1>
            <p className="text-zinc-500">{t("accountSubtitle")}</p>
          </div>
        </FadeUp>
        {/* ── About card ── */}
        <FadeUp delay={0.1}>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden p-8 flex flex-col sm:flex-row items-start gap-6">
            <div className="relative flex-shrink-0">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-[var(--gold)]/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-amber-700 flex items-center justify-center">
                  <User className="w-12 h-12 text-black" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {user.name}
              </h2>
              <p className="text-zinc-500 text-sm mb-5">{user.email}</p>
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-xs text-zinc-600 uppercase tracking-widest">
                    Listings
                  </div>
                  <div className="text-lg font-bold">{userListings.length}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-600 uppercase tracking-widest">
                    Approved
                  </div>
                  <div className="text-lg font-bold">{approved.length}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-600 uppercase tracking-widest">
                    Views
                  </div>
                  <div className="text-lg font-bold">
                    {totalViews.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── Why Lux Auto — Auto Slider ── */}
        {/* ── 3. Секция Why Lux Auto? (Листается каждые 3 секунды) ── */}
        <FadeUp delay={0.15}>
          <div>
            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why <span className="text-[var(--gold)]">Lux Auto?</span>
            </h2>

            {/* Сетка для больших экранов */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.06 }}
                >
                  <StatCard icon={s.icon} title={s.title} desc={s.desc} />
                </motion.div>
              ))}
            </div>

            {/* Авто-слайдер для мобилок (интервал 3000мс = 3 сек) */}
            <div className="md:hidden">
              <AutoSlider
                items={stats}
                interval={3000}
                startDelay={0}
                renderItem={(s) => (
                  <StatCard icon={s.icon} title={s.title} desc={s.desc} />
                )}
              />
            </div>
          </div>
        </FadeUp>
        {/* ── 4. Быстрые действия (Листается каждые 5 секунд с задержкой) ── */}
        <FadeUp delay={0.25}>
          {/* Сетка для больших экранов */}
          <div className="hidden sm:grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-[var(--gold)]/40 transition-all duration-300 text-left group"
              >
                <div className="w-11 h-11 mb-4 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                  <action.icon className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  {action.title}
                </h4>
                <p className="text-sm text-zinc-500">{action.desc}</p>
              </button>
            ))}
          </div>

          {/* Авто-слайдер для мобилок (интервал 5000мс = 5 сек, старт через 2 сек) */}
          <div className="sm:hidden">
            <AutoSlider
              items={quickActions}
              interval={5000}
              startDelay={2000}
              renderItem={(action) => (
                <button
                  onClick={() => navigate(action.path)}
                  className="w-full p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-left"
                >
                  <div className="w-12 h-12 mb-5 rounded-2xl bg-[var(--gold)]/10 flex items-center justify-center">
                    <action.icon className="w-6 h-6 text-[var(--gold)]" />
                  </div>
                  <h4
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {action.title}
                  </h4>
                  <p className="text-sm text-zinc-500">{action.desc}</p>
                </button>
              )}
            />
          </div>
        </FadeUp>
        {/* ── My listings ── */}
        <FadeUp delay={0.3}>
          <div>
            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("myListings")}
            </h2>
            {userListings.length === 0 ? (
              <div className="py-16 rounded-2xl border border-dashed border-white/10 flex flex-col items-center gap-4 text-center">
                <Car className="w-10 h-10 text-zinc-700" />
                <button
                  onClick={() => navigate("/sell")}
                  className="px-5 py-2.5 rounded-xl bg-[var(--gold)] text-black text-sm font-bold"
                >
                  + {t("listYourCar")}
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {userListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden group cursor-pointer"
                    onClick={() => navigate(`/car/${listing.id}`)}
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={listing.images?.[0] ?? "/placeholder.jpg"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-bold text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {listing.brand} {listing.model}
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[var(--gold)] font-bold">
                          ${listing.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeUp>
        {/* ── Sign out ── */}
        <FadeUp delay={0.45}>
          <button
            onClick={handleSignOut}
            className="w-full px-6 py-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2 text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" /> {t("signOut")}
          </button>
        </FadeUp>
      </div>
    </div>
  );
}
