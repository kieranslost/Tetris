
import { TetrisButton } from "../components/TetrisButton";
import { TetrisGrid } from "../components/TetrisGrid";
import { useGameSettings } from "../context/GameContext";
import { GameLogic } from "../utils/GameLogic";

export function GamePage () {

    const { initializeGame, pauseGame, createBlock, moveBlockDown } = GameLogic();

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
            <TetrisButton tabIndex={-1} onClick={handleStartGame}>Start Button</TetrisButton>
            <TetrisButton tabIndex={-1} onClick={handlePauseGame}>Stop Button</TetrisButton>

            <TetrisButton onClick={() => handleCreateBlock("Hero")}>Create Hero</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("RhodeIslandZ")}>Create RhodeIslandZ</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("ClevelandZ")}>Create ClevelandZ</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("BlueRicky")}>Create BlueRicky</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("OrangeRicky")}>Create OrangeRicky</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("Teewee")}>Create Teewee</TetrisButton>
            <TetrisButton onClick={() => handleCreateBlock("Smashboy")}>Create Smashboy</TetrisButton>

            <TetrisButton onClick={() => moveBlockDown(false)}>Update Current Block</TetrisButton>
           
            <TetrisGrid></TetrisGrid>
        </>
    );

}