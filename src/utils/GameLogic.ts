import { useEffect, useRef } from "react";
import { useGameSettings } from "../context/GameContext"
import { BlockLogic } from "./BlockLogic";
import { BlockRotations } from "./BlockRotations";

export function GameLogic(){

    const {
        getGridHeight,
        getGridWidth,
        getGridArray,
        getSolidBlocks,
        getCurrentPosition,
        getLastPosition,
        getCurrentBlockType,
        getCurrentBlockRotation,
        getLastBlockRotation,
        getIntervalId,
        getGameState,
        setGridArray,
        setSolidBlocks,
        setCurrentPosition,
        setLastPosition,
        setCurrentBlockType,
        setCurrentBlockRotation,
        setLastBlockRotation,
        setIntervalId,
        setGameState
    } = useGameSettings();

    const { displayBlock, removeLastBlockPosition, handleBorderCollision, handleBlockCollision, solidifyBlock, getRandomBlock } = BlockLogic();

    const gridArrayRef = useRef(getGridArray);
    const solidBlocksRef = useRef(getSolidBlocks);
    const currentPositionRef = useRef(getCurrentPosition);
    const currentBlockTypeRef = useRef(getCurrentBlockType);
    const currentBlockRotationRef = useRef(getCurrentBlockRotation);
    const intervalIdRef = useRef(getIntervalId);
    const gameStateRef = useRef(getGameState);

    useEffect(() => {
        gridArrayRef.current = getGridArray;
    }, [getGridArray]);
    useEffect(() => {
        solidBlocksRef.current = getSolidBlocks;
    }, [getSolidBlocks]);
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

        if(handleBlockCollision(solidBlocksRef.current, placement, rotationCycle, blockToCreate)){
            alert("you lost btw");
        }

        displayBlock(currentGrid, placement, rotationCycle, blockToCreate);
        setCurrentBlockType(blockToCreate);
        setCurrentPosition(placement);
        setCurrentBlockRotation(rotationCycle);
        setGridArray(currentGrid);
    }

    const handleBlockPlacement = (placedBlockPosition: number[]) => {

        let currentGrid = [...gridArrayRef.current];
        let currentSolidBlock = [...solidBlocksRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        solidifyBlock(currentSolidBlock, placedBlockPosition, currentBlockRotation, currentBlockType);

        // get next block
        let nextBlock = getRandomBlock();

        createBlock(nextBlock);
    }

    const moveBlockDown = (placeBlock: boolean) => {

        let currentGrid = [...gridArrayRef.current];
        let currentSolidBlock = [...solidBlocksRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let newBlockPosition = [...currentBlockPosition];
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        const canMoveDown = () => {
            let testPosition = [newBlockPosition[0] + 1, newBlockPosition[1]];
            return (
                !handleBorderCollision(testPosition, currentBlockRotation, currentBlockType) &&
                !handleBlockCollision(currentSolidBlock, testPosition, currentBlockRotation, currentBlockType)
            );
        };

        if (placeBlock) {
            while (canMoveDown()) {
                newBlockPosition[0] += 1;
            }
        } else {
            if (canMoveDown()) {
                newBlockPosition[0] += 1;
            } else {
                return;
            }
        }

        removeLastBlockPosition(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        displayBlock(currentGrid, newBlockPosition, currentBlockRotation, currentBlockType);
        setGridArray(currentGrid);
       

        if(placeBlock){
            handleBlockPlacement(newBlockPosition);
            return;
        }

        setCurrentPosition(newBlockPosition);
    }

    const moveBlockSideways = (moveAmount: number) => {

        let currentGrid = [...gridArrayRef.current];
        let currentSolidBlock = [...solidBlocksRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let newBlockPosition = [...currentBlockPosition];
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        const canMoveSideways = () => {
            let testPosition = [newBlockPosition[0], newBlockPosition[1] + moveAmount];
            return (
                !handleBorderCollision(testPosition, currentBlockRotation, currentBlockType) &&
                !handleBlockCollision(currentSolidBlock, testPosition, currentBlockRotation, currentBlockType)
            );
        };

        if(canMoveSideways()){
            newBlockPosition[1] += moveAmount;
        } else {
            return;
        }

        removeLastBlockPosition(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
        displayBlock(currentGrid, newBlockPosition, currentBlockRotation, currentBlockType);
        setGridArray(currentGrid);
        setCurrentPosition(newBlockPosition);
    
    }

    const rotateBlock = (rotateAmount: number) => {

        let currentGrid = [...gridArrayRef.current];
        let currentSolidBlock = [...solidBlocksRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let currentBlockRotation = currentBlockRotationRef.current;
        let newBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        const canRotate = () => {
            let newRotation = newBlockRotation + rotateAmount;
            return (
                !handleBorderCollision(currentBlockPosition, newRotation, currentBlockType) &&
                !handleBlockCollision(currentSolidBlock, currentBlockPosition, newRotation, currentBlockType)
            );
        };

        if(canRotate()){
            newBlockRotation += rotateAmount;
        } else {
            return;
        }

        // create function move block by X so that it can rotate if in a corner
        
        /*
        let borderCollisionDetected = handleBorderCollision(currentBlockPosition, newBlockRotation, currentBlockType);
       
        if(!borderCollisionDetected){
            borderCollisionDetected = handleBlockCollision(currentSolidBlock, currentBlockPosition, newBlockRotation, currentBlockType);
            if(borderCollisionDetected) {
                return;
            }
        }
        */

        removeLastBlockPosition(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);

        if(newBlockRotation === 4){
            newBlockRotation = 0;
        } else if(newBlockRotation === -1){
            newBlockRotation = 3;
        }

        displayBlock(currentGrid, currentBlockPosition, newBlockRotation, currentBlockType);
        setGridArray(currentGrid);
        setCurrentBlockRotation(newBlockRotation);
    }

    const initializeGame = () => {

        let currentGrid = gridArrayRef.current;

        let nextBlock = getRandomBlock();

        createBlock(nextBlock);

        setCurrentBlockType(nextBlock);
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
        
        setIntervalId(setInterval(() => moveBlockDown(false), 1000));
    }

    const pauseGame = () => {

        if(intervalIdRef.current){
            clearInterval(intervalIdRef.current);
            setIntervalId(null);
            setGameState(false);
        }
    }

    return {initializeGame, pauseGame, createBlock, moveBlockSideways, rotateBlock, moveBlockDown};
}