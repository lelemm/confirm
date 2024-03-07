const yaml = require('js-yaml');
const fs   = require('fs');

class ConfigReader {
    private doc: any;
    private lastReadTime: number;

    constructor() {
        this.lastReadTime = 0;
    }

    readYmlFile() {
        if(this.doc == null || this.lastReadTime == 0 || (new Date().getTime() - this.lastReadTime) > 1000)
        {
            try {
                this.doc = yaml.load(fs.readFileSync('./config.yml', 'utf8'));

                if(fs.existsSync('./pages.yml')) {
                    var pages = yaml.load(fs.readFileSync('./pages.yml', 'utf8'));
                    this.doc.pages = {...this.doc.pages, ...pages.pages};
                }
                this.lastReadTime = new Date().getTime();

                return this.doc;
            } catch (e) {
                console.log(e);
            }
            
            return {};
        }
    }

    getDoc() {
        this.readYmlFile();
        return this.doc;
    }
}

export const configReader = new ConfigReader();