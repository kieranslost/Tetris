import React, { createContext, useContext, useState } from 'react';

type GameSettings = {
    getGridWidth: number;
    getGridHeight: number;
    getGridArray: string[][];
    getAllBlocks: string[][];
    getCurrentPosition: number[];
    getLastPosition: number[];
    getCurrentBlockType: string;
    getCurrentBlockRotation: number;
    getLastBlockRotation: number;
    getIntervalId: NodeJS.Timeout | null;
    setGridWidth: (w: number) => void;
    setGridHeight: (w: number) => void;
    setGridArray: (w: string[][]) => void;
    setAllBlocks: (w: string[][]) => void;
    setCurrentPosition: (w: number[]) => void;
    setLastPosition: (w: number[]) => void;
    setCurrentBlockType: (w: string) => void;
    setIntervalId: (w: NodeJS.Timeout | null) => void;
    setCurrentBlockRotation: (w: number) => void;
    setLastBlockRotation: (w: number) => void;
};

export const GameContext = createContext<GameSettings | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Grid Data
  const [getGridWidth, setGridWidth] = useState(10);
  const [getGridHeight, setGridHeight] = useState(20);
  const [getGridArray, setGridArray] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));
  const [getIntervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  // Current Block
  const [getCurrentPosition, setCurrentPosition] = useState<number[]>([0, 3]);
  const [getLastPosition, setLastPosition] = useState<number[]>([]);
  const [getCurrentBlockType, setCurrentBlockType] = useState("Smashboy");
  const [getCurrentBlockRotation, setCurrentBlockRotation] = useState(0);
  const [getLastBlockRotation, setLastBlockRotation] = useState(0);
  // Grid Array
  const [getAllBlocks, setAllBlocks] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));

  return (
    <GameContext.Provider value={{ 
      getGridWidth, getGridHeight, getGridArray, getAllBlocks, getCurrentPosition, getLastPosition, getCurrentBlockType, getIntervalId,
      getCurrentBlockRotation, getLastBlockRotation,
      setGridWidth, setGridHeight, setGridArray, setAllBlocks, setCurrentPosition, setLastPosition, setCurrentBlockType, setIntervalId,
      setCurrentBlockRotation, setLastBlockRotation,
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