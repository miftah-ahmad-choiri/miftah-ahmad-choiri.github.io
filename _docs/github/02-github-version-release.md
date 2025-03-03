---
title: | 
        Mastering Version Release  <br>
        ![GitHub](https://img.shields.io/badge/github-repository-black)
        ![Jekyll](https://img.shields.io/badge/jekyll-static--site--generator-blue)
        ![Ruby](https://img.shields.io/badge/ruby-programming-red)
        ![GitHub Pages](https://img.shields.io/badge/github--pages-hosting-green)

permalink: /docs/github/github-version-release/
excerpt: "How the theme is organized and what all of the files are for."
last_modified_at: 2025-02-05T21:36:18-04:00
toc: true
---
# 🚀 How to Edit This Website

---

## 📋 **BEFORE EDITING**

### 1️⃣ **Sync with Deployed App**
Ensure your local repository is up-to-date with the deployed version:
```bash
cd miftah-ahmad-choiri.origin.io
git pull origin deploy
```

### 2️⃣ **Create a New Branch**
Switch to a new branch named `develop`:
```bash
git branch -M develop
```

### 3️⃣ **Check Current Version Tag**
Verify the current version tag before making changes:
```bash
git tag
```
If no tags exist, create an initial version tag:
```bash
git tag -a v0.1.0 -m "Releasing version 0.1.0"
git tag
```
**Example Output:**
```txt
v0.1.0
```
{:.no-copy .terminal .notice--info}

### 4️⃣ **Create a New Tag for the Upgrade**
Tag the repository for the new version and push it to the remote:
```bash
git tag -a v0.1.1 -m "Releasing version 0.1.1"
git push origin v0.1.1
git tag
```
**Example Output:**
```txt
v0.1.0
v0.1.1
```
{:.no-copy .terminal .notice--info}
---

## 💻 **DEVELOPING SOFTWARE**

To run the website in local mode with auto-reload
```bash
bundle exec jekyll serve --livereload --force_polling --watch
```

Make changes, track modifications, and commit your updates:
```bash
git status
git add .
git commit -m "Create new features or fix code"
git push -u origin develop
```

---

## 🚀 **AFTER EDITING**

### 📦 **Publish a New Release**
Authenticate with GitHub CLI and create a new release:
```bash
gh auth login
gh release list
gh release create v0.1.1 --title "Release v0.1.1" --notes "Create new feature and fix code"
gh release list
# check on the remote repository for branch develop
```

### 🔄 **Update Release after Changes**
If you make any changes after the release published, you need to do following update
```bash
gh release view v0.1.1
git tag -d v0.1.1
git tag -a v0.1.1 -m "Final adding new Markdown file how to edit this software and how to release a new version code. And update release v0.1.1"
git push origin develop --force
```
After update the tag, you can update the github release
```bash
gh release view v0.1.1
gh release edit v0.1.1 --notes "Final adding new Markdown file how to edit this software and how to release a new version code. And update release v0.1.1"
```

### 💾 **Merge branch develop with branch deploy & main**
Merge changes into deploy and main
```bash
# checkout into deploy and merge
git checkout deploy
git merge develop
git push origin deploy
```
Backup the deployed script into main branch
```bash
git checkout main
git merge deploy
git push origin main
```

### 🚮 **Delete `develop` branch**
Delete branch develop, so you can start fresh in the next update
```bash
git branch -d develop
git push origin --delete develop
```

---

✅ **All done! Your changes have been successfully committed and released.** 🎉



























<!-- Scroll to Top Button -->
<button onclick="scrollToTop()" id="scrollToTopBtn" title="Go to top">㐃</button>

<style>
  /* Style for the button */
  #scrollToTopBtn {
    display: none; /* Hidden by default */
    position: fixed; /* Fixed/sticky position */
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 20px; /* Place the button 20px from the right */
    z-index: 99; /* Make sure it does not overlap */
    border: none; /* Remove borders */
    outline: none; /* Remove outline */
    background-color: #555; /* Set a background color */
    color: white; /* Text color */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 20px; /* Some padding */
    border-radius: 20px; /* Rounded corners */
    font-size: 15px; /* Increase font size */
  }
  #scrollToTopBtn:hover {
    background-color: #111; /* Darker background on hover */
  }
</style>

<script defer>
  // Show the button when scrolling down
  window.onscroll = function() {
    let btn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>