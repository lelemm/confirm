import { Request, Response } from "express";
import { configReader } from "../helpers/ConfigReader";
import url from 'url';
import Mustache from 'mustache';

class AuthController {
    
    public auth(req:Request, res:Response) {
        let originalUri: string = req.header('X-Original-URI') || '';
        let doc = configReader.getDoc();
        
        if(originalUri == '') {
            res.status(401);
            return;
        }
        
        
        var url_parts = url.parse(originalUri, false);
        return res.render('confirm.mustache', {
            link: originalUri,
            query: url_parts.query,
            yes: doc.strings.yes,
            no: doc.strings.no,
            title: Mustache.render(doc.strings.window_title, {link: url_parts.path}),
            open_link: Mustache.render(doc.strings.open_link, {link: url_parts.path}),
            theme: doc.config.theme
        })
    }
}

export const authController = new AuthController();