
import { TetrisButton } from "../components/TetrisButton";
import { TetrisGrid } from "../components/TetrisGrid";
import { GameLogic } from "../utils/GameLogic";

export function GamePage () {

    const { initializeGame, createBlock } = GameLogic();

    const startGame = () => {
        initializeGame();
    }

    const handleCreateBlock = (name: string) => {
        createBlock(name);
    }


    return(
        <>
            <TetrisButton onClick={startGame}>Start Button</TetrisButton>

            <TetrisButton onClick={() => handleCreateBlock("Hero")}>Create Hero</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("RhodeIslandZ")}>Create RhodeIslandZ</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("ClevelandZ")}>Create ClevelandZ</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("BlueRicky")}>Create BlueRicky</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("OrangeRicky")}>Create OrangeRicky</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("Teewee")}>Create Teewee</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("Smashboy")}>Create Smashboy</TetrisButton>
           
            <TetrisGrid></TetrisGrid>
        </>
    );

}