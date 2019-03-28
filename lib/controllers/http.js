
class HttpController {

    static index(req, res) {
        return res.render('index', { title: 'Home' });
    }

    static login(req, res) {
        return res.render('login', { title: 'Login' });
    }
    
    static logout(req, res) {
        delete req.session.client;
        delete req.session.loggedIn;
        
        return res.redirect("/");
    }
    
    static verify(req, res) {
        return res.render('verify', { title: 'Verificatie', code: req.params.code });
    }

    static register(req, res) {
        return res.render('register', { title: 'Register'});
    }
    
    static clientArea(req, res) {
        if (typeof req.session.client !== "undefined" && req.session.loggedIn === true) {
            if (req.session.client.active) {
                return res.render('client', { title: 'Klanten'});
            } else {
                return res.render('please-wait', { title: 'Bijna..'});
            }
        } else {
            res.sendStatus(401);
        }
    }

}

module.exports = HttpController;
