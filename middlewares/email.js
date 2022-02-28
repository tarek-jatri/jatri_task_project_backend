const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tarek.jatri@gmail.com',
        pass: 'AbirHossain6650'
    }
});

module.exports = transporter;