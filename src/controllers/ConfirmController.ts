import { Request, Response } from "express";
import { configReader } from "../helpers/ConfigReader";
import url from 'url';
import Mustache from 'mustache';

class ConfirmController {
    
    public alias(req:Request, res:Response) {
        let doc = configReader.getDoc();
        
        var alias = doc.pages[req.params.alias];
        if(alias == undefined) {
            res.status(404);
            res.send('404 - Not found');
            return;
        }
        var url_parts = url.parse(req.url, false);
        return res.render('confirm.mustache', {
            link_yes: alias,
            link_no: '',
            proxy_prefix: '',
            query: url_parts.query,
            yes: doc.strings.yes,
            no: doc.strings.no,
            title: Mustache.render(doc.strings.window_title, {link: alias}),
            open_link: Mustache.render(doc.strings.open_link, {link: alias}),
            theme: doc.config.theme,
            mode: doc.config.mode
        })
    }
}

export const confirmController = new ConfirmController();