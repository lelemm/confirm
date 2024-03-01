import { configReader } from "./helpers/ConfigReader";

const { App } = require("./app");

const doc = configReader.getDoc();
new App().server.listen(doc.config.port || 8000);

// const favicon = require('serve-favicon');
// app.use(express.static('public'))
// app.use(favicon(__dirname + '/public/images/favicon.ico'));
