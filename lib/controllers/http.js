
class HttpController {
    
    /**
    * The index route. Shows "Hello World" for now..
    */
    static index(req, res) {
        return res.render('index', { title: 'Onze' });
    }

    static login(req, res) {
        return res.render('index', { title: 'Hey', message: 'Hello there!' });
    }

    static register(req, res) {
        return res.render('index', { title: 'Hey', message: 'Hello there!' });
    }
    
}

module.exports = HttpController;