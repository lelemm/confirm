# What is this?
Basically this is just an app that takes confirmation from user before calling a link

# Motivation?
I have some webhooks from [N8N](https://n8n.io/) that are sent to [Gotify](https://gotify.net/) notification, so I can take actions. Sometimes I misclick the link and the workflow is executed. I created this so I must confirm that I want to run that webhook

# Examples

## Working Example
![Working Example](https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/vid1.gif 'Working example')

## Changing from dark/light mode
![Changing from dark/light mode](https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/vid2.gif 'Changing from dark/light mode')

## Custom theme selected
![Custom theme selected](https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/vid3.gif 'Custom theme selected')


# Adaptative layout based on screen/window size

## Vertical/Mobile
![Vertical](https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/size1.png 'Vertical')

## Horizontal/Desktop
![Horizontal](https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/size2.png 'Horizontal')

# Configurable
![Configurable](https://raw.githubusercontent.com/lelemm/confirm/main/docs/images/config.png 'Configurable')

[config.yml](https://github.com/lelemm/confirm/blob/main/src/config.yml)

# Installation
Use [docker-compose.yml](https://github.com/lelemm/confirm/blob/main/docker-compose.yml).
config.yml and views/ are not part of the docker image, so you should create a volume in the docker-compose.yml like in the example.

# Usage
In the config.yml, you have a dictionary of pages, the key is the alias from your URL, example the key "google" will create the link http://yourhost/google that will call the link at the key of this dictionary. There is an example at the config.yml from this project. 
[Example here](https://github.com/lelemm/confirm/blob/e47df7c246c85b526ea763efd204ace48dede1de/src/config.yml#L2)

# Modes
You can choose between 3 modes: auth, redirect, servercall.

## Auth Mode
This mode must be used with nginx reverse proxy. proxy example:
```
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

If you change the location of "confirm" to something else, you must change the config.yml too:
```
(...)
config:
  (...)
  mode: redirect #simple redirect to page, must use 'pages' from this yaml.
  proxy_prefix: '/confirm/'
(...)  
```

## Redirect Mode
Simple redirect based on the pages section of the config.yml
```
pages:
  google: http://www.google.com.br
(...)
```

## Servercall (not implemented yet)
Instead of calling the url from the browser, it called from the server side. It checks based on regex the content to see if was OK.