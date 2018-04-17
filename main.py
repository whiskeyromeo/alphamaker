#!/usr/bin/env python
import pyximport
pyximport.install()
import sys
from timeit import timeit

from alphabetizer import alphabetizer


def get_alphabetized_string(parse_string, is_timed):
    '''
        Execute the alphabetizer and return a string
        based on the execution
    '''
    options = ''
    if is_timed == 'true':
        pyx_version_time = timeit("alphabetizer('{}')".format(
            parse_string), setup="from __main__ import alphabetizer", number=100000)
        options = ' | Time: {} ms'.format(pyx_version_time)
    
    alpha_string = alphabetizer(parse_string)
    output = 'Before : {} | After: {}'.format(parse_string, alpha_string) + options
    return output

def main():
    main_string = sys.argv[1]
    timed = sys.argv[2]

    print(get_alphabetized_string(main_string, timed)) 
    # this may not be necessary when using print
    sys.stdout.flush()


if __name__ == '__main__':
    main()
