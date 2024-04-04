import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface Store {
  token: string;
  updateToken: (token: string) => void;
}

const useStore = create<Store>((set) => ({
  token: "",
  updateToken: (token) => set(() => ({ token })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Todo Store", useStore);

export default useStore;
