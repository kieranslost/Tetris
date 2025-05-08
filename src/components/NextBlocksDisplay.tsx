import { useGameSettings } from "../context/GameContext";
import { TetrisGridBlock } from "./TetrisGridBlock";


export function NextBlockDisplay (){

    const {
        getNextBlockDisplayGridHeight,
        getNextBlockDisplayGridWidth,
        getNextBlockDisplayGridArray
    } = useGameSettings();

    // border: "4px solid #252422", || #33312E

    return (
        <>
            <table style={{backgroundColor: "#252422", borderRadius: "3px", margin: "10px auto", padding: "1px"}}>
                <tbody>
                    { Array.from({ length: getNextBlockDisplayGridHeight }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: getNextBlockDisplayGridWidth }).map((_, colIndex) => (
                                <td key={colIndex}>
                                    <TetrisGridBlock name={getNextBlockDisplayGridArray[rowIndex][colIndex]}></TetrisGridBlock>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}