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
There is a [Dockerfile](https://github.com/lelemm/confirm/blob/main/src/Dockerfile) to work with. That's how I'm using it at my domain.

# Usage
In the config.yml, you have a dictionary of pages, the key is the alias from your URL, example the key "google" will create the link http://yourhost/google that will call the link at the key of this dictionary. There is an example at the config.yml from this project. 
[Example here](https://github.com/lelemm/confirm/blob/e47df7c246c85b526ea763efd204ace48dede1de/src/config.yml#L2)
