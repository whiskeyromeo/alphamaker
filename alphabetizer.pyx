import re
import cython

# @cython.boundscheck(False)
# @cython.wraparound(False)
cpdef str alphabetizer(str string):
    '''
        Takes a string and returns the transformed version of the string
    '''
    cdef int string_len = len(string)
    if string_len == 0:
        return

    cdef list cap_list = []
    cdef list lower_list = []
    cdef int str_i = 0
    cdef int char_code
    while(str_i < string_len):
        char_code = ord(string[str_i])
        if 64 < char_code < 91:
            cap_list.append(string[str_i])
        elif 96 < char_code < 123:
            lower_list.append(string[str_i])
        str_i+=1

    cap_list.sort()
    lower_list.sort()
    
    cdef list final_list = merge_cases(cap_list, lower_list)

    result = ''.join(final_list)
    return result


cpdef list merge_cases(list cap_list, list lower_list):
    '''
        Merges two lists of uppercase and lowercase letters and returns a list
    '''
    cdef int cap_i, lower_i, lower_list_len, cap_list_len
    cdef list final_list = []

    cap_i = 0
    lower_i = 0
    lower_list_len = len(lower_list)
    cap_list_len = len(cap_list)
    while 1:
        if (lower_i < lower_list_len) and (cap_i < cap_list_len):
            # we still have elements to pull from both lists
            if (ord(cap_list[cap_i])+32) <= ord(lower_list[lower_i]):
                # if the current lower case letter is less than than the current upper case letter
                final_list.append(cap_list[cap_i])
                cap_i += 1
            else:
                final_list.append(lower_list[lower_i])
                lower_i += 1
        elif lower_i == lower_list_len:
            # We have run out of lower case elements
            final_list.append(cap_list[cap_i])
            cap_i += 1
        else:  # cap_i == cap_list_len:
            # We have run out of upper case elements
            final_list.append(lower_list[lower_i])
            lower_i += 1
        # if we have come to the end of both lists
        if lower_i == lower_list_len and cap_i == cap_list_len:
            break

    return final_list


cpdef void sorted_append(list char_list, char letter):
    '''
        Append the characters to the list in alphabetical order
    '''
    cdef int char_list_len = len(char_list)
    cdef int i
    # if the char list is empty, return
    if char_list_len == 0:
        char_list.append(letter)
        return
        
    # otherwise check to see if inserting is valid
    i = 0
    while i < char_list_len:
        if letter < char_list[i]:
            char_list.insert(i, letter)
            return
        i+=1
    # if no slots were found, append the letter to the tail
    char_list.append(letter)
