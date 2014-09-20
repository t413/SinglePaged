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

1. [As a user (or organization) root page](#setup-as-user-root-page). It will live at [username].github.io (or your own custom domain if you want)
2. [As a standalone project page](#setup-as-a-standalone-project-page). It will live at [username].github.io/**[ProjectName]**.
3. [As a branch inside an existing project](#setup-inside-existing-project) that'll give you a fancy page at [username].github.io/**[ProjectName]**.



## Setup as user root page

- Click **fork** up top on this github project page.
- In your new repository it creates go its settings (right column), then rename your directory.
 * Name it **username**.github.io for it to be your root site.
 * Name it *whatever you want* for it to show up at username.github.io/**WhateverYouWant**
- Click on branch drop-down, type in `master`, click *Create branch: master*
- Go back into settings, change default branch to `master`
- Clone your repository, cd into the project
- **Important** Run `git rm _posts/*; commit -m "Removing example posts";`
  This will prevent any future updates to those articles creating conflicts when they're updated.
- Edit your _config.yml file
 * change the title, keywords, and description
 * edit, remove, or add colors. (These are referenced by name later in each section post.)
- Create some _posts/ md files, these show up as sections

Now hop over to [Usage](#usage) to get it running with your own stuff!

## Setup as a standalone project page

- Click **fork** up top on this github project page.
- In your new repository it creates go its settings (right column), then rename your directory to `whatever you want`
 * It will go live at username.github.io/**WhateverYouWant**
- Clone your repository, cd into the project
- **Important** Run `git rm _posts/*; commit -m "Removing example posts";`
  This will prevent any future updates to those articles creating conflicts when they're updated.
- Edit your _config.yml file
 * change the title, keywords, and description
 * edit, remove, or add colors. (These are referenced by name later in each section post.)
- Create some _posts/ md files, these show up as sections

Now hop over to [Usage](#usage) to get it running with your own stuff!

## Setup inside existing project

This is the most complicated use-case .. but it's the coolest.
Say you've got your kickass project `github.com/t413/kicker` and want to have
some web presence to post about on [hacker news](http://news.ycombinator.com).
This will create an orphan branch called `gh_pages` in your repository
where you can publish changes, posts, images, and such. It won't alter your code at all.

- `cd` into your project on the command line
- use `git remote add singlepage git@github.com:t413/SinglePaged.git` to get access to this repository.
- use `git pull singlepage` to pull the remote branch
- use `git branch --set-upstream gh-pages singlepage/gh-pages; git checkout gh-pages;`
  This creates and checks out an orphan branch called gh-pages that tracks the original and lets you make changes.
- **Important** Run `git rm _posts/*; commit -m "Removing example posts";`
  This will prevent any future updates to those articles creating conflicts when they're updated.
- Edit your _config.yml file
 * change the title, keywords, and description
 * edit, remove, or add colors. (These are referenced by name later in each section post.)
- Create some _posts/ md files, these show up as sections
- When you run `git push gh-pages:origin/gh-pages` it'll be live at *username.github.io/repositoryName*

Now hop over to [Usage](#usage) to get it running with your own stuff!



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


