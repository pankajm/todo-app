import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface Todo {
  id: string;
  name: string;
  details: string;
  done: boolean;
}

interface Store {
  token: string;
  updateToken: (token: string) => void;
  todos: Todo[];
  updateTodos: (todos: Todo[]) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      token: "",
      updateToken: (token) => set(() => ({ token })),
      todos: [],
      updateTodos: (todos) => set(() => ({ todos })),
    }),
    { name: "todo-storage" } // this is for persist
  )
);

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Todo Store", useStore);

export default useStore;
