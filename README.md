# Shared development for the WAI website interative lists 

Common notes, componented and and issue tracking for WAI resources containing interactive lists. 

These are:

- [wai-course-list](https://github.com/w3c/wai-course-list)
- [wai-authoring-tools-list](https://github.com/w3c/wai-authoring-tools-list)
- [wai-evaluation-tools-list](https://github.com/w3c/wai-evaluation-tools-list)

## General Development Workflow

Netlify hosting is integrated with the WAI GitHub repositories to provide Continuous Deployment. This means the website is public and is rebuilt built on commits to GitHub. Note that the websites are only for the resource being worked on. The complete public WAI website is built via a different process.

We use a form of [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) for development.

- `master` branch is treated as 'published' and content may appear in the public WAI website at any time
- all dev work is carried out on a branch
- a draft Pull Request (PR) in GitHub is opened for the branch at the start of the work
- commits made to the branch on GitHub (possibly via a push from local repo) trigger CD

Using a draft pull request ensures that everyone in the team can esaily discuss the code, view the CD website and even provide updates. Netlify CD adds information to the PR allowing easy access to the built website preview for the branch.

Once work is ready to be incorporated in the WAI website the PR should be marked ready for review and the WAI website team contected to help in getting it published by merging to master. Note resource code needs to be integrated into the WAI website. Once integrated any code on master wil appear next time the WAI site is updated.

So in summary:

- Create a branch and a PR, mark the PR as draft.
- Either perform local dev or use web editor
- Commit, and push if required
- Preview using the link that Netlify adds to the PR (ned to wait for build to update) [for example](https://github.com/w3c/wai-course-list/pull/4)
- Rinse and repeat
- Remove draft flag from the PR and get WAI team to review and merge

Note this is all by convention as currently we do not enforce the flow with required reviews and protected branches etc.

## Editing Options

- GitHub web app - no tools like spell/syntax checkers, only one file per commit and commit to generate preview
- VS code [web editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor) built into GitHub - support tools and multifile commits but commit to generate preview
- Local development - needs manual setup but provides rapid edit-review cycle without commits

## Local Development Environment Setup

### Global Tools etc

- VS code or other IDE/editor
- Netlify CLI - install nodejs & `npm i -g netlify-cli`
- Ruby 2.6.2, Ruby Gems & Jekyll - see [guide](https://jekyllrb.com/docs/installation/) 

#### On Windows

Either use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) (easiest - suggest Ubuntu) or the following for Git for Windows bash

- Resinstall [Git 4 Windows](https://gitforwindows.org/) to ensure that `Enable symbolic links` is checked
- Install the recommended [Ruby+DevKit 2.6.2](https://jekyllrb.com/docs/installation/windows/)
- Open a new cmd window
- `gem install jekyll bundler`

### One-time Config

- `git clone http.... wai-XXX`
- `cd .../wai-XXX`
- `git submodule update --init --remote`
- `bundle install`
- `netlify link` accept the git remote option

### Build and Serve 

- `netlify build && netlify dev` - no file watch, HMR etc so type ^C and re run to re build

The netlify build runs these two commands so is usually more convenient

- `git submodule update --init --remote` update various shared resources like the navigation and languages
- `bundle exec jekyll build --config '_config.yml,_config_staging.yml'` - run Jekyll SSG to build the site
