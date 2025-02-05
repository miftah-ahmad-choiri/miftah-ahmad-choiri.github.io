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
```text
v0.1.0
```

### 4️⃣ **Create a New Tag for the Upgrade**
Tag the repository for the new version and push it to the remote:
```bash
git tag -a v0.1.1 -m "Releasing version 0.1.1"
git push origin v0.1.1
git tag
```
**Example Output:**
```text
v0.1.0
v0.1.1
```

---

## 💻 **DEVELOPING SOFTWARE**

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
```

This version includes:
- Emojis for better visual separation.
- Clear section headings with descriptive titles.
- Consistent code formatting.
- Dividers (`---`) for clean transitions between sections.

Let me know if you'd like further tweaks! 🚀
