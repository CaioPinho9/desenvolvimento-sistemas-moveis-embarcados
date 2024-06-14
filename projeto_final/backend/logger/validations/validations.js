async function validateBody(req, res, next) {
    const {input, value} = req.body;
    if (!input || typeof input !== 'string') {
        return res.status(400).send('Invalid or missing input.');
    }
    if (!value || typeof value !== 'string') {
        return res.status(400).send('Invalid or missing value.');
    }
    next()
}

module.exports = {validateBody};
