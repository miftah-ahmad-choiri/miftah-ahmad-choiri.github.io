---
title: "How to Edit Jekyll"
permalink: /docs/how-to-edit-jekyll/
excerpt: "Instructions to edit the website and contents."
last_modified_at: 2025-02-06T21:36:18-04:00
toc: true
---
# What's New in Release v0.1.2

## Directory Edited on v0.1.2
List of directories that were edited:
- 🗂️ `_data`
- 🗂️ `_docs`
- 🗂️ `_pages`
- 🗂️ `_posts`
- 📂 `assets`
- 📂 `release-notes`
- 📄 `_index.md`
- 🔧 `_config.yml`

-----------------------------------

## 1. 🗂️ **`_data`**
### Adding an author on the page
Add an author by inserting it into the following section, then go to `_pages` to add the author on the pages.

```yaml
# Site Author
Miftah Ahmad Choiri:   #### <<< Create new author here ####
  name             : Miftah Ahmad Choiri # *name is a YAML reference pointing to the &anchor earlier
  avatar           : "/assets/images/myprofile1.png"
  bio              : "Miftah Ahmad Choiri ..."
  location         : "Jakarta, ID"
  links:
    - label: "Resume/CV"
      icon: "fas fa-fw fa-link"
      url: "https://miftah-ahmad-choiri.github.io/"
```

Add the author here in `_pages/year-archive.md`:

```yaml
---
title: "Posts by Year"
permalink: /year-archive/
layout: posts
author: Miftah Ahmad Choiri    #### <<< Add author here ####
author_profile: true
---
```

### Edit Navigation Sidebar
You can edit the navigation sidebar in `_data/navigation.yml`.

```yaml
# documentation links
docs:
  - title: Getting Started
    children:
      - title: "Tutorial"      #### <<< Add title on navigation ####
        url: /docs/tutorial/   #### <<< Add URL link here ####
```

Make sure the **permalink** is also updated in `_docs/3.tutorial.md`.

```yaml
---
title: "Tutorial"              #### <<< Edit title on document ####
permalink: /docs/tutorial/     #### <<< Edit permalink to point to URL ####
---
```
-----------------------

## 2. 🗂️ **`_docs`**
### Edit the documentation name, link URL, and navigation link
You can edit documentation files. In this case, we edited `_docs/03-installation.md` into `_docs/tutorial.md`. The file name changes from "Installation" into "Tutorial" and the permalink changes.

Before:

```yaml
---
title: "Installation"           #### <<< Edit title on document ####
permalink: /docs/installation/  #### <<< Edit permalink to point to URL ####
---
```

After:

```yaml
---
title: "Tutorial"                #### <<< Edit title on document ####
permalink: /docs/tutorial/       #### <<< Edit permalink to point to URL ####
---
```

Also, ensure the sidebar is updated in `_data/navigation.yml`.

```yaml
# documentation links
docs:
  - title: Getting Started
    children:
      - title: "Tutorial"       #### <<< Add title on navigation ####
        url: /docs/tutorial/    #### <<< Add URL link here ####
```
-------------------------
## 3. 🗂️ **`_pages`**
### Add author on the pages layout
Here, you can add author information in the `_pages/year-archive.md`.

```yaml
---
title: "Posts by Year"
permalink: /year-archive/
layout: posts
author: Miftah Ahmad Choiri    #### <<< Add author here #### 
author_profile: true           #### <<< Add author here ####
---
```
---------------------------
## 4. 🗂️ **`_posts`**
### Create new posts
You can create new posts by creating a markdown file in `_posts/2024-04-18-welcome-to-miftah.md`. Don't forget to use the date format `2024-04-18-xxxxx.md` to ensure the post appears at the top.

```yaml
---
title: "Welcome Miftah!"
date: 2019-04-18T15:34:30-04:00
categories:
  - blog
tags:
  - Jekyll
  - update
---

Hi, Miftah...
```
---------------------------
## 5. 📂 **`assets`**
### Add images and store in the images directory
You can add new images and create new directories within the `assets` folder to make it easier to manage and use images.
---------------------
## 6. 📂 **`release-notes`**
### Update any notes/documentation for each change
Please take note of every change you make to ensure everything is trackable.
----------------------
## 7. 📄 **`_index.md`**
### Change the homepage of the website
You can change the homepage of the website by editing the `index.md`.

```yaml
---
layout: splash
permalink: /
hidden: true
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/mm-home-page-feature.jpg
  actions:
    - label: "<i class='fas fa-download'></i> Install now"
      url: "/docs/quick-start-guide/"
excerpt: >
  A flexible two-column Jekyll theme. Perfect for building personal sites, blogs, and portfolios.<br />
  <small><a href="https://github.com/mmistakes/minimal-mistakes/releases/tag/4.26.2">Latest release v4.26.2</a></small>
feature_row:
  - image_path: /assets/images/mm-customizable-feature.png
    alt: "customizable"
    title: "Super customizable"
    excerpt: "Everything from the menus, sidebars, comments, and more can be configured or set with YAML Front Matter."
    url: "/docs/configuration/"
    btn_class: "btn--primary"
    btn_label: "Learn more"
  - image_path: /assets/images/mm-responsive-feature.png
    alt: "fully responsive"
    title: "Responsive layouts"
    excerpt: "Built with HTML5 + CSS3. All layouts are fully responsive with helpers to augment your content."
    url: "/docs/layouts/"
    btn_class: "btn--primary"
    btn_label: "Learn more"
  - image_path: /assets/images/mm-free-feature.png
    alt: "100% free"
    title: "100% free"
    excerpt: "Free to use however you want under the MIT License. Clone it, fork it, customize it... whatever!"
    url: "/docs/license/"
    btn_class: "btn--primary"
    btn_label: "Learn more"      
---
{% include feature_row %}
```
-------------------
## 8. 🔧 **`_config.yml`**
### Add a logo on the website
You can change the logo of the website by editing `_config.yml`.

```yaml
logo                     : "/assets/myimages/logo.png"
```
