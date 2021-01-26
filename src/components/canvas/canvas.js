import React, {useEffect, useState} from "react"
import Web3 from "web3"
import ItemsContainer from "../items/itemsContainer"
import "../../style/index.css"
import Land from "../land/land"
import Controls from "../controls/controls"
import Header from "./header"
import Ground from "../ground/ground"
import ModalLanding from "../modals/landing"

let web3;
let _instance;
let RaribleContract;
var contract = require("@truffle/contract");


function Canvas() {

    const [buttonVisibility, setButtonVisibility] = useState(false) 
    let [Rarible, setRarible] = useState(null)
    let [accounts, setAccounts] = useState([])
    let [_pos, setPosition] = useState("30")
    let [instance, setInstance] = useState(null)
    let [ready, setReadiness] = useState(false)
    let [items, setItems] = useState([])
    let [gameInit, setGameInit] = useState(false)

    // Initialize wallets and get accounts if connected, fetch Rarible json
    useEffect(() => {
        initMetaMask()
        web3.eth.getAccounts().then(accnts => {
            setAccounts(accnts)
        })
        fetchRaribleJSON()
    }, [])

    // Once the Rarible json is fetched contrac variable is initialized
    useEffect(() => {
        setContract()
    }, [Rarible])

    // Edit metamask button if accounts are already available
    useEffect(() => {
        if(accounts.length === 0) {
            setButtonVisibility(false)
        } else {
            setButtonVisibility(true)
        }
    }, [accounts])

    //
    useEffect(() => {
    }, [Rarible, instance])

    // Function to set NFT items from contract. Passed to child component
    const _getItems = _items => {
        setItems(_items)
    }

    // Function to set position from controls at parent state
    const superiorSetPosition = _position => {
        setPosition(_position)
    }

    // Fetch Rarible json from AWS
    const fetchRaribleJSON = () => {
        fetch("https://zenbit-util-contracts.s3.amazonaws.com/rarible.json",
        {mode: 'cors'})
        .then(res => res.json())
        .then(result => {
            setRarible(result)
        })
    }

    // Function to check wether accounts are available or not
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

    // Function to set the contract instance and use web3 provided by metamask
    const setContract = async () => {
        RaribleContract = contract({abi: Rarible.abi})
        RaribleContract.setProvider(web3.currentProvider)
        _instance = await RaribleContract.at(
            Rarible.address
        )
        setInstance(_instance)
    }

    // Function to enable Metamask when button is clicked
    const enableMetamask = async () => {
        let _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(_accounts)

        setReadiness(true)
        setButtonVisibility(true)
    }

    // Function to return URI from token
    const _getURI = tokenID => {
        if(instance == null || accounts.length === 0) {
            return new Promise((resolve, reject) => {
                resolve("")
            })
        }
        return instance.uri(tokenID)
    }

    // Function to get balance from account with fetched tokenID
    const _BalanceOf = tokenID => {
        return instance.balanceOf(accounts[0], tokenID)
    }

    return(
        <div className="canvas">
            
            <Header 
                enableMetamask={enableMetamask} 
                buttonVisibility={buttonVisibility}
            />

            <div className="playground">
                <Controls position={_pos} changePosition={superiorSetPosition}/>
                <Ground />
                <Land position={_pos} items={items}/>
            </div>
            <ModalLanding />
            <ItemsContainer 
                args={
                    {
                        getURI: _getURI, 
                        balanceOf: _BalanceOf,
                        getItems: _getItems
                    }
                }
                ready={ready}
                instance={instance}
            />
        </div>
    )
}

export default Canvas;