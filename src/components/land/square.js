import React, { useEffect } from "react"


function Square(props) {
    
    let squareStyle = {
        border: visibilityState(props.visibility),
        backgroundColor: selectedState(props.selected),
    }

    return(
        <div className="square" style={squareStyle}>
        </div>
    )
}

const visibilityState = _visibility => {
    
    if(_visibility > 0 ) {
        return "1px solid white"
    } else if(_visibility < 0) {
        return "1px solid rgba(200,200, 200, 0.6)"
    } else {
        return "1px solid transparent"
    }
}

const selectedState = selected => {
    if(selected == 1){
        return "#FF9400"
    } else if(selected == -1) {
        return "rgba(200,200, 200, 0.6)"
    } else {
        return
    }
}

export default Square
