import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  XCircle,
  Trash2,
  Star,
} from "lucide-react";
import { getCurrentUser, getAllUsers, User } from "../../utils/auth";
import {
  getAllListings,
  updateListing,
  deleteListing,
  CarListing,
} from "../../utils/storage";
import { toast } from "sonner";

export default function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "listings">(
    "overview",
  );
  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<CarListing[]>([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    setUsers(getAllUsers());
    setListings(getAllListings());
  }, [user, navigate]);

  const handleApproveListing = (id: string) => {
    updateListing(id, { status: "approved" });
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "approved" } : l)),
    );
    toast.success("Listing approved");
  };

  const handleRejectListing = (id: string) => {
    updateListing(id, { status: "rejected" });
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "rejected" } : l)),
    );
    toast.success("Listing rejected");
  };

  const handleDeleteListing = (id: string) => {
    if (confirm(t("confirmDeleteListing"))) {
      deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
      toast.success(t("listingDeleted"));
    }
  };

  const handleToggleFeatured = (id: string, currentFeatured: boolean) => {
    updateListing(id, { featured: !currentFeatured });
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, featured: !currentFeatured } : l)),
    );
    toast.success(
      currentFeatured ? "Removed from featured" : "Added to featured",
    );
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  const stats = {
    totalUsers: users.length,
    totalListings: listings.length,
    approvedListings: listings.filter((l) => l.status === "approved").length,
    pendingListings: listings.filter((l) => l.status === "pending").length,
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("adminDashboard")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("managePlatform")}</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
                <p className="text-sm text-muted-foreground">
                  {t("activeUsers")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.totalListings}</p>
                <p className="text-sm text-muted-foreground">
                  {t("totalListings")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.approvedListings}</p>
                <p className="text-sm text-muted-foreground">{t("approved")}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.pendingListings}</p>
                <p className="text-sm text-muted-foreground">{t("pending")}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-2 border-b border-border">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 transition-colors duration-300 border-b-2 ${
                activeTab === "overview"
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-transparent hover:text-[var(--gold)]"
              }`}
            >
              {t("analytics")}
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 transition-colors duration-300 border-b-2 ${
                activeTab === "users"
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-transparent hover:text-[var(--gold)]"
              }`}
            >
              {t("userManagement")}
            </button>
            <button
              onClick={() => setActiveTab("listings")}
              className={`px-6 py-3 transition-colors duration-300 border-b-2 ${
                activeTab === "listings"
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-transparent hover:text-[var(--gold)]"
              }`}
            >
              {t("listingModeration")}
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="p-8 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30">
                <h3
                  className="text-2xl mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t("platformAnalytics")}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-2">
                      {t("totalPlatformValue")}
                    </p>
                    <p className="text-3xl text-[var(--gold)]">
                      $
                      {listings
                        .reduce((sum, l) => sum + l.price, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">
                      {t("averageListingPrice")}
                    </p>
                    <p className="text-3xl text-[var(--gold)]">
                      $
                      {listings.length > 0
                        ? Math.round(
                            listings.reduce((sum, l) => sum + l.price, 0) /
                              listings.length,
                          ).toLocaleString()
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-4">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    {u.photoURL ? (
                      <img
                        src={u.photoURL}
                        alt={u.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{u.name}</p>
                      <p className="text-sm text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${
                        u.role === "admin"
                          ? "bg-[var(--gold)]/20 text-[var(--gold)]"
                          : "bg-secondary/50 text-muted-foreground"
                      }`}
                    >
                      {u.role}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "listings" && (
            <div className="space-y-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="p-6 rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-background to-secondary/30"
                >
                  <div className="flex items-start space-x-6">
                    <img
                      src={listing.images[0]}
                      alt={`${listing.brand} ${listing.model}`}
                      className="w-32 h-24 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4
                            className="text-xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {listing.brand} {listing.model}
                          </h4>
                          <p className="text-muted-foreground">
                            ${listing.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-3 py-1 rounded-lg text-sm ${
                              listing.status === "approved"
                                ? "bg-green-500/20 text-green-500"
                                : listing.status === "rejected"
                                  ? "bg-red-500/20 text-red-500"
                                  : "bg-orange-500/20 text-orange-500"
                            }`}
                          >
                            {listing.status}
                          </span>

                          {listing.featured && (
                            <span className="px-3 py-1 rounded-lg text-sm bg-[var(--gold)]/20 text-[var(--gold)]">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex items-center space-x-2">
                        {listing.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApproveListing(listing.id)}
                              className="px-4 py-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors duration-300 flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>{t("approve")}</span>
                            </button>

                            <button
                              onClick={() => handleRejectListing(listing.id)}
                              className="px-4 py-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors duration-300 flex items-center space-x-2"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>{t("reject")}</span>
                            </button>
                          </>
                        )}

                        <button
                          onClick={() =>
                            handleToggleFeatured(listing.id, listing.featured)
                          }
                          className={`px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2 ${
                            listing.featured
                              ? "bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/30"
                              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 ${listing.featured ? "fill-[var(--gold)]" : ""}`}
                          />
                          <span>
                            {listing.featured ? "Unfeature" : "Feature"}
                          </span>
                        </button>

                        <button
                          onClick={() => handleDeleteListing(listing.id)}
                          className="px-4 py-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>{t("delete")}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
