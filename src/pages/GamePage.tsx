
import { TetrisButton } from "../components/TetrisButton";
import { TetrisGrid } from "../components/TetrisGrid";
import { useGameSettings } from "../context/GameContext";
import { GameLogic } from "../utils/GameLogic";

export function GamePage () {

    const { initializeGame, pauseGame, createBlock, moveCurrentBlock } = GameLogic();

    const handleStartGame = () => {

        initializeGame();
    }

    const handlePauseGame = () => {

        pauseGame();
    }

    const handleCreateBlock = (name: string) => {
        createBlock(name);
    }


    return(
        <>
            <TetrisButton onClick={handleStartGame}>Start Button</TetrisButton>
            <TetrisButton onClick={handlePauseGame}>Stop Button</TetrisButton>

            <TetrisButton onClick={() => handleCreateBlock("Hero")}>Create Hero</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("RhodeIslandZ")}>Create RhodeIslandZ</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("ClevelandZ")}>Create ClevelandZ</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("BlueRicky")}>Create BlueRicky</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("OrangeRicky")}>Create OrangeRicky</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("Teewee")}>Create Teewee</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("Smashboy")}>Create Smashboy</TetrisButton>

            <TetrisButton onClick={moveCurrentBlock}>Update Current Block</TetrisButton>
           
            <TetrisGrid></TetrisGrid>
        </>
    );

}