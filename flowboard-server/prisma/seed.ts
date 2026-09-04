import { PrismaClient } from "@prisma/client";
import config from "../src/config";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    config.default_admin_password as string,
    Number(config.jwt.gen_salt),
  );

  // ADMIN
  await prisma.user.upsert({
    where: { email: config.default_admin_email as string },
    update: {},
    create: {
      email: config.default_admin_email as string,
      firstName: "Vertical City",
      lastName: "Properties Admin",
      password: hashedPassword,
      role: "Admin",
    },
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
