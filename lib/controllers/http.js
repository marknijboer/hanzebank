
class HttpController {

    /**
    * The index route. Shows "Hello World" for now..
    */
    static index(req, res) {
        return res.render('index', { title: 'home' });
    }

    static login(req, res) {
        return res.render('login', { title: 'login' });
    }

    static register(req, res) {
        return res.render('index', { title: 'Hey', message: 'Hello there!' });
    }

}

module.exports = HttpController;
