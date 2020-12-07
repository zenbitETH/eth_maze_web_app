import React, { useEffect, useState} from "react"

function Item(props) {

    let [uri, setURI] = useState("")
    let [NFTObject, setNFTObject] = useState({
            image: "loading.gif",
            description: "",
            name: "",
        })
    let [balance, setBalance] = useState(0)

    useEffect(() => {
        const balanceOf = async () => {
            let balance = await props.args.balanceOf(props.id)
            return balance.toNumber()
        }
        balanceOf().then(_balance => {
            setBalance(_balance)
        })
    }, [props.instance])

    useEffect(() => {
        const getURI = async () => {
            let _uri = await props.args.getURI(props.id)
            return _uri
        }
        getURI().then(res => {
            setURI(res)
        })
    }, [balance, props.ready])

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
        className="one-card">
            {
            balance === 0 && !props.ready ?
            <span>
                User does not have item
            </span>
            :
            <img
                src={NFTObject.image}
                width="130" height="130"
                alt={NFTObject.description}>
            </img> 
            }
        </div>
    )
}


export default Item
