import React, {useEffect} from "react"
import Button from "./button"
import ButtonContainer from "./buttonContainer"
import {grid} from "../land/grid"

function Controls(props) {

    const move = eve => {
        if(!props.canContinue) {
            return
        }
        let args = props;
        let oldPosition = [parseInt(props.position[0]), 
                           parseInt(props.position[1])]
    
        let tempPosition = oldPosition
        let newPosition = oldPosition[0] + "" + oldPosition[1]

        if (eve.target.id == 1) {
            tempPosition[1] = tempPosition[1] + 1
        }
        else if (eve.target.id == 2 && tempPosition[1] > 1) {
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
        args.changeStage(grid[newPosition[0]][newPosition[1]])
    }

    return(
        <div className="controls">
            <ButtonContainer>
                <Button
                    id={2}
                    data={{
                        move: move,
                        message: "Move left"
                    }}
                />
                <Button
                    id={1}
                    data={{
                        move: move,
                        message: "Move right"
                    }}
                />
            </ButtonContainer>
        </div>
    )
}


export default Controls
