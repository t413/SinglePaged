Fancy jekyll powered single page site
======================

Here're some examples:

- This repository is a live demo, see it at [t413.com/SinglePaged](http://t413.com/SinglePaged)
- [magiciansanfrancisco.com](http://magiciansanfrancisco.com) uses it
- Let me know of more!

## How-To: **basic setup**

There are about *a billion* ways to get started.

We're going to use my **fork, rename, branch, and modify** method. It will get you started quickly and let you update easily.

There are three way to get started based on what you want to do:

1. [As a user (or organization) root page](#setup-as-user-homepage). It will live at [username].github.io (or your own custom domain if you want)
2. [As a standalone project page](#setup-as-standalone-project-page). It will live at [username].github.io/**[ProjectName]**.
3. [As a branch inside an existing project](#setup-inside-existing-project) that'll give you a fancy page at [username].github.io/**[ProjectName]**.



-------------------------

## Setup as user homepage

- Click **fork** up top on this github project page.
- Rename your new repository to `**username**.github.io`. (click settings in the right column)
- Clone your repository, **cd into the project**
- Run `git checkout publish && git branch -m master && git push -u origin master && git branch -D gh-pages` to get the *publish* branch as master for a clean, empty starting point.
- On your github project page go to *settings* again and change your default branch to **master**
- Run `git push origin --delete gh-pages` to delete your remote's development branch (you only need the publish one)

Now hop over to [Usage](#usage) to get it running with your own stuff!

**When you publish changes use `git push -u origin master`**

-------------------------


## Setup as standalone project page

- Click **fork** up top on this github project page.
- Rename your new repository to `whatever you want`. (click settings in the right column)
  * It will go live at yourusername.github.io/**WhateverYouWant**
- Clone your repository, cd into the project
- Run `git checkout publish && git branch -D gh-pages && git branch -m gh-pages && git push -uf origin gh-pages` to swap the *publish* and *gh-pages* branch.

Now hop over to [Usage](#usage) to get it running with your own stuff!

**When you publish changes use `git push -u origin gh-pages`**

-------------------------


## Setup inside existing project

This is the most complicated use-case .. but it's the coolest.
Say you've got your kickass project `github.com/t413/kicker` and want to have
some web presence to post about on [hacker news](http://news.ycombinator.com).
This will create an orphan branch called `gh_pages` in your repository
where you can publish changes, posts, images, and such. It won't alter your code at all.

- `cd` into your project on the command line
- use `git remote add singlepage git@github.com:t413/SinglePaged.git` to get access to this repository.
- use `git fetch singlepage publish:gh-pages` to fetch the remote branch
- use `git branch --set-upstream gh-pages singlepage/publish && git checkout gh-pages;`
  This creates and checks out an orphan branch called gh-pages that tracks the original and lets you make changes.
- When you run `git push gh-pages:origin/gh-pages` it'll be live at *yourusername.github.io/repositoryName*

Now hop over to [Usage](#usage) to get it running with your own stuff!

**When you publish changes use `git push -u origin gh-pages`**



## Usage

Hopefully you've run through one of the setup guides above. Now you're ready to push some schmancy pages for the world to ogle at.

1. Hopefully you've deleted all the _posts/ pages with the `git rm _posts/*; commit -m "Removing example posts";` command.
  Great! now let's make some new ones just for you.
2. Hopefully you've edited `_config.yml` to change your title, keywords, and description.
3. Now create a new file in `_posts/` called `2014-01-01-intro.md`
  Edit it, and add:
  ```
  ---
  title: "home"
  bg: white
  color: black
  style: center
  ---

  ### *whoa, okay, a heading in markdown!*
  and so on..
  ```
4. Create a second post called `2014-01-02-art.md` with an divider image this time:
  ```
  ---
  title: "Art"
  bg: blue
  color: white
  fa-icon: paint-brush
  ---

  #### whoa, a new section- the humanity!
  ```
  That part `fa-icon: paint-brush` will use a font-awesome icon of [paint-brush](http://fortawesome.github.io/Font-Awesome/icon/paint-brush/). You can use any icon from this [font-awesome icon directory](http://fortawesome.github.io/Font-Awesome/icons/).
5. run `jekyll serve -w` and visit [localhost:4000](http://localhost:4000) to see a live locally served preview.
  (if that doesn't work you probably need to install Jekyll with `sudo gem install github-pages`)
6. Push changes and see them live!



## Changing your color theme

The `_config.yml` file has this part:
```
colors:
  black:
    light: '#303030'
    dark: '#111111'
  white:
    light: '#f5f5f5'
    dark: '#f8f8f8'
  blue:
    light: '#3c9eec'
    dark: '#49a7e9'
```

Edit these (and manually restart your local server with ^C and `jekyll serve -w` to see changes)

**How is this used later?**

`_includes/css/main.css` actually can use Jekyll liquid code! This is what is looks like:

```
{% for c in site.colors %}
.text-{{c[0]}}   { color: {{ c[1].dark }}; }
.border-{{c[0]}} { border-color: {{ c[1].dark }} !important; }
etc..
```

Now in a post when you use `bg: blue` and `color: white` in index.html it does things like `<div class="container text-{{ page.color }} {{ page.style }}">`

Nifty, right!



## Updating

So you've got a copy running and there's some new update? Let's update!

1. Checkout your github-pages branch
  - `git checkout gh-pages` for a standalone or existing page
  - `git checkout master` for a *username.github.io* page
2. run `git remote | grep -q "singlepage" || git remote add -t publish singlepage git@github.com:t413/SinglePaged.git` to be sure you have access to this repository (you can run this command at any time).
2. `git fetch singlepage` to fetch-in-place new changes.
3. Update to the new base (using merge)
    1. `git merge singlepage/publish`
4. You can alternatively update using rebase. This *rewrites history* (**bad**), but it is cleaner.
    1. `git rebase singlepage/publish`
