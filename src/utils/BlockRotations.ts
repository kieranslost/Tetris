export function BlockRotations(){

    const hero = (rotation: number) => {

        let hero = [[0, 1, 2, 3]];
        let hero1 = [[1], [1], [1], [1]];
        let hero3 = [[2], [2], [2], [2]];

        switch(rotation){
            case 1: hero = hero1;
                break;
            case 3:  hero = hero3;
                break;
        }

        return hero;
    }

    const orangeRicky = (rotation: number) => {

        let orangeRicky = [[2], [0, 1, 2]];
        let orangeRicky1 = [[1], [1], [1, 2]];
        let orangeRicky2 = [[0, 1, 2], [0]];
        let orangeRicky3 = [[0, 1], [1], [1]];

        switch(rotation){
            case 1: orangeRicky = orangeRicky1;
                break;
            case 2: orangeRicky = orangeRicky2;
                break;
            case 3: orangeRicky = orangeRicky3;
                break;
        }

        return orangeRicky;
    }
    
    const blueRicky = (rotation: number) => {

        let blueRicky = [[0], [0, 1, 2]];
        let blueRicky1 = [[1, 2], [1], [1]];
        let blueRicky2 = [[0, 1, 2], [2]];
        let blueRicky3 = [[1], [1], [0, 1]];

        switch(rotation){
            case 1: blueRicky = blueRicky1;
                break;
            case 2: blueRicky = blueRicky2;
                break;
            case 3: blueRicky = blueRicky3;
                break;
        }

        return blueRicky;
    }
    
    const clevelandZ = (rotation: number) => {

        let clevelandZ = [[0, 1], [1, 2]];
        let clevelandZ1 = [[2], [1, 2], [1]];
        let clevelandZ3 = [[1], [0, 1], [0]];

        switch(rotation){
            case 1: clevelandZ = clevelandZ1;
                break;
            case 3: clevelandZ = clevelandZ3;
                break;
        }

        return clevelandZ;
    }
    
    const rhodeIslandZ = (rotation: number) => {

        let rhodeIslandZ = [[1, 2], [0, 1]];
        let rhodeIslandZ1 = [[1], [1, 2], [2]];
        let rhodeIslandZ3 = [[0], [0, 1], [1]];

        switch(rotation){
            case 1: rhodeIslandZ = rhodeIslandZ1;
                break;
            case 3: rhodeIslandZ = rhodeIslandZ3;
                break;
        }

        return rhodeIslandZ;
    }
    
    const teewee = (rotation: number) => {

        let teewee = [[1], [0, 1, 2]];
        let teewee1 = [[1], [1, 2], [1]];
        let teewee2 = [[], [0, 1, 2], [1]];
        let teewee3 = [[1], [0, 1], [1]];

        switch(rotation){
            case 1: teewee = teewee1;
                break;
            case 2: teewee = teewee2;
                break;
            case 3: teewee = teewee3;
                break;
        }

        return teewee;
    }

    const smashboy = () => {

        let smashboy = [[1, 2], [1, 2]];

        return smashboy;
    }

    const getBlockSwitchCase = (blockName: string, rotationCycle: number) => {

        let block: number[][] = [];

        switch(blockName){
            case "Hero": block = hero(rotationCycle);
                break;
            case "RhodeIslandZ": block = rhodeIslandZ(rotationCycle);
                break;
            case "ClevelandZ": block = clevelandZ(rotationCycle);
                    break; 
            case "BlueRicky": block = blueRicky(rotationCycle);
                break;
            case "OrangeRicky": block = orangeRicky(rotationCycle);
                break;
            case "Teewee": block = teewee(rotationCycle);
                break;
            case "Smashboy": block = smashboy();
                break;
            default: console.error("Couldn't fetch block");
        }


        return block;
    }

    const displayBlock = (currentGrid: string[][], placement: number[], rotationCycle: number, blockName: string) => {

        let block = getBlockSwitchCase(blockName, rotationCycle);
        
        for(let i = 0; i < block.length; i++){
            for(let n = 0; n < block[i].length; n++){
                currentGrid[placement[0]+i][placement[1]+block[i][n]] = blockName;
            }
        }    
    }

    const removeLastBlockPosition = (currentGrid: string[][], lastPlacement: number[], lastRotationCycle: number, blockName: string) => {

        let block = getBlockSwitchCase(blockName, lastRotationCycle);

        for(let i = 0; i < block.length; i++){
            for(let n = 0; n < block[i].length; n++){
                currentGrid[lastPlacement[0]+i][lastPlacement[1]+block[i][n]] = "";
            }
        }    
    }

    return {displayBlock, removeLastBlockPosition};
}