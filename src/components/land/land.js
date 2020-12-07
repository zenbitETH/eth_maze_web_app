import React, {useEffect, useState} from "react"
import Square from "./square"
import Rows from "./rows"


function Land(props) {

    const get2dArray = props => {
        let array2d = []
        let path = [""]
        let position = [parseInt(props.position[0]), parseInt(props.position[1])]
        for(var i = 0; i < props.len; i++) {
            let array1d = []
            for(var j = 0; j < props.len; j++) {
                let _square;
                let isSelected = false
                if (position[0] === i && position[1] === j) {
                    isSelected = true
                }
                _square = <Square key={i+""+j} isSelected={isSelected} />
                array1d.push(_square)
            }
            array2d.push(<Rows columns={array1d} key={i} />)
        }
        return array2d
    }
    
    let [array2d, setArray2d] = useState([])

    useEffect(() => {
        setArray2d(get2dArray(props))
    }, [props])

    return(
        <div className="grid">
            {array2d}
        </div>
    )
}

export default Land
