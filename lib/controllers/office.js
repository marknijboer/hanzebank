const Client = require("../models/Client.js");
const {sendSuccessActivationMail, sendFailedActivationMail} = require("../utils/mail.js");

class OfficeController {

    static async index(req, res) {
        
        const rawClients = await Client.findAll({
            attributes: ["email", "active"]
        });
        
        const clients = rawClients.map(i => {
            return i.dataValues;
        });
        
        return res.render('backoffice', { clients: clients });
    }

    static async activation(req, res) {
        if (typeof req.body.email === "string" && typeof req.body.active !== "undefined") {
            const client = await Client.findOne({
                where: {
                    email: req.body.email
                }
            });
            
            if (client) {
                const newState = (req.body.active == true);
                
                if (newState) {
                    sendSuccessActivationMail(client.email, client.firstName);
                } else {
                    sendFailedActivationMail(client.email, client.firstName);
                }
                
                client.active = newState;
                client.save();
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(400);
        }
    }

}

module.exports = OfficeController;
