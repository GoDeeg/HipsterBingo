document.addEventListener("DOMContentLoaded", () => {
    const words = [
        "Socks-Sandals", "Beard", "Waxed-Stache", "ObelixPants", "Crocs", "Vintage-Tshirt", "80%-Pants", "Flood-Pants",
        "Avocado", "Got Bag", "Fjallraven", "Hair:Fade", "Hair:Perm", "Barefoot", "barefoot-Shoes" "Corduroy", "FannyPack", "Shoulder-Sweater",
        "Selfie", "Aperol Spritz", "Got Bag", "JuteBeutel", "Denim Tshirt", "Tucked T-Shirt", "Onesie", "Birks",
        "Vinyl Record", "Typewriter", "Craft Beer", "Polaroid Camera", "Fixed Gear Bike", "Suspenders", "Bowtie",
        "Thrift Store Find", "Mason Jar", "Artisan Coffee", "Minimalist Watch", "Wayfarer Sunglasses", "Handmade Jewelry",
        "Messenger Bag", "Retro Glasses", "Plaid Shirt", "Skinny Jeans", "Man Bun", "Bike Messenger", "Gourmet Popcorn",
        "Tattoo Sleeve", "Eco-friendly Bag", "Vegan Snacks", "Analog Watch", "Artisan Soap", "Reusable Straw"
    ];

    const bingoCard = document.getElementById("bingo-card");
    const regenerateButton = document.getElementById("regenerate-card");

    let completedLines = new Set();

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function generateBingoCard() {
        bingoCard.innerHTML = "";
        completedLines.clear();
        const shuffledWords = shuffle([...words]);
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (i === 12) { // Center cell as a free space
                cell.textContent = "Hipster Bingo";
                cell.classList.add("free");
            } else {
                cell.textContent = shuffledWords.pop();
            }
            cell.addEventListener("click", () => {
                cell.classList.toggle("selected");
                checkBingo();
            });
            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                if (cell.classList.contains("selected")) {
                    cell.classList.remove("selected");
                }
            });
            bingoCard.appendChild(cell);
        }
    }

    function checkBingo() {
        const cells = Array.from(bingoCard.children);
        const isBingo = (indices) => indices.every(index => cells[index].classList.contains("selected"));

        const winningLines = [
            // Rows
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            // Columns
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            // Diagonals
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20],
        ];

        let newLineCompleted = false;
        
        for (const [index, line] of winningLines.entries()) {
            if (isBingo(line) && !completedLines.has(index)) {
                completedLines.add(index);
                newLineCompleted = true;
                break;
            }
        }

        if (newLineCompleted) {
            alert("Hipster Bingo!");
        }

        if (cells.every(cell => cell.classList.contains("selected"))) {
            alert("Congratulations! You've filled the card!");
        }
    }

    regenerateButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to regenerate the card?")) {
            generateBingoCard();
        }
    });

    generateBingoCard();
});
