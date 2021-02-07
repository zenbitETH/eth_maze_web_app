import React, {useEffect} from "react"
import Item from "./Item"

const items = require("./items.json")


function ItemsContainer(props) {

    const itemsMap = items.map(ele => {
        return <Item id={ele.token_id} key={ele.id} maskedKey={ele.id}
        ready={props.ready} args={props.args} instance={props.instance}/>
    })

    return(
        <div className="cards">
            {itemsMap}
        </div>
    )
}

export default ItemsContainer
