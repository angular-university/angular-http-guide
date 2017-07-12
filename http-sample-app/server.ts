const express = require('express');



const app = express();





app.route('/api/simulate-error')
    .get((req, res) => {


        res.status(500).send();

    });


app.post('/api/test-request',  function(req,res){


    res.status(200).json({description: "POST Response"});

});


const server = app.listen(9000, () => {
    console.log("Server running at http://localhost:" + server.address().port);
});


