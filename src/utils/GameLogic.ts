import { useGameSettings } from "../context/GameContext"
import { BlockRotations } from "./BlockRotations";

export function GameLogic(){

    const {
        getGridHeight,
        getGridWidth,
        getGridArray,
        setGridArray
    } = useGameSettings();

    const { displayBlock } = BlockRotations();

    const createBlock = (blockToCreate: string) => {

        let currentGrid = [...getGridArray];
        let rotationCycle = 0;
        let placement = [0, 3];

        // only for test
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
        //

        displayBlock(currentGrid, placement, rotationCycle, blockToCreate);  
        setGridArray(currentGrid);
    }

    const initializeGame = () => {

        let currentGrid = [...getGridArray];

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

        setGridArray(currentGrid);
    }


    return {initializeGame, createBlock};
}