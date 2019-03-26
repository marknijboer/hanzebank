const twilio = require('twilio')(process.env.TWILIO_ACCOUNT, process.env.TWILIO_AUTH);



const generateRandomNumber = () => {
    const max = 9999;
    const min = 1000;
    return Math.floor(Math.random() * (+ max - +min) + +min); 
};


module.exports = {
    
    // Check if the given email is valid
    isValidEmail: email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    
    isValidPhone: number => {
        var re = /^\+316[0-9]{8}$/;
        return re.test(number);
    },
    
    // Sends the user a verification code and returns that code
    generateAndSendVerificationCode: phone => {
        const code = generateRandomNumber();
        
        try {
            twilio.messages
            .create({
                body: `Uw inlogcode voor ONZEBank is: ${code}`,
                from: process.env.TWILIO_PHONE,
                to: phone
            });
            return code;
        } catch (e) {
            return -1;
        }
    }
}