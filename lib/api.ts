import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { SalonDetails, SalonSectionKey, Subscription, User } from "@/types/salon";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT (if present) to every outgoing request.
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize errors and handle 401 by clearing the session.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    const message = error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ---- Templates (public browsing, pre-onboarding) ----

export interface TemplateSummary {
  id: string;
  name: string;
  tag: string;
  image_urls: string[];
  is_premium: boolean;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export async function getTemplates(params: {
  page?: number;
  limit?: number;
  tag?: string;
} = {}): Promise<{ data: TemplateSummary[]; pagination: PaginationMeta }> {
  const { page = 1, limit = 6, tag } = params;
  const { data } = await apiClient.get<{
    success: boolean;
    data: TemplateSummary[];
    pagination: PaginationMeta;
  }>("/templates", { params: { page, limit, ...(tag ? { tag } : {}) } });
  return { data: data.data, pagination: data.pagination };
}

export async function getTemplateById(id: string): Promise<TemplateSummary> {
  const { data } = await apiClient.get<ApiEnvelope<TemplateSummary>>(`/templates/${id}`);
  return data.data;
}

// ---- Users ----

export async function createUserAfterOAuth(payload: {
  googleId: string;
  email: string;
  name: string;
  avatar: string;
  subdomain?: string;
} & Partial<SalonDetails>): Promise<{ user: User; token: string }> {
  const { data } = await apiClient.post<ApiEnvelope<User> & { token: string }>(
    "/users",
    payload
  );
  return { user: data.data, token: data.token };
}

export async function getMe(): Promise<User> {
  const { data } = await apiClient.get<ApiEnvelope<User>>("/users/me");
  return data.data;
}

export async function updateUserDetails(
  sections: Partial<SalonDetails>
): Promise<User> {
  const { data } = await apiClient.patch<ApiEnvelope<User>>("/users/me/details", sections);
  return data.data;
}

export async function updateSubdomain(subdomain: string): Promise<User> {
  const { data } = await apiClient.patch<ApiEnvelope<User>>("/users/me/subdomain", {
    subdomain,
  });
  return data.data;
}

export async function updateTemplate(template_id: string): Promise<User> {
  const { data } = await apiClient.patch<ApiEnvelope<User>>("/users/me/template", {
    template_id,
  });
  return data.data;
}

export async function checkSubdomainAvailability(
  value: string
): Promise<{ available: boolean; reason: string | null }> {
  const { data } = await apiClient.get<{
    success: boolean;
    available: boolean;
    reason: string | null;
  }>("/users/subdomain-check", { params: { value } });
  return { available: data.available, reason: data.reason };
}

export async function getSubscription(): Promise<Subscription> {
  const { data } = await apiClient.get<ApiEnvelope<Subscription>>("/users/me/subscription");
  return data.data;
}

export async function purchaseSubscription(): Promise<Subscription> {
  const { data } = await apiClient.post<ApiEnvelope<Subscription>>(
    "/users/me/subscription/purchase"
  );
  return data.data;
}

// ---- Public salon page ----

export async function getPublicSalon(subdomain: string) {
  const { data } = await apiClient.get<ApiEnvelope<SalonDetails & { subdomain: string }>>(
    `/public/salons/${subdomain}`
  );
  return data.data;
}

export type { SalonSectionKey };
