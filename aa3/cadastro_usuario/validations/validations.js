function isValidCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

function isValidCategory(category) {
    const validCategories = ['estudante', 'professor', 'TAE', 'visitante'];
    return validCategories.includes(category);
}

function validateUserInput(req, res, next) {
    const {name, category, cpf} = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).send('Invalid or missing name.');
    }
    if (!category || typeof category !== 'string') {
        return res.status(400).send('Invalid or missing category.');
    }
    isValidCategory(category);
    if (!cpf || !isValidCPF(cpf)) {
        return res.status(400).send('Invalid or missing CPF.');
    }
    next();
}

module.exports = {isValidCPF, validateUserInput};
