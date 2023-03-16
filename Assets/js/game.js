import rotate from "./rotations/index.js"

const columnsQtt = 10
const rowQtt = 20
let actualLevel
let actualVelocity
let refTypeActualBlock = ''
let refAngleActualBlock = 0 //Each block has an actual rotation position to especify it, except the O-block
let actualBlockPosList

export function loadGameGrid() {
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

export function starGame() {
    let init = false

    if (!init) {
        renderBlock()
        setLevel(1)
        document.onkeydown = keyboardMovements
        fallBlock()
        init = true
    }

}

function keyboardMovements(event) {
    const keyname = event.key

    if (keyname === "ArrowLeft") {
        arrangeArrayAccordingMove('left')
        moveLeftBlock()
    }
    if (keyname === "ArrowRight") {
        arrangeArrayAccordingMove('right')
        moveRightBlock()
    }
    if (keyname === "ArrowUp") {
        rotateBlock()
    }
}

function arrangeArrayAccordingMove(side) {
    const newArrangement = []

    if (side === "left") {
        for (let i of actualBlockPosList) {
            if (actualBlockPosList.indexOf(i) === 0) {
                newArrangement.push(i)
            } else {
                if (i[1] > newArrangement[newArrangement.length - 1][1]) {
                    newArrangement.push(i)
                } else {
                    newArrangement.unshift(i)
                }
            }
        }
    }
    if (side === "right") {
        for (let i of actualBlockPosList) {
            if (actualBlockPosList.indexOf(i) === 0) {
                newArrangement.push(i)
            } else {
                if (i[1] < newArrangement[newArrangement.length - 1][1]) {
                    newArrangement.push(i)
                } else {
                    newArrangement.unshift(i)
                }
            }
        }
    }
    if (side === "down") {
        for (let i of actualBlockPosList) {
            if (actualBlockPosList.indexOf(i) === 0) {
                newArrangement.push(i)
            } else {
                if (i[0] > newArrangement[newArrangement.length - 1][0]) {
                    newArrangement.unshift(i)
                } else {
                    newArrangement.push(i)
                }
            }
        }
    }
    actualBlockPosList = [...newArrangement]
}

const setLevel = function (a) {
    actualLevel = a <= 10 ? a : 10;
    actualVelocity = actualLevel * 50
}

const sortNewBlock = a => Math.floor((Math.random() * 7) + 1)

const renderBlock = function () {
    let blockStyle = sortNewBlock()
    refAngleActualBlock = 1

    switch (blockStyle) {
        case 1: //i
            refTypeActualBlock = 'i'
            actualBlockPosList = [[1, 4], [1, 5], [1, 6], [1, 7]]
            break;
        case 2: //j
            refTypeActualBlock = 'j'
            actualBlockPosList = [[2, 7], [1, 5], [1, 6], [1, 7]]
            break;
        case 3: //l
            refTypeActualBlock = 'l'
            actualBlockPosList = [[2, 5], [1, 5], [1, 6], [1, 7]]
            break;
        case 4: //o
            refTypeActualBlock = 'o'
            actualBlockPosList = [[2, 5], [2, 6], [1, 5], [1, 6]]
            break;
        case 5: //s
            refTypeActualBlock = 's'
            actualBlockPosList = [[2, 4], [2, 5], [1, 5], [1, 6]]
            break;
        case 6: //t
            refTypeActualBlock = 't'
            actualBlockPosList = [[2, 5], [1, 4], [1, 5], [1, 6]]
            break;
        case 7: //z
            refTypeActualBlock = 'z'
            actualBlockPosList = [[2, 6], [2, 7], [1, 5], [1, 6]]
            break;
    }
    for (let i of actualBlockPosList) {
        const element = document.getElementById(`grid-${i[0]}-${i[1]}`)
        element.classList.add("moving")
        element.setAttribute("block-type", `${refTypeActualBlock}`)
    }
}

const stopFallBlock = function () {
    for (let i of actualBlockPosList) {
        const elActRow = i[0]
        const elActCol = i[1]
        const element = document.getElementById(`grid-${elActRow}-${elActCol}`)
        element.classList.remove("moving")
        element.classList.add("stopped")
    }
}

const verifyBlockTouchDown = function (actualRow, nextLineBlock) {
    if (actualRow === 20) { return true }

    const nextLineHasABlock = nextLineBlock.classList.contains("stopped")
    if (nextLineHasABlock) { return true }

    return false
}

const fallBlock = function () {
    setInterval(function () {
        arrangeArrayAccordingMove('down')
        for (let i of actualBlockPosList) {
            const elActRow = i[0]
            const elActCol = i[1]
            const elNextRow = elActRow + 1
            const element = document.getElementById(`grid-${elActRow}-${elActCol}`)
            const nextLineBlock = document.getElementById(`grid-${elNextRow}-${elActCol}`)

            const hasAObstacle = verifyBlockTouchDown(elActRow, nextLineBlock)

            if (hasAObstacle) {
                stopFallBlock()
                renderBlock()
                return
            } else {
                nextLineBlock.setAttribute("block-type", `${refTypeActualBlock}`)
                nextLineBlock.classList.add("moving")

                element.removeAttribute("block-type")
                element.classList.remove("moving")
            }
        }
        for (let i in actualBlockPosList) {
            actualBlockPosList[i][0]++
        }
    }, 1200 - actualVelocity)
}

const verifyBlockTouchLeft = function () {
    for (let i of actualBlockPosList) {
        const elActRow = i[0]
        const elActCol = i[1]
        const elOnTheLeftCol = elActCol > 1 ? elActCol - 1 : elActCol
        const leftColumnBlock = document.getElementById(`grid-${elActRow}-${elOnTheLeftCol}`)
        const leftColumnHasABlock = leftColumnBlock.classList.contains("stopped")

        if (elActCol === 1) { return true }
        if (leftColumnHasABlock) { return true }
    }
    return false
}
const moveLeftBlock = function () {
    if (verifyBlockTouchLeft()) { return false }

    for (let i of actualBlockPosList) {
        const elActRow = i[0]
        const elActCol = i[1]
        const elOnTheLeftCol = elActCol > 1 ? elActCol - 1 : elActCol
        const element = document.getElementById(`grid-${elActRow}-${elActCol}`)
        const leftColumnBlock = document.getElementById(`grid-${elActRow}-${elOnTheLeftCol}`)

        leftColumnBlock.setAttribute("block-type", `${refTypeActualBlock}`)
        leftColumnBlock.classList.add("moving")

        element.removeAttribute("block-type")
        element.classList.remove("moving")
    }
    for (let i in actualBlockPosList) {
        actualBlockPosList[i][1]--
    }
    return true
}

const verifyBlockTouchRight = function () {
    for (let i of actualBlockPosList) {
        const elActRow = i[0]
        const elActCol = i[1]
        const elOnTheRightCol = elActCol < 10 ? elActCol + 1 : elActCol
        const rightColumnBlock = document.getElementById(`grid-${elActRow}-${elOnTheRightCol}`)
        const rightColumnHasABlock = rightColumnBlock.classList.contains("stopped")

        if (elActCol === 10) { return true }
        if (rightColumnHasABlock) { return true }
    }
    return false
}

const moveRightBlock = function () {
    if (verifyBlockTouchRight()) { return false }

    for (let i of actualBlockPosList) {
        const elActRow = i[0]
        const elActCol = i[1]
        const elOnTheRightCol = elActCol < 10 ? elActCol + 1 : elActCol
        const element = document.getElementById(`grid-${elActRow}-${elActCol}`)
        const rightColumnBlock = document.getElementById(`grid-${elActRow}-${elOnTheRightCol}`)

        rightColumnBlock.setAttribute("block-type", `${refTypeActualBlock}`)
        rightColumnBlock.classList.add("moving")

        element.removeAttribute("block-type")
        element.classList.remove("moving")
    }
    for (let i in actualBlockPosList) {
        actualBlockPosList[i][1]++
    }
    return true
}

const rotateBlock = function(){
    if (!(refTypeActualBlock === "o")){
        const newAngle = rotate[refTypeActualBlock](actualBlockPosList, refAngleActualBlock)
        refAngleActualBlock = newAngle
    }
}