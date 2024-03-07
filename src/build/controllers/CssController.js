"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssController = void 0;
var ConfigReader_1 = require("../helpers/ConfigReader");
var ConfirmModel_1 = require("../models/ConfirmModel");
var CssController = /** @class */ (function () {
    function CssController() {
    }
    CssController.prototype.variables = function (req, res) {
        var doc = ConfigReader_1.configReader.getDoc();
        var confirmModel = new ConfirmModel_1.ConfirmModel();
        confirmModel.direction = doc.config.direction;
        confirmModel.directionMobile = confirmModel.direction;
        if (doc.layout?.colors != 'default') {
            confirmModel.customThemeNo = doc.themes[doc.layout?.colors].default.no;
            confirmModel.customThemeYes = doc.themes[doc.layout?.colors].default.yes;
            confirmModel.customThemeActiveNo = doc.themes[doc.layout?.colors].active.no;
            confirmModel.customThemeActiveYes = doc.themes[doc.layout?.colors].active.yes;
        }
        if (doc.config.direction == 'column') {
            confirmModel.sizeW = '100';
            confirmModel.sizeH = '50';
            confirmModel.expandedH = '90';
            confirmModel.expandedW = '100';
            confirmModel.contractedH = '10';
            confirmModel.contractedW = '100';
            confirmModel.sizeWMobile = '100';
            confirmModel.sizeHMobile = '50';
            confirmModel.expandedHMobile = '90';
            confirmModel.expandedWMobile = '100';
            confirmModel.contractedHMobile = '10';
            confirmModel.contractedWMobile = '100';
        }
        else if (doc.config.direction == 'dynamic') {
            confirmModel.directionMobile = 'column';
            confirmModel.direction = 'row';
            confirmModel.sizeWMobile = '100';
            confirmModel.sizeHMobile = '50';
            confirmModel.expandedHMobile = '90';
            confirmModel.expandedWMobile = '100';
            confirmModel.contractedHMobile = '10';
            confirmModel.contractedWMobile = '100';
        }
        return res.render('variables.mustache', {
            doc: doc,
            confirmModel: confirmModel
        });
    };
    return CssController;
}());
exports.cssController = new CssController();
