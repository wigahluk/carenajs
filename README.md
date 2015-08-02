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

### nTiles(array, N)

Return the N+1 n-tiles on a given array, including the zero n-tile also known as the minimum.

### sum(array[, array_2, ...])

If there is only one argument and it is an array, it return the sum of all the elements of an array.
By convention, if the array is empty or undefined, returns zero.

    sum([1,2]) // returns 3

If the arguments are arrays, it will return an array of the length of the first array, where the element at index i corresponds
to the sum of all the elements at the position i of all given arrays:
   
    sum([1,2],[2,3]) // return [3,5] 

### times(constant, array)

Multiply all elements in a given array by a constant. By convention, if the array is empty or undefined, returns zero.  

### wMean(array, weights)

Calculates the arithmetic weighted mean of an array. By convention, if the array is empty or undefined, returns zero.


Time Series
-----------

A time series object in carena is understand as an object containing:
 - An array of time stamps
 - An array of dimensions
 - Each dimension contains an array of metrics
 - Each metric has an array of values for each of the time stamps
 
    {
       timestamps: [ ... ]
       dimensions: [
          {
              keys: [{ dim1: 'name1',... }],
              metrics: [ { metric1: {
                  values: [ ... ],...,
                  [weighs: 'name of metric to be used as weights']
              } ]
          },...
       ]
    }

Time series can be concatenated and merged.
 
Time series can be exported and imported from JSON objects. They can also be created empty and start accepting insertions:

    var ts = new carena.tSeries();
    ts.set ( timestamp, { server: 's1', region: 'r2' }, [{ traffic: { values: [... ]}}, { avgResponseTime: { values: [...], weights: 'traffic' } }]);
    
Time series can be projected by dimensions and metrics:

    ts.project(['server', 'traffic']);
    ts.project([{name: 'd1', type: 'dimension', map: function(dimensions, metrics)}, {name: 'm1', type: 'metric', map: function(dimensions, metrics)}]);
    
Time series can be converted into arrays as:
 - toRows: return an array of arrays, each one representing one row in a table, with the first one being the names of the fields
 - toColumns returns an object, where each key is the name of a field and the value of the property is the array of all the values
 
When converting into arrays, each value that is not present in the collection will be converted to zero or will use the specified default.

