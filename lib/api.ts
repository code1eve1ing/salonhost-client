import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log readable errors instead of letting raw axios errors leak into UI code
apiClient.interceptors.response.use(
  (response:any) => response,
  (error:any) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

/**
 * Fetch paginated templates.
 * @param {{ page?: number, limit?: number, tag?: string }} params
 */
export async function getTemplates({ page = 1, limit = 6, tag = '' } = {}) {
  const { data } = await apiClient.get("/templates", {
    params: { page, limit, ...(tag ? { tag } : {}) },
  });
  return data; // { success, data: [...], pagination: {...} }
}

/**
 * Fetch a single template by id.
 * @param {string} id
 */
export async function getTemplateById(id: string) {
  const { data } = await apiClient.get(`/templates/${id}`);
  return data; // { success, data: {...} }
}
