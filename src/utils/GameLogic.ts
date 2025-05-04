import { useEffect, useRef } from "react";
import { useGameSettings } from "../context/GameContext"
import { BlockRotations } from "./BlockRotations";

export function GameLogic(){

    const {
        getGridHeight,
        getGridWidth,
        getGridArray,
        getCurrentPosition,
        getLastPosition,
        getCurrentBlockType,
        getCurrentBlockRotation,
        getLastBlockRotation,
        getIntervalId,
        getGameState,
        setGridArray,
        setCurrentPosition,
        setLastPosition,
        setCurrentBlockType,
        setCurrentBlockRotation,
        setLastBlockRotation,
        setIntervalId,
        setGameState
    } = useGameSettings();

    const { displayBlock, removeLastBlockPosition } = BlockRotations();

    const gridArrayRef = useRef(getGridArray);
    const currentPositionRef = useRef(getCurrentPosition);
    const currentBlockTypeRef = useRef(getCurrentBlockType);
    const currentBlockRotationRef = useRef(getCurrentBlockRotation);
    const intervalIdRef = useRef(getIntervalId);
    const gameStateRef = useRef(getGameState);

    useEffect(() => {
        gridArrayRef.current = getGridArray;
    }, [getGridArray]);
    useEffect(() => {
        currentPositionRef.current = getCurrentPosition;
    }, [getCurrentPosition]);
    useEffect(() => {
        currentBlockTypeRef.current = getCurrentBlockType;
    }, [getCurrentBlockType]);
    useEffect(() => {
        currentBlockRotationRef.current = getCurrentBlockRotation;
    }, [getCurrentBlockRotation]);
    useEffect(() => {
        intervalIdRef.current = getIntervalId;
    }, [getIntervalId]);
    useEffect(() => {
        gameStateRef.current = getGameState;
    }, [getGameState]);

    const createBlock = (blockToCreate: string) => {

        let currentGrid = gridArrayRef.current;
        let rotationCycle = 0;
        let placement = [0, 3];

        // only for test
        /*
        currentGrid[0][3] = "";
        currentGrid[0][4] = "";
        currentGrid[0][5] = "";
        currentGrid[0][6] = "";

        currentGrid[1][3] = "";
        currentGrid[1][4] = "";
        currentGrid[1][5] = "";
        currentGrid[1][6] = "";

        currentGrid[2][3] = "";
        currentGrid[2][4] = "";
        currentGrid[2][5] = "";
        currentGrid[2][6] = "";
        */
        //

        displayBlock(currentGrid, placement, rotationCycle, blockToCreate);
        setCurrentBlockType(blockToCreate);
        setGridArray(currentGrid);
        setCurrentPosition(placement);
    }

    const updateCurrentBlockPosition = () => {

        let currentGrid = [...gridArrayRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        removeLastBlockPosition(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        currentBlockPosition[0] += 1;

        displayBlock(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        setGridArray(currentGrid);
        setCurrentPosition(currentBlockPosition);
    }

    const moveBlockDown = (placeBlock: boolean) => {

        let currentGrid = [...gridArrayRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        // if placeBlock === true -> go down until you hit another block

        removeLastBlockPosition(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        currentBlockPosition[0] += 1;

        displayBlock(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        setGridArray(currentGrid);
        setCurrentPosition(currentBlockPosition);
    }

    const moveBlockSideways = (moveAmount: number) => {

        let currentGrid = [...gridArrayRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        removeLastBlockPosition(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        currentBlockPosition[1] += moveAmount;

        displayBlock(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        setGridArray(currentGrid);
        setCurrentPosition(currentBlockPosition);
    }

    const rotateBlock = (rotateAmount: number) => {

        let currentGrid = [...gridArrayRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        removeLastBlockPosition(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        currentBlockRotation += rotateAmount;

        if(currentBlockRotation === 4){
            currentBlockRotation = 0;
        } else if(currentBlockRotation === -1){
            currentBlockRotation = 3;
        }

        displayBlock(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        setGridArray(currentGrid);
        setCurrentBlockRotation(currentBlockRotation);
    }

    const initializeGame = () => {

        let currentGrid = gridArrayRef.current;

        let placement = [19, 0];
        displayBlock(currentGrid, placement, 0, "Hero");
        placement = [17, 2];
        displayBlock(currentGrid, placement, 1, "RhodeIslandZ");
        placement = [18, 5];
        displayBlock(currentGrid, placement, 0, "Teewee");
        placement = [16, 4];
        displayBlock(currentGrid, placement, 3, "Teewee");
        placement = [18, 7];
        displayBlock(currentGrid, placement, 0, "ClevelandZ");
        placement = [17, 7];
        displayBlock(currentGrid, placement, 2, "BlueRicky");
        placement = [16, 6];
        displayBlock(currentGrid, placement, 2, "OrangeRicky");
        placement = [17, -1];
        displayBlock(currentGrid, placement, 0, "Smashboy");

        createBlock("Hero");

        setCurrentBlockType("Hero");
        setCurrentPosition([0, 3]);
        setLastPosition([]);
        setCurrentBlockRotation(0);
        setLastBlockRotation(0);

        setGridArray(currentGrid);

        setGameState(true);

        if(getIntervalId){
            clearInterval(getIntervalId);
            setIntervalId(null);
        }
        
        setIntervalId(setInterval(updateCurrentBlockPosition, 1000));
    }

    const pauseGame = () => {

        if(intervalIdRef.current){
            clearInterval(intervalIdRef.current);
            setIntervalId(null);
            setGameState(false);
        }
    }

    return {initializeGame, pauseGame, createBlock, updateCurrentBlockPosition, moveBlockSideways, rotateBlock, moveBlockDown};
}