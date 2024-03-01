import { Router } from "express";
import { cssController } from "./controllers/CssController";
import { confirmController } from "./controllers/ConfirmController";


const router: Router = Router()

//Routes
router.get("/css/variables.css", cssController.variables);
router.get("/:alias", confirmController.alias);

export { router };