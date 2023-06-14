#### section 19

"default":"index.html",
"scripts": {
"start": "parcel index.html",
"build": "parcel build index.html --dist-dir ./dist"

    change main property to default

git init
git config --global user.name awirshj
git config --global user.email amirshjprogramming@gmail.com

## 005 git fundamentals

.gitignore

git status
git add -A(adding all files(except .gitignore files) to the staging area)
if we create some change..than we need git add -A again.

git commit -m "initial commit=message"

    (1) if you wanted to go back on all of these files to previous commit, you could simply write git reset --hard HEAD
    (2) but now, let's say that you actually had already committed files.than (1) situation:
    git log --> log all commit history
    q(close)
    git reset --hard id

(2),(1) are dangerous...instead of them we use branchs;

git branch--> log all branch
git branch new-features--> create new branch with name new-features

git checkout new-features --> switch to branch new-features

    we can merge changes from different branch togather...when we are in the branch, into which we want to add new code...git merge new-features

# github git cheat sheet

## 006 pushing to github

github==remote branch for Maintenance our code online....conect local repo with online repo

    push an existing repo from the command line

git remote add origin(name of remote branch) git@github.com:awirshj/test.git

git branch -M master(the name of the branch that we want to push)

git push -u origin(remote brach) master(the name of the branch that we want to push)

touch README.md
