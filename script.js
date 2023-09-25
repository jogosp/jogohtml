const board = document.getElementById('board');
const pieces = [];

function createPuzzle() {
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = `url('piece_${i + 1}.jpg')`;
        piece.draggable = true;
        piece.setAttribute('data-id', i);
        pieces.push(piece);
        board.appendChild(piece);

        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-id'));
        });

        piece.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        piece.addEventListener('drop', (e) => {
            e.preventDefault();
            const fromId = e.dataTransfer.getData('text/plain');
            const toId = e.target.getAttribute('data-id');
            swapPieces(fromId, toId);
        });
    }
}

function shufflePuzzle() {
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach((piece, index) => {
        piece.style.order = index;
    });
}

function swapPieces(fromId, toId) {
    const fromPiece = pieces.find((piece) => piece.getAttribute('data-id') === fromId);
    const toPiece = pieces.find((piece) => piece.getAttribute('data-id') === toId);

    const fromOrder = fromPiece.style.order;
    fromPiece.style.order = toPiece.style.order;
    toPiece.style.order = fromOrder;
}

createPuzzle();
shufflePuzzle();