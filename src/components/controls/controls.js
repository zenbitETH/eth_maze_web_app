import React, {useEffect} from "react"
import {grid} from "../land/grid"

function Controls(props) {

    const move = eve => {

        let args = props;
        let oldPosition = [parseInt(props.position[0]), 
                           parseInt(props.position[1])]
    
        let tempPosition = oldPosition
        let newPosition = oldPosition[0] + "" + oldPosition[1]

        if (eve.target.id == 1) {
            tempPosition[1] = tempPosition[1] + 1
        }
        else if (eve.target.id == 2 && tempPosition[1] > 0) {
            tempPosition[1] = tempPosition[1] - 1
        }
        else if (eve.target.id == 3 && tempPosition[0] > 0) {
            tempPosition[0] = tempPosition[0] - 1
        }
        else if (eve.target.id == 4) {
            tempPosition[0] = tempPosition[0] + 1
        }

        if(grid[tempPosition[0]][tempPosition[1]] !== 0) {
            newPosition = tempPosition[0] + "" + tempPosition[1]
        }
        args.changePosition(newPosition)
    } 

    return(
        <div className="controls">
            <div className="button-container">
                <button
                id="1" 
                onClick={move}
                className="button-maze">
                    Move right
                </button>
            </div>
            <div className="button-container">
                <button 
                id="2" 
                onClick={move}
                className="button-maze">
                    Move left
                </button>
            </div>
            <div className="button-container">
                <button 
                id="3" 
                onClick={move}
                className="button-maze">
                    Move up
                </button>
            </div>
            <div className="button-container">
                <button 
                id="4" 
                onClick={move}
                className="button-maze">
                    Move down
                </button>
            </div>
        </div>
    )
}


export default Controls
