document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas element and the 2D rendering context
    const canvas = document.getElementById("matrix-canvas");
    const ctx = canvas.getContext("2d");

    // Define variables for the matrix effect
    let columns; // Number of columns in the matrix
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"; // Characters to be displayed in the matrix
    const charArray = characters.split(""); // Convert the characters string into an array
    const charSize = 15; // Size of each character in pixels
    const matrix = []; // Array to store the current position of each column in the matrix

    // Function to adjust the canvas size based on the window dimensions
    function adjustCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / charSize);
    }

    // Function to get a random character from the character array
    function getRandomChar() {
        return charArray[Math.floor(Math.random() * charArray.length)];
    }

    // Function to create the initial matrix
    function createMatrix() {
        for (let i = 0; i < columns; i++) {
            matrix[i] = Math.floor(Math.random() * canvas.height / charSize) + 1;
        }
    }

    // Function to draw the matrix effect on the canvas
    function drawMatrix() {
        // Clear the canvas with a slightly transparent black color
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set the color and font for the characters in the matrix
        ctx.fillStyle = "#0F0";
        ctx.font = charSize + "px monospace";

        // Iterate through each column in the matrix
        for (let i = 0; i < matrix.length; i++) {
            // Get a random character and calculate its position
            const text = getRandomChar();
            const x = i * charSize;
            const y = matrix[i] * charSize;

            // Draw the character at its position
            ctx.fillText(text, x, y);

            // If the character has reached the bottom of the canvas and a random condition is met,
            // reset its position to the top
            if (y >= canvas.height && Math.random() > 0.975) {
                matrix[i] = 0;
            }

            // Move the character down by one position
            matrix[i]++;
        }
    }

    // Function to animate the matrix effect by continuously redrawing it
    function animate() {
        requestAnimationFrame(animate);
        drawMatrix();
    }

    // Function to initialize the matrix effect
    function initialize() {
        adjustCanvasSize();
        createMatrix();
        animate();
    }

    // Initialize the matrix effect
    initialize();

    // Adjust the canvas size whenever the window is resized
    window.addEventListener("resize", function() {
        adjustCanvasSize();
        createMatrix();
    });
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
