function isValidCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

const categories = ['student', 'teacher', 'TAE', 'visitor']

function isValidCategory(category) {
    return categories.includes(category);
}

function validateInput(req, res, next) {
    const {name, category, cpf} = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).send('Invalid or missing name.');
    }
    if (!category || typeof category !== 'string') {
        return res.status(400).send('Invalid or missing category.');
    }
    if (!isValidCategory(category)) {
        return res.status(400).send('Invalid category use one of: ' + categories.join(', '));
    }
    if (!cpf || !isValidCPF(cpf)) {
        return res.status(400).send('Invalid or missing CPF.');
    }
    next();
}

module.exports = {isValidCPF, validateUserInput: validateInput};
