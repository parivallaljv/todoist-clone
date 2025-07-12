import { createContext, useContext } from "react";

export const SearchModalContext = createContext<
  | {
      setSearchModalOpen: (open: boolean) => void;
    }
  | undefined
>(undefined);

export function useSearchModal() {
  const ctx = useContext(SearchModalContext);
  if (!ctx)
    throw new Error(
      "useSearchModal must be used within SearchModalContext.Provider"
    );
  return ctx;
}
