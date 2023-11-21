const lifeworld = {

    init(numCols, numRows){
        this.numCols = numCols,
        this.numRows = numRows,
        this.world = this.buildArray();
        this.worldBuffer = this.buildArray();
        this.randomSetup();
    },

    buildArray(){
        let outerArray = [];
        for(let row =0; row < this.numRows; row++){
            let innerArray = [];
            for (let col =0; col <this.numCols; col++){
                innerArray.push(0);
            }
            outerArray.push(innerArray);
        }
        return outerArray;
    },

    randomSetup(){
        for(let row= 0; row < this.numRows; row++){
            for(let col = 0; col < this.numCols; col++){
                this.world[row][col] = 0;
                if(Math.random() < .1){
                    this.world[row][col] = 1;
                }
            }
        }
    }, 

    getLivingNeighbors(row,col){
		// TODO:
		// row and col should > than 0, if not return 0
        // row and col should be < the length of the applicable array, minus 1. If not return 0
		if(row < 0 || col < 0 || row >= this.numRows || col >= this.numCols){
            return 0;
        }

        let count = 0;
		
		// count up how many neighbors are alive at N,NE,E,SE,S,SW,W,SE - use this.world[row][col-1] etc
        const directions = [
            [-1, 0], [-1, 1], [0, 1], [1, 1],
            [1, 0], [1, -1], [0, -1], [-1, -1]
        ];

        for (const direction of directions){
            const [dRow, dCol] = direction;
            const neighborRow = row + dRow;
            const neighborCol = col + dCol;
            
            if (
                neighborRow >= 0 && neighborRow < this.numRows &&
                neighborCol >= 0 && neighborCol < this.numCols &&
                this.world[neighborRow][neighborCol] === 1
            ) {
                count++;
            }
        }
        // return that sum
        return count;
	},
	
    step(){
        // TODO:
        
        // nested for loop will call getLivingNeighbors() on each cell in this.world
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                const livingNeighbors = this.getLivingNeighbors(row, col);
                const currentState = this.world[row][col];

                // Determine if that cell in the next generation should be alive (see wikipedia life page linked at top)
                // Put a 1 or zero into the right location in this.worldBuffer
                if (currentState === 1 && (livingNeighbors < 2 || livingNeighbors > 3)) {
                    this.worldBuffer[row][col] = 0; // Cell dies due to underpopulation or overcrowding
                } else if (currentState === 0 && livingNeighbors === 3) {
                    this.worldBuffer[row][col] = 1; // Cell becomes alive due to reproduction
                } else {
                    this.worldBuffer[row][col] = currentState; // Cell remains in its current state
                }
            }
        }
    
        // when the looping is done, swap .world and .worldBuffer (use a temp variable to do so)
        const temp = this.world;
        this.world = this.worldBuffer;
        this.worldBuffer = temp;
    }


} // end lifeworld literal