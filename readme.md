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

## Setup

### NPM

Ive published this project as an npm package with the caveat that the python functionality has not been working on all of the systems I have tested it on yet.

The issue has to due with the execution of python as a child process from nodejs. The connection between processes closes before the datastream is sent back across to the nodejs process so no output is rendered.

The nodejs functionality seems to work without issue.

With nodejs installed, install with:
```bash
    npm install alphamaker -g
```
To run:
```bash
    alphabetizer --help
```


### Linux
Depending on the machine image you are using there are a few different options for how you can proceed.

If working with a clean machine image using the `yum` package manager you can execute the `setup.sh` script included in this directory and that will load nodejs, python, and gcc into the system.



### OS-X

```
    brew install node
    brew install python
```