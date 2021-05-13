window.addEventListener('load', (event) => {
    // activateGIF()
    // deActivateGIF()
})

//function that activates the gif when scrolled into
const activateGIF = function () {
    let gif = `
    <img src="imgs/front-page-gif-2.gif" class="backgroundIMGSize" alt="Galaxy">
    `

    document.getElementById("gifContainer").innerHTML = gif
}

const deActivateGIF = function () {
    let img = `
    <img src="imgs/pwp-background-placeholder.png" id="gifContainer" width="2500px" class="img-fluid px-0 backgroundIMG" alt="Galaxy">
    `

    document.getElementById("gifContainer").innerHTML = img
}
