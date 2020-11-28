import React, {useEffect, useState} from "react"
import Web3 from "web3"
import "../../style/index.css"

var contract = require("@truffle/contract");
let web3;
let instance;
let RaribleContract;
let image

function Canvas() {

    const [buttonVisibility, setButtonVisibility] = useState("") 
    const [Rarible, setRarible] = useState(null)
    let [accounts, setAccounts] = useState([])

    function fetchRaribleJSON() {
        fetch("https://zenbit-util-contracts.s3.amazonaws.com/rarible.json",
        {mode: 'cors'})
        .then(res => res.json())
        .then(result => {
            setRarible(result)
            console.log(Rarible)
        })
    }

    useEffect(() => {
        fetchRaribleJSON()
        console.log(Rarible)
    }, [])

    useEffect(() => {
        if(accounts.length === 0) {
            setButtonVisibility("initial")
        } else {
            setButtonVisibility("none")
        }
    }, [accounts])

    async function initComponent() {
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
            return 0
        }

        web3.eth.getAccounts().then(accnts => {
            setAccounts(accnts)
        })

        RaribleContract = contract({abi: Rarible.abi})
        RaribleContract.setProvider(web3.currentProvider)
        instance = await RaribleContract.at(
            Rarible.address
        )
        console.log(instance)
        let stuff = await instance.uri(77159, {from: accounts[0]})
        console.log(stuff)
        let resp = await (await (await fetch(stuff)).json())
        console.log(resp)
    }

    async function enableMetamask() {
        let _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(_accounts)
        setButtonVisibility("none")
        await initComponent()
    }

    return(
        <div>
            <button type="submit"
            onClick={enableMetamask}
            style={{display: buttonVisibility}}
            className="button-submit">
                Conectar Metamask
            </button>
            <video 
            src="https://gateway.ipfs.io/ipfs/QmZdHmq1LmhZBcZ3uF6or8Wp9CrNV2eXN1U4bqVMksbxUK/animation.mp4"
            width="320" height="240" controls>
            </video>
        </div>
    )
}

export default Canvas;