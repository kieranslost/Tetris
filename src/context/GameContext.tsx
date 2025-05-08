import React, { createContext, useContext, useState } from 'react';

type GameSettings = {
    getGridWidth: number;
    getGridHeight: number;
    getGridArray: string[][];
    getSolidBlocks: number[][];
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
    getNextBlockDisplayGridHeight: number;
    getNextBlockDisplayGridWidth: number;
    getNextBlockDisplayGridArray: string[][];
    getAllBlocks: string[];
    setGridWidth: (w: number) => void;
    setGridHeight: (w: number) => void;
    setGridArray: (w: string[][]) => void;
    setSolidBlocks: (w: number[][]) => void;
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
    setNextBlockDisplayGridWidth: (w: number) => void;
    setNextBlockDisplayGridHeight: (w: number) => void;
    setNextBlockDisplayGridArray: (w: string[][]) => void;
    setAllBlocks: (w: string[]) => void;
};

export const GameContext = createContext<GameSettings | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Grid Data
  const [getGridWidth, setGridWidth] = useState(10);
  const [getGridHeight, setGridHeight] = useState(20);
  const [getGridArray, setGridArray] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));
  const [getSolidBlocks, setSolidBlocks] = useState<number[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill(0)));
  const [getIntervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [getGameState, setGameState] = useState(false);
  // Next Block Display Data
  const [getNextBlockDisplayGridWidth, setNextBlockDisplayGridWidth] = useState(5);
  const [getNextBlockDisplayGridHeight, setNextBlockDisplayGridHeight] = useState(10);
  const [getNextBlockDisplayGridArray, setNextBlockDisplayGridArray] = useState<string[][]>(Array(getNextBlockDisplayGridHeight).fill(null).map(() => Array(getNextBlockDisplayGridWidth).fill("")));
  const [getAllBlocks, setAllBlocks] = useState(["Hero"]);
  // Current Block
  const [getCurrentPosition, setCurrentPosition] = useState<number[]>([0, 3]);
  const [getLastPosition, setLastPosition] = useState<number[]>([]); //bruch ich wahrschienlich nöd
  const [getCurrentBlockType, setCurrentBlockType] = useState("Hero");
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

  return (
    <GameContext.Provider value={{ 
      getGridWidth, getGridHeight, getGridArray, getSolidBlocks, getCurrentPosition, getLastPosition, getCurrentBlockType, getIntervalId,
      getCurrentBlockRotation, getLastBlockRotation, getGameState,
      getMoveLeftKey, getMoveRightKey, getMoveDownKey, getPlaceBlockKey, getRotateClockwiseKey, getRotateCounterClockwiseKey, getStoreBlockKey, getPauseKey,
      getNextBlockDisplayGridWidth, getNextBlockDisplayGridHeight, getNextBlockDisplayGridArray, getAllBlocks,
      setGridWidth, setGridHeight, setGridArray, setSolidBlocks, setCurrentPosition, setLastPosition, setCurrentBlockType, setIntervalId,
      setCurrentBlockRotation, setLastBlockRotation, setGameState,
      setMoveLeftKey, setMoveRightKey, setMoveDownKey, setPlaceBlockKey, setRotateClockwiseKey, setRotateCounterClockwiseKey, setStoreBlockKey, setPauseKey,
      setNextBlockDisplayGridWidth, setNextBlockDisplayGridHeight, setNextBlockDisplayGridArray, setAllBlocks
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