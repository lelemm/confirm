import express from "express";
import { router } from "./router";
import mustacheExpress from "mustache-express";
import favicon from 'serve-favicon';

export class App{
    public server: express.Application;
    
    constructor(){
        this.server = express();
        this.middleware();
        this.mustache();
        this.router();
        this.server.use(express.static('public'))
        this.server.use(favicon(__dirname + '/public/images/favicon.ico'));
    }
    
    private middleware(){
        this.server.use(express.json());
    }
    
    private mustache() {
        this.server.engine("mustache", mustacheExpress());
    }
    
    private router(){
        this.server.use(router);
    }
}