/** @format */

// variables
const bigBox = document.querySelector('.big-box');
const btn = document.querySelector('.btn');
const body = document.querySelector('.game-body');
bigBox.display = 'none';
btn.addEventListener('click', function () {
	bigBox.style.display = 'none';
	body.style.display = 'block';
});

const table = document.querySelector('table');
for (let i = 0; i < 9; ++i) {
	const tr = document.createElement('tr');
	table.appendChild(tr);
	for (let j = 0; j < 9; ++j) {
		const td = document.createElement('td');
		td.classList.add('cell');
		td.setAttribute('id', i * 9 + j);
		tr.appendChild(td);
	}
}

let bombArr = [];
let arr = [];
let active = true,
	score;
let cells = document.querySelectorAll('.cell');
let display = document.querySelector('.display');
let newGame = document.querySelector('.start');
cells.forEach((ele) => ele.addEventListener('click', clickCell));
// intialize function
init();
// newgame btn
newGame.addEventListener('click', init);
cells.forEach((ele) =>
	ele.addEventListener('contextmenu', function (e) {
		e.preventDefault();
		if (!active || e.target.innerHTML !== '') return;
		ele.innerHTML = '!';
		ele.style.color = 'red';
	})
);

function init() {
	console.log('dfasdf');
	for (let i = 0; i < 9; i++) {
		arr[i] = [];
	}
	for (let i = 0; i < 9; ++i) {
		for (let j = 0; j < 9; ++j) {
			arr[i][j] = { val: -1, flagMine: false };
			// console.log(arr[i][j].val);
		}
	}
	cells.forEach((ele) => (ele.innerHTML = ''));
	score = 0;
	active = true;
	display.innerHTML = '';

	cells.forEach((ele) => (ele.style.backgroundColor = '#ffffff'));

	// cells.forEach(ele => console.log(ele.nodeValue));
	// to generate 10 random numbers
	while (bombArr.length !== 10) {
		var ran = Math.floor(Math.random() * 81);
		if (bombArr.indexOf(ran) === -1) {
			bombArr.push(ran);
		}
	}
}

//onclick event
function clickCell(e) {
	// console.log(e.target.innerHTML);
	let cellNum = +e.target.id;
	if (!active) {
		display.innerHTML = 'Please start new game to play again.';
		return;
	}
	// check for bomb
	let flag = false;
	for (let i = 0; i < bombArr.length; ++i) {
		if (bombArr.includes(cellNum)) {
			flag = true;
			break;
		}
	}
	// if click on bomb
	if (flag) {
		active = false;
		// cells[bombArr[i]].style.backgroundColor = '#FF4500';
		let j = 0,
			i = 0;
		let intervalId = setInterval(function () {
			if (j === 9) {
				clearInterval(intervalId);
			}
			j++;
			let img = document.createElement('img');
			img.src =
				'https://cdn4.iconfinder.com/data/icons/explosion/512/as_906-512.png';
			let src = document.getElementById(cells[bombArr[i]].id);
			console.log(cells[bombArr[i]].id);
			src.appendChild(img);
			// for(let i = 0 ; i < bombArr.length ; ++i){
			cells[bombArr[i]].style.backgroundColor = '#ff5f00';
			// }
			i++;
		}, 100);
		display.innerHTML = `Your Score: ${score}, Game Over! Start Fresh.`;
		return;
	}
	// if not on bomb
	let r = convertRow(cellNum),
		c = convertCol(cellNum);

	if (arr[r][c].val === -1) {
		arr[r][c].val = cellNum;
		let count = countBomb(r, c);
		cells[cellNum].innerHTML = count;
		cells[cellNum].style.backgroundColor = '#32CD32';
		cells[cellNum].style.color = '#000';
		score++;
	}
	// if win game
	if (score === 71) {
		display.innerHTML = 'Congratulation! You won. wanna play again?';
		active = false;
		return;
	}
}

function countBomb(row, col) {
	// let row = convertRow(cellNum) , col = convertCol(cellNum);
	let count = 0;
	count += isSafe(row - 1, col - 1);
	count += isSafe(row - 1, col);
	count += isSafe(row - 1, col + 1);
	count += isSafe(row, col + 1);
	count += isSafe(row + 1, col + 1);
	count += isSafe(row + 1, col);
	count += isSafe(row + 1, col - 1);
	count += isSafe(row, col - 1);
	return count;
}

function isSafe(row, col) {
	if (row >= 0 && col >= 0 && row < 9 && col < 9) {
		if (bombArr.includes(row * 9 + col)) {
			return 1;
		} else {
			return 0;
		}
	}
	return 0;
}

function convertRow(cellNum) {
	return +Math.floor(cellNum / 9);
}
function convertCol(cellNum) {
	return cellNum % 9;
}
