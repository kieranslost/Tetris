import React, { createContext, useContext, useState } from 'react';

type GameSettings = {
    getGridWidth: number;
    getGridHeight: number;
    getGridArray: string[][];
    getAllBlocks: string[][];
    setGridWidth: (w: number) => void;
    setGridHeight: (w: number) => void;
    setGridArray: (w: string[][]) => void;
    setAllBlocks: (w: string[][]) => void;
};

export const GameContext = createContext<GameSettings | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Grid Data
  const [getGridWidth, setGridWidth] = useState(10);
  const [getGridHeight, setGridHeight] = useState(20);
  const [getGridArray, setGridArray] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));
  // Grid Array
  const [getAllBlocks, setAllBlocks] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));

  return (
    <GameContext.Provider value={{ 
      getGridWidth, getGridHeight, getGridArray, getAllBlocks,
      setGridWidth, setGridHeight, setGridArray, setAllBlocks
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameSettings = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameSettings must be used within a GameProvider');
  }
  return context;
};