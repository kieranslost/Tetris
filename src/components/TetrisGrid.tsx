import { useGameSettings } from "../context/GameContext";
import { TetrisGridBlock } from "./TetrisGridBlock";



export function TetrisGrid(){

    const {
        getGridHeight,
        getGridWidth,
        getGridArray
    } = useGameSettings();

    return(
        <>
            <table style={{backgroundColor: "#252422", borderRadius: "2px", margin: "10px auto", padding: "1px"}}>
                <tbody>
                    { Array.from({ length: getGridHeight }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: getGridWidth }).map((_, colIndex) => (
                                <td key={colIndex}>
                                    <TetrisGridBlock name={getGridArray[rowIndex][colIndex]}></TetrisGridBlock>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}