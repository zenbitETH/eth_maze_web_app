import React, {useState} from "react"

function SnakeAttack(props) {
    
    let goal = 3
    let [counter, setCounter] = useState(0)

    const attack = () => {
        let _counter = counter + 1
        setCounter(_counter)
        if(_counter == 1){
            document.getElementById("left-snake").style.transform = "rotate(180deg)"
        } else if(_counter == 2){
            document.getElementById("right-snake").style.transform = "rotate(180deg)"
        } else if(_counter == 3){
            document.getElementById("big-snake").style.transform = "rotate(60deg)"
        } else if(_counter == 4){
            document.getElementById("big-snake").style.transform = "rotate(120deg)"
        } else if(_counter == 5){
            props.changeAllowance(true)
            document.getElementById("big-snake").style.transform = "rotate(180deg)"
        }

    }

    return(
        <div className="snake-component">
            <div className="row-snakes">
                <img className="mini snake" src="0.png" id="left-snake"></img>
                <div className="mini"></div>
                <img className="mini snake" src="0a.png" id="right-snake"></img>
            </div>
            <div className="big-snake">
                <img className="big snake" src="0.png" id="big-snake"></img>
            </div>
            <button className="cc attack-button" onClick={attack}>
                attack!
            </button>
        </div>
    )
}

export default SnakeAttack
