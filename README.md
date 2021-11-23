# wai-interactive-lists
Common features and issue tracking for WAI resources containing interactive lists. 

Currently these are:

- [wai-course-list](https://github.com/w3c/wai-course-list)
- [wai-authoring-tools-list](https://github.com/w3c/wai-authoring-tools-list)
- [wai-evaluation-tools-list](https://github.com/w3c/wai-evaluation-tools-list)


## Local dev env setup

Requires Ruby

### For Windows

Either use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) (easiest) or the following for cmd or git for windows bash

https://jekyllrb.com/docs/installation/windows/

- Install the recommended Ruby+DevKit 2.5
- Open a new cmd window
- gem install jekyll bundler
- cd to ...\wai-XXX
- bundle lock --add-platform=x64-mingw32
- bundle install
- bundle update
