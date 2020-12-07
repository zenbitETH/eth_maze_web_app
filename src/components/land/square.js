import React, { useEffect } from "react"


function Square(props) {

    let squareStyle = {
        backgroundColor: isSelected(props.isSelected)
    }
    
    return(
        <div className="square" style={squareStyle}>
        </div>
    )
}

const isSelected = selected => {
    if(selected){
        return "#FF9400"
    }
    return
}

export default Square
