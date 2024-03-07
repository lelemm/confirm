import { Request, Response } from "express";
import { configReader } from "../helpers/ConfigReader";
import { ConfirmModel } from "../models/ConfirmModel";

class CssController {
    
    public variables(req:Request, res:Response) {
        let doc = configReader.getDoc();
        
        const confirmModel = new ConfirmModel();
        
        confirmModel.direction = doc.config.direction;
        confirmModel.directionMobile = confirmModel.direction;
        
        if(doc.layout?.colors != 'default') {
            confirmModel.customThemeNo = doc.themes[doc.layout?.colors].default.no;
            confirmModel.customThemeYes = doc.themes[doc.layout?.colors].default.yes;
            confirmModel.customThemeActiveNo = doc.themes[doc.layout?.colors].active.no;
            confirmModel.customThemeActiveYes = doc.themes[doc.layout?.colors].active.yes;
        }
        
        if(doc.config.direction == 'column') {
            confirmModel.sizeW = '100';
            confirmModel.sizeH = '50';
            confirmModel.expandedH = '90';
            confirmModel.expandedW = '100';
            confirmModel.contractedH = '10';
            confirmModel.contractedW = '100';
            confirmModel.sizeWMobile = '100';
            confirmModel.sizeHMobile = '50';
            confirmModel.expandedHMobile = '90';
            confirmModel.expandedWMobile = '100';
            confirmModel.contractedHMobile = '10';
            confirmModel.contractedWMobile = '100';
        }
        else if(doc.config.direction == 'dynamic') {
            confirmModel.directionMobile = 'column';
            confirmModel.direction = 'row';
            
            confirmModel.sizeWMobile = '100';
            confirmModel.sizeHMobile = '50';
            confirmModel.expandedHMobile = '90';
            confirmModel.expandedWMobile = '100';
            confirmModel.contractedHMobile = '10';
            confirmModel.contractedWMobile = '100';
        }
        
        return res.render('variables.mustache', {
            doc,
            confirmModel
        });
    }
}

export const cssController = new CssController();