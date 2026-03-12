import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { User, LogOut, Settings, Crown } from "lucide-react";
import { getCurrentUser, signInWithGoogle, signOut } from "../../utils/auth";
import { getAllListings } from "../../utils/storage";
import { toast } from "sonner";
import { deleteListing } from "../../utils/storage";

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
      const listings = getAllListings().filter(
        (l) => l.userId === currentUser.id,
      );
      setUserListings(listings);
    }
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

  const handleSignOut = () => {
    signOut();
    setUser(null);
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handleDeleteListing = (id: string) => {
    deleteListing(id);

    const updatedListings = getAllListings().filter(
      (l) => l.userId === user?.id,
    );

    setUserListings(updatedListings);

    toast.success("Listing deleted");
  };

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
              <span className="text-3xl font-bold text-white">LA</span>
            </div>

            <h2
              className="text-3xl text-center mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("welcome")}
            </h2>

            <p className="text-center text-muted-foreground mb-8">
              {t("signInPrompt")}
            </p>

            <button
              onClick={handleGoogleSignIn}
              disabled={isAuthenticating}
              className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 mb-4"
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
                {isAuthenticating ? t("loading") : t("signInWithGoogle")}
              </span>
            </button>

            <p className="text-xs text-center text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
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
            {t("profile")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("accountSubtitle")}
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30 mb-8"
        >
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}

              {user.role === "admin" && (
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {user.name}
                </h2>
                {user.role === "admin" && (
                  <span className="px-3 py-1 rounded-lg bg-[var(--gold)]/20 text-[var(--gold)] text-sm">
                    {t("admin")}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-4">{user.email}</p>

              <div className="flex items-center space-x-6 text-sm">
                <div>
                  <span className="text-muted-foreground">
                    {t("memberSince")}
                  </span>
                  <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("listings")}</span>
                  <p>{userListings.length}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <button
            onClick={() => navigate("/favorites")}
            className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30 hover:border-[var(--gold)] transition-all duration-300 text-left group"
          >
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <User className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold mb-2 block">
              {t("favorites")}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t("viewSavedVehicles")}
            </p>
          </button>

          <button
            onClick={() => navigate("/sell")}
            className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30 hover:border-[var(--gold)] transition-all duration-300 text-left group"
          >
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3
              className="text-xl mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("listYourCar")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("createNewListing")}
            </p>
          </button>
        </motion.div>

        {/* My Listings */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2
            className="text-3xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("myListings")}
          </h2>

          {userListings.length === 0 ? (
            <p className="text-muted-foreground">{t("noListingsYet")}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.map((listing) => (
                <div
                  key={listing.id}
                  className="relative cursor-pointer rounded-xl border border-border overflow-hidden"
                  onClick={() => navigate(`/car/${listing.id}`)}
                >
                  <img
                    src={listing.images[0]}
                    className="w-full h-48 object-cover"
                  />

                  {/* ACTION BUTTONS */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {/* EDIT */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/sell?id=${listing.id}`);
                      }}
                      className="px-3 py-1 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteListing(listing.id);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold">
                      {listing.brand} {listing.model}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {listing.year} • {listing.mileage} miles
                    </p>

                    <p className="text-[var(--gold)] font-bold">
                      ${listing.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Admin Access */}
        {user.role === "admin" && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate("/admin")}
              className="w-full p-6 rounded-2xl border-2 border-[var(--gold)] bg-gradient-to-br from-[var(--gold)]/10 to-transparent hover:bg-[var(--gold)]/20 transition-all duration-300 text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-semibold mb-1 block">
                    {t("adminDashboard")}
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {t("manageUsersListingsAnalytics")}
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        )}

        {/* Sign Out */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleSignOut}
            className="w-full px-6 py-4 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>{t("signOut")}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
