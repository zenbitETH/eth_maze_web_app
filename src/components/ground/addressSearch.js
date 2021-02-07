import React, {useState} from "react"

function AddressSearch(props) {

    let RaribleAddress = "0xd07dc4262BCDbf85190C01c996b4C06a461d2430"

    const checkInput = (ev) => {
        let userInput = document.getElementById("input").value
        if(userInput == RaribleAddress) {
            props.changeAllowance(true)
        }
    }

    return (
        <div className="addressSearch">
            <div className="address-search-message">
                <p className="message">
                    Search in Etherscan for the Rarible contract address on which Aztec
                    NFTs are minted
                </p>
            </div>
            <input type="text" className="search-bar" id="input"/>
            <button className="cc check-answer" onClick={checkInput}>
                check address
            </button>
        </div>
    )
}

export default AddressSearch
