import axios from "axios";

export const uploadImage = async (file: File) => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("fileUrl", file);

  try {
    const response = await axios.post(
      "http://72.60.125.50:5003/api/v1/message/generate-url",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // API response (likely contains the uploaded image URL)
  } catch (error: any) {
    console.error("Image upload failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Upload failed");
  }
};
