const fetch = require('node-fetch');

function isValidCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

async function validateUserIsCategory(res, cpf) {
    const response = await fetch('http://localhost:8080/user/' + cpf);

    if (response.status !== 200) {
        return res.status(404).send('User not found.');
    }

    const userData = await response.json();

    if (userData.category !== 'student' && userData.category !== 'visitor') {
        return res.status(400).send('Account can only be created for students or visitors.');
    }
    return true
}

module.exports = {isValidCPF, validateUserIsCategory};
