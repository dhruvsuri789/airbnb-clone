import { create } from "zustand";

// SearchModalStore is a TypeScript interface or type that defines the shape of the store's state.
interface SearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/* One of the Global State for a modal component using Zustand */
/* Can use Redux Toolkit (RTK) as well*/

// The function passed to `create` takes `set` as an argument, which is a function used to update the state.
const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
