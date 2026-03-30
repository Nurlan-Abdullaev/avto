import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
    <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-[var(--gold)]/30 hover:bg-white/[0.05] transition-all duration-300 group">
      <div className="w-11 h-11 mb-5 rounded-2xl bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
        <Icon className="w-5 h-5 text-[var(--gold)]" />
      </div>
      <h3 className="text-base font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-zinc-500 leading-snug">{desc}</p>
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
          <p className="text-xs text-zinc-600">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
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

  const approved = userListings.filter((l) => l.status === "approved");
  const pending = userListings.filter((l) => l.status === "pending");
  const totalViews = userListings.length * 107; // mock

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12">
      <div className="container mx-auto px-4 max-w-5xl space-y-10">
        {/* ── Section header ── */}
        <FadeUp>
          <div className="text-center pt-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-[var(--gold)] text-xs uppercase tracking-[0.3em]">
                My Account
              </span>
              <div className="h-px w-10 bg-[var(--gold)]" />
            </div>
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
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
            {/* Gold banner strip */}
            <div className="h-1 w-full bg-gradient-to-r from-[var(--gold)] via-amber-400 to-[var(--gold)]" />

            <div className="p-8 flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar */}
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
                {user.role === "admin" && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center shadow-lg">
                    <Crown className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {user.name}
                  </h2>
                  {user.role === "admin" && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/20">
                      {t("admin")}
                    </span>
                  )}
                </div>
                <p className="text-zinc-500 text-sm mb-5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </p>

                {/* Mini stats row */}
                <div className="flex flex-wrap gap-6">
                  {[
                    {
                      label: t("memberSince"),
                      value: new Date(user.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" },
                      ),
                    },
                    {
                      label: t("listings"),
                      value: String(userListings.length),
                    },
                    { label: "Approved", value: String(approved.length) },
                    { label: "Views", value: totalViews.toLocaleString() },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-xs text-zinc-600 uppercase tracking-widest mb-0.5">
                        {label}
                      </div>
                      <div
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── Why Lux Auto — stat cards ── */}
        <FadeUp delay={0.15}>
          <div>
            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why <span className="text-[var(--gold)]">Lux Auto?</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
        </FadeUp>

        {/* ── Quick actions ── */}
        <FadeUp delay={0.25}>
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/favorites")}
              className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-[var(--gold)]/40 transition-all duration-300 text-left group"
            >
              <div className="w-11 h-11 mb-4 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                <Heart className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                {t("favorites")}
              </h4>
              <p className="text-sm text-zinc-500">{t("viewSavedVehicles")}</p>
            </button>

            <button
              onClick={() => navigate("/sell")}
              className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-[var(--gold)]/40 transition-all duration-300 text-left group"
            >
              <div className="w-11 h-11 mb-4 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                <Plus className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                {t("listYourCar")}
              </h4>
              <p className="text-sm text-zinc-500">{t("createNewListing")}</p>
            </button>
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
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Car className="w-7 h-7 text-zinc-600" />
                </div>
                <p className="text-zinc-500 text-sm">{t("noListingsYet")}</p>
                <button
                  onClick={() => navigate("/sell")}
                  className="px-5 py-2.5 rounded-xl bg-[var(--gold)] text-black text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  + {t("listYourCar")}
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {userListings.map((listing, i) => (
                  <motion.div
                    key={listing.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.32 + i * 0.06 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden group cursor-pointer hover:border-[var(--gold)]/30 transition-all duration-300"
                    onClick={() => navigate(`/car/${listing.id}`)}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={listing.images?.[0] ?? "/placeholder.jpg"}
                        alt={`${listing.brand} ${listing.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Status badge */}
                      <div
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                        ${
                          listing.status === "approved"
                            ? "bg-emerald-500/80 text-white"
                            : listing.status === "pending"
                              ? "bg-amber-500/80 text-black"
                              : "bg-red-500/80 text-white"
                        }`}
                      >
                        {listing.status ?? "pending"}
                      </div>
                      {/* Action buttons */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/sell?id=${listing.id}`);
                          }}
                          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5 text-white" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(listing.id);
                          }}
                          className="w-8 h-8 rounded-full bg-red-500/70 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3
                        className="font-bold text-white mb-0.5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {listing.brand} {listing.model}
                      </h3>
                      <p className="text-xs text-zinc-500 mb-3">
                        {listing.year} · {listing.mileage.toLocaleString()} mi
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--gold)] font-bold">
                          ${listing.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-zinc-600">107 views</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </FadeUp>

        {/* ── Bottom row: Social + Contacts ── */}
        <FadeUp delay={0.35}>
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Social */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Follow Lux Auto
              </h3>
              <p className="text-sm text-zinc-500 mb-5">
                Stay updated with our latest luxury listings on social media.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Send, href: "#", label: "Telegram" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <h3
                className="text-lg font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contacts
              </h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                  <span>luxauto@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                  <span>Bishkek, Kyrgyzstan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                  <span>+996 700 000 000</span>
                </div>
              </div>
              <a
                href="mailto:luxauto@gmail.com"
                className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)] text-sm font-semibold hover:bg-[var(--gold)]/20 transition-colors"
              >
                <Mail className="w-4 h-4" />
                luxauto@gmail.com
              </a>
            </div>
          </div>
        </FadeUp>

        {/* ── Admin dashboard ── */}
        {user.role === "admin" && (
          <FadeUp delay={0.4}>
            <button
              onClick={() => navigate("/admin")}
              className="w-full p-6 rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/5 hover:bg-[var(--gold)]/10 transition-all duration-300 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-amber-700 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-black" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white block mb-0.5">
                    {t("adminDashboard")}
                  </span>
                  <p className="text-zinc-500 text-sm">
                    {t("manageUsersListingsAnalytics")}
                  </p>
                </div>
              </div>
            </button>
          </FadeUp>
        )}

        {/* ── Sign out ── */}
        <FadeUp delay={0.45}>
          <button
            onClick={handleSignOut}
            className="w-full px-6 py-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            {t("signOut")}
          </button>
        </FadeUp>
      </div>
    </div>
  );
}
