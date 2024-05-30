function isValidCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}


function validateInput(req, res, next) {
    const {cpf, place} = req.body;

    if (!cpf || !isValidCPF(cpf)) {
        return res.status(400).send('Invalid or missing CPF.');
    }
    if (!place || typeof place !== 'string') {
        return res.status(400).send('Invalid or missing place.');
    }
    next();
}

module.exports = {isValidCPF, validateInput};
