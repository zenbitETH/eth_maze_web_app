import React, {useEffect} from "react";

let rows = [];

function Rows(props) {

    return(
        <div className="columns">
            {props.columns}
        </div>
    )
}


export default Rows;
