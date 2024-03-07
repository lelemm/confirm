import { Request, Response } from "express";
import { configReader } from "../helpers/ConfigReader";
import { themeBuilder } from "../theme/ThemeBuilder";

class ConfirmController {
    
    public alias(req:Request, res:Response) {
        let doc = configReader.getDoc();
        
        var alias = doc.pages[req.params.alias];
        if(alias == undefined) {
            res.status(404);
            res.send('404 - Not found');
            return;
        }
        
        return themeBuilder.buildTheme( "servercall" == (doc.config?.callmode || "browser") ? `/yes?redirect=${alias}` : alias,
                                        "",
                                        alias,
                                        res);
    }
}

export const confirmController = new ConfirmController();