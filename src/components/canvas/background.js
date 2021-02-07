
var url = "https://zenbit-util-contracts.s3.amazonaws.com/fondo"

const setBackgroundImage = url => {
    let ele = document.getElementById("body")
    ele.style.backgroundImage = `url(${url})`
}

const changeBodyStyle = position => {
    let image = "B.jpg"
    if(position == 34 || position == 35) {
        image = "Z.jpg"
    }
    setBackgroundImage(url+image)
}

export {changeBodyStyle, setBackgroundImage, url}
