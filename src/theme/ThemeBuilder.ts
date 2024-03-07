import { Response } from "express";
import { configReader } from "../helpers/ConfigReader";
import Mustache from 'mustache';
import url from 'url';
import { readFile } from 'fs/promises'

class ThemeBuilder {
    async buildTheme(linkYes: string, linkNo: string, originalUri: string, res:Response) {
        var doc = configReader.getDoc();
        var layout = doc.layout?.theme || "default";
        var proxy_prefix = "auth" == (doc.config?.mode || "redirect") ? doc.config?.proxy_prefix : '';

        var yesMustache = await readFile(`views/${layout}/yes.mustache`, 'utf-8');
        var yes_layout = Mustache.render(yesMustache, {
            link_yes: `${proxy_prefix}${linkYes}`,
            yes: doc.strings.yes,
            doc: doc
        });

        var noMustache = await readFile(`views/${layout}/no.mustache`, 'utf-8');
        var no_layout = Mustache.render(noMustache, {
            link_no: `${proxy_prefix}${linkNo}`,
            no: doc.strings.no,
            doc: doc
        });
        
        var messagecontainer = await readFile(`views/${layout}/message-container.mustache`, 'utf-8');
        var messagecontainer_template = Mustache.render(messagecontainer, {
            open_link: Mustache.render(doc.strings.open_link, {link:`${originalUri}`}),
            doc: doc
        }); 

        var lightingmode = await readFile(`views/${layout}/lightingmode.mustache`, 'utf-8');
        var lightingmode_template = Mustache.render(lightingmode, {
            proxy_prefix: proxy_prefix,
            doc: doc
        }); 

        var css = doc.layout?.css || 'confirm.css';
        return res.render('page.mustache', {
            proxy_prefix: proxy_prefix,
            title: Mustache.render(doc.strings.window_title, {link: originalUri}),
            theme: doc.layout?.colors,
            yes_template: yes_layout,
            no_template: no_layout,
            messagecontainer_template: messagecontainer_template,
            lightingmode_template: lightingmode_template,
            themecss: css,
            action_type: doc.config?.action_type || "click",
            auth_type: doc.config?.mode || "redirect"
        });
    }
}

export const themeBuilder = new ThemeBuilder();