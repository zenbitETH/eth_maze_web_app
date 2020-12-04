import React from "react"


function Controls(props) {

    let args = props;
    let position = [parseInt(props.position[0]), parseInt(props.position[1])]
    const move = eve => {

        if (eve.target.id == 1) {
            position[1] = position[1] + 1
        }
        else if (eve.target.id == 2) {
            position[0] = position[0] + 1
        }
        else {
            position[0] = position[0] - 1
        }
        args.changePosition(position[0] + "" + position[1])
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
                    Move up
                </button>
            </div>
            <div className="button-container">
                <button 
                id="3" 
                onClick={move}
                className="button-maze">
                    Move down
                </button>
            </div>
        </div>
    )
}


export default Controls
