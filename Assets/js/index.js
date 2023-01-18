const columnsQtt = 10;
const rowQtt = 20;
const bodyElement = document.getElementsByTagName("body")[0]
let actualLevel
let actualVelocity

function loadGameGrid() {
    const gridConteiner = document.querySelector(".grid-game")
    let listBlocks = ''

    for (let i = 1; i <= rowQtt; i++) {
        for (let j = 1; j <= columnsQtt; j++) {
            listBlocks += `
            <div id="grid-${i}-${j}" class="block-space" block-type="none"></div>`
        }
    }
    gridConteiner.innerHTML = listBlocks
}

const setLevel = function (a) {
    actualLevel = a <= 10 ? a : 10;
    actualVelocity = actualLevel * 50
}

const sortNewBlock = a => Math.floor((Math.random() * 7) + 1)

const renderBlock = function () {
    const blockStyle = sortNewBlock()

    switch (blockStyle) {
        case 1: //i
            document.getElementById("grid-1-4").classList.add("moving")
            document.getElementById("grid-1-5").classList.add("moving")
            document.getElementById("grid-1-6").classList.add("moving")
            document.getElementById("grid-1-7").classList.add("moving")
            document.getElementById("grid-1-4").setAttribute("block-type", "i")
            document.getElementById("grid-1-5").setAttribute("block-type", "i")
            document.getElementById("grid-1-6").setAttribute("block-type", "i")
            document.getElementById("grid-1-7").setAttribute("block-type", "i")

            break;
        case 2: //j
            document.getElementById("grid-1-5").classList.add("moving")
            document.getElementById("grid-1-6").classList.add("moving")
            document.getElementById("grid-1-7").classList.add("moving")
            document.getElementById("grid-2-7").classList.add("moving")
            document.getElementById("grid-1-5").setAttribute("block-type", "j")
            document.getElementById("grid-1-6").setAttribute("block-type", "j")
            document.getElementById("grid-1-7").setAttribute("block-type", "j")
            document.getElementById("grid-2-7").setAttribute("block-type", "j")
            break;
        case 3: //l
            document.getElementById("grid-1-5").classList.add("moving")
            document.getElementById("grid-1-6").classList.add("moving")
            document.getElementById("grid-1-7").classList.add("moving")
            document.getElementById("grid-2-5").classList.add("moving")
            document.getElementById("grid-1-5").setAttribute("block-type", "l")
            document.getElementById("grid-1-6").setAttribute("block-type", "l")
            document.getElementById("grid-1-7").setAttribute("block-type", "l")
            document.getElementById("grid-2-5").setAttribute("block-type", "l")
            break;
        case 4: //o
            document.getElementById("grid-1-5").classList.add("moving")
            document.getElementById("grid-1-6").classList.add("moving")
            document.getElementById("grid-2-5").classList.add("moving")
            document.getElementById("grid-2-6").classList.add("moving")
            document.getElementById("grid-1-5").setAttribute("block-type", "o")
            document.getElementById("grid-1-6").setAttribute("block-type", "o")
            document.getElementById("grid-2-5").setAttribute("block-type", "o")
            document.getElementById("grid-2-6").setAttribute("block-type", "o")
            break;
        case 5: //s
            document.getElementById("grid-1-5").classList.add("moving")
            document.getElementById("grid-1-6").classList.add("moving")
            document.getElementById("grid-2-5").classList.add("moving")
            document.getElementById("grid-2-4").classList.add("moving")
            document.getElementById("grid-1-5").setAttribute("block-type", "s")
            document.getElementById("grid-1-6").setAttribute("block-type", "s")
            document.getElementById("grid-2-5").setAttribute("block-type", "s")
            document.getElementById("grid-2-4").setAttribute("block-type", "s")
            break;
        case 6: //t
            document.getElementById("grid-1-4").classList.add("moving")
            document.getElementById("grid-1-5").classList.add("moving")
            document.getElementById("grid-1-6").classList.add("moving")
            document.getElementById("grid-2-5").classList.add("moving")
            document.getElementById("grid-1-4").setAttribute("block-type", "t")
            document.getElementById("grid-1-5").setAttribute("block-type", "t")
            document.getElementById("grid-1-6").setAttribute("block-type", "t")
            document.getElementById("grid-2-5").setAttribute("block-type", "t")
            break;
        case 7: //z
            document.getElementById("grid-1-5").classList.add("moving")
            document.getElementById("grid-1-6").classList.add("moving")
            document.getElementById("grid-2-6").classList.add("moving")
            document.getElementById("grid-2-7").classList.add("moving")
            document.getElementById("grid-1-5").setAttribute("block-type", "z")
            document.getElementById("grid-1-6").setAttribute("block-type", "z")
            document.getElementById("grid-2-6").setAttribute("block-type", "z")
            document.getElementById("grid-2-7").setAttribute("block-type", "z")
            break;
    }
}

const rotateBlock = a => a

const stopFallBlock = function () {
    for (let i = rowQtt; i >= 1; i--) {
        for (let j = columnsQtt; j >= 1; j--) {
            let element = document.getElementById(`grid-${i}-${j}`)
            if (element.classList.contains("moving")) {
                element.classList.remove("moving")
                element.classList.add("stopped")
            }
        }
    }
}

