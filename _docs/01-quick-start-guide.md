---
title: "Quick-Start Guide"
permalink: /docs/quick-start-guide/
excerpt: "How to quickly install and setup Minimal Mistakes for use with GitHub Pages."
last_modified_at: 2021-06-07T08:48:05-04:00
redirect_from:
  - /theme-setup/
toc: true
---

# GitHub Setup Guide for Windows (Git Bash)

This guide provides a structured walkthrough to set up GitHub on your PC using Git Bash.

---
## 📑 Table of Contents
<!-- TOC -->

- [GitHub Setup Guide for Windows (Git Bash)](#github-setup-guide-for-windows-git-bash)
  - [📑 Table of Contents](#-table-of-contents)
  - [📋 Prerequisites](#-prerequisites)
  - [📄 0. Bash Profile Configuration](#-0-bash-profile-configuration)
  - [🚀 1. Configuring Git](#-1-configuring-git)
    - [Check Git Version](#check-git-version)
    - [Set Global Git Configuration](#set-global-git-configuration)
  - [🔐 2. Setting Up SSH for GitHub](#-2-setting-up-ssh-for-github)
    - [Generate SSH Key](#generate-ssh-key)
    - [Start SSH Agent](#start-ssh-agent)
    - [Add SSH Key to Agent](#add-ssh-key-to-agent)
    - [Add SSH Key to GitHub](#add-ssh-key-to-github)
    - [Test SSH Connection](#test-ssh-connection)
  - [📦 3. Repository Setup](#-3-repository-setup)
    - [Initialize a New Git Repository](#initialize-a-new-git-repository)
    - [Add and Commit Files](#add-and-commit-files)
    - [Add Remote Repository](#add-remote-repository)
    - [Push to GitHub](#push-to-github)
    - [Push an existing repository from the command line](#push-an-existing-repository-from-the-command-line)
  - [🔄 4. Pull Existing Repository](#-4-pull-existing-repository)
    - [Pull existing repository to local](#pull-existing-repository-to-local)
  - [🗂️ 5. Branching and Merging](#️-5-branching-and-merging)
    - [Create and Switch to a New Branch](#create-and-switch-to-a-new-branch)
    - [Push the Branch to GitHub](#push-the-branch-to-github)
    - [Merge Changes into Main Branch](#merge-changes-into-main-branch)
    - [Move repo directory to new directory](#move-repo-directory-to-new-directory)
    - [Remove and Reconnect to remote repository](#remove-and-reconnect-to-remote-repository)
    - [Delete branch \& remote branch](#delete-branch--remote-branch)
    - [Verify branch](#verify-branch)
    - [Safely Delete .git directory](#safely-delete-git-directory)
  - [⚙️ 6. Using GitHub CLI (Optional)](#️-6-using-github-cli-optional)
    - [Verify GitHub CLI Installation](#verify-github-cli-installation)
    - [Authenticate with GitHub](#authenticate-with-github)
    - [Create Repository Using GitHub CLI](#create-repository-using-github-cli)
    - [Open Repository in Browser](#open-repository-in-browser)
  - [📝 7. Troubleshooting Common Issues](#-7-troubleshooting-common-issues)
  - [💡 8. Helpful Commands](#-8-helpful-commands)
  - [✅ Conclusion](#-conclusion)
  - [Installing the theme by Miftah Ahmad Choiri](#installing-the-theme-by-miftah-ahmad-choiri)
    - [Gem-based method](#gem-based-method)
    - [Remote theme method](#remote-theme-method)
    - [Remove the Unnecessary](#remove-the-unnecessary)
  - [Setup Your Site](#setup-your-site)
    - [Starting Fresh](#starting-fresh)
    - [Starting from `jekyll new`](#starting-from-jekyll-new)
    - [Migrating to Gem Version](#migrating-to-gem-version)
      - [Update Gemfile](#update-gemfile)

<!-- /TOC -->


---

## 📋 Prerequisites

- **Git** installed: [Download Git](https://git-scm.com/downloads)
- **GitHub account** created: [Sign up](https://github.com/join)
- **GitHub CLI** (optional for advanced features): [Download GitHub CLI](https://cli.github.com/)

---

## 📄 0. Bash Profile Configuration

```bash
cat ~/.bash_profile
```
```properties
export MY_PATH="/c/Users/mifta/OneDrive - IBM/IBM/LEARNING"
alias mydir='cd "$MY_PATH"'
export PATH=$PATH:/c/Program\ Files/GitHub\ CLI
```
```bash
source ~/.bash_profile
```

This configuration sets a custom path environment and alias for easier navigation and ensures the GitHub CLI is accessible from Git Bash.


---

## 🚀 1. Configuring Git

### Check Git Version

```bash
git --version
```

Ensure Git is installed correctly.

### Set Global Git Configuration

```bash
git config --global user.name "miftah-ahmad-choiri"
git config --global user.email "miftahcoiri354@gmail.com"
```

Verify settings:

```bash
git config --list
```

For organization login:
```bash
git config --global user.name "Miftah-Choiri"
git config --global user.email "miftah.choiri@ibm.com"
git config -list
```

---

## 🔐 2. Setting Up SSH for GitHub

### Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "miftahcoiri354@gmail.com"
```

Press Enter to accept defaults and optionally set a passphrase.

### Start SSH Agent

```bash
eval "$(ssh-agent -s)"
```

### Add SSH Key to Agent

```bash
ssh-add ~/.ssh/id_ed25519
```

### Add SSH Key to GitHub

1. Display the public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Copy the key.
3. Go to **GitHub → Settings → SSH and GPG keys → New SSH key**.
4. Paste the key and save.

### Test SSH Connection

```bash
ssh -T git@github.com
```

Successful output:

```bash
Hi miftah-ahmad-choiri! You've successfully authenticated, but GitHub does not provide shell access.
```

For Organization ssh-connection:
```bash
ssh-keygen -t ed25519 -C "miftah.choiri@ibm.com"
```
```bash
# save the key into different location
Enter file in which to save the key (/c/Users/mifta/.ssh/id_ed25519): /c/Users/mifta/.ssh/id_ed25519_ibm
```
```bash
ll ~/.ssh/
vi ~/.ssh/config
```
```properties
# Personal GitHub Account
Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# IBM GitHub Account
Host github.com-ibm
    HostName github.ibm.com
    User git
    IdentityFile ~/.ssh/id_ed25519_ibm
```
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_ibm
```
```bash
Identity added: /c/Users/mifta/.ssh/id_ed25519_ibm (miftah.choiri@ibm.com)
```
Test connection to github.com & github.ibm.com
```bash
ssh -i ~/.ssh/id_ed25519_ibm -T git@github.ibm.com
```
```bash
Hi Miftah-Choiri! You've successfully authenticated, but GitHub does not provide shell access.
```
```bash
ssh -T git@github.com
```
```bash
Hi miftah-ahmad-choiri! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 📦 3. Repository Setup

### Initialize a New Git Repository

```bash
cd ~/OneDrive - IBM/IBM/LEARNING/github/how-to-setup-github/
git init
```

### Add and Commit Files

```bash
git add how-to-setup-github.md
git commit -m "Initial commit"
```

### Add Remote Repository

```bash
git branch -M main
git remote add origin git@github.com:miftah-ahmad-choiri/how-to-setup-github.git
```
```bash
gh auth login
gh repo create how-to-setup-github --public --source=. --remote=origin --push
```

### Push to GitHub

```bash
git push -u origin main
```
### Push an existing repository from the command line
```bash
git remote add origin git@github.com:miftah-ahmad-choiri/how-to-setup-github.git
git branch -M main
git push -u origin main
```
---

## 🔄 4. Pull Existing Repository

### Pull existing repository to local

```bash
git remote add origin git@github.com:miftah-ahmad-choiri/how-to-setup-github.git
git pull origin main
# or
git pull git@github.com:miftah-ahmad-choiri/how-to-setup-github.git
```
```bash
git remote -v
git remote set-url origin git@github.com:miftah-ahmad-choiri/miftah-ahmad-choiri.github.io.git
git pull origin master
```

---

## 🗂️ 5. Branching and Merging

### Create and Switch to a New Branch

```bash
git checkout -b edit-readme
```

### Push the Branch to GitHub

```bash
git push -u origin edit-readme
```

### Merge Changes into Main Branch

```bash
git checkout main
git merge edit-readme
git push origin main
```

### Move repo directory to new directory
```bash
cp -r how-to-setup-github/ repository/
rm -rf how-to-setup-github/
```

### Remove and Reconnect to remote repository
```bash
git remote remove origin
git remote -r

git remote add origin git@github.com:miftah-ahmad-choiri/how-to-setup-github.git
git remote -r
```

### Delete branch & remote branch
```bash
git branch -d edit-readme
git branch -D edit-readme
git push origin --delete edit-readme
```

### Verify branch
```bash
git branch
git branch -r
```
### Safely Delete .git directory
```bash
# remove .git file from repo directory
cd how-to-setup-github
rm -rf .git
cd ..
rm -rf how-to-setup-github
```

---

## ⚙️ 6. Using GitHub CLI (Optional)

### Verify GitHub CLI Installation

```bash
gh --version
```

### Authenticate with GitHub

```bash
gh auth login
```

Follow the prompts to authenticate via browser.

### Create Repository Using GitHub CLI

```bash
gh repo create how-to-setup-github --public --source=. --remote=origin --push
```

### Open Repository in Browser

```bash
gh repo view --web
```

---

## 📝 7. Troubleshooting Common Issues

- **Repository Not Found:**

  ```bash
  ERROR: Repository not found.
  ```

  **Fix:** Verify repository URL and access permissions.

- **Remote Already Exists:**

  ```bash
  error: remote origin already exists.
  ```

  **Fix:** Remove existing remote and add again:

  ```bash
  git remote remove origin
  git remote add origin git@github.com:USERNAME/REPO.git
  ```

---

## 💡 8. Helpful Commands

- List branches:
  ```bash
  git branch -a
  ```
- Check remote repositories:
  ```bash
  git remote -v
  ```
- View repository list:
  ```bash
  gh repo list
  ```


---

## ✅ Conclusion

This guide covers the end-to-end process of setting up GitHub on your PC, configuring Git, managing SSH keys, creating repositories, and working with branches. For more details, refer to [GitHub Docs](https://docs.github.com/).

---

**Author:** *Miftah Ahmad Choiri*  
**Last Updated:** *2025-02-01*



Minimal Mistakes has been developed as a [Gem-based theme](http://jekyllrb.com/docs/themes/) for easier use, and 100% compatible with GitHub Pages when used as a remote theme.

**If you enjoy this theme, please consider [sponsoring me](https://github.com/sponsors/mmistakes) to continue developing and maintaining it.**

[!["Buy Me A Coffee"](https://user-images.githubusercontent.com/1376749/120938564-50c59780-c6e1-11eb-814f-22a0399623c5.png)](https://www.buymeacoffee.com/mmistakes)

[![Support via PayPal](https://cdn.jsdelivr.net/gh/twolfson/paypal-github-button@1.0.0/dist/button.svg)](https://www.paypal.me/mmistakes)
{: style="margin-top: 0.5em;"}

## Installing the theme by Miftah Ahmad Choiri

If you're running Jekyll v3.7+ and self-hosting you can quickly install the theme as a Ruby gem.

[^structure]: See [**Structure** page]({{ "/docs/structure/" | relative_url }}) for a list of theme files and what they do.

**ProTip:** Be sure to remove `/docs` and `/test` if you forked Minimal Mistakes. These folders contain documentation and test pages for the theme and you probably don't want them littering up your repo.
{: .notice--info}

**Note:** The theme uses the [jekyll-include-cache](https://github.com/benbalter/jekyll-include-cache) plugin which will need to be installed in your `Gemfile` and added to the `plugins` array of `_config.yml`. Otherwise you'll throw `Unknown tag 'include_cached'` errors at build.
{: .notice--warning}

### Gem-based method

With Gem-based themes, directories such as the `assets`, `_layouts`, `_includes`, and `_sass` are stored in the theme’s gem, hidden from your immediate view. This allows for easier installation and updating as you don't have to manage any of the theme files. 

To install as a Gem-based theme:

1. Add the following to your `Gemfile`:

   ```ruby
   gem "minimal-mistakes-jekyll"
   ```

2. Fetch and update bundled gems by running the following [Bundler](https://bundler.io/) command:

   ```bash
   bundle
   ```

3. Set the `theme` in your project's Jekyll `_config.yml` file:

   ```yaml
   theme: minimal-mistakes-jekyll
   ```

To update the theme run `bundle update`.

### Remote theme method

Remote themes are similar to Gem-based themes, but do not require `Gemfile` changes or whitelisting making them ideal for sites hosted with GitHub Pages.

To install as a remote theme:

1. Create/replace the contents of your `Gemfile` with the following:

   ```ruby
   source "https://rubygems.org"

   gem "github-pages", group: :jekyll_plugins
   gem "jekyll-include-cache", group: :jekyll_plugins
   ```

2. Add `jekyll-include-cache` to the `plugins` array of your `_config.yml`.

3. Fetch and update bundled gems by running the following [Bundler](https://bundler.io/) command:

   ```bash
   bundle
   ```

4. Add `remote_theme: "mmistakes/minimal-mistakes@{{ site.data.theme.version }}"` to your `_config.yml` file. Remove any other `theme:` or `remote_theme:` entry.

You may also optionally specify a branch, [tag](https://github.com/mmistakes/minimal-mistakes/tags), or commit to use by appending an @ and the Git ref (e.g., `mmistakes/minimal-mistakes@4.9.0` or `mmistakes/minimal-mistakes@bbf3cbc5fd64a3e1885f3f99eb90ba92af84063d`). This is useful when rolling back to older versions of the theme. If you don't specify a Git ref, the latest on `master` will be used.

**Looking for an example?** Use the [Minimal Mistakes remote theme starter](https://github.com/mmistakes/mm-github-pages-starter/generate) for the quickest method of getting a GitHub Pages hosted site up and running. Generate a new repository from the starter, replace sample content with your own, and configure as needed.
{: .notice--info}

---

**Note:** Your Jekyll site should be viewable immediately at <http://USERNAME.github.io>. If it's not, you can force a rebuild by **Customizing Your Site** (see below for more details).
{: .notice--warning}

If you're hosting several Jekyll based sites under the same GitHub username you will have to use Project Pages instead of User Pages. Essentially you rename the repo to something other than **USERNAME.github.io** and create a `gh-pages` branch off of `master`. For more details on how to set things up check [GitHub's documentation](https://help.github.com/articles/user-organization-and-project-pages/).

<figure>
  <img src="{{ '/assets/images/mm-gh-pages.gif' | relative_url }}" alt="creating a new branch on GitHub">
</figure>

You can also install the theme by copying all of the theme files[^structure] into your project.

To do so fork the [Minimal Mistakes theme](https://github.com/mmistakes/minimal-mistakes/fork), then rename the repo to **USERNAME.github.io** --- replacing **USERNAME** with your GitHub username.

<figure>
  <img src="{{ '/assets/images/mm-theme-fork-repo.png' | relative_url }}" alt="fork Minimal Mistakes">
</figure>

**GitHub Pages Alternatives:** Looking to host your site for free and install/update the theme painlessly? [Netlify][netlify-jekyll], [GitLab Pages][gitlab-jekyll], and [Continuous Integration (CI) services][ci-jekyll] have you covered. In most cases all you need to do is connect your repository to them, create a simple configuration file, and install the theme following the [Ruby Gem Method](#ruby-gem-method) above.
{: .notice--info}

[netlify-jekyll]: https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/
[gitlab-jekyll]: https://about.gitlab.com/2016/04/07/gitlab-pages-setup/
[ci-jekyll]: https://jekyllrb.com/docs/deployment/automated/#continuous-integration-service

### Remove the Unnecessary

If you forked or downloaded the `minimal-mistakes-jekyll` repo you can safely remove the following folders and files:

- `.editorconfig`
- `.gitattributes`
- `.github`
- `/docs`
- `/test`
- `CHANGELOG.md`
- `minimal-mistakes-jekyll.gemspec`
- `README.md`
- `screenshot-layouts.png`
- `screenshot.png`

**Note:** If forking the theme be sure to update `Gemfile` as well. The one found at the root of the project is for building the theme's Ruby gem and is missing dependencies. To properly setup a [`Gemfile`](https://github.com/mmistakes/minimal-mistakes/blob/master/docs/Gemfile) with the theme, consult the "[Install Dependencies](https://mmistakes.github.io/minimal-mistakes/docs/installation/#install-dependencies)" section.
{: .notice--warning}

## Setup Your Site

Depending on the path you took installing Minimal Mistakes you'll setup things a little differently.

**ProTip:** The source code and content files for this site can be found in the [`/docs` folder](https://github.com/mmistakes/minimal-mistakes/tree/master/docs) if you want to copy or learn from them.
{: .notice--info}

### Starting Fresh

Starting with an empty folder and `Gemfile` you'll need to copy or re-create this [default `_config.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_config.yml) file. For a full explanation of every setting be sure to read the [**Configuration**]({{ "/docs/configuration/" | relative_url }}) section.

From `v4.5.0` onwards, Minimal Mistakes theme-gem comes bundled with the necessary data files for localization.
They will be picked up automatically if you have the [`jekyll-data`](https://github.com/ashmaroli/jekyll-data) plugin installed.
If you're hosting on GitHub Pages, you can copy the [`_data/ui-text.yml`][ui-text.yml] file into your repository for the localization feature to work.

You'll need to create and edit these data files to customize them:

- [`_data/ui-text.yml`][ui-text.yml] - UI text [documentation]({{ "/docs/ui-text/" | relative_url }})
- [`_data/navigation.yml`][navigation.yml] - navigation [documentation]({{ "/docs/navigation/" | relative_url }})

  [ui-text.yml]: https://github.com/mmistakes/minimal-mistakes/blob/master/_data/ui-text.yml
  [navigation.yml]: https://github.com/mmistakes/minimal-mistakes/blob/master/_data/navigation.yml

### Starting from `jekyll new`

Scaffolding out a site with the `jekyll new` command requires you to modify a few files that it creates.

Edit `_config.yml`. Then:

- Replace `<site root>/index.md` with a modified [Minimal Mistakes `index.html`](https://github.com/mmistakes/minimal-mistakes/blob/master/index.html). Be sure to enable pagination if using the [`home` layout]({{ "/docs/layouts/#home-page" | relative_url }}) by adding the necessary lines to **_config.yml**.
- Change `layout: post` in `_posts/0000-00-00-welcome-to-jekyll.markdown` to `layout: single`.
- Remove `about.md`, or at the very least change `layout: page` to `layout: single` and remove references to `icon-github.html` (or [copy to your `_includes`](https://github.com/jekyll/minima/tree/master/_includes) if using it).

### Migrating to Gem Version

If you're migrating a site already using Minimal Mistakes and haven't customized any of the theme files things upgrading will be easier for you.

Start by removing the following folders and any files within them: 

```terminal
├── _includes
├── _layouts
├── _sass
├── assets
|  ├── css
|  ├── fonts
|  └── js
```

You won't need these anymore as they're bundled with the theme gem --- unless you intend to [override them](https://jekyllrb.com/docs/themes/#overriding-theme-defaults).

**Note:** When clearing out the `assets` folder be sure to leave any files you've added and need. This includes images, CSS, or JavaScript that aren't already [bundled in the theme](https://github.com/mmistakes/minimal-mistakes/tree/master/assets). 
{: .notice--warning}

From `v4.5.0` onwards, the default language files are read-in automatically via the [`jekyll-data`](https://github.com/ashmaroli/jekyll-data) plugin if it's installed. For sites hosted with GitHub Pages, you still need to copy the [`_data/ui-text.yml`][ui-text.yml] file because the `jekyll-data` plugin [is unsupported on GitHub Pages](https://docs.github.com/en/github/working-with-github-pages/about-github-pages-and-jekyll#plugins).

If you customized any of these files leave them alone, and only remove the untouched ones. If done correctly your modified versions should [override](https://jekyllrb.com/docs/themes/#overriding-theme-defaults) the versions bundled with the theme and be used by Jekyll instead.

#### Update Gemfile

Replace `gem "github-pages` or `gem "jekyll"` with `gem "jekyll", "~> 3.5"`. You'll need the latest version of Jekyll[^update-jekyll] for Minimal Mistakes to work and load all of the theme's assets properly, this line forces Bundler to do that.

[^update-jekyll]: You could also run `bundle update jekyll` to update Jekyll.

Add the Minimal Mistakes theme gem: 

```ruby
gem "minimal-mistakes-jekyll"
```

When finished your `Gemfile` should look something like this:

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 3.7"
gem "minimal-mistakes-jekyll"
```

Then run `bundle update` and add `theme: minimal-mistakes-jekyll` to your `_config.yml`.

**v4 Breaking Change:** Paths for image headers, overlays, teasers, [galleries]({{ "/docs/helpers/#gallery" | relative_url }}), and [feature rows]({{ "/docs/helpers/#feature-row" | relative_url }}) have changed and now require a full path. Instead of just `image: filename.jpg` you'll need to use the full path eg: `image: /assets/images/filename.jpg`. The preferred location is now `/assets/images/` but can be placed elsewhere or externally hosted. This applies to image references in `_config.yml` and `author.yml` as well.
{: .notice--danger}

---

That's it! If all goes well running `bundle exec jekyll serve` should spin-up your site.
