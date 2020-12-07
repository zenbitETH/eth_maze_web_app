import React, {useEffect} from "react";
import Columns from "./columns";

let rows = [];

function Rows(props) {

    return(
        <div className="columns">
            {props.columns}
        </div>
    )
}


export default Rows;
