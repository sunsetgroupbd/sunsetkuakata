import { Package } from "@/lib/types";

export const seedPackages: Package[] = [
  {
    id: "pkg-1",
    slug: "platinum",
    nameEn: "Platinum Package",
    nameBn: "প্লাটিনাম প্যাকেজ",
    price: 3600000,
    bookingMoney: 800000,
    profitPeriodDays: 112,
    featured: true,
    order: 1,
  },
  {
    id: "pkg-2",
    slug: "gold",
    nameEn: "Gold Package",
    nameBn: "গোল্ড প্যাকেজ",
    price: 1850000,
    bookingMoney: 500000,
    profitPeriodDays: 56,
    featured: false,
    order: 2,
  },
  {
    id: "pkg-3",
    slug: "silver",
    nameEn: "Silver Package",
    nameBn: "সিলভার প্যাকেজ",
    price: 1150000,
    bookingMoney: 300000,
    profitPeriodDays: 33,
    featured: false,
    order: 3,
  },
  {
    id: "pkg-4",
    slug: "bronze",
    nameEn: "Bronze Package",
    nameBn: "ব্রোঞ্জ প্যাকেজ",
    price: 400000,
    bookingMoney: 100000,
    profitPeriodDays: 10,
    featured: false,
    order: 4,
  },
];

