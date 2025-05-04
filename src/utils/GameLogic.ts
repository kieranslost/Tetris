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
        setGridArray,
        setCurrentPosition,
        setLastPosition,
        setCurrentBlockType,
        setCurrentBlockRotation,
        setLastBlockRotation,
        setIntervalId 
    } = useGameSettings();

    const { displayBlock, removeLastBlockPosition } = BlockRotations();

    const gridArrayRef = useRef(getGridArray);
    const currentPositionRef = useRef(getCurrentPosition);
    const lastPositionRef = useRef(getLastPosition);
    const currentBlockTypeRef = useRef(getCurrentBlockType);
    const currentBlockRotationRef = useRef(getCurrentBlockRotation);
    const lastBlockRotationRef = useRef(getLastBlockRotation);

    useEffect(() => {
        gridArrayRef.current = getGridArray;
    }, [getGridArray]);
    useEffect(() => {
        currentPositionRef.current = getCurrentPosition;
    }, [getCurrentPosition]);
    useEffect(() => {
        lastPositionRef.current = getLastPosition;
    }, [getLastPosition]);
    useEffect(() => {
        currentBlockTypeRef.current = getCurrentBlockType;
    }, [getCurrentBlockType]);
    useEffect(() => {
        currentBlockRotationRef.current = getCurrentBlockRotation;
    }, [getCurrentBlockRotation]);
    useEffect(() => {
        lastBlockRotationRef.current = getLastBlockRotation;
    }, [getLastBlockRotation]);

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
    }

    const moveCurrentBlock = () => {

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

        if(getIntervalId){
            clearInterval(getIntervalId);
            setIntervalId(null);
        }

        setIntervalId(setInterval(moveCurrentBlock, 1000));
    }

    const pauseGame = () => {

        if(getIntervalId){
            clearInterval(getIntervalId);
            setIntervalId(null);
        }
    }

    return {initializeGame, pauseGame, createBlock, moveCurrentBlock};
}