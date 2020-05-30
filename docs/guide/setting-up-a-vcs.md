# Setting Up A VCS

The next thing you should do is to setup a version control system for the generated project so that you can track any
changes to the source code.
**The VCS will also cover the [private](project-structure.md#key-generator) and
[public](project-structure.md#key-manager) keystore files which are automatically generated when building the project
for the first time.**

## Using Git

For [Git](https://git-scm.com/), the project directory already contains a `.gitignore` file, so all you need to do is:

``` bash
git init
git add .
git commit -m "Initial commit."
```

Whenever you have changed any source files, you can commit your changes as follows:

``` bash
git add .
git commit
```

## Using Mercurial

For [Mercurial](https://mercurial.selenic.com/), the project directory already contains a `.hgignore file`, so all you
need to do is:

``` bash
hg init
hg add
hg commit -m "Initial commit."
```

Whenever you have changed any source files, you can commit your changes like this:

``` bash
hg add
hg commit
```
