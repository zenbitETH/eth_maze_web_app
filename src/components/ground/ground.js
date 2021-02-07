import React, {useEffect} from "react"
import AddressSearch from "./addressSearch"

function Ground(props) {

    useEffect(() => {
        console.log(props.position)
    }, [props.position])

    const componentRender = () => {
        let component;
        if(props.position == 32){
            component = <AddressSearch changeAllowance={props.changeAllowance}/>
        }
        return component
    }

    return(
        <div className="ground">
            {componentRender()}
        </div>
    )
}

export default Ground
