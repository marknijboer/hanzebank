
class HttpController {

    static index(req, res) {
        return res.render('index', { title: 'Home' });
    }

    static login(req, res) {
        return res.render('login', { title: 'Login' });
    }

    static register(req, res) {
        return res.render('register', { title: 'Register'});
    }

}

module.exports = HttpController;
