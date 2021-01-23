function game() {
	const colorTypes = document.querySelectorAll('.colorType');
	const clearButton = document.querySelector('#clear');
	const container = document.querySelector('#container');
	const maxSquares = 100;

	// Get default Color Type
	colorTypes.forEach((type) => {
		if (type.checked) {
			colorType = type.value;
		}
	});

	// If Color Type changes, set Color Type
	colorTypes.forEach((type) => {
		type.addEventListener('click', () => {
			colorType = type.value;
			colorSquares(colorType);
		});
	});

	createGrid(16); // Create Grid
	colorSquares(colorType); // Color Squares

	clearButton.addEventListener('click', clearGrid);
}

function createGrid(gridSize) {
	// Get Container Style & Size
	const containerStyle = getComputedStyle(container);
	const containerWidth = parseInt(containerStyle.getPropertyValue('width'));
	const containerHeight = parseInt(containerStyle.getPropertyValue('height'));

	// Set Square Size
	let squareWidth = containerWidth / gridSize;
	let squareHeight = containerHeight / gridSize;
	const squareBorderSize = 1;

	// Create Grid
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			const square = document.createElement('div');
			square.setAttribute('class', 'square');
			square.style.display = 'inline-block';
			square.style.background = 'rgb(211,211,211)';
			square.style.width = squareWidth - squareBorderSize + 'px';
			square.style.height = squareHeight - squareBorderSize + 'px';
			square.style.borderTop = '1px solid rgb(128,128,128)';
			square.style.borderLeft = '1px solid rgb(128,128,128)';

			// If square in last column, set border right
			if (j === gridSize - 1) {
				square.style.width = squareWidth - (squareBorderSize * 2) + 'px';
				square.style.borderRight = '1px solid rgb(128,128,128)';
			}
			// If square in last row, set border bottom
			if (i === gridSize - 1) {
				square.style.height = squareHeight - (squareBorderSize * 2) + 'px';
				square.style.borderBottom = '1px solid rgb(128,128,128)';
			}

			// Add Square to Container
			container.appendChild(square);
		}
	}
}

function colorSquares(colorType) {
	const squares = document.querySelectorAll('.square');

	// On hover, change square to black
	if (colorType === 'Black') {
			squares.forEach((square) => {
				square.onmouseover = () => {
					square.style.background = 'rgb(0,0,0)';
				};
		});
	}

	// On hover, change square to random color
	else if (colorType === 'Rainbow') {
		let minNum = 0;
		let maxNum = 255;

		squares.forEach((square) => {
			square.onmouseover = () => {
				let rgb1 = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
				let rgb2 = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
				let rgb3 = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);

				square.style.background = 'rgb(' + rgb1 + ',' + rgb2 + ',' + rgb3 + ')';
			};
		});
	}

	// On hover, change square to grayscale
	else if (colorType === 'Grayscale') {
		let maxNum = 255;

		squares.forEach((square) => {
			square.onmouseover = () => {
				// Get Square Style & Color
				let squareStyle = getComputedStyle(square);
				let squareColor = squareStyle.getPropertyValue('background-color');

				let split = squareColor.split(/[,)]/); // Split squareColor separated with , and )
				let rgb1 = split[0].substr(4);
				let rgb2 = split[1].substr(0);
				let rgb3 = split[2].substr(0);

				// Darken Color by 10% of maxNum (255)
				rgb1 -= maxNum * .1;
				rgb2 -= maxNum * .1;
				rgb3 -= maxNum * .1;

				square.style.background = 'rgb(' + rgb1 + ',' + rgb2 + ',' + rgb3 + ')';
			};
		});
	}
}

function clearGrid() {
	let numSquares = 0;

	// Prompt for grid size while input is less than or equal to 1,
	// greater than 100 or is not a number
	while (numSquares <= 0 || numSquares > 100 || isNaN(numSquares)) {
		numSquares = prompt('Enter grid size.');

		if (numSquares <= 0 || numSquares > 100 || isNaN(numSquares)) {
			alert('Invalid input. Grid size must be a number between 1 and 100.');
		}
	}

	container.innerHTML = ''; // Clear Grid
	createGrid(numSquares); // Recreate Grid
	colorSquares(colorType); // Color Squares
}

game();