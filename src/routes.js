module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.get('*', function(req, res){
        res.send('what???', 404);
    });
}
