import { Request } from "express";
import { deleteFromSpace, uploadInSpace } from "../../../helpers/uploadInSpace";
import ApiError from "../../../errors/ApiErrors";
import prisma from "../../../shared/prisma";
import { Property, TPropertyType, TStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";

const createPropertyIntoDB = async (req: Request) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = req.body as Property;

  const processImages = async (
    files: Express.Multer.File[] | undefined,
    folder: string,
  ) => {
    if (!files || files.length === 0) return null;
    return Promise.all(
      files.map((file) => uploadInSpace(file, `property/${folder}`)),
    );
  };

  const [imageUrls] = await Promise.all([
    processImages(files?.imageUrls, "imageUrls"),
  ]);

  if (!imageUrls) {
    throw new ApiError(400, "At least one image is required");
  }

  try {
    await prisma.property.create({
      data: {
        ...payload,
        images: imageUrls,
      },
    });
  } catch (error) {
    if (imageUrls.length > 0) {
      await Promise.all(imageUrls.map((img) => deleteFromSpace(img)));
    }
  }
};

const getAllPropertiesFromDB = async (
  page: number = 1,
  limit: number = 20,
  search?: string,
  city?: string,
  type?: TPropertyType,
  status?: TStatus,
  maxPrice?: number,
  bedrooms?: number,
  bathrooms?: number,
) => {
  const whereCondition: Prisma.PropertyWhereInput = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(type && { propertyType: type }),
    ...(status && { status: status }),
    ...(maxPrice && { price: { lte: maxPrice } }),
    ...(bedrooms && { bedrooms: { gte: bedrooms } }),
    ...(bathrooms && { bathrooms: { gte: bathrooms } }),
    ...(city && { city: { contains: city, mode: "insensitive" } }),
  };

  const [totalProperties, filteredPropertiesCount] = await prisma.$transaction([
    prisma.property.count(),
    prisma.property.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(filteredPropertiesCount / limit);

  const properties = await prisma.property.findMany({
    where: whereCondition,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      images: true,
      location: true,
      price: true,
      propertyType: true,
      latitude: true,
      longitude: true,
      city: true,
      status: true,
      bedrooms: true,
      bathrooms: true,
      area: true,
    },
  });

  return {
    meta: {
      totalProperties,
      filteredProperties: filteredPropertiesCount,
      totalPages,
      currentPage: page,
    },
    properties,
  };
};

const getPropertyDetailsFromDB = async (id: string) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  return property;
};

const updatePropertyInDB = async (req: Request) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  const payload = req.body;

  const property = await prisma.property.findUnique({
    where: {
      id: payload.propertyId,
    },
  });

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  // existing images coming from frontend
  const keptImages = Array.isArray(payload.keptImages)
    ? payload.keptImages
    : payload.keptImages
      ? [payload.keptImages]
      : [];

  const validKeptImages = keptImages.filter((img: string) =>
    property.images.includes(img),
  );

  if (validKeptImages.length !== keptImages.length) {
    throw new ApiError(400, "Invalid kept images provided");
  }

  const processImages = async (
    files: Express.Multer.File[] | undefined,
    folder: string,
  ) => {
    if (!files || files.length === 0) return [];

    return Promise.all(
      files.map((file) => uploadInSpace(file, `property/${folder}`)),
    );
  };

  const uploadedImages = await processImages(files?.imageUrls, "imageUrls");

  const finalImages = [...keptImages, ...uploadedImages];

  const deletedImages = property.images.filter(
    (img) => !finalImages.includes(img),
  );

  if (finalImages.length === 0) {
    throw new ApiError(400, "At least one image is required");
  }

  await prisma.property.update({
    where: {
      id: payload.propertyId,
    },
    data: {
      title: payload.title ?? property.title,
      location: payload.location ?? property.location,
      price: payload.price ?? property.price,
      propertyType: payload.propertyType ?? property.propertyType,
      status: payload.status ?? property.status,
      bedrooms: payload.bedrooms ?? property.bedrooms,
      bathrooms: payload.bathrooms ?? property.bathrooms,
      area: payload.area ?? property.area,
      amenities: payload.amenities ?? property.amenities,
      description: payload.description ?? property.description,
      city: payload.city ?? property.city,
      latitude: payload.latitude ?? property.latitude,
      longitude: payload.longitude ?? property.longitude,
      images: finalImages,
    },
  });

  // delete removed images from storage
  if (deletedImages.length > 0) {
    await Promise.all(deletedImages.map((img) => deleteFromSpace(img)));
  }

  return;
};

const deletePropertyFromDB = async (id: string) => {
  const property = await prisma.property.findUniqueOrThrow({
    where: { id },
  });

  // Find images to delete
  const deletedImages = property.images;

  await prisma.property.delete({
    where: { id },
  });

  if (deletedImages.length > 0) {
    await Promise.allSettled(deletedImages.map((img) => deleteFromSpace(img)));
  }

  return;
};

const getAvailableCitiesFromDB = async () => {
  const cities = await prisma.property.findMany({
    distinct: ["city"],
    select: {
      city: true,
    },
  });
  return cities;
};

const getOverviewStatsFromDB = async () => {
  const totalProperties = await prisma.property.count();
  const totalInquiries = await prisma.inquiry.count();
  const totalRent = await prisma.property.count({
    where: { status: "Rent" },
  });
  const totalSale = await prisma.property.count({
    where: { status: "Sale" },
  });
  return { totalProperties, totalInquiries, totalRent, totalSale };
};

export const propertyService = {
  createPropertyIntoDB,
  getAllPropertiesFromDB,
  getPropertyDetailsFromDB,
  deletePropertyFromDB,
  updatePropertyInDB,
  getAvailableCitiesFromDB,
  getOverviewStatsFromDB,
};
