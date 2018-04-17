#!/usr/bin/env node
'use strict';

const alphabetizer = require('./alphabetizer');
const path = require('path');
const program = require('commander');
const readline = require('readline');
const spawn = require('child_process').spawn;

const AVAILABLE_TYPES = {
    'js': runJSAlphabetizer, 
    'py': runPyAlphabetizer
};

const PY_SOURCE = __dirname + '/main.py';


// Set up the cli for execution
program
    .option('-t, --timed', 'Time the execution')
    .command('run <type>')
    .description(`Alphabetize strings using the specified template (js|py)`)
    .action(runCLI);

// Add additional information to the help layout
program.on('--help', function() {
    console.log('\n  Examples:');
    console.log('');
    for (let type in AVAILABLE_TYPES) {
        console.log(`\t$ ./index.js run ${type} -t`);
    }
    console.log('');

})

program.parse(process.argv);

/**
 * Run the CLI to take in the strings from the command line
 * @param {*} type : one of the types specified in AVAILABLE_TYPES 
 * @param {*} cmd : the options passed in along with the command
 */
function runCLI(type, cmd) {
    const timed = (cmd.parent.timed) ? true : false;
    // Get the method associated with the type passed
    // in from the AVAILABLE_TYPES config
    const method = AVAILABLE_TYPES[type];
    if(method === undefined) {
        console.log(`\n'${type}' is not a valid option\nUse the --help command to discover valid commands\n`);
        return;
    }
    console.log('Enter the strings to parse: ');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    
    let inputArr = [];
    rl.on('line', function(line) {
        if (line === '') 
            rl.close();
        else
            inputArr.push(line);
    }).on('close', function() {
        if (inputArr.length === 0) {
            process.exit(0);
        }
        console.log(`--- Generating ${type} output ---\n`);
        inputArr.forEach((string) => {
            // call the appropriate method as specified in AVAILABLE_TYPES
            method(string, timed);
        });
              
    });
}

/**
 * Puts out a string to the console based on 
 * the javascript version of the alphabetizer
 * @param {*} string 
 * @param {*} timed 
 */
function runJSAlphabetizer(string, timed) {
    let diff;
    if (timed) {
        const MS_PER_NS = 1e-6;
        const NS_PER_S = 1e9;
        let start = process.hrtime();
        alphabetizer(string);
        diff = process.hrtime(start);
        diff = 'Time: ' + ((diff[0] * NS_PER_S + diff[1]) * MS_PER_NS) + ' ms'
    }
    
    const result = alphabetizer(string);
    const output = `Before: ${string} | After: ${result} | ${(timed) ? diff : ''}`;
    console.log(output);
}

/**
 * Outputs a string to the console based on the 
 * python version of the alphabetizer
 * @param {*} string 
 * @param {*} timed 
 */
function runPyAlphabetizer(string, timed) {
    const pyProcess = spawn('python', [PY_SOURCE, string, timed]);
    pyProcess.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    pyProcess.stderr.on('err', (err) => {
        console.log('err: ', data.toString());
    });
};


