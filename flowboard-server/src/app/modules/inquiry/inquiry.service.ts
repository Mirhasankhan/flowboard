import prisma from "../../../shared/prisma";
import { Inquiry } from "@prisma/client";
import { Prisma } from "@prisma/client";
import ApiError from "../../../errors/ApiErrors";

const createInquiryInDB = async (payload: Inquiry) => {
  if (payload.propertyId && payload.interest) {
    throw new ApiError(
      400,
      "Inquiry cannot have both propertyId and interest. Please provide either one.",
    );
  }
if (!payload.propertyId && !payload.interest) {
    throw new ApiError(
      400,
      "Inquiry must have either propertyId or interest. Please provide one.",
    );
  }

  await prisma.inquiry.create({
    data: {
      ...payload,
    },
  });

  return;
};

const getAllInquiriesFromDB = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
) => {
  const whereCondition: Prisma.InquiryWhereInput = {
    ...(search && {
      OR: [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [totalInquiries, filteredInquiriesCount] = await prisma.$transaction([
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(filteredInquiriesCount / limit);

  const inquiries = await prisma.inquiry.findMany({
    where: whereCondition,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      message: true,
      interest: true,
      phoneNumber: true,
      createdAt: true,
      property: {
        select: {
          title: true,
        },
      },
    },
  });

  return {
    meta: {
      totalInquiries,
      filteredInquiries: filteredInquiriesCount,
      totalPages,
      currentPage: page,
    },
    inquiries,
  };
};

const deleteInquiryFromDB = async (id: string) => {
  await prisma.inquiry.delete({
    where: {
      id,
    },
  });

  return;
};

export const inquiryService = {
  createInquiryInDB,
  getAllInquiriesFromDB,
  deleteInquiryFromDB,
};
