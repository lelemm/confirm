function clicked(url) {
    if(document.body.classList.contains('auth')) {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });        
    } else {
        window.location = url;
    }
}

function noClicked(url) {
    if(document.body.classList.contains('auth')) {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });        
    } else {
        if(url == undefined && url == '' || url == null) {
            if(document.body.classList.contains('dark')) {
                window.location = 'https://blackscreen.app/';
            } else {
                window.location = 'about:blank';
            }
        } else {
            window.location = url;
        }
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

function registerEffect(ele, other, f) {
    var mc = new Hammer(ele);

    mc.on("hammer.input", function(ev) {
        if(ev.eventType == 1) {
            ele.classList.add('expanded');
            other.classList.add('contracted');
        } else if(ev.deltaTime > 2000 && ev.eventType == 2) {
            if (ev.pointers[0].clientX >= ele.getBoundingClientRect().left && ev.pointers[0].clientX <= ele.getBoundingClientRect().right &&
            ev.pointers[0].clientY >= ele.getBoundingClientRect().top && ev.pointers[0].clientY <= ele.getBoundingClientRect().bottom) {
                mc.off("hammer.input");
                f(ele.getAttribute('data-url'));
            }  
        } else if(ev.eventType == 4) {
            ele.classList.remove('expanded');
            other.classList.remove('contracted');

            if (ev.deltaTime > 2000 && 
                ev.pointers[0].clientX >= ele.getBoundingClientRect().left && ev.pointers[0].clientX <= ele.getBoundingClientRect().right &&
                ev.pointers[0].clientY >= ele.getBoundingClientRect().top && ev.pointers[0].clientY <= ele.getBoundingClientRect().bottom) {
                    f(ele.getAttribute('data-url'));
                }            
        }
     });

     mc.on("press", function(ev) {
        
    });
}

registerEffect(yesDiv, noDiv, clicked);
registerEffect(noDiv, yesDiv, noClicked);

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

if(document.body.classList.contains('default')) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.add('light');
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (document.body.classList.contains('forced') || !document.body.classList.contains('default')) {
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