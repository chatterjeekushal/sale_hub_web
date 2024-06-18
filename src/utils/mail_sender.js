

const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {

    try {
        // Create a Transporter to send emails

        let transporter = nodemailer.createTransport({
            host: location.hostname,
            auth: {
                user: "chatterjeekushal89@gmail.com",
                pass: "Kushal@2004",
            }
        });

        // Send emails to users

        let info = await transporter.sendMail({

            from: 'chatterjeekushal89@gmail.com',
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email info: ", info);

        return info;
    } catch (error) {

        console.log(error.message);
    }
}