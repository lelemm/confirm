import { configReader } from "./helpers/ConfigReader";

const { App } = require("./app");

const doc = configReader.getDoc();
new App().server.listen(doc.config.port || 8000);