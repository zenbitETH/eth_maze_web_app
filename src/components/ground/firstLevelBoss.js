import React, {useState, useEffect} from "react"

let timeIntervalID;
let className = "cc "

function FirstLevelBoss(props) {

    let [clicks, setClicks] = useState(0)
    let [counter, setCounter] = useState(5)
    let [degrees, setDegrees] = useState(0)
    let [btnDisabled, setDisability] = useState(true)

    useEffect(() => {
        timeIntervalID = setInterval(()=>{
            setCounter(ctr => ctr-1)
        }, 1000)
    }, [])

    useEffect(() => {
        if(counter == 0){
            setDisability(false)
            clearInterval(timeIntervalID)
        }
    }, [counter])

    const attack = () => {
        let _deg = degrees + 5
        if(degrees == 180){
            props.changeAllowance(true)
            return
        }
        setDegrees(_deg)
    }

    return(
        <div className="first-level-boss">
            <div className="boss-container">
                <img 
                    className="fl-boss" 
                    src="1.png" 
                    id="right-snake"
                    style={{transform: `rotate(${degrees}deg)`}}
                ></img>
            </div>
            <button className={"cc " + (counter==0 ? "attack-button":"ip")}
                onClick={attack} disabled={btnDisabled}>
                {counter == 0 ? "attack!": counter.toString()}
            </button>
        </div>
    )
}

export default FirstLevelBoss
