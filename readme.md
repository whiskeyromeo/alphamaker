# Alphabetizer

Built using node 8.9.4 and python 2.7

This program will take in a series of string and return an alphabetized version of that string.

Example:
```
    Input: VirginiaTech
    Output: aceghiiinrTV

    Input: 3 Blind Mice
    Output: BcdeiilMn
```

## Setup/Use

### Standalone

So long as you have git, nodejs, and python installed you should be ready to go, just
```
    git clone https://github.com/whiskeyromeo/alphamaker.git
```
cd into the directory, `npm install`, and execute with
```
    ./index.js --help
```


### Linux/Unix AMI
Depending on the machine image you are using there are a few different options for how you can proceed.

If working with a clean machine image using the **yum** package manager you can execute the **setup.sh** script included in this directory and that will load nodejs, python, and gcc into the system.

From there you should be able to follow the directions as outlined under standalone above.

### NPM

Ive published this project as an npm package with the caveat that the python functionality has not been working on all of the systems I have tested it on yet.

The issue has to due with the execution of python as a child process from nodejs. The connection between processes closes before the datastream is sent back across to the nodejs process so no output is rendered.

You can execute the python code directly by going to the source directory and importing the dependencies directly into a python console.

The nodejs functionality seems to work without issue.

With nodejs installed, install with:
```bash
    npm install alphamaker -g
```
To run:
```bash
    alphabetizer --help
```
