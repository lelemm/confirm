import { Request, Response } from "express";
import { configReader } from "../helpers/ConfigReader";
import url from 'url';
import Mustache from 'mustache';

class ServerCallController {

    public async yes(req:Request, res:Response) {
        let doc = configReader.getDoc();
        var url = req.query.redirect?.toString() || "";
        if("servercall" == doc.config.callmode || "browser") {
            var response = await fetch(url, {
                method: doc.servercall.method || "GET"
                });
            if(res.statusCode.toString().startsWith("20")) {
                var content = await response.text();
                if(content.match(doc.servercall.regex)) {
                    res.redirect(301, `${doc.servercall.success_redirect}`);
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

}

export const serverCallController = new ServerCallController();