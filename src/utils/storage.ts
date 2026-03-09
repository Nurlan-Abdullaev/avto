// Mock Data Storage with localStorage
export interface CarListing {
  id: string;
  userId: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  engineType: string;
  transmission: string;
  exteriorColor: string;
  interiorColor: string;
  description: string;
  images: string[];
  location: string;
  contactDetails: string;
  featured: boolean;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const STORAGE_KEYS = {
  LISTINGS: "elite_motors_listings",
  FAVORITES: "elite_motors_favorites",
};

// Initialize with mock luxury cars
const initializeMockListings = () => {
  const existing = localStorage.getItem(STORAGE_KEYS.LISTINGS);
  if (!existing) {
    const mockListings: CarListing[] = [
      {
        id: "1",
        userId: "system",
        brand: "Rolls-Royce",
        model: "Phantom VIII",
        year: 2024,
        mileage: 1200,
        price: 485000,
        engineType: "V12 Twin-Turbo",
        transmission: "Automatic",
        exteriorColor: "Diamond Black",
        interiorColor: "Seashell White",
        description:
          "The pinnacle of luxury motoring. Exquisitely handcrafted with bespoke interior finishes.",
        images: [
          "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=80",
          "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80",
        ],
        location: "London, UK",
        contactDetails: "+44 20 7xxx xxxx",
        featured: true,
        status: "approved",
        createdAt: "2024-01-15T10:00:00Z",
      },

      {
        id: "2",
        userId: "system",
        brand: "Lamborghini",
        model: "Aventador SVJ",
        year: 2023,
        mileage: 3500,
        price: 575000,
        engineType: "V12 Naturally Aspirated",
        transmission: "Automated Manual",
        exteriorColor: "Verde Mantis",
        interiorColor: "Black Alcantara",
        description:
          "Extreme performance and aggressive styling. Limited production supercar.",
        images: [
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
        ],
        location: "Dubai, UAE",
        contactDetails: "+971 4 xxx xxxx",
        featured: true,
        status: "approved",
        createdAt: "2024-01-20T14:30:00Z",
      },
      {
        id: "3",
        userId: "system",
        brand: "Bentley",
        model: "Continental GT Speed",
        year: 2024,
        mileage: 800,
        price: 285000,
        engineType: "W12 Twin-Turbo",
        transmission: "Dual-Clutch Automatic",
        exteriorColor: "Beluga Black",
        interiorColor: "Saddle Leather",
        description:
          "Grand touring perfection with unparalleled craftsmanship and performance.",
        images: [
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=80",
          "https://images.unsplash.com/photo-1552519507-234fd1421181?w=1200&q=80",
        ],
        location: "Monaco",
        contactDetails: "+377 9x xxx xxx",
        featured: true,
        status: "approved",
        createdAt: "2024-02-01T09:15:00Z",
      },
      {
        id: "4",
        userId: "system",
        brand: "Ferrari",
        model: "SF90 Stradale",
        year: 2024,
        mileage: 2100,
        price: 625000,
        engineType: "V8 Hybrid Twin-Turbo",
        transmission: "Dual-Clutch Automatic",
        exteriorColor: "Rosso Corsa",
        interiorColor: "Black Carbon Fiber",
        description:
          "Ferrari's first plug-in hybrid supercar. 986 horsepower of pure Italian excellence.",
        images: [
          "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80",
          "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80",
        ],
        location: "Maranello, Italy",
        contactDetails: "+39 053x xxx xxx",
        featured: false,
        status: "approved",
        createdAt: "2024-02-10T16:45:00Z",
      },
      {
        id: "5",
        userId: "system",
        brand: "Porsche",
        model: "911 Turbo S",
        year: 2024,
        mileage: 1500,
        price: 245000,
        engineType: "Flat-6 Twin-Turbo",
        transmission: "PDK Dual-Clutch",
        exteriorColor: "GT Silver Metallic",
        interiorColor: "Bordeaux Red Leather",
        description:
          "The ultimate everyday supercar. Precision engineering meets breathtaking performance.",
        images: [
          "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&q=80",
          "https://images.unsplash.com/photo-1611651086806-c2ef3a7f25f9?w=1200&q=80",
        ],
        location: "Stuttgart, Germany",
        contactDetails: "+49 711 xxx xxxx",
        featured: false,
        status: "approved",
        createdAt: "2024-02-15T11:20:00Z",
      },
      {
        id: "6",
        userId: "system",
        brand: "Aston Martin",
        model: "DB12",
        year: 2024,
        mileage: 950,
        price: 245000,
        engineType: "V8 Twin-Turbo",
        transmission: "Automatic",
        exteriorColor: "British Racing Green",
        interiorColor: "Oxford Tan Leather",
        description:
          "Timeless British elegance combined with modern performance.",
        images: [
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
        ],
        location: "London, UK",
        contactDetails: "+44 207 xxx xxxx",
        featured: false,
        status: "approved",
        createdAt: "2024-02-20T13:00:00Z",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(mockListings));
  }
};

initializeMockListings();

export const getAllListings = (): CarListing[] => {
  const listingsJson = localStorage.getItem(STORAGE_KEYS.LISTINGS);
  return listingsJson ? JSON.parse(listingsJson) : [];
};

export const getApprovedListings = (): CarListing[] => {
  return getAllListings().filter((listing) => listing.status === "approved");
};

export const getFeaturedListings = (): CarListing[] => {
  return getAllListings().filter(
    (listing) => listing.featured && listing.status === "approved",
  );
};

export const getListingById = (id: string): CarListing | undefined => {
  return getAllListings().find((listing) => listing.id === id);
};

export const createListing = (
  listing: Omit<CarListing, "id" | "createdAt">,
): CarListing => {
  const listings = getAllListings();
  const newListing: CarListing = {
    ...listing,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
  };
  listings.push(newListing);
  localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
  return newListing;
};

export const updateListing = (
  id: string,
  updates: Partial<CarListing>,
): void => {
  const listings = getAllListings();
  const index = listings.findIndex((l) => l.id === id);
  if (index !== -1) {
    listings[index] = { ...listings[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
  }
};

export const deleteListing = (id: string): void => {
  const listings = getAllListings();
  const filtered = listings.filter((l) => l.id !== id);
  localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(filtered));
};

export const getFavorites = (userId: string): string[] => {
  const favoritesJson = localStorage.getItem(
    `${STORAGE_KEYS.FAVORITES}_${userId}`,
  );
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

export const toggleFavorite = (userId: string, listingId: string): void => {
  const favorites = getFavorites(userId);
  const index = favorites.indexOf(listingId);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(listingId);
  }

  localStorage.setItem(
    `${STORAGE_KEYS.FAVORITES}_${userId}`,
    JSON.stringify(favorites),
  );
};

export const isFavorite = (userId: string, listingId: string): boolean => {
  const favorites = getFavorites(userId);
  return favorites.includes(listingId);
};
