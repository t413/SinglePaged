Fancy jekyll powered single page site
======================

Here're some examples:

- This repository is also a live demo, see it at [t413.com/SinglePaged](http://t413.com/SinglePaged)
- [SMS-Tools](http://t413.com/SMS-Tools/) uses this template!
- [magiciansanfrancisco.com](http://magiciansanfrancisco.com) uses it ([source](https://github.com/strongrobert/MagicianSanFrancisco))
  * Shows a great example of the 3 / 2 column layout (used in photos)
  * Shows how to use images as section dividers instead
- Let me know of more!


## Why?

Got some *killer app*, some *neat project*, a cool portfolio? Make an easy single-page site to show it all off. SinglePaged uses jekyll niceties to make a ***polished, modular, and beautiful* single page site**.

- Each vertical section is a markdown file in **_posts/** directory.
  * They're sorted by 'date'. (we don't use date anywhere, it only sorts)
- Each vertical section sets it's own **color**, **header icon** (or image), **title**, and easy-to-write markdown body.
- Only **two things** to edit:
  1. Edit `_config.yml` to set the site title, description, etc
  2. Add _posts/*.md to make each vertical section. Copy some examples and add the sections from your README.md for a fast start!
- Easy adding of **SEO terms**, **favicon** & such, and **google analytics token**.

Sound good? Let's go!

There are three way to get started: (links jump to that section)

1. Make a [**user homepage**](#setup-as-user-homepage) (or organization)
2. Make a [**standalone project**](#setup-as-standalone-project-page) page
3. Make a [site under an **existing project**](#setup-inside-existing-project)



-------------------------

## Setup as user homepage

- Go click **fork** on the [github project page](https://github.com/t413/SinglePaged)
- Rename your new repository to `**username**.github.io`. (click settings in the right column)
- Clone your repository, **cd into the project**
- Run `git checkout publish && git branch -m master && git push -u origin master && git branch -D gh-pages` to get the *publish* branch as master for a clean, empty starting point.
- On your github project page go to *settings* again and change your **default branch** to ***master***
- Run `git push origin --delete gh-pages` to delete your remote's development branch

Now hop over to [Usage](#usage) to get it running with your own stuff!

**When you publish changes use `git push -u origin master`**

-------------------------


## Setup as standalone project page

- Go click **fork** on the [github project page](https://github.com/t413/SinglePaged)
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
- use `git remote add -t publish singlepage git@github.com:t413/SinglePaged.git` to get access to this repository.
- use `git fetch singlepage publish:gh-pages` to fetch the remote branch
- use `git branch --set-upstream gh-pages singlepage/publish && git checkout gh-pages;`
  This creates and checks out an orphan branch called gh-pages that tracks the original and lets you make changes.
- When you run `git push gh-pages:origin/gh-pages` it'll be live at *yourusername.github.io/repositoryName*

Now hop over to [Usage](#usage) to get it running with your own stuff!

**When you publish changes use `git push -u origin gh-pages`**



## Usage

Alright, you've got a clean copy and are ready to push some schmancy pages for the world to ogle at.

- Edit `_config.yml` to change your title, keywords, and description.
- Create a new file in `_posts/` called `2014-01-01-intro.md`
  Edit it, and add:

~~~
  ---
  title: "home"
  bg: white     #defined in _config.yml, can use html color like '#010101'
  color: black  #text color
  style: center
  ---

  # Example headline!
  and so on..
~~~

- Create a second post called `2014-01-02-art.md` with an divider image this time:

~~~
  ---
  title: "Art"
  bg: turquoise  #defined in _config.yml, can use html color like '#0fbfcf'
  color: white   #text color
  fa-icon: paint-brush
  ---

  #### A new section- oh the humanity!
~~~

**Note:** That part `fa-icon: paint-brush` will use a font-awesome icon of [paint-brush](http://fortawesome.github.io/Font-Awesome/icon/paint-brush/). You can use any icon from this [font-awesome icon directory](http://fortawesome.github.io/Font-Awesome/icons/).

- install Jekyll with `sudo gem install github-pages`
- run `jekyll serve -w`
  - visit [localhost:4000](http://localhost:4000) to see a live locally served preview.
- Push changes and see them live!




## Changing your colors

- In each post file you can define `bg: mycolor` and `color: myothercolor` to change the background and text colors for that section.
- **mycolor** can be a quoted html color like `'#0fbfcf'` or a key to a special color defined in **_config.yml** under 'colors'.
  - **Note:** Changes to _config.yml require a manual restart to your local server with `^C` and `jekyll serve -w`.

Nifty, right!



## Updating

So you've got a copy running and there's some new update? Let's update!

1. Checkout your github-pages branch
  - `git checkout gh-pages` for a standalone or existing page
  - `git checkout master` for a *username.github.io* page
2. run `git remote | grep -q "singlepage" || git remote add -t publish singlepage https://github.com/t413/SinglePaged.git` to be sure you have access to this repository (you can run this command at any time).
2. `git fetch singlepage` to fetch-in-place new changes.
3. Update to the new base (using merge)
    1. `git merge singlepage/publish`
4. You can alternatively update using rebase. This *rewrites history* (**bad**), but it is cleaner.
    1. `git rebase singlepage/publish`
