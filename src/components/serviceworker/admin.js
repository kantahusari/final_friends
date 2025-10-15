import apiobject from "./api";

export const adminService = {
  get_days: async () => {
    const response = await apiobject.api.get("/man/days");
    return response.data;
  },
  update_days: async (data) => {
    const response = await apiobject.api.put(`/man/days`, data);
    return response.data;
  },
  get_users: async () => {
    const response = await apiobject.api.get(`/man/users`);
    return response.data;
  },
  update_user: async (data) => {
    const response = await apiobject.api.put(`/man/users`, data);
    return response.data;
  },
  get_messages: async (data) => {
    const response = await apiobject.api.post(`/man/getmessages`, data);
    return response.data;
  },
  get_unread_messages: async () => {
    const response = await apiobject.api.get(`/man/unread`);
    return response.data;
  },
  open_message: async (id) => {
    const response = await apiobject.api.post(`/man/openmessage`, id);
    return response.data;
  },
  delete_message: async (id) => {
    const response = await apiobject.api.post(`/man/deletemessage`, id);
    return response.data;
  },
  add_message: async (message) => {
    const response = await apiobject.serviceapi.post(`/guest/contact`, message);
    return response.data;
  },
  add_category: async (data) => {
    const response = await apiobject.api.post(`/man/categories`, data);
    return response.data;
  },
  get_category: async () => {
    const response = await apiobject.api.get(`/man/categories`);
    return response.data;
  },
  delete_category: async (id) => {
    const response = await apiobject.api.post(`/man/delete_cat`, id);
    return response.data;
  },
  // Images -------------------------------
  getImages: async () => {
    const response = await apiobject.serviceapi.get("/guest/guest_images");
    return response.data;
  },
  getAllFiles: async () => {
    const response = await apiobject.api.get("/man/all");
    return response.data;
  },
  getFilesCount: async () => {
    const response = await apiobject.api.get("/man/fcount");
    return response.data;
  },
  deleteFile: async (id) => {
    const response = await apiobject.api.post(`/man/delete`, id);
    return response.data;
  },
  hidefile: async (data) => {
    const response = await apiobject.api.post(`/man/hide`, data);
    return response.data;
  },

  // Working Hours -------------------------------
  working_hours: async () => {
    const response = await apiobject.serviceapi.get(`/guest/working_hours`);
    return response.data;
  },
};
