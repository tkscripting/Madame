(function() {
    'use strict';

    let gameContainer = null;
    let gameActive = false;
    let roundNumber = 1;
    let score = 0;
    let roundStartTime = 0; // Store the start time for each round
    let gameTriggerElement = null; // Store the game trigger element to exclude it from closing the game
    let outsideClickListener = null; // To store the outside click listener
    let tiles = []; // To store the tile elements
    let roundComplete = false; // To track if the round is complete
    let isGameOver = false; // To track if the game is over
    let oddTileIndex = -1; // To store the index of the odd tile

    // Function to start the game
    function startGame() {
        // Prevent starting a new game if one is already active
        if (gameActive) return;

        gameActive = true;
        roundNumber = 1; // Reset round to 1 on a new game
        score = 0; // Reset score

        // Create a new game container
        gameContainer = document.createElement('div');
        gameContainer.style.position = 'fixed';
        gameContainer.style.top = '50%';
        gameContainer.style.left = '50%';
        gameContainer.style.transform = 'translate(-50%, -50%)';
        gameContainer.style.backgroundColor = 'black';  // Black background
        gameContainer.style.color = 'white';  // White text for contrast
        gameContainer.style.padding = '20px';
        gameContainer.style.borderRadius = '10px';
        gameContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        gameContainer.style.zIndex = 9999;
        gameContainer.style.display = 'flex';
        gameContainer.style.flexDirection = 'column';
        gameContainer.style.alignItems = 'center';
        document.body.appendChild(gameContainer);

        // Start round 1
        showRound();

        // Add outside click listener to close the game if clicked outside
        outsideClickListener = function(event) {
            if (gameContainer && !gameContainer.contains(event.target) && event.target !== gameTriggerElement) {
                resetGame(); // Close the game if clicked outside
            }
        };
        document.addEventListener('click', outsideClickListener); // Add listener to detect outside click
    }

    // Function to generate round color set and return the tiles
    function generateRound() {
        let numTiles, colorBase, colorOdd, colorSet;

        // Number of tiles and the odd color calculation per round
        if (roundNumber === 1) {
            numTiles = 4; // 2x2 grid
            colorBase = getRandomColor();
            colorOdd = generateSlightlyDifferentColor(colorBase, 50); // Easy to spot in the first round
        } else if (roundNumber === 2) {
            numTiles = 9; // 3x3 grid
            colorBase = getRandomColor();
            colorOdd = generateSlightlyDifferentColor(colorBase, 40); // Noticeable, but a bit closer
        } else if (roundNumber === 3) {
            numTiles = 16; // 4x4 grid
            colorBase = getRandomColor();
            colorOdd = generateSlightlyDifferentColor(colorBase, 30); // Slightly more challenging
        } else if (roundNumber === 4) {
            numTiles = 25; // 5x5 grid
            colorBase = getRandomColor();
            colorOdd = generateSlightlyDifferentColor(colorBase, 20); // Moderate challenge
        } else if (roundNumber === 5) {
            numTiles = 36; // 6x6 grid
            colorBase = getRandomColor();
            colorOdd = generateSlightlyDifferentColor(colorBase, 15); // Slightly harder
        } else if (roundNumber === 6) {
            numTiles = 49; // 7x7 grid
            colorBase = getRandomColor();
            colorOdd = generateSlightlyDifferentColor(colorBase, 10); // Noticeable but a bit harder
        } else {
            numTiles = 49; // 7x7 grid for all subsequent rounds (no more increasing)
            colorBase = getRandomColor();
            colorOdd = generateSlightlyDifferentColor(colorBase, 5); // Very subtle difference, very hard to spot
        }

        // Create color array with the base color and 1 odd color
        colorSet = new Array(numTiles - 1).fill(colorBase);
        colorSet.push(colorOdd);

        // Shuffle to randomize the position of the odd tile
        shuffleArray(colorSet);

        return { colorSet, oddColor: colorOdd };
    }

    // Function to generate a random color
    function getRandomColor() {
        const baseHue = Math.floor(Math.random() * 360);
        const baseSaturation = Math.floor(Math.random() * (100 - 60) + 60); // Saturation 60-100%
        const baseLightness = Math.floor(Math.random() * (80 - 40) + 40); // Lightness 40-80%
        return `hsl(${baseHue}, ${baseSaturation}%, ${baseLightness}%)`;
    }

    // Function to generate a slightly different color for the odd tile
    function generateSlightlyDifferentColor(baseColor, variance) {
        const hsl = getHSLFromColor(baseColor);
        let newHue = hsl.h + (Math.random() * variance * 2 - variance); // Slight change in hue
        newHue = (newHue + 360) % 360; // Ensure hue is within bounds

        let newSaturation = hsl.s + (Math.random() * variance * 2 - variance); // Slight change in saturation
        newSaturation = Math.min(Math.max(newSaturation, 0), 100); // Clamp between 0% and 100%

        let newLightness = hsl.l + (Math.random() * variance * 2 - variance); // Slight change in lightness
        newLightness = Math.min(Math.max(newLightness, 0), 100); // Clamp between 0% and 100%

        return `hsl(${newHue}, ${newSaturation}%, ${newLightness}%)`;
    }

    // Helper function to extract HSL values from a color
    function getHSLFromColor(color) {
        const match = color.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
        return {
            h: parseInt(match[1]),
            s: parseInt(match[2]),
            l: parseInt(match[3])
        };
    }

    // Function to shuffle array items
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // Function to show the round tiles grid
    function showRound() {
        roundStartTime = Date.now(); // Start timing the round

        const { colorSet, oddColor } = generateRound();
        const gridSize = Math.sqrt(colorSet.length); // Determine grid size (round 1 -> 2x2, round 2 -> 3x3, etc.)
        gameContainer.innerHTML = ''; // Clear game container

        // Create grid container
        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
        gridContainer.style.gridGap = '10px';
        gridContainer.style.marginBottom = '20px';

        // Create tiles
        tiles = [];
        colorSet.forEach((color, index) => {
            const tile = document.createElement('div');
            tile.style.width = '100px';
            tile.style.height = '100px';
            tile.style.backgroundColor = color;
            tile.style.borderRadius = '5px';
            tile.style.cursor = 'pointer';
            tile.style.transition = 'transform 0.2s';
            tile.addEventListener('click', (event) => handleTileClick(index, color, oddColor)); // Use index for each tile
            tiles.push(tile);
            gridContainer.appendChild(tile);
        });

        // Append grid to the container
        gameContainer.appendChild(gridContainer);

        roundComplete = false; // Reset the round completion status
        isGameOver = false; // Reset game over flag
        oddTileIndex = colorSet.indexOf(oddColor); // Store the index of the odd tile
    }

    // Function to handle tile click
    function handleTileClick(clickedIndex, selectedColor, oddColor) {
        if (roundComplete || isGameOver) return; // Prevent clicks after round is complete or game over

        // Check if the clicked color is the odd one
        if (selectedColor === oddColor) {
            // Correct answer, increase score
            score += calculateRoundScore(Date.now() - roundStartTime); // Add score based on time
            roundComplete = true; // Mark round as complete

            // Highlight the correct tile
            tiles[clickedIndex].style.border = '5px solid white';
            tiles[clickedIndex].style.borderRadius = '10px'; // Add rounded corners
            tiles[clickedIndex].style.transform = 'scale(1.1)'; // Enlarge the tile

            // Delay before next round
            setTimeout(() => {
                if (!isGameOver) {
                    roundNumber++; // Increase round number
                    showRound(); // Start next round immediately
                }
            }, 300); // No unnecessary delay
        } else {
            // Wrong answer, show game over screen
            gameOver(clickedIndex, oddColor);
        }
    }

    // Function to calculate score based on time and difficulty
    function calculateRoundScore(timeTaken) {
        const idealTime = 1000; // Ideal time for the round in milliseconds (1 second)

        // Adjust the base score to a smaller value, but still scale with the round number
        const baseScore = roundNumber * 20;  // Example base score: roundNumber * 20

        // Penalize for every 500 ms (half a second) over ideal time
        const timePenalty = Math.max(0, Math.floor((timeTaken - idealTime) / 500) * 5);  // Penalize 5 points for each 500 ms over

        // Round scaling: Increase score multiplier more gently
        const roundScaling = 1 + (roundNumber - 1) * 0.25;  // Slight increase for each round (0.25x per round)

        // Calculate total score: base score - time penalty, scaled for the round
        const totalScore = Math.max(0, Math.floor((baseScore - timePenalty) * roundScaling));  // Ensure score doesn't go negative

        return totalScore; // Return the final score
    }

    // Function to show game over and score
    function gameOver(clickedIndex, oddColor) {
        isGameOver = true;

        // Highlight the odd tile
        tiles[oddTileIndex].style.border = '5px solid white'; // White border for odd tile
        tiles[oddTileIndex].style.borderRadius = '10px';

        // Display game over message
        const gameOverText = document.createElement('p');
        gameOverText.textContent = 'Game Over';
        gameOverText.style.fontSize = '24px';
        gameOverText.style.fontWeight = 'bold';
        gameOverText.style.margin = '0';  // Remove margins
        gameContainer.appendChild(gameOverText);

        const roundScoreText = document.createElement('p');
        roundScoreText.textContent = `Round: ${roundNumber} | Score: ${score}`;
        roundScoreText.style.fontSize = '18px';
        roundScoreText.style.margin = '5px 0';  // Add spacing between lines
        gameContainer.appendChild(roundScoreText);

        // High score and high round tracking
        const highRound = localStorage.getItem('highRound') || 0;  // Default to 1 if no high round is saved
        const highScore = localStorage.getItem('highScore') || 0;  // Default to 0 if no high score is saved

        const highScoreText = document.createElement('p');
        highScoreText.textContent = `High Round: ${highRound} | High Score: ${highScore}`;
        highScoreText.style.fontSize = '18px';
        highScoreText.style.margin = '5px 0';  // Add spacing between lines
        gameContainer.appendChild(highScoreText);

        // Save high score and round if necessary
        if (score > highScore) {
            localStorage.setItem('highScore', score);
            localStorage.setItem('highRound', roundNumber);
        } else if (roundNumber > highRound) {
            localStorage.setItem('highRound', roundNumber);
        }

        // Add replay button
        const replayButton = document.createElement('button');
        replayButton.textContent = 'Replay';
        replayButton.style.marginTop = '10px';
        replayButton.addEventListener('click', () => {
            resetGame();
            setTimeout(startGame, 0); // Delay startGame to ensure reset completes
        });
        gameContainer.appendChild(replayButton);
    }

    // Function to reset the game
    function resetGame() {
        gameActive = false;
        if (gameContainer) {
            gameContainer.remove();
        }
        document.removeEventListener('click', outsideClickListener); // Remove outside click listener
    }

    // Set up the game trigger element
    function activateGameOnClick() {
        const targetSelector = '.MuiTypography-root.MuiTypography-subtitle1.MuiTypography-noWrap.css-aj6ovs';

        const observer = new MutationObserver(() => {
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                gameTriggerElement = targetElement; // Store the trigger element to exclude it from closing the game
                targetElement.addEventListener('click', () => {
                    startGame();
                    observer.disconnect(); // Stop observing once the game is activated
                });
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    // Start the game when the page is fully loaded
    window.addEventListener('load', () => {
        activateGameOnClick();
    });

})();
