-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'Blocked', 'Deleted');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "TInterest" AS ENUM ('BuyingResidence', 'SellingProperty', 'RentingOrLeasing', 'CommercialAdvisory', 'Other');

-- CreateEnum
CREATE TYPE "TPropertyType" AS ENUM ('Apartment', 'Villa', 'Penthouse', 'TownHouse', 'Office');

-- CreateEnum
CREATE TYPE "TStatus" AS ENUM ('Rent', 'Sale');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "phoneNumber" TEXT,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otps" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "failedAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "interest" "TInterest",
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "propertyType" "TPropertyType" NOT NULL,
    "status" "TStatus" NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "amenities" TEXT[],
    "images" TEXT[],
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_status_idx" ON "users"("role", "status");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "otps_email_key" ON "otps"("email");

-- CreateIndex
CREATE INDEX "otps_expiresAt_idx" ON "otps"("expiresAt");

-- CreateIndex
CREATE INDEX "inquiries_email_idx" ON "inquiries"("email");

-- CreateIndex
CREATE INDEX "inquiries_interest_createdAt_idx" ON "inquiries"("interest", "createdAt");

-- CreateIndex
CREATE INDEX "properties_status_propertyType_idx" ON "properties"("status", "propertyType");

-- CreateIndex
CREATE INDEX "properties_status_price_idx" ON "properties"("status", "price");

-- CreateIndex
CREATE INDEX "properties_propertyType_status_price_idx" ON "properties"("propertyType", "status", "price");

-- CreateIndex
CREATE INDEX "properties_bedrooms_bathrooms_idx" ON "properties"("bedrooms", "bathrooms");

-- CreateIndex
CREATE INDEX "properties_location_idx" ON "properties"("location");

-- CreateIndex
CREATE INDEX "properties_price_idx" ON "properties"("price");

-- CreateIndex
CREATE INDEX "properties_createdAt_idx" ON "properties"("createdAt");

-- AddForeignKey
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
