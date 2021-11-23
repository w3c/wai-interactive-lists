# wai-interactive-lists
Common features and issue tracking for WAI resources containing interactive lists. 

Currently these are:

- [wai-course-list](https://github.com/w3c/wai-course-list)
- [wai-authoring-tools-list](https://github.com/w3c/wai-authoring-tools-list)
- [wai-evaluation-tools-list](https://github.com/w3c/wai-evaluation-tools-list)


## Local dev env setup

### Global Tools etc

- VS code or other IDE/editor
- nodejs & `npm i -g netlify-cli`
- Ruby 2.6.2 & Ruby Gems 
- Jekyll 

See [guide](https://jekyllrb.com/docs/installation/) 

### On Windows

Either use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) (easiest) or the following for cmd or git for windows bash

### Ruby when not using WSL

- Install the recommended [Ruby+DevKit 2.6.2](https://jekyllrb.com/docs/installation/windows/)
- Open a new cmd window
- gem install jekyll bundler
- cd to ...\wai-XXX
- bundle lock --add-platform=x64-mingw32

### One time Config

- cd `.../wai-XXX`
- `git submodule update --init --remote`
- `bundle install`

### Build and serve during dev 

- `netlify buid && netlify dev` - no watch HMR etc so rerun to re build

