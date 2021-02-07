import React from "react"

function Button(props) {
    return(
        <button 
            id={props.id}
            onClick={props.data.fireFunction}
            className={"button-maze "+props.spec}
            style={{visibility: props.isHiden ? "hidden": "visible"}}
        >
            {props.data.message}
        </button>
    )
}

export default Button
