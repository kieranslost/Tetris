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
    getMoveLeftKey: string;
    getMoveRightKey: string;
    getMoveDownKey: string;
    getPlaceBlockKey: string;
    getRotateClockwiseKey: string;
    getRotateCounterClockwiseKey: string;
    getStoreBlockKey: string;
    getPauseKey: string;
    getGameState: boolean; 
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
    setMoveLeftKey: (w: string) => void;
    setMoveRightKey: (w: string) => void;
    setMoveDownKey: (w: string) => void;
    setPlaceBlockKey: (w: string) => void;
    setRotateClockwiseKey: (w: string) => void;
    setRotateCounterClockwiseKey: (w: string) => void;
    setStoreBlockKey: (w: string) => void;
    setPauseKey: (w: string) => void;
    setGameState: (w: boolean) => void;
};

export const GameContext = createContext<GameSettings | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Grid Data
  const [getGridWidth, setGridWidth] = useState(10);
  const [getGridHeight, setGridHeight] = useState(20);
  const [getGridArray, setGridArray] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));
  const [getIntervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [getGameState, setGameState] = useState(false);
  // Current Block
  const [getCurrentPosition, setCurrentPosition] = useState<number[]>([0, 3]);
  const [getLastPosition, setLastPosition] = useState<number[]>([]); //bruch ich wahrschienlich nöd
  const [getCurrentBlockType, setCurrentBlockType] = useState("Smashboy");
  const [getCurrentBlockRotation, setCurrentBlockRotation] = useState(0);
  const [getLastBlockRotation, setLastBlockRotation] = useState(0); //bruch ich wahrschienlich nöd
  // Keyboard Setting
  const [getMoveLeftKey, setMoveLeftKey] = useState("ArrowLeft");
  const [getMoveRightKey, setMoveRightKey] = useState("ArrowRight");
  const [getMoveDownKey, setMoveDownKey] = useState("ArrowDown");
  const [getPlaceBlockKey, setPlaceBlockKey] = useState(" ");
  const [getRotateClockwiseKey, setRotateClockwiseKey] = useState("ArrowUp");
  const [getRotateCounterClockwiseKey, setRotateCounterClockwiseKey] = useState("a");
  const [getStoreBlockKey, setStoreBlockKey] = useState("d");
  const [getPauseKey, setPauseKey] = useState("Escape");
  // Grid Array
  const [getAllBlocks, setAllBlocks] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));

  return (
    <GameContext.Provider value={{ 
      getGridWidth, getGridHeight, getGridArray, getAllBlocks, getCurrentPosition, getLastPosition, getCurrentBlockType, getIntervalId,
      getCurrentBlockRotation, getLastBlockRotation, getGameState,
      getMoveLeftKey, getMoveRightKey, getMoveDownKey, getPlaceBlockKey, getRotateClockwiseKey, getRotateCounterClockwiseKey, getStoreBlockKey, getPauseKey,
      setGridWidth, setGridHeight, setGridArray, setAllBlocks, setCurrentPosition, setLastPosition, setCurrentBlockType, setIntervalId,
      setCurrentBlockRotation, setLastBlockRotation, setGameState,
      setMoveLeftKey, setMoveRightKey, setMoveDownKey, setPlaceBlockKey, setRotateClockwiseKey, setRotateCounterClockwiseKey, setStoreBlockKey, setPauseKey,
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