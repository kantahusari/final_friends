import apiobject from "./api";

export const fileuploadService = {
  uploadFile: async (fileData, config = {}) => {
    try {
      const response = await apiobject.multipartApi.post("/uploads/upload", fileData, config);
      return response.data;
    } catch (error) {
      console.error("File upload error:", error);
      throw error;
    }
  },
};
