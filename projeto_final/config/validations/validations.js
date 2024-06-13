function isValidColorList(colors) {
    // Check if each color is an array with 3 elements and each element is 0 or 1
    for (let i = 0; i < colors.length; i++) {
        if (!Array.isArray(colors[i]) || colors[i].length !== 3) {
            return res.status(400).send('Each color must be an array with 3 elements.');
        }

        for (let j = 0; j < colors[i].length; j++) {
            if (colors[i][j] !== 0 && colors[i][j] !== 1) {
                return res.status(400).send('Each element of the color must be 0 or 1.');
            }
        }
    }
}


module.exports = {isValidColorList};
