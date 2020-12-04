import React, {useEffect, useState} from "react"
import Web3 from "web3"
import ItemsContainer from "../items/itemsContainer"
import "../../style/index.css"
import Land from "../land/land"
import Controls from "../controls/controls"
import Header from "./header"

var contract = require("@truffle/contract");
let web3;
let instance;
let RaribleContract;


function Canvas() {

    const [buttonVisibility, setButtonVisibility] = useState("") 
    const [Rarible, setRarible] = useState(null)
    let [accounts, setAccounts] = useState([])
    let [_pos, setPosition] = useState("00")

    useEffect(() => {
        initMetaMask()
        web3.eth.getAccounts().then(accnts => {
            setAccounts(accnts)
        })
        fetchRaribleJSON()
    }, [])

    useEffect(() => {
        if(accounts.length === 0) {
            setButtonVisibility("initial")
        } else {
            setButtonVisibility("hidden")
        }
    }, [accounts])

    const superiorSetPosition = _position => {
        setPosition(_position)
    }

    const fetchRaribleJSON = () => {
        fetch("https://zenbit-util-contracts.s3.amazonaws.com/rarible.json",
        {mode: 'cors'})
        .then(res => res.json())
        .then(result => {
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

    const initComponent = async () => {
        
        let walletExists = initMetaMask()
        if (!walletExists) {
            return null
        } 
        web3.eth.getAccounts().then(accnts => {
            setAccounts(accnts)
        })

        RaribleContract = contract({abi: Rarible.abi})
        RaribleContract.setProvider(web3.currentProvider)
        instance = await RaribleContract.at(
            Rarible.address
        )
        let stuff = await instance.uri(77159, {from: accounts[0]})
        let resp = await (await (await fetch(stuff)).json())

        return 
    }
                    
    const enableMetamask = async () => {
        let _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(_accounts)
        setButtonVisibility("none")
        await initComponent()
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
            <ItemsContainer />
        </div>
    )
}

export default Canvas;