import React, { useEffect } from "react"


function Square(props) {
    
    let squareStyle = {
        border: isVisible(props.isVisible),
        backgroundColor: isSelected(props.isSelected),
    }

    return(
        <div className="square" style={squareStyle}>
        </div>
    )
}

const isVisible = _isVisible => {
    if(_isVisible) {
        return "1px solid white"
    } else {
        return "1px white"
    }
}

const isSelected = selected => {
    if(selected){
        return "#FF9400"
    }
    return
}

export default Square
