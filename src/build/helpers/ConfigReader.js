"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configReader = void 0;
var yaml = require('js-yaml');
var fs = require('fs');
var ConfigReader = /** @class */ (function () {
    function ConfigReader() {
        this.lastReadTime = 0;
    }
    ConfigReader.prototype.readYmlFile = function () {
        if (this.doc == null || this.lastReadTime == 0 || (new Date().getTime() - this.lastReadTime) > 1000) {
            try {
                this.doc = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
                return this.doc;
            }
            catch (e) {
                console.log(e);
            }
            return {};
        }
    };
    ConfigReader.prototype.getDoc = function () {
        this.readYmlFile();
        return this.doc;
    };
    return ConfigReader;
}());
exports.configReader = new ConfigReader();
