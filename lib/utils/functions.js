const twilio = require('twilio')(process.env.TWILIO_ACCOUNT, TWILIO_AUTH);

module.exports = {
    
    // Check if the given email is valid
    isValidEmail: email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    
    generateRandomNumber: () => {
        const max = 9999;
        const min = 1000;
        return Math.floor(Math.random() * (+ max - +min) + +min); 
    },
    
    generateAndSendVerificationCode: phone => {
        const code = generateRandomNumber();
        twilio.messages
        .create({
            body: `Uw inlogcode voor HanzeBank is: ${code}`,
            from: process.env.TWILIO_PHONE,
            to: phone
        });
        return code;
    }
}