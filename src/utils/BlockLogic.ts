import { useGameSettings } from "../context/GameContext";
import { BlockRotations } from "./BlockRotations";

export function BlockLogic(){

    const {
        getGridHeight,
        getGridWidth,
    } = useGameSettings();

    const { getBlockSwitchCase } = BlockRotations();

    const solidifyBlock = (solidBlock: number[][], lastPlacement: number[], lastRotationCycle: number, blockName: string) => {

        let block = getBlockSwitchCase(blockName, lastRotationCycle);

        for(let i = 0; i < block.length; i++){
            for(let n = 0; n < block[i].length; n++){
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
                if(solidBlock[placement[0]+i][placement[1]+block[i][n]] === 1){
                    return true;
                }
            }
        }    

        return false;
    }

    const displayBlock = (currentGrid: string[][], placement: number[], rotationCycle: number, blockName: string) => {

        let block = getBlockSwitchCase(blockName, rotationCycle);
        
        for(let i = 0; i < block.length; i++){
            for(let n = 0; n < block[i].length; n++){
                currentGrid[placement[0]+i][placement[1]+block[i][n]] = blockName;
            }
        }    
    }

    const removeLastBlockPosition = (currentGrid: string[][], lastPlacement: number[], lastRotationCycle: number, blockName: string) => {

        let block = getBlockSwitchCase(blockName, lastRotationCycle);

        for(let i = 0; i < block.length; i++){
            for(let n = 0; n < block[i].length; n++){
                currentGrid[lastPlacement[0]+i][lastPlacement[1]+block[i][n]] = "";
            }
        }
    }

    const getRandomBlock = () => {

        let block = "";
        let randomBlock = Math.floor(Math.random() * 6);

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

    return { displayBlock, removeLastBlockPosition, handleBorderCollision, handleBlockCollision, solidifyBlock, getRandomBlock };
}