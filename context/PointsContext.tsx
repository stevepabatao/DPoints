// components/PointsContext.tsx
import React, { createContext, useContext, useState } from "react";

type PointsContextType = {
  totalPoints: number;
  addPoints: (n: number) => void;
  usePoints: (n: number) => boolean; // attempt to deduct (return true if success)
  reset?: () => void;
};

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState<number>(245); // starting example

  const addPoints = (n: number) => setTotalPoints((p) => p + n);
  const usePoints = (n: number) => {
    if (totalPoints >= n) {
      setTotalPoints((p) => p - n);
      return true;
    }
    return false;
  };

  return (
    <PointsContext.Provider value={{ totalPoints, addPoints, usePoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePointsContext = () => {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error("usePointsContext must be used inside PointsProvider");
  return ctx;
};
