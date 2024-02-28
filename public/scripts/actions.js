function clicked(url) {
    window.location = url;
}

function noClicked() {
    if(document.body.classList.contains('dark')) {
        window.location = 'https://blackscreen.app/';
    } else {
        window.location = 'about:blank';
    }
}

var yesDiv = document.getElementById('yesdiv');
var noDiv = document.getElementById('nodiv');
var lightToogle = document.getElementById('light-toogle');

lightToogle.addEventListener("click", function() {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }
    else if (document.body.classList.contains('light')) {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    }

    if (!document.body.classList.contains('forced')) {
        document.body.classList.add('forced');
    }
});

function registerEffect(ele, other) {
    var mc = new Hammer(ele);

    mc.on("hammer.input", function(ev) {
        if(ev.eventType == 1) {
            ele.classList.add('expanded');
            other.classList.add('contracted');
        } else if(ev.eventType == 4) {
            ele.classList.remove('expanded');
            other.classList.remove('contracted');
        }
     });
}

registerEffect(yesDiv, noDiv);
registerEffect(noDiv, yesDiv);

if(window.screen.height > window.screen.width) {
    document.body.classList.add('mobile');
}

window.addEventListener('resize', function(event) {
    if(document.body.scrollHeight < document.body.scrollWidth) {
        document.body.classList.remove('mobile');
    } else if (!document.body.classList.contains('mobile')) {
        document.body.classList.add('mobile');
    }
}, true);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
} else {
    document.body.classList.add('light');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (document.body.classList.contains('forced')) {
        return;
    }

    const newColorScheme = event.matches ? "dark" : "light";

    if (!document.body.classList.contains('dark')) {
        document.body.classList.add('dark');
    }

    if (!document.body.classList.contains('light')) {
        document.body.classList.add('light');
    }

    document.body.classList.add(newColorScheme);
});