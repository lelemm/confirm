const express = require('express');
const mustacheExpress = require('mustache-express');
const yaml = require('js-yaml');
const fs   = require('fs');
const url = require('url');
const app = express();
const Mustache = require('mustache');

app.use(express.static('public'))
app.engine('mustache', mustacheExpress());

var lastReadTime = 0;
var doc = null;

const port = 8000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});

var sizeW = '50';
var sizeH = '100';
var expandedW = '90';
var expandedH = '100';
var contractedW = '10';
var contractedH = '100';
var directionMobile = '';
var direction = '';
var sizeWMobile = '50';
var sizeHMobile = '100';
var expandedWMobile = '90';
var expandedHMobile = '100';
var contractedWMobile = '10';
var contractedHMobile = '100';

app.get('/css/variables.css', (req, res) => {
    readYmlFile();

    direction = doc.config.direction;
    directionMobile = direction;

    if(doc.config.direction == 'column') {
        sizeW = '100';
        sizeH = '50';
        expandedH = '90';
        expandedW = '100';
        contractedH = '10';
        contractedW = '100';
        sizeWMobile = '100';
        sizeHMobile = '50';
        expandedHMobile = '90';
        expandedWMobile = '100';
        contractedHMobile = '10';
        contractedWMobile = '100';
    }
    else if(doc.config.direction == 'dynamic') {
        directionMobile = 'column';
        direction = 'row';

        sizeWMobile = '100';
        sizeHMobile = '50';
        expandedHMobile = '90';
        expandedWMobile = '100';
        contractedHMobile = '10';
        contractedWMobile = '100';
    }

    return res.render('variables.mustache', {
        doc,
        sizeH,
        sizeW,
        expandedH,
        expandedW,
        contractedH,
        contractedW,
        direction,
        directionMobile,
        sizeWMobile,
        sizeHMobile,
        expandedHMobile,
        expandedWMobile,
        contractedHMobile,
        contractedWMobile,
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
        open_link: Mustache.render(doc.strings.open_link, {link: alias})
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