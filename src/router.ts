import { Router } from "express";
import { cssController } from "./controllers/CssController";
import { confirmController } from "./controllers/ConfirmController";
import { configReader } from "./helpers/ConfigReader";
import { authController } from "./controllers/AuthController";


let doc = configReader.getDoc();
const router: Router = Router()

//Routes
router.get("/css/variables.css", cssController.variables);
if(doc.config.mode == 'auth') {
    router.get("/", authController.auth);
    router.post("/yes", authController.yes);
    router.post("/no", authController.no);
    router.get("/start", authController.start);
} else {
    router.get("/:alias", confirmController.alias);
}

export { router };