const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

const routes = require("./api/routes");
routes(app);

app.use(function(err, _req, res, _next) {
    res.status(400).json({ error: err.message });
});

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.log(`http://localhost:${port}`);
    });
}

module.exports = app;
