"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmController = void 0;
var ConfigReader_1 = require("../helpers/ConfigReader");
var url_1 = __importDefault(require("url"));
var mustache_1 = __importDefault(require("mustache"));
var ConfirmController = /** @class */ (function () {
    function ConfirmController() {
    }
    ConfirmController.prototype.alias = function (req, res) {
        var doc = ConfigReader_1.configReader.getDoc();
        var alias = doc.pages[req.params.alias];
        if (alias == undefined) {
            res.status(404);
            res.send('404 - Not found');
            return;
        }
        var url_parts = url_1.default.parse(req.url, false);
        return res.render('confirm.mustache', {
            link: alias,
            query: url_parts.query,
            yes: doc.strings.yes,
            no: doc.strings.no,
            title: mustache_1.default.render(doc.strings.window_title, { link: alias }),
            open_link: mustache_1.default.render(doc.strings.open_link, { link: alias }),
            theme: doc.layout?.colors
        });
    };
    return ConfirmController;
}());
exports.confirmController = new ConfirmController();
