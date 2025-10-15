import apiobject from "./api";

export const authService = {
  login: async (credentials) => {
    const response = await apiobject.api.post("/auth/login", credentials);
    return response.data;
  },

  verifyToken: async () => {
    const response = await apiobject.api.get("/auth/verify");
    return response.data;
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await apiobject.api.post("/auth/logout");
      }
    } catch (error) {
      console.warn("Logout API call failed, but clearing local state:", error.message);
    } finally {
      localStorage.removeItem("token");
    }
  },
};