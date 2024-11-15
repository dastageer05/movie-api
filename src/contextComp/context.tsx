import React, { createContext, useContext, useState } from "react";
import useFetch from "./useFetch";

interface CounterProviderProps {
  children: React.ReactNode;
}

type AppContextType = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
} & ReturnType<typeof useFetch>;

const AppContext = createContext<AppContextType | undefined>({
  query: "",
  setQuery: () => {},
  movie: [],
  isLoading: true,
  isError: { show: false, msg: "" },
});

export const AppProvider: React.FC<CounterProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string>("hacker");
  const { isLoading, isError, movie } = useFetch(query);
  return (
    <AppContext.Provider value={{ query, setQuery, movie, isLoading, isError }}>
      {children}
    </AppContext.Provider>
  );
};

export const usedp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("usedp must be used within an AppProvider");
  }
  return context;
};
