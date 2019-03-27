const EMAIL_SEND_ADDR = "onzebank.hanze@gmail.com";
const EMAIL_PASSWD = "hanzebankonzebank";

const nodemailer = require('nodemailer');

// A general function that sends an email.
const sendMail = (email, subject, text) => {
    
    nodemailer.createTestAccount((err, account) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.googlemail.com',
            port: 465,
            secure: true,
            auth: {
                user: EMAIL_SEND_ADDR,
                pass: EMAIL_PASSWD
            }
        });
 
        const mailOptions = {
            from: `"OnzeBank" <${EMAIL_SEND_ADDR}>`,
            to: email,
            subject: subject,
            text: text
        };
 
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    });
};


// The email that is sent when a new client registers
const sendRegisterMail = (email, name) => {
    const subject = "Registratie OnzeBank";
    const text = [
        `Beste ${name},`,
        "",
        "Bedankt voor je registratie bij OnzeBank. Een van onze medewerkers zal je aanvraag beoordelen waarna je account geactiveerd zal worden. Daarna kun je zelf je internetbankieren aan of uit zetten.",
        "Je hoort snel van ons!",
        "",
        "Het OnzeBank team",
        ""
    ];
    
    sendMail(email, subject, text.join("\n"));
};

// The email that is sent when an account is activated
const sendSuccessActivationMail = (email, name) => {
    const subject = "Accountactivatie OnzeBank";
    const text = [
        `Beste ${name},`,
        "",
        "Onze medewerkers hebben je aanvraag behandeld. Jouw account bij Onzebank is vanaf nu geactiveerd!",
        "",
        "Het OnzeBank team",
        ""
    ];
    
    sendMail(email, subject, text.join("\n"));
};

// The email that is sent when an account is denied
const sendFailedActivationMail = (email, name) => {
    const subject = "Accountactivatie OnzeBank";
    const text = [
        `Beste ${name},`,
        "",
        "Onze medewerkers hebben je aanvraag behandeld. Op basis van wat je hebt ingevuld kunnen we je helaas geen toegang geven tot de online omgeving. Voor hulp kun je ons bellen via het algemene nummer of kun je een e-mail sturen.",
        "",
        "Het OnzeBank team",
        ""
    ];
    
    sendMail(email, subject, text.join("\n"));
};

module.exports = {
    sendRegisterMail,
    sendSuccessActivationMail,
    sendFailedActivationMail
}