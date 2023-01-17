const collumnsQtt = 10;
const rowQtt = 20;

function loadGameGrid (){
    const gridConteiner = document.querySelector(".grid-game")
    let listBlocks = ''

    for (let i = 1; i <= rowQtt; i++) {
        for (let j = 1; j <= collumnsQtt; j++) {
            listBlocks += `
            <div class="grid-${i}-${j} block-space"></div>`
        }
    }
    gridConteiner.innerHTML = listBlocks
}