const verifyBlockTouchDown = function (x, y) {
    if (x === 20) {
        return true
    }

    for (let i = x; i >= 1; i--) {
        for (let j = y; j >= 1; j--) {
            let element = document.getElementById(`grid-${i}-${j}`)
            let isMoving = element.classList.contains("moving")
            let nextLineBlock = document.getElementById(`grid-${i + 1}-${j}`)
            let nextLineHasABlock = nextLineBlock.classList.contains("stopped")
            if (nextLineHasABlock & isMoving) {
                return true
            }
        }
    }

    return false
}

const verifyBlockTouchOnLeft = function (x, y) {
    if (y === 1) {
        return true
    }

    for (let c = y; c <= columnsQtt; c++) {
        for (let r = x; r <= rowQtt; r++) {
            let element = document.getElementById(`grid-${r}-${c}`)
            let isMoving = element.classList.contains("moving")
            let leftColumnBlock = document.getElementById(`grid-${r}-${c - 1}`)
            let leftColumnHasABlock = leftColumnBlock.classList.contains("stopped")
            if (leftColumnHasABlock & isMoving) {
                return true
            }
        }
    }

    return false
}

const verifyBlockTouchOnRight = function (x, y) {
    if (y === 10) {
        return true
    }

    for (let c = y; c >= 1; c--) {
        for (let r = x; r >= 1; r--) {
            let element = document.getElementById(`grid-${r}-${c}`)
            let isMoving = element.classList.contains("moving")
            let leftColumnBlock = document.getElementById(`grid-${r}-${c + 1}`)
            let leftColumnHasABlock = leftColumnBlock.classList.contains("stopped")
            if (leftColumnHasABlock & isMoving) {
                return true
            }
        }
    }

    return false
}

const fallBlock = function () {

    setInterval(function () {
        for (let i = rowQtt; i >= 1; i--) {
            for (let j = columnsQtt; j >= 1; j--) {

                let element = document.getElementById(`grid-${i}-${j}`)
                let actualBlockTypeValue = element.getAttribute("block-type")
                let isMoving = element.classList.contains("moving")

                let hasAObstacle = false
                if(isMoving){
                    hasAObstacle = verifyBlockTouchDown(i, j)
                }
                
                if (hasAObstacle) {
                    stopFallBlock()
                    renderBlock()
                    //calcLines()
                }
                if (isMoving & !hasAObstacle) {
                    let nextLineBlock = document.getElementById(`grid-${i + 1}-${j}`)
                    nextLineBlock.setAttribute("block-type", `${actualBlockTypeValue}`)
                    nextLineBlock.classList.add("moving")
                    element.removeAttribute("block-type")
                    element.classList.remove("moving")
                }
            }
        }
    }, 1000 - actualVelocity)
}

const moveLeftBlock = function () {
    for (let c = 1; c <= columnsQtt; c++) {
        for (let r = 1; r <= rowQtt; r++) {

            let element = document.getElementById(`grid-${r}-${c}`)
            let actualBlockTypeValue = element.getAttribute("block-type")
            let isMoving = element.classList.contains("moving")

            let hasAObstacle = false
            if(isMoving){
                hasAObstacle = verifyBlockTouchOnLeft(r, c)
            }

            if(hasAObstacle){
                return false
            }

            if (isMoving & !hasAObstacle) {
                let leftColumnBlock = document.getElementById(`grid-${r}-${c - 1}`)
                leftColumnBlock.setAttribute("block-type", `${actualBlockTypeValue}`)
                leftColumnBlock.classList.add("moving")
                element.removeAttribute("block-type")
                element.classList.remove("moving")
            }
        }
    }
}
const moveRightBlock = function () {
    for (let c = columnsQtt; c >= 1; c--) {
        for (let r = rowQtt; r >= 1; r--) {

            let element = document.getElementById(`grid-${r}-${c}`)
            let actualBlockTypeValue = element.getAttribute("block-type")
            let isMoving = element.classList.contains("moving")

            let hasAObstacle = false
            if(isMoving){
                hasAObstacle = verifyBlockTouchOnRight(r, c)
            }

            if(hasAObstacle){
                return false
            }

            if (isMoving & !hasAObstacle) {
                let rightColumnBlock = document.getElementById(`grid-${r}-${c + 1}`)
                rightColumnBlock.setAttribute("block-type", `${actualBlockTypeValue}`)
                rightColumnBlock.classList.add("moving")
                element.removeAttribute("block-type")
                element.classList.remove("moving")
            }
        }
    }
}
const moveDownFastBlock = a => a
const endMoviment = a => a
const calcLines = a => a
const removeLines = a => a
const newBlock = a => a

setLevel(4)
fallBlock()


document.onkeydown = keyboard
function keyboard(event) {
    const keyname = event.key
    console.log(keyname)

    if (keyname === "ArrowLeft"){
        moveLeftBlock()
    }
    if (keyname === "ArrowRight"){
        moveRightBlock("1")
    }
}