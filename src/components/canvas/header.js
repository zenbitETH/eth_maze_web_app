import React, {useEffect} from "react"


function Header(props) {

    return(
        <button type="submit"
            onClick={props.enableMetamask}
            style={{display: props.args.buttonVisibility}}
            className="button-submit">
                Connect Metamask
        </button>
    )
}


export default Header
