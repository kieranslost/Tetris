
import { NextBlockDisplay } from "../components/NextBlocksDisplay";
import { TetrisButton } from "../components/TetrisButton";
import { TetrisCard } from "../components/TetrisCard";
import { TetrisGrid } from "../components/TetrisGrid";
import { GameLogic } from "../utils/GameLogic";

export function GamePage () {

    const { initializeGame, pauseGame, createBlock, moveBlockDown } = GameLogic();

    const handleStartGame = () => {

        initializeGame();
    }

    const handlePauseGame = () => {

        pauseGame();
    }

    return(
        <>
            <TetrisButton tabIndex={-1} onClick={handleStartGame}>Start Button</TetrisButton>
            <TetrisButton tabIndex={-1} onClick={handlePauseGame}>Stop Button</TetrisButton>

            <TetrisButton onClick={() => moveBlockDown(false)}>Update Current Block</TetrisButton>
           
            <TetrisCard></TetrisCard>
        </>
    );

}