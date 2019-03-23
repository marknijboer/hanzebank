const {registerForm, loginForm} = require("../utils/form.js");
const {isValidEmail} = require("../utils/functions.js");
const Client = require("../models/Client.js");

const bcrypt = require("bcrypt");


class ApiController {
    
    /**
    * Logs the user in.
    */
    static login(req, res) {
        return new Promise(async () => {
            
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
                        // Authenticate
                        req.session.client = client;
                        req.session.save();
                        
                        return res.status(200).send({
                            success: true
                        });
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
        });
    }
    
    
    /**
    * Returns whether the user is logged in.
    */
    static isLoggedIn(req, res) {
        if (typeof req.session.client !== "undefined") {
            res.json({ loggedIn: true });
        } else {
            res.json({ loggedIn: false });
        }
    }
    
    /**
    * Registers a new user for this banking app.
    */
    static register(req, res) {
        return new Promise(async () => {
            if (registerForm(req.body)) {
                if (isValidEmail(req.body.email)) {
                    
                    // TODO: Check if user exists
                    
                    if (req.body.password === req.body.passwordConfirm) {
                        
                        // Calculate a bcrypt password hash
                        const hashedPassword = await bcrypt.hash(req.body.password, 10);
                        
                        // Insert new client into the database
                        await Client.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            address: req.body.address,
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
                        message: "Vul een juist e-mailadres in."
                    });
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Vul alstublieft alle velden in."
                });
            }
        
        });
    }
    
    
    
}

module.exports = ApiController;