import React from "react"


function ButtonContainer(props) {
    return(
        <div className="button-container">
            {props.children}
        </div>
    )
}

export default ButtonContainer
