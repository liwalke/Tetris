const columnsQtt = 10
const rowQtt = 20
let actualLevel
let actualVelocity
let refColumnActualBlock = 0
let refRowActualBlock = 0
let refTypeActualBlock = ''
let refAngleActualBlock = 0 //Each block has an actual rotation position to especify it, except the O-block
let actualBlockPos

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

function starGame() {
    let init = false
    if (!init){
        renderBlock()
        setLevel(1)
        init = true
    }

    document.onkeydown = keyboardMovements

    fallBlock()
}

function keyboardMovements(event) {
    const keyname = event.key
    console.log(keyname)

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
        for (let i of actualBlockPos){
            if (i === 0) {
                newArrangement.push(i)
                continue
            }
            if (i[1] > newArrangement[i - 1][1]){
                newArrangement.push(i)
            } else {
                newArrangement.unshift(i)
            }
        }
    }
    if (side === "right") {
        for (let i of actualBlockPos){
            if (i === 0) {
                newArrangement.push(i)
                continue
            }
            if (i[1] < newArrangement[i - 1][1]){
                newArrangement.push(i)
            } else {
                newArrangement.unshift(i)
            }
        }
    }
    if (side === "down") {
        for (let i of actualBlockPos){
            if (i === 0) {
                newArrangement.push(i)
                continue
            }
            if (i[0] > newArrangement[i - 1][0]){
                newArrangement.unshift(i)
            } else {
                newArrangement.push(i)
            }
        }
    }
}

const setLevel = function (a) {
    actualLevel = a <= 10 ? a : 10;
    actualVelocity = actualLevel * 50
}

const sortNewBlock = a => Math.floor((Math.random() * 7) + 1)

const renderBlock = function () {
    let blockStyle = sortNewBlock()
    refRowActualBlock = 1
    refAngleActualBlock = 1

    switch (blockStyle) {
        case 1: //i
            refColumnActualBlock = 5
            refTypeActualBlock = 'i'
            actualBlockPos = [[1, 4], [1, 5], [1, 6], [1, 7]]
            break;
        case 2: //j
            refColumnActualBlock = 6
            refTypeActualBlock = 'j'
            actualBlockPos = [[2, 7], [1, 5], [1, 6], [1, 7]]
            break;
        case 3: //l
            refColumnActualBlock = 6
            refTypeActualBlock = 'l'
            actualBlockPos = [[2, 5], [1, 5], [1, 6], [1, 7]]
            break;
        case 4: //o
            refTypeActualBlock = 'o'
            actualBlockPos = [[2, 5], [2, 6], [1, 5], [1, 6]]
            break;
        case 5: //s
            refColumnActualBlock = 6
            refTypeActualBlock = 's'
            actualBlockPos = [[2, 4], [2, 5], [1, 5], [1, 6]]
            break;
        case 6: //t
            refColumnActualBlock = 5
            refTypeActualBlock = 't'
            actualBlockPos = [[2, 5], [1, 4], [1, 5], [1, 6]]
            break;
        case 7: //z
            refColumnActualBlock = 6
            refTypeActualBlock = 'z'
            actualBlockPos = [[2, 6], [2, 7], [1, 5], [1, 6]]
            break;
    }
    for (let i of actualBlockPos) {
        const element = document.getElementById(`grid-${i[0]}-${i[1]}`)
        element.classList.add("moving")
        element.setAttribute("block-type", `${refTypeActualBlock}`)
    }
}

const stopFallBlock = function () {
    for (let i of actualBlockPos) {
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
        for (let i of actualBlockPos) {
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
        for (let i in actualBlockPos) {
            actualBlockPos[i][0]++
        }
    }, 1000 - actualVelocity)
}

const verifyBlockTouchLeft = function (actualCol, leftColumnBlock) {
    if (actualCol === 1) { return true }

    const leftColumnHasABlock = leftColumnBlock.classList.contains("stopped")
    if (leftColumnHasABlock) { return true }

    return false
}
const moveLeftBlock = function () {
    for (let i of actualBlockPos) {
        const elActRow = i[0]
        const elActCol = i[1]
        const elOnTheLeftCol = elActCol > 1 ? elActCol -1 : elActCol
        const element = document.getElementById(`grid-${elActRow}-${elActCol}`)
        const leftColumnBlock = document.getElementById(`grid-${elActRow}-${elOnTheLeftCol}`)

        const hasAObstacle = verifyBlockTouchLeft(elActCol, leftColumnBlock)

        if (hasAObstacle) {
            return
        } else {
            leftColumnBlock.setAttribute("block-type", `${refTypeActualBlock}`)
            leftColumnBlock.classList.add("moving")

            element.removeAttribute("block-type")
            element.classList.remove("moving")
        }
    }
    for (let i in actualBlockPos) {
        actualBlockPos[i][1]--
    }
}

const verifyBlockTouchRight = function (actualCol, rightColumnBlock) {
    if (actualCol === 10) { return true }

    const rightColumnHasABlock = rightColumnBlock.classList.contains("stopped")
    if (rightColumnHasABlock) { return true }

    return false
}
const moveRightBlock = function () {
    for (let i of actualBlockPos) {
        const elActRow = i[0]
        const elActCol = i[1]
        const elOnTheLeftCol = elActCol < 10 ? elActCol +1 : elActCol
        const element = document.getElementById(`grid-${elActRow}-${elActCol}`)
        const rightColumnBlock = document.getElementById(`grid-${elActRow}-${elOnTheLeftCol}`)

        const hasAObstacle = verifyBlockTouchRight(elActCol, rightColumnBlock)

        if (hasAObstacle) {
            return
        } else {
            rightColumnBlock.setAttribute("block-type", `${refTypeActualBlock}`)
            rightColumnBlock.classList.add("moving")

            element.removeAttribute("block-type")
            element.classList.remove("moving")
        }
    }
    for (let i in actualBlockPos) {
        actualBlockPos[i][1]++
    }
}

const rotateBlock = function () {
    const refElement = document.getElementById(`grid-${refRowActualBlock}-${refColumnActualBlock}`)
    const refCol = refColumnActualBlock
    const refRow = refRowActualBlock
    if (refTypeActualBlock === 'i') {
        rotateBlock_I(refElement, refCol, refRow)
        return
    }
    if (refTypeActualBlock === 'j') {
        rotateBlock_J(refElement, refCol, refRow)
        return
    }
    if (refTypeActualBlock === 'l') {
        rotateBlock_L(refElement, refCol, refRow)
        return
    }
    if (refTypeActualBlock === 's') {
        rotateBlock_S(refElement, refCol, refRow)
        return
    }
    if (refTypeActualBlock === 't') {
        rotateBlock_T(refElement, refCol, refRow)
        return
    }
    if (refTypeActualBlock === 'z') {
        rotateBlock_Z(refElement, refCol, refRow)
        return
    }
}

const rotateBlock_I = function (refEl, refC, refR) {
    //Verificar se tem obstáculo

    if (refAngleActualBlock === 1) {
        const items = [
            `grid-${refR}-${refC - 1}`,
            `grid-${refR}-${refC}`,
            `grid-${refR}-${refC + 1}`,
            `grid-${refR}-${refC + 2}`]
        console.log(items);
    }
}

const rotateBlock_J = a => a
const rotateBlock_L = a => a
const rotateBlock_S = a => a
const rotateBlock_T = a => a
const rotateBlock_Z = a => a

const moveDownFastBlock = a => a
const endMoviment = a => a
const calcLines = a => a
const removeLines = a => a
const newBlock = a => a