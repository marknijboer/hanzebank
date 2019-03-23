
class HttpController {
    
    /**
    * The index route. Shows "Hello World" for now..
    */
    static index(req, res) {
        return res.send('Hello World!');
    }
    
}

module.exports = HttpController;