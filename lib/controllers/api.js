const {registerForm, loginForm, smsForm} = require("../utils/form.js");
const {isValidEmail, generateAndSendVerificationCode, isValidPhone} = require("../utils/functions.js");
const {sendRegisterMail} = require("../utils/mail.js");
const Client = require("../models/Client.js");

const bcrypt = require("bcrypt");
const uniqid = require('uniqid');

// SMS codes are valid for 2 minutes
const SMS_EXPIRATION_TIME = 2 * 60 * 1000;


class ApiController {
    
    /**
    * Logs the user in. This is the first part of the two-factor authentication
    */
    static async login(req, res) {
        // Check if current post-request has all necessary parameters
        if (loginForm(req.body)) {
            const client = await Client.findOne({
                where: {
                    email: req.body.email
                }
            });
            
            // Checks if client exists with this email address
            if (client) {
                const valid = await bcrypt.compare(req.body.password, client.password);
                if (valid) {
                    
                    const unique = uniqid();
                    const smsCode = generateAndSendVerificationCode(client.phone);
                    
                    if (smsCode !== -1) {
                        client.smsCode = smsCode;
                        client.smsTimestamp = Date.now();
                        client.smsUniquelink = unique;
                        client.save();
                    
                        req.session.client = client;
                        req.session.loggedIn = false;
                        req.session.save();
                    
                        return res.status(200).send({
                            success: true,
                            unique: unique
                        });
                    } else {
                        return res.status(400).send({
                            success: false,
                            message: "Ongeldig telefoonnummer voor 2-factor authenticatie."
                        });
                    }
                } else {
                    return res.status(400).send({
                        success: false,
                        message: "Onjuiste inloggegevens."
                    });
                }
            }
        } else {
            return res.status(400).send({
                success: false,
                message: "Onjuiste inloggegevens."
            });
        }
    }
    
    /**
    * Does the second part of the two-factor authentication
    */
    static async authorizeSms(req, res) {
        if (smsForm(req.body)) {
            if (typeof req.session.client !== "undefined" && req.session.loggedIn === false) {
                if (req.session.client.smsCode === parseInt(req.body.smsCode) && req.session.client.smsUniquelink === req.body.unique && req.session.client.smsTimestamp > Date.now() - SMS_EXPIRATION_TIME) {
                    
                    req.session.loggedIn = true;
                    req.session.save();
                    
                    res.json({
                        success: true
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Onjuiste authorisatiegegevens."
                    });
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: "Onjuiste authorisatiegegevens."
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Onjuiste authorisatiegegevens."
            });
        }
    }
    
    
    /**
    * Returns whether the user is logged in.
    */
    static isLoggedIn(req, res) {
        if (typeof req.session.client !== "undefined" && req.session.loggedIn === true) {
            res.json({ loggedIn: true });
        } else {
            res.json({ loggedIn: false });
        }
    }
    
    /**
    * Registers a new user for this banking app.
    */
    static async register(req, res) {
        if (registerForm(req.body)) {
            if (isValidEmail(req.body.email)) {
                if (isValidPhone(req.body.phone)) {
                
                    // TODO: Check if user exists
                    const client = await Client.findOne({
                        where: {
                            email: req.body.email
                        }
                    });
                    
                    if (!client) {
                        if (req.body.password === req.body.passwordConfirm) {
                    
                            // Calculate a bcrypt password hash
                            const hashedPassword = await bcrypt.hash(req.body.password, 10);
                            
                            sendRegisterMail(req.body.email, req.body.firstName);
                    
                            // Insert new client into the database
                            await Client.create({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                address: req.body.address,
                                city: req.body.city,
                                phone: req.body.phone,
                                active: false,
                                password: hashedPassword
                            });
                            
                            return res.status(200).send({
                                success: true
                            });
                        } else {
                            return res.status(400).send({
                                success: false,
                                message: "De wachtwoorden moeten gelijk zijn."
                            });
                        }
                    } else {
                        return res.status(400).send({
                            success: false,
                            message: "Deze gebruiker bestaat al."
                        });
                    }
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Vul een juist e-mailadres in."
                });
            }
        } else {
            return res.status(400).send({
                success: false,
                message: "Vul alstublieft alle velden in."
            });
        }
    }
    
    
    
}

module.exports = ApiController;