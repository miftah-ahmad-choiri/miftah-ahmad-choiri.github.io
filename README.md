# How to edit this Website

## Before Editing
**Make sure everything same with deployed app**
```bash
cd miftah-ahmad-choiri.origin.io
git pull origin deploy
```
**Create new branch develop**
```
git branch -M develop
git push -u origin develop
```
**Check current version tag before editing**
```bash
git tag
# if doesn't exist then add it first
git tag -a v0.1.0 -m "Releasing version 0.1.0"
git tag
```
```text
v0.1.0
```
**Create new tag for the new upgrade version**
```bash

```