import { Request, Response } from "express";
import { configReader } from "../helpers/ConfigReader";
import url from 'url';
import Mustache from 'mustache';
import { themeBuilder } from "../theme/ThemeBuilder";

class AuthController {
    
    public auth(req:Request, res:Response) {
        let originalUri: string = req.header('X-Original-URI') || '';
        let doc = configReader.getDoc();
        
        if(originalUri == '') {
            res.status(401);
            return res.json({});
        }
        
        return themeBuilder.buildTheme( `yes?redirect=${originalUri}`,
                                        "/no",
                                        originalUri,
                                        res);        
    }

    public async yes(req:Request, res:Response) {
        let doc = configReader.getDoc();
        var url = req.query.redirect?.toString() || "";
        
        if("servercall" == (doc.callmode || "browser")) {
            var response = await fetch(url, {
                method: doc.servercall.method || "GET"
                });
            if(res.statusCode.toString().startsWith("20")) {
                var content = await response.text();
                if(content.match(doc.servercall.regex)) {
                    res.redirect(`${doc.servercall.success_redirect}`);
                } else {
                    res.redirect(`${doc.servercall.error_redirect}`);
                }
            } else {
                res.redirect(`${doc.servercall.error_redirect}`);
            }
        } else {
            res.redirect(`${url}`);
        }
    }

    public no(req:Request, res:Response) {
        res.status(401);
        return res.json({});
    }

    public start(req:Request, res:Response) {
        let originalUri: string = req.header('x-original-uri') || '';
        const current_url = new URL("http://any.tld/" + originalUri); //prevent relative paths
        const search_params = current_url.searchParams;

        if(search_params.get('yes') == "1") {
            res.status(201);
        } else {
            res.status(401);
        }
        return res.json({});
    }
}

export const authController = new AuthController();