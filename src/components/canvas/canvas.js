import React, {useEffect, useState} from "react"
import Web3 from "web3"
import ItemsContainer from "../items/itemsContainer"
import "../../style/index.css"
import Land from "../land/land"
import Controls from "../controls/controls"
import Header from "./header"

var contract = require("@truffle/contract");
let web3;
let _instance;
let RaribleContract;


function Canvas() {

    const [buttonVisibility, setButtonVisibility] = useState("") 
    let [Rarible, setRarible] = useState(null)
    let [accounts, setAccounts] = useState([])
    let [_pos, setPosition] = useState("00")
    let [instance, setInstance] = useState(null)
    let [ready, setReadiness] = useState(false)

    useEffect(() => {
        initMetaMask()
        web3.eth.getAccounts().then(accnts => {
            setAccounts(accnts)
        })
        fetchRaribleJSON()
    }, [])

    useEffect(() => {
        setContract()
    }, [Rarible])

    useEffect(() => {
        if(accounts.length === 0) {
            setButtonVisibility("initial")
        } else {
            setButtonVisibility("hidden")
        }
    }, [accounts])

    useEffect(() => {
        console.log(instance, ready)
    }, [Rarible, instance])

    const superiorSetPosition = _position => {
        setPosition(_position)
    }

    const fetchRaribleJSON = () => {
        fetch("https://zenbit-util-contracts.s3.amazonaws.com/rarible.json",
        {mode: 'cors'})
        .then(res => res.json())
        .then(result => {
            console.log(result)
            setRarible(result)
        })
    }

    const initMetaMask = () => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum)
        }
       // Legacy DApp Browsers
        else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        }
       // Non-DApp Browsers
        else {
            alert('You have to install MetaMask !');
        }
        if(typeof web3 === "undefined") {
            return false
        } else {
            return true
        }
    }

    const setContract = async () => {
        RaribleContract = contract({abi: Rarible.abi})
        RaribleContract.setProvider(web3.currentProvider)
        _instance = await RaribleContract.at(
            Rarible.address
        )
        setInstance(_instance)
    }
                    
    const enableMetamask = async () => {
        let _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(_accounts)
        setReadiness(true)
        setButtonVisibility("none")
    }

    const _getURI = tokenID => {
        if(instance == null || accounts.length === 0) {
            return new Promise((resolve, reject) => {
                resolve("")
            })
        }
        return instance.uri(tokenID)
    }

    const _BalanceOf = tokenID => {
        return instance.balanceOf(accounts[0], tokenID)
    }
    
    return(
        <div className="canvas">
            <div className="canvas-header" style={{overflow: buttonVisibility}}>
                <Header 
                args={buttonVisibility} 
                enableMetamask={enableMetamask}/>
            </div>
            <div className="playground">
                <Controls position={_pos} changePosition={superiorSetPosition}/>
                <Land len={8} position={_pos} />
            </div>
            <ItemsContainer 
            args={{getURI: _getURI, balanceOf: _BalanceOf}}
            ready={ready}
            instance={instance}/>
        </div>
    )
}

export default Canvas;