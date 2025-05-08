import { Box } from "@mui/joy";
import { NextBlockDisplay } from "./NextBlocksDisplay";
import { TetrisGrid } from "./TetrisGrid";

export function TetrisCard(){

    return(
        <>
            <Box
                sx={{ 
                    width: 600,
                    backgroundColor: "#CCC5B9",
                    borderRadius: "10px",
                    margin: "10px auto",
                    padding: "20px",
                    display: "flex",
                    alignItems: "flex-start"
                }}
            >
                <TetrisGrid></TetrisGrid>
                <NextBlockDisplay></NextBlockDisplay>
            </Box>
        </>
    );
}