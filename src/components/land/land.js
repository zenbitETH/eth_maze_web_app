import React, {useEffect, useState} from "react"
import Square from "./square"
import Rows from "./rows"
import {grid, rules} from "./grid"

function Land(props) {

    const get2dArray = props => {
        let array2d = []
        let position = [parseInt(props.position[0]), parseInt(props.position[1])]
        for(var row = 0; row < grid.length; row++) {
            let array1d = []
            for(var col = 0; col < grid[row].length; col++) {
                let _square;
                let selected = false
                let visibility = 0;
                
                if (position[0] === row && position[1] === col) {
                    selected = 1
                } else if(grid[row][col] < 0) {
                    selected = -1
                } else {
                    selected = 0
                }
                
                visibility = grid[row][col]

                _square = <Square 
                            key={row+""+col} 
                            selected={selected}
                            visibility={visibility}
                          />
                array1d.push(_square)
            }
            array2d.push(<Rows columns={array1d} key={row} />)
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
