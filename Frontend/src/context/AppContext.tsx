 import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type AppContextType = {
  // Mobile Menu
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  // Product Detail
  selectedProductId: string | null;
  setSelectedProductId: Dispatch<SetStateAction<string | null>>;
  openProductDetail: (id: string) => void;
  clearProductDetail: () => void;

  // Blog Detail
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: Dispatch<SetStateAction<string | null>>;
  openBlogDetail: (slug: string) => void;
  clearBlogDetail: () => void;
};

const AppContext = createContext<AppContextType | undefined>(
  undefined
);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  // -----------------------------
  // Mobile Menu
  // -----------------------------
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // -----------------------------
  // Product Detail
  // -----------------------------
  const [selectedProductId, setSelectedProductId] =
    useState<string | null>(null);

  const openProductDetail = (id: string) => {
    setSelectedProductId(id);
  };

  const clearProductDetail = () => {
    setSelectedProductId(null);
  };

  // -----------------------------
  // Blog Detail
  // -----------------------------
  const [selectedBlogSlug, setSelectedBlogSlug] =
    useState<string | null>(null);

  const openBlogDetail = (slug: string) => {
    setSelectedBlogSlug(slug);
  };

  const clearBlogDetail = () => {
    setSelectedBlogSlug(null);
  };

  return (
    <AppContext.Provider
      value={{
        // Mobile Menu
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu,

        // Product Detail
        selectedProductId,
        setSelectedProductId,
        openProductDetail,
        clearProductDetail,

        // Blog Detail
        selectedBlogSlug,
        setSelectedBlogSlug,
        openBlogDetail,
        clearBlogDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppProvider"
    );
  }

  return context;
};

export default AppContext;