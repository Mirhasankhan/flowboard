import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { inquiryService } from "./inquiry.service";

const createInquiry = catchAsync(async (req, res) => {
  await inquiryService.createInquiryInDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Inquiry created successfully.",
  });
});

const allInquiries = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  const result = await inquiryService.getAllInquiriesFromDB(
    page,
    limit,
    search,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Inquiries retrieved successfully.",
    data: result,
  });
});
const deleteInquiry = catchAsync(async (req, res) => {
  const { id } = req.params;
  await inquiryService.deleteInquiryFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Inquiry deleted successfully.",
  });
});

export const inquiryController = {
  createInquiry,
  allInquiries,
  deleteInquiry,
};
