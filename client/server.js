const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();


app.get("/_healthz", (request, response) => {
	response.json({
		message : "I am healthy"
	})
})

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
