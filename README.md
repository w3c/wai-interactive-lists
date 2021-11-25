# Shared development for the WAI website interative lists 

Common notes, componented and and issue tracking for WAI Website resources (sections) containing interactive lists. 

These are:

- [wai-course-list](https://github.com/w3c/wai-course-list)
- [wai-authoring-tools-list](https://github.com/w3c/wai-authoring-tools-list)
- [wai-evaluation-tools-list](https://github.com/w3c/wai-evaluation-tools-list)

## General Development Workflow

Netlify hosting is integrated with the WAI GitHub repositories to provide Continuous Deployment (CD). This means the website is public and is rebuilt built on commits to GitHub. Note that these websites are only for the part of the WAI website that list repo contains. The complete public WAI website is built via a different process.

We use a form of [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) workflow for development.

- `master` branch is treated as 'published' and the content may appear in the public WAI website at any time
- all development work is carried out on a branch
- a draft Pull Request (PR) in GitHub is opened for the branch at the start of work
- commits made to the branch on GitHub (possibly via a push from local repo) trigger th continbuous Deployed to update the preview website.

Using a draft Pull Request ensures that everyone in the team can esaily view and discuss the code, access the website and even provide updates. Netlify GitHub integration adds information to the PR allowing easy access to the status and the built preview website for the branch.

Once work is ready to be incorporated in the WAI website the PR should be marked ready for review and the WAI website team contacted to supervise merging to master. Note the resource code needs to be initially integrated into the WAI website. Once integrated, any code on master will appear next time the WAI site is updated.

So in summary, devlopment workflow is:

- Create a branch and a PR, mark the PR as draft.
- Either perform local dev or use web editor.
- Commit, and push if required. Do this fairly regularly.
- Preview the website using the link that Netlify adds to the PR (need to wait for build to update) [for example](https://github.com/w3c/wai-course-list/pull/4).
- Rinse and repeat.
- Remove draft flag from the PR and requst WAI website team to review and merge.

Note this is all by convention as currently we do not enforce the flow with GitHub required reviews and protected branches etc.

## Editing Options

- GitHub web app - no tools like spell/syntax checkers, only one file per commit and commit to generate preview
- The [web editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor) built into GitHub - support tools and multifile commits but commit to generate preview
- Local development - needs manual setup but provides rapid edit-review cycle without commits to preview

## Local Development Environment Setup

### Global Tools etc

- VS code or other IDE/editor
- Netlify CLI - install nodejs & `npm i -g netlify-cli`
- Ruby 2.6.2, Ruby Gems & Jekyll - see [guide](https://jekyllrb.com/docs/installation/) 

#### On Windows


- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) (easiest - suggest Ubuntu) with VS Code's remote feature.
- Git for Windows (cmd or bash) - can be fiddly to configure but is the only other Windows option that supports the symb links used. 

##### Git 4 Windows Setup

- Resinstall [Git 4 Windows](https://gitforwindows.org/) to ensure that `Enable symbolic links` and `Use windows terminal` are checked
- Ensure you have Windows [permission to create symb links](https://github.com/git-for-windows/git/wiki/Symbolic-Links#allowing-non-administrators-to-create-symbolic-links) Admin users will usualy be fine. If not the `git clone` command will throw permission errors for creating the links.
- Install the recommended [Ruby+DevKit 2.6.2](https://jekyllrb.com/docs/installation/windows/)
- Open a new cmd window
- `gem install jekyll bundler`

### One-time Config for all set-ups

- `git clone http.... wai-XXX` - check that `_data/navigation.yml` is indeed a symb link
- `cd .../wai-XXX`
- `git submodule update --init --remote` - pulls in the content under `_external/`
- `bundle install` - install all the Gems (modules)
- `netlify link` accept the git remote option or otherwise find the w3c\site that exists for the repo

### Build and Serve

- `git submodule update --init --remote` update various shared resources like the navigation and languages
- `bundle exec jekyll build --config '_config.yml,_config_staging.yml'` - run Jekyll SSG to build the site
- `netlify build` command runs both of the above for convenience
- `netlify dev` runs a dev webserver server and open the website in a browser - no file watch, HMR etc so type ^C and re run to re build
