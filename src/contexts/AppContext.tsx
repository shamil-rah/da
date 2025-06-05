import { createContext, useContext, useState, ReactNode } from "react";
import {
  userData,
  portfolioImages,
  servicesData,
  bookingsData,
  earningsData,
  availabilityData,
} from "../data/dummyData";

interface AppContextType {
  user: typeof userData;
  updateUser: (data: Partial<typeof userData>) => void;
  portfolio: typeof portfolioImages;
  updatePortfolio: (data: typeof portfolioImages) => void;
  addPortfolioImage: (image: (typeof portfolioImages)[0]) => void;
  services: typeof servicesData;
  updateServices: (data: typeof servicesData) => void;
  addService: (service: (typeof servicesData)[0]) => void;
  bookings: typeof bookingsData;
  updateBookings: (data: typeof bookingsData) => void;
  addBooking: (booking: (typeof bookingsData)[0]) => void;
  earnings: typeof earningsData;
  availability: typeof availabilityData;
  updateAvailability: (data: Partial<typeof availabilityData>) => void;

  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(userData);
  const [portfolio, setPortfolio] = useState(portfolioImages);
  const [services, setServices] = useState(servicesData);
  const [bookings, setBookings] = useState(bookingsData);
  const [earnings, setEarnings] = useState(earningsData);
  const [availability, setAvailability] = useState(availabilityData);

  // Sidebar state (key addition)
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const updateUser = (data: Partial<typeof userData>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };
  const updatePortfolio = (data: typeof portfolioImages) => {
    setPortfolio(data);
  };
  const addPortfolioImage = (image: (typeof portfolioImages)[0]) => {
    setPortfolio((prev) => [...prev, image]);
  };
  const updateServices = (data: typeof servicesData) => {
    setServices(data);
  };
  const addService = (service: (typeof servicesData)[0]) => {
    setServices((prev) => [...prev, service]);
  };
  const updateBookings = (data: typeof bookingsData) => {
    setBookings(data);
  };
  const addBooking = (booking: (typeof bookingsData)[0]) => {
    setBookings((prev) => [...prev, booking]);
  };
  const updateAvailability = (data: Partial<typeof availabilityData>) => {
    setAvailability((prev) => ({ ...prev, ...data }));
  };

  const value = {
    user,
    updateUser,
    portfolio,
    updatePortfolio,
    addPortfolioImage,
    services,
    updateServices,
    addService,
    bookings,
    updateBookings,
    addBooking,
    earnings,
    availability,
    updateAvailability,
    isSidebarCollapsed,
    toggleSidebar,
    setSidebarCollapsed,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
