# wai-interactive-lists
Common features and issue tracking for WAI resources containing interactive lists. 

Currently these are:

- [wai-course-list](https://github.com/w3c/wai-course-list)
- [wai-authoring-tools-list](https://github.com/w3c/wai-authoring-tools-list)
- [wai-evaluation-tools-list](https://github.com/w3c/wai-evaluation-tools-list)


## Local dev env setup

Requires Ruby 2.6.2

### For Windows

Either use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) (easiest) or the following for cmd or git for windows bash

- Install the recommended [Ruby+DevKit 2.6.2](https://jekyllrb.com/docs/installation/windows/)
- Open a new cmd window
- gem install jekyll bundler
- cd to ...\wai-XXX
- for Git for Windows only - bundle lock --add-platform=x64-mingw32
- bundle install
- bundle update
