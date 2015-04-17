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

### dTimes(A, B)

Multiplies two arrays element by element.

### max(array)

Calculates the max value of an array. By convention, if the array is empty or undefined, returns -Infinity.

### mean(array)

Calculates the arithmetic mean of an array. By convention, if the array is empty or undefined, returns zero.
 
### min(array)

Calculates the min of an array.  By convention, if the array is empty or undefined, returns Infinity. 

### sum(array[, array_2, ...])

If there is only one argument and it is an array, it return the sum of all the elements of an array.
By convention, if the array is empty or undefined, returns zero.

> sum([1,2]) // returns 3

If the arguments are arrays, it will return an array of the length of the first array, where the element at index i corresponds
to the sum of all the elements at the position i of all given arrays:
   
> sum([1,2],[2,3]) // return [3,5] 

### times(constant, array)

Multiply all elements in a given array by a constant. By convention, if the array is empty or undefined, returns zero.  

### wMean(array, weights)

Calculates the arithmetic weighted mean of an array. By convention, if the array is empty or undefined, returns zero.
