import React, {useEffect} from "react"


function Header(props) {

    let _class = props.buttonVisibility ? "button-submit-blocked" : "button-submit"

    return(

        <div className="canvas-header" id="button-mm">
                <button type="submit"
                    disable={props.buttonVisibility}
                    onClick={props.enableMetamask}
                    className={_class}>
                        Connect Metamask
                </button>
        </div>

        
    )
}


export default Header
