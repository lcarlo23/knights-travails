function possibleMoves([x, y]) {
    const moves = [
        [-1, 2],
        [-1, -2],
        [1, 2],
        [1, -2],
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
    ];

    const movesArray = moves.map(([offX, offY]) => [x + offX, y + offY]);

    const filterMoves = movesArray.filter(
        ([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7
    );

    return filterMoves;
}

function knightMoves([startX, startY], [endX, endY]) {
    let queue = [];
    let visited = [];

    queue.push([[startX, startY], []]);
    visited.push(`${startX},${startY}`);

    while (queue.length > 0) {
        const [currentNode, currentPath] = queue.shift();
        const [x, y] = currentNode;

        if (x === endX && y === endY) {
            const result = [...currentPath, [x, y]];
            let acc = 0;
            let pathString = `
`;
            result.forEach((coordinate) => {
                acc++;
                pathString += `[${coordinate}]
`;
            });

            console.log(`
=> You made it in ${acc} moves! Here's your path:
            ${pathString}`);

            return;
        }

        const moves = possibleMoves(currentNode);

        for (const move of moves) {
            const [newX, newY] = move;
            const key = `${newX},${newY}`;

            if (!visited.includes(key)) {
                queue.push([
                    [newX, newY],
                    [...currentPath, [x, y]],
                ]);
                visited.push(key);
            }
        }
    }

    return null;
}

knightMoves([0, 0], [7, 7]);
