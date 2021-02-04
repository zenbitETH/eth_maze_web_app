
var url = "https://zenbit-util-contracts.s3.amazonaws.com/fondo"

const setBackgroundImage = url => {
    let ele = document.getElementById("body")
    console.log(url)
    ele.style.backgroundImage = `url(${url})`
}

const changeBodyStyle = position => {
    let image = "A.jpg"
    if(position == 34 || position == 35) {
        image = "Z.jpg"
    }
    setBackgroundImage(url+image)
}

export {changeBodyStyle, url}
