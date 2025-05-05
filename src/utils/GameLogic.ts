import { useEffect, useRef } from "react";
import { useGameSettings } from "../context/GameContext"
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

    const { displayBlock, removeLastBlockPosition, handleBorderCollision, handleBlockCollision, solidifyBlock } = BlockRotations();

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

        displayBlock(currentGrid, placement, rotationCycle, blockToCreate);
        setCurrentBlockType(blockToCreate);
        setCurrentPosition(placement);
        setCurrentBlockRotation(rotationCycle);
        setGridArray(currentGrid);
    }

    const handleBlockPlacement = () => {

        let currentGrid = [...gridArrayRef.current];
        let currentSolidBlock = [...solidBlocksRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        solidifyBlock(currentSolidBlock, currentBlockPosition, currentBlockRotation, currentBlockType);


        // Get Next Block

        createBlock("Teewee");
    }

    const moveBlockDown = (placeBlock: boolean) => {

        let currentGrid = [...gridArrayRef.current];
        let currentSolidBlock = [...solidBlocksRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let newBlockPosition = [...currentBlockPosition];
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        // if placeBlock === true -> go down until you hit another block or border

        if(placeBlock) handleBlockPlacement();

        newBlockPosition[0] += 1;
        let borderCollisionDetected = handleBorderCollision(newBlockPosition, currentBlockRotation, currentBlockType);

        if(!borderCollisionDetected){

            let blockCollisionDetected = handleBlockCollision(currentSolidBlock, newBlockPosition, currentBlockRotation, currentBlockType);
            if(blockCollisionDetected) return;

            removeLastBlockPosition(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
            displayBlock(currentGrid, newBlockPosition, currentBlockRotation, currentBlockType);
            setGridArray(currentGrid);
            setCurrentPosition(newBlockPosition);
        }
    }

    const moveBlockSideways = (moveAmount: number) => {

        let currentGrid = [...gridArrayRef.current];
        let currentSolidBlock = [...solidBlocksRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let newBlockPosition = [...currentBlockPosition];
        let currentBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        newBlockPosition[1] += moveAmount;

        let borderCollisionDetected = handleBorderCollision(newBlockPosition, currentBlockRotation, currentBlockType);

        if(!borderCollisionDetected){

            let blockCollisionDetected = handleBlockCollision(currentSolidBlock, newBlockPosition, currentBlockRotation, currentBlockType);
            if(blockCollisionDetected) return;

            removeLastBlockPosition(currentGrid, currentBlockPosition, currentBlockRotation, currentBlockType);
            displayBlock(currentGrid, newBlockPosition, currentBlockRotation, currentBlockType);
            setGridArray(currentGrid);
            setCurrentPosition(newBlockPosition);
        }
    }

    const rotateBlock = (rotateAmount: number) => {

        let currentGrid = [...gridArrayRef.current];
        let currentSolidBlock = [...solidBlocksRef.current];
        let currentBlockPosition = currentPositionRef.current;
        let currentBlockRotation = currentBlockRotationRef.current;
        let newBlockRotation = currentBlockRotationRef.current;
        let currentBlockType = currentBlockTypeRef.current;

        newBlockRotation += rotateAmount;

        // create function move block by X so that it can rotate

        let borderCollisionDetected = handleBorderCollision(currentBlockPosition, newBlockRotation, currentBlockType);
       
        if(!borderCollisionDetected){

            let blockCollisionDetected = handleBlockCollision(currentSolidBlock, currentBlockPosition, currentBlockRotation, currentBlockType);
            if(blockCollisionDetected) return;

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

        createBlock(currentBlockTypeRef.current);

        setCurrentBlockType(currentBlockTypeRef.current);
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