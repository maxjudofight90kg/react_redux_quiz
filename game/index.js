const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false
let colours = ['green', 'yellow', 'orange', 'red']

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGetTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}


function startGame () {
    score = 0
    setGetTime()
    $gameTime.setAttribute('disabled', 'true')
    
    isGameStarted = true
    hide($start)
    $game.style.backgroundColor = '#fff'

    const interval = setInterval(() => {
        const time = parseFloat($time.textContent)
           if (time <= 0 ) {
            clearInterval(interval),
            endGame()
           } else {
            $time.textContent = (time - 0.1).toFixed(1)
           }
    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}
function setGetTime() {
    const time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame () {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}

function handleBoxClick (event) {
    if  (!isGameStarted)    {
        return
    }

    if  (event.target.dataset.box)  {
        score++
        renderBox()
    }
}

function renderBox () {
    $game.innerHTML = ''
    const box = document.createElement('div')
    const boxSize = getRandom(30, 100)
    const gameSize = $game.getBoundingClientRect()
    const maxTop = gameSize.height - boxSize
    const maxLeft = gameSize.width - boxSize
    const randomColourIndex = getRandom(0, colours.length)

    box.style.height = box.style.width =  boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colours[randomColourIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}