import { useEffect, useRef } from "react";
import { useGameSettings } from "../context/GameContext";
import { GameLogic } from "./GameLogic";

export function KeyboardListener() {
        
    const {
        getMoveLeftKey,
        getMoveRightKey,
        getMoveDownKey,
        getPlaceBlockKey,
        getRotateClockwiseKey,
        getRotateCounterClockwiseKey,
        getStoreBlockKey,
        getPauseKey,
    } = useGameSettings();

    const { pauseGame, moveBlockDown, moveBlockSideways, rotateBlock } = GameLogic();

    useEffect(() => {
        const handleKeyInput = (event: KeyboardEvent) => {
            const keyPressed = event.key;
            console.log("Key pressed:", keyPressed);

            switch (keyPressed) {
                case getMoveLeftKey:
                    console.log("Left");
                    moveBlockSideways(-1);
                    break;
                case getMoveRightKey:
                    console.log("Right");
                    moveBlockSideways(1);
                    break;
                case getMoveDownKey:
                    console.log("Down");
                    moveBlockDown(false);
                    break;
                case getPlaceBlockKey:
                    console.log("Place");
                    moveBlockDown(true);
                    break;
                case getRotateClockwiseKey:
                    console.log("Clock");
                    rotateBlock(1);
                    break;
                case getRotateCounterClockwiseKey:
                    console.log("Counter");
                    rotateBlock(-1);
                    break;
                case getStoreBlockKey:
                    console.log("Store");
                    break;
                case getPauseKey:
                    console.log("Pause");
                    pauseGame();
                    break;
                }
        };

        document.addEventListener("keydown", handleKeyInput);
        return () => {
            document.removeEventListener("keydown", handleKeyInput);
        };
    }, [
        getMoveLeftKey,
        getMoveRightKey,
        getMoveDownKey,
        getRotateClockwiseKey,
        getRotateCounterClockwiseKey,
        getStoreBlockKey,
        getPauseKey
    ]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.code === "Space" && document.activeElement?.tagName === "BUTTON") {
            e.preventDefault();
          }
        };
      
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
      }, []);

    return null;
}
