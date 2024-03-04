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
            return res.json({});
        }
        
        
        var url_parts = url.parse(originalUri, false);
        return res.render('confirm.mustache', {
            link_yes: `${doc.config.proxy_prefix}yes?redirect=${originalUri}`,
            link_no: '/no',
            proxy_prefix: doc.config.proxy_prefix,
            yes: doc.strings.yes,
            no: doc.strings.no,
            title: Mustache.render(doc.strings.window_title, {link: url_parts.path}),
            open_link: Mustache.render(doc.strings.open_link, {link: url_parts.path}),
            theme: doc.config.theme,
            mode: doc.config.mode
        })
    }

    public yes(req:Request, res:Response) {
        var url = req.query.redirect;
        res.redirect(`${url}`);
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