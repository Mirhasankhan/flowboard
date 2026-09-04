import { TPropertyType, TStatus } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { propertyService } from "./property.service";

const createProperty = catchAsync(async (req, res) => {
  await propertyService.createPropertyIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Property created successfully.",
  });
});
const allProperties = catchAsync(async (req, res) => {
  const {
    page,
    limit,
    search,
    type,
    status,
    maxPrice,
    bedrooms,
    bathrooms,
    city,
  } = req.query;
  const properties = await propertyService.getAllPropertiesFromDB(
    Number(page) || 1,
    Number(limit) || 20,
    search as string,
    city as string,
    type as TPropertyType,
    status as TStatus,
    Number(maxPrice),
    Number(bedrooms),
    Number(bathrooms),
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Properties retrieved successfully.",
    data: properties,
  });
});
const propertyDetails = catchAsync(async (req, res) => {
  const property = await propertyService.getPropertyDetailsFromDB(
    req.params.id,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Property details retrieved successfully.",
    data: property,
  });
});
const updateProperty = catchAsync(async (req, res) => {
  await propertyService.updatePropertyInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Property updated successfully.",
  });
});
const deleteProperty = catchAsync(async (req, res) => {
  await propertyService.deletePropertyFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Property deleted successfully.",
  });
});
const availableCities = catchAsync(async (req, res) => {
  const cities = await propertyService.getAvailableCitiesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Cities retrieved successfully.",
    data: cities,
  });
});
const overviewStats = catchAsync(async (req, res) => {
  const stats = await propertyService.getOverviewStatsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Overview stats retrieved successfully.",
    data: stats,
  });
});

export const propertyController = {
  createProperty,
  propertyDetails,
  updateProperty,
  deleteProperty,
  allProperties,
  availableCities,
  overviewStats,
};
