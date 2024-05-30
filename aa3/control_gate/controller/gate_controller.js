exports.openGate = (req, res) => {
    console.log('Gate opened successfully!');
    return res.status(200).send('Gate opened successfully!');
};
