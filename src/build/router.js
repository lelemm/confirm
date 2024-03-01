"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var CssController_1 = require("./controllers/CssController");
var ConfirmController_1 = require("./controllers/ConfirmController");
var router = (0, express_1.Router)();
exports.router = router;
//Routes
router.get("/css/variables.css", CssController_1.cssController.variables);
router.get("/:alias", ConfirmController_1.confirmController.alias);
