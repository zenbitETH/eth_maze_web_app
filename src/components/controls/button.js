import React from "react"

function Button(props) {
    return(
        <button 
            id={props.id}
            onClick={props.data.move}
            className="button-maze">
            {props.data.message}
        </button>
    )
}

export default Button
