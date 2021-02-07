import React, {useEffect} from "react"
import SnakeAttack from "./snakeAttack"
import AddressSearch from "./addressSearch"
import FirstLevelBoss from "./firstLevelBoss"

function Ground(props) {

    useEffect(() => {
    }, [props.position])

    const componentRender = () => {
        let component;
        if(props.position == 32){
            component = <AddressSearch changeAllowance={props.changeAllowance}/>
        } else if(props.position == 35) {
            component = <SnakeAttack changeAllowance={props.changeAllowance} /> 
        } else if(props.position == 36) {
            component = <FirstLevelBoss changeAllowance={props.changeAllowance} /> 
        }
        return component
    }

    return(
        <div 
            className="ground" 
            id="ground"
            style={
                {
                    visibility: props.position == "35" ? "hidden": "visible"
                }
            }    
        >
            {componentRender()}
        </div>
    )
}

export default Ground
