import React from "react"


function Header(props) {

    let _class = props.buttonVisibility ? "button-submit-blocked" : "button-submit"

    return(

        <div className="canvas-header" id="button-mm">
            
            <img className="logo" src="aztec-logo.png"></img>
            <button type="submit"
                disable={props.buttonVisibility.toString()}
                onClick={props.enableMetamask}
                className={_class}>
                    Connect Metamask
            </button>
            
        </div>
    )
}


export default Header
