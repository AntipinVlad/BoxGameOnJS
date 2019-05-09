var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $timeHeder = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $result = document.querySelector('#result');
var $gameTime = document.querySelector('#game-time');

var score = 0;
var isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', hendleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el){
  $el.classList.remove('hide');
}
function hide($el){
  $el.classList.add('hide');
}

// Начало игры по нажатию на клавишу
function startGame() {
  isGameStarted = true;
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', 'true')
  show($timeHeder);
  hide($resultHeader);
  $game.style.backgroundColor = '#fff';
  hide($start);

  // Интервал
  var interval = setInterval(function () {
    var time = parseFloat($time.textContent)
    // Проверка интервала

    if (time <= 0) {
      clearInterval(interval); // Очистка интервала
      endGame();
      //end
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100)

  renderBox();
}
// Задаем количество очков
function setGameScore() {
  $result.textContent = score.toString();
}
// Задаем количество времени
function setGameTime() {
  var time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute('disabled');
  show($start);
  $game.innerHTML = '';
  $game.style.backgroundColor = '#ccc';
  hide($timeHeder);
  show($resultHeader);
}

// Рандом
function getRnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Обработка клика по квадрату
function hendleBoxClick(event) {
  // Проверка на начение try начатой игры 
  if (!isGameStarted) {
    return;
  }
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }

}
// рандомный цвет
function randomColor() {
  return 'rgb(' + Math.floor(Math.random() * 255).toString() + (', ') + Math.floor(Math.random() * 255).toString() + (', ') + Math.floor(Math.random() * 255).toString() + (')');
}
// Создание квадрата
function renderBox() {
  $game.innerHTML = '';
  // Рандомный размер
  var boxSize = getRnd(15, 35);
  // Вычислеение ширины и высоты поля
  var gameSize = $game.getBoundingClientRect();
  // Рандомная позиция
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;

  var box = document.createElement('div');

  box.style.height = box.style.width = boxSize + 'px';
  box.style.backgroundColor = randomColor();
  box.style.position = 'absolute';
  box.style.top = getRnd(0, maxTop) + 'px';
  box.style.left = getRnd(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  $game.insertAdjacentElement('afterbegin', box);

}