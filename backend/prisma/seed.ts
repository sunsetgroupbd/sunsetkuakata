import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { DEFAULT_PACKAGES } from "../src/modules/packages/packages.data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Sunset Kuakata database seed...");

  // 1. Seed Super Admin User
  const defaultEmail = "admin@sunsetkuakata.com";
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: defaultEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Admin@12345", 10);
    await prisma.adminUser.create({
      data: {
        email: defaultEmail,
        passwordHash,
        name: "Sunset Executive Admin",
        role: "SUPER_ADMIN",
      },
    });
    console.log("✅ Default admin created: admin@sunsetkuakata.com (Pass: Admin@12345)");
  } else {
    console.log("ℹ️ Default admin already exists.");
  }

  // 2. Seed All 16 Verified Packages (from Official Brochure)
  for (const pkg of DEFAULT_PACKAGES) {
    await prisma.package.upsert({
      where: { id: pkg.id },
      update: {
        price: pkg.price,
        bookingMoney: pkg.bookingMoney,
        stayDays: pkg.stayDays,
        stayDaysDfi: pkg.stayDaysDfi,
      },
      create: pkg,
    });
  }
  console.log(`✅ Successfully seeded ${DEFAULT_PACKAGES.length} official brochure packages.`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
