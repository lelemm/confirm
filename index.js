const express = require('express');
const mustacheExpress = require('mustache-express');
const yaml = require('js-yaml');
const fs   = require('fs');
const url = require('url');
const app = express();
const Mustache = require('mustache');
const favicon = require('serve-favicon');
const { ConfirmModel } = require('./models/ConfirmModel');

app.use(express.static('public'))
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.engine('mustache', mustacheExpress());

var lastReadTime = 0;
var doc = null;

const port = 8000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});

app.get('/css/variables.css', (req, res) => {
    readYmlFile();

    const confirmModel = new ConfirmModel();

    confirmModel.direction = doc.config.direction;
    confirmModel.directionMobile = confirmModel.direction;

    if(doc.config.theme != 'default') {
        confirmModel.customThemeNo = doc.themes[doc.config.theme].default.no;
        confirmModel.customThemeYes = doc.themes[doc.config.theme].default.yes;
        confirmModel.customThemeActiveNo = doc.themes[doc.config.theme].active.no;
        confirmModel.customThemeActiveYes = doc.themes[doc.config.theme].active.yes;
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
    })
});

app.get('/:alias', (req, res) => {
    readYmlFile();
    var alias = doc.pages[req.params.alias];

    if(alias == undefined) {
        res.status(404);
        res.send('404 - Not found');
        return;
    }
    
    var url_parts = url.parse(req.url, false);

    return res.render('confirm.mustache', {
        link: alias,
        query: url_parts.query,
        yes: doc.strings.yes,
        no: doc.strings.no,
        title: Mustache.render(doc.strings.window_title, {link: alias}),
        open_link: Mustache.render(doc.strings.open_link, {link: alias}),
        theme: doc.config.theme
    })
});

function readYmlFile() {
    if(doc == null || lastReadTime == 0 || (new Date() - lastReadTime) > 1000)
    {
        try {
            doc = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
            return doc;
        } catch (e) {
            console.log(e);
        }

        return {};
    }
}