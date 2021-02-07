import React, { useEffect, useState} from "react"

function Item(props) {

    let [uri, setURI] = useState("")
    let [NFTObject, setNFTObject] = useState({
            image: "void.gif",
            description: "",
            name: "",
        })
    let [balance, setBalance] = useState(0)
    
    // First we get balance of selected address and tokens id.
    useEffect(() => {
        const balanceOf = async () => {
            let balance = await props.args.balanceOf(props.id)
            return balance.toNumber()
        }
        balanceOf().then(_balance => {
            setBalance(_balance)
        })
    }, [props.instance, props.ready])

    //Once balance is set we call the rarible smart contract to get the token URI
    useEffect(() => {
        const getURI = async () => {
            let _uri = await props.args.getURI(props.id)
            return _uri
        }
        getURI().then(res => {
            if(balance !== 0) {
                props.args.getItems(props.maskedKey)
                setURI(res)
            }
        })
    }, [balance])

    // Finally token object is called 
    useEffect(() => {
        fetchIPFSObject()
    }, [uri])

    const fetchIPFSObject = () => {
        var nft = {}
        let _url = ""
        if(uri === "") {
            return "./loading.gif"
        }
        fetch(uri,
        {mode: 'cors'})
        .then(res => res.json())
        .then(result => {
            _url = result.image
            nft.name = result.name
            nft.desc = result.description
            nft.image = "https://gateway.ipfs.io/" + result.image.substring(7)
            setNFTObject(nft)
        })
    }

    return(
        <div 
        className="one-card item">
            <img
                width="100%"
                src={NFTObject.image}
                alt={NFTObject.description}>
            </img> 
        </div>
    )
}


export default Item
