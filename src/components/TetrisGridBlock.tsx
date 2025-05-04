import {Box, styled} from '@mui/joy';

export const TetrisGridBlock = styled(Box)<{ name?: string }>`
    
    width: 30px;
    height: 30px;
    border-radius: 1px;
    
    background-color: ${({ name }) => 
    name === "Hero" ? "#01EDFA" :
    name === "OrangeRicky" ? "#FF910C" :
    name === "BlueRicky" ? "#0077D3" :
    name === "ClevelandZ" ? "#EA141C" :
    name === "RhodeIslandZ" ? "#39892F" :
    name === "Teewee" ? "#78256F" :
    name === "Smashboy" ? "#FEFB34" :
    "#33312E"};
`;