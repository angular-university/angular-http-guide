

const express = require('express');

const app = express();


app.route('/api/simulate-error')
    .get((req, res) => {




        res.status(500).send();

    });





const server = app.listen(9000, () => {
    console.log("Server running at http://localhost:" + server.address().port);
});


