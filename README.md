carena.js
=========

A simple library for array operations. Carena is a functional library that in general will not modify its arguments
and will return new objects.

  
Creation methods
----------------

### ones(length)

Creates an array of ones of a given size.

### range(start, end)

Creates an array starting on a given start integer and ending on a given end integer, doing increments of one. 

### zeroes(length)

Creates an array of zeroes of a given size.


Transformation methods
----------------------

### fill(array[, value])

Fills undefined entries with zero or a given value.


Mathematical methods
--------------------

### mean(array)

Calculates the arithmetic mean of an array. 

### sum(array)

Sum all the elements of an array.

### times(constant, array)

Multiply all elements in a given array by a constant.  

### wMean(array, weights)

Calculates the arithmetic weighted mean of an array.
