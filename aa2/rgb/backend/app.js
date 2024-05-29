const express = require('express');
const app = express();
const port = 3000;

app.get('/api/colors', (req, res) => {
    let colors = [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [0, 1, 1],
        [1, 1, 1]
    ]

    //select random colors
    colors = colors.sort(() => Math.random() - 0.5);
    colors = colors.slice(0, 3);

    console.log(colors)

    res.json(colors);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
