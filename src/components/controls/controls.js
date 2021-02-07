import Button from "./button"
import React, {useEffect, useState} from "react"
import {setBackgroundImage, url} from "../canvas/background"
import ButtonContainer from "./buttonContainer"


import {grid} from "../land/grid"

function Controls(props) {

    let [currentPosition, setCurrentPosition] = useState("31")
    let darkPositions = ["34", "35"]

    useEffect(() => {
    }, [props])

    const move = eve => {
        if(!props.allowed) {
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

        if(grid[tempPosition[0]][tempPosition[1]] > 0) {
            newPosition = tempPosition[0] + "" + tempPosition[1]
        }
        if(["32", "35", "36"].includes(tempPosition[0]+""+tempPosition[1])) {
            props.changeAllowance(false)
        }
        args.changePosition(newPosition)
        setCurrentPosition(newPosition)
    }

    const changeBackgroundImage = () => {
        if(props.position == "35") {
            let ground = document.getElementById("ground")
            ground.style.visibility="visible"
        }
        setBackgroundImage(url+"C.jpg")
    }

    return(
        <div className="controls">
            <ButtonContainer>
                <Button
                    id={3}
                    data={{
                        fireFunction: move,
                        message: "Move ▲"
                    }}
                    spec="up-down"
                    isHiden={!props.items["2"]}
                />
                <Button
                    id={4}
                    data={{
                        fireFunction: move,
                        message: "Move ▼"
                    }}
                    spec="up-down"
                    isHiden={!props.items["3"]}
                />
            </ButtonContainer>
            <ButtonContainer>
                <Button
                    id={2}
                    data={{
                        fireFunction: move,
                        message: "Move ◄"
                    }}
                    spec="left-right"
                    isHiden={!props.items["1"]}
                    />
                <Button
                    id={1}
                    data={{
                        fireFunction: move,
                        message: "Move ►"
                    }}
                    spec="left-right"
                    isHiden={!props.items["1"]}
                />
            </ButtonContainer>
            <ButtonContainer>
                <Button
                    id={5}
                    data={{
                        fireFunction: changeBackgroundImage,
                        message: "Light room"
                    }}
                    spec="up-down"
                    isHiden={!(props.items["4"] && ["34","35"].includes(currentPosition))}
                    />
                <Button
                    id={6}
                    data={{
                        move: move,
                        message: ""
                    }}
                    spec="left-right"
                    isHiden={true}
                />
            </ButtonContainer>
        </div>
    )
}


export default Controls
