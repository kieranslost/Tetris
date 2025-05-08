import { SelectProvider } from "@mui/base";
import { splitVendorChunk } from "vite";
import { useGameSettings } from "../context/GameContext";
import { BlockRotations } from "./BlockRotations";

export function BlockLogic(){

    const {
        getGridHeight,
        getGridWidth,
        getNextBlockDisplayGridHeight,
        getNextBlockDisplayGridWidth,
        setGridArray,
        setAllBlocks,
        setNextBlockDisplayGridArray
    } = useGameSettings();

    const { getBlockSwitchCase } = BlockRotations();

    const solidifyBlock = (solidBlock: number[][], lastPlacement: number[], lastRotationCycle: number, blockName: string) => {

        let block = getBlockSwitchCase(blockName, lastRotationCycle);

        for(let i = 0; i < block.length; i++){
            for(let n = 0; n < block[i].length; n++){
                if(lastPlacement[0]+i < 0){
                    continue;
                }

                solidBlock[lastPlacement[0]+i][lastPlacement[1]+block[i][n]] = 1;
            }
        }   
    }

    const handleBorderCollision = (placement: number[], currentBlockRotation: number, currentBlockType: string) => {

        let block = getBlockSwitchCase(currentBlockType, currentBlockRotation);
        let positionLeft;
        let positionRight;
        let positionHeight;

        for(let i = 0; i < block.length; i++){

            positionLeft = placement[1] + block[i][0];
            positionRight = placement[1] + block[i][block[i].length-1];
            if( 0 > positionLeft || getGridWidth <= positionRight){
                console.log("Side border hit");
                return true;
            }
    
            positionHeight = placement[0] + block.length;
            if(getGridHeight < positionHeight){
                console.log("Bottom border hit");
                return true;
            }
        }   

        return false;
    }

    const handleBlockCollision = (solidBlock: number[][], placement: number[], rotationCycle: number, blockName: string) => {

        let block = getBlockSwitchCase(blockName, rotationCycle);

        for(let i = 0; i < block.length; i++){
            for(let n = 0; n < block[i].length; n++){
                if(placement[0]+i < 0){
                    continue;
                }

                if(solidBlock[placement[0]+i][placement[1]+block[i][n]] === 1){
                    return true;
                }
            }
        }    

        return false;
    }

    const handleBlockCollisionOnBlockCreation = (solidBlock: number[][], placement: number[], rotationCycle: number, blockName: string) => {

        if(handleBlockCollision(solidBlock, placement, rotationCycle, blockName)){
            placement[0] -= 1;
            return handleBlockCollision(solidBlock, placement, rotationCycle, blockName);
        }

        return false;
    }

    const displayBlock = (currentGrid: string[][], placement: number[], rotationCycle: number, blockName: string) => {

        let block = getBlockSwitchCase(blockName, rotationCycle);
        
        for(let i = 0; i < block.length; i++){
            for(let n = 0; n < block[i].length; n++){
                if(placement[0]+i < 0){
                    continue;
                }
                
                currentGrid[placement[0]+i][placement[1]+block[i][n]] = blockName;
            }
        }
    }

    const removeLastBlockPosition = (currentGrid: string[][], lastPlacement: number[], lastRotationCycle: number, blockName: string) => {

        let block = getBlockSwitchCase(blockName, lastRotationCycle);

        for(let i = 0; i < block.length; i++){
            for(let n = 0; n < block[i].length; n++){
                if(lastPlacement[0]+i < 0){
                    continue;
                }
                
                currentGrid[lastPlacement[0]+i][lastPlacement[1]+block[i][n]] = "";
            }
        }
    }

    const createNextBlockDisplayGrid = (allDisplayedBlocks: string[]) => {

        let displayGird: string[][] = Array(getNextBlockDisplayGridHeight).fill(null).map(() => Array(getNextBlockDisplayGridWidth).fill(""));

        displayBlock(displayGird, [1, 1], 0, allDisplayedBlocks[0]);
        displayBlock(displayGird, [4, 1], 0, allDisplayedBlocks[1]);
        displayBlock(displayGird, [7, 1], 0, allDisplayedBlocks[2]);

        return displayGird;
    }

    const displayNextBlock = (allDisplayedBlocks: string[], onGameStart: boolean) => {

        if(onGameStart){
            let allBlocks = [];

            for(let i = 0; i < 3 ; i++){
                allBlocks.push(getRandomBlock());
            }

            setAllBlocks(allBlocks);
            return allBlocks;
        }
        
        allDisplayedBlocks.push(getRandomBlock());
        setNextBlockDisplayGridArray(createNextBlockDisplayGrid(allDisplayedBlocks));
        return allDisplayedBlocks;
    }

    const clearRows = (solidBlocks: number[][], displayBlock: string[][], allRemovedRows: number[]) => {
        
        for(let i = 0; i < allRemovedRows.length; i++ ){
            solidBlocks.splice(allRemovedRows[i], 1);
            displayBlock.splice(allRemovedRows[i], 1);
        }

        for(let i = 0; i < allRemovedRows.length; i++ ){
            solidBlocks.unshift(Array(getGridWidth).fill(0));
            displayBlock.unshift(Array(getGridWidth).fill(""));
        }

        setGridArray(displayBlock);
    }

    const checkIfRowNeedsToBeCleared = (solidBlocks: number[][], displayBlock: string[][], placedPosition: number[], blockName: string, rotationCycle: number) => {

        let block = getBlockSwitchCase(blockName, rotationCycle);
        let allRemovedRows: number[] = [];

        for(let i = 0; i < block.length; i++){
            if(placedPosition[0] < 0){
                continue;
            }

            if(displayBlock[placedPosition[0] + i].every(cell => cell !== "")){
                allRemovedRows.push(placedPosition[0] + i);
            }
        }
        
        clearRows(solidBlocks, displayBlock, allRemovedRows);
    }

    const getRandomBlock = () => {

        let block = "";
        let randomBlock = Math.floor(Math.random() * 7);

        switch(randomBlock){
            case 0: block = "Hero";
                break;
            case 1: block = "RhodeIslandZ";
                break;
            case 2: block = "ClevelandZ"
                    break; 
            case 3: block = "BlueRicky";
                break;
            case 4: block = "OrangeRicky"
                break;
            case 5: block ="Teewee";
                break;
            case 6: block = "Smashboy";
                break;
            default: console.error("Couldn't fetch block");
        }

        return block;
    }

    return { displayBlock, removeLastBlockPosition, handleBorderCollision, handleBlockCollision, handleBlockCollisionOnBlockCreation, solidifyBlock, displayNextBlock, checkIfRowNeedsToBeCleared };
}