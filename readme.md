# What is this?
Basically this is just an app that takes confirmation from user before calling a link

# Motivation?
I have some webhooks from [N8N](https://n8n.io/) that are sent to [Gotify](https://gotify.net/) notification, so I can take actions. Sometimes I misclick the link and the workflow is executed. I created this so I must confirm that I want to run that webhook

# Examples

## Working Example
<img src="https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/vid1.gif" alt="Working example" style="width:200px;"/>

## Changing from dark/light mode
<img src="https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/vid2.gif" alt="Changing from dark/light mode" style="width:200px;"/>

## Custom theme selected
<img src="https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/vid3.gif" alt="Custom theme selected" style="width:200px;"/>

# Adaptative layout based on screen/window size

## Vertical/Mobile
<img src="https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/size1.png" alt="Vertical" style="width:200px;"/>

## Horizontal/Desktop
<img src="https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/size1.png" alt="Horizontal" style="width:200px;"/>

# Configurable
<img src="https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/config.png" alt="Configurable" style="width:300px;"/>

[config.yml](https://github.com/lelemm/confirm/blob/main/src/config.yml)

# Installation
Use [docker-compose.yml](https://github.com/lelemm/confirm/blob/main/docker-compose.yml).

config.yml and views/ are not part of the docker image, so you should create a volume in the docker-compose.yml like in the example.

# Usage
In the config.yml, you have a dictionary of pages, the key is the alias from your URL, example the key "google" will create the link http://yourhost/google that will call the link at the key of this dictionary. There is an example at the config.yml from this project. 
[Example here](https://github.com/lelemm/confirm/blob/e47df7c246c85b526ea763efd204ace48dede1de/src/config.yml#L2)

# Modes
You can choose between 3 modes: auth, redirect, servercall.
```yml
(...)
config:
  (...)
  callmode: servercall or browser
(...)
```


## Auth Mode (_config.mode=auth_)
This mode must be used with nginx reverse proxy. proxy example:
```nginx
        location /location_that_needs_confirmation/ {
            proxy_pass http://url/location_that_needs_confirmation/;
            auth_request /confirm/start;
            error_page 401 = /confirm/;
            auth_request_set $auth_status $upstream_status;
        }

        location /confirm/ {
            proxy_pass              http://LocationOfConfirmApp/;
            proxy_pass_request_body off;
            proxy_set_header        Content-Length "";
            proxy_set_header        X-Original-URI $request_uri; #Must have this header
        }
```

If you change the location of "**confirm**" (**location /confirm/** above) to something else, you must change the config.yml too:
```yml
(...)
config:
  (...)
  mode: redirect #simple redirect to page, must use 'pages' from this yaml.
  proxy_prefix: '/confirm/'
(...)  
```

## Redirect Mode (_config.mode=redirect_)
Simple redirect based on the pages section of the config.yml
```yml
pages:
  google: http://www.google.com.br
(...)
```

# Call Mode
This affects which tier calls the URL to be confirmed.
```yml
(...)
config:
  (...)
  mode: redirect #simple redirect to page, must use 'pages' from this yaml.
  callmode: servercall or browser
(...)


## Servercall (_config.callmode=servercall_)
Instead of calling the url from the browser, it called from the server side. It checks based on regex the content to see if was OK.
These variables must be included when using callmode=servercall:
```yml
(...)
servercall:
  regex: \"Workflow was started\"
  success_redirect: "about:blank"
  error_redirect: "https://yahoo.com"
  method: "GET"
```

## Browser (_config.callmode=browser_)
As the name says, the url is called from the client-side using the browser.
