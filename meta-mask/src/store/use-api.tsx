import axios, { AxiosError, AxiosResponse } from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";

type ApiState = {
  isLoading: boolean;
  error?: string;
  data?: any;
};

type AuthStore = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

type ApiActions = {
  fetchApiData: (url: string) => Promise<void>;
  postApiData: (url: string, payload: any) => Promise<void>;
};

export const useApiStore = create<ApiState & ApiActions>((set) => ({
  isLoading: false,

  fetchApiData: async (url: string) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
      set({ data: response.data });

      return response.data;
    } catch (error) {
      set({ error: (error as AxiosError)?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  postApiData: async (url: string, payload: any) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
        payload
      );
      set({ data: response.data });
      return response.data;
    } catch (error) {
      set({ error: (error as AxiosError)?.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useAuthStore = create<AuthStore>((set) => ({
  token: Cookies.get("token") || null,
  setToken: (token: string) => {
    const expiresIn30Mins = new Date(Date.now() + 30 * 60 * 1000);
    Cookies.set("token", token, { expires: expiresIn30Mins });
    set({ token });
  },
  clearToken: () => {
    Cookies.remove("token");
    set({ token: null });
  },
}));
