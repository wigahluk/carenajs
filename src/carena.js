;(function () {
    'use strict';

    // accessory functions not exposed in carena object:



    // Methods exposed in carena object:

    function isArray (array) {
        if(Array.isArray) { return Array.isArray(array); }
        if (!array || typeof array != 'object') { return false; }
        if (typeof array.length != 'number') { return false; }
        return true;
    }

    function isUndefined (obj) {
        if (obj === undefined) { return true;}
        if (typeof obj == 'undefined') { return true; };
        return false;
    }

    // Creates an array of a given size where all elements are zero.
    function zeroes (size) {
        var a = new Array(size);
        for ( var i = 0; i < size; i++) {
            a[i] = 0;
        }
        return a;
    }

    // Creates an array of a given size where all elements are one.
    function ones (size) {
        var a = new Array(size);
        for ( var i = 0; i < size; i++) {
            a[i] = 1;
        }
        return a;
    }

    // Creates an array where elements increments by one until reach the limit starting at a given number
    function range (start, end) {
        var a = [];
        var i = start;
        while (i < end + 1) {
            a.push(i);
            i ++;
        }
        return a;
    }

    function sort(array) {
        var a = array.slice();
        a.sort(function (x, y) { return x - y; });
        return a;
    }

    // creates a new array where the entries are the same as the given array but replacing undefined with zero or a given
    // value
    function fill(array, value) {
        var a = new Array(array.length);
        value = value || 0;
        for ( var i = 0; i < array.length; i++) {
            a[i] = array[i] || value;
        }
        return a;
    }

    // sum all the elements of an array.
    function sum (array) {
        if (arguments.length > 1 && isArray(arguments[0])) {
            //Try to sum them element by element
            return sumOfArrays(arguments);
        }
        var s = 0;
        for ( var i = 0; i < array.length; i++) {
            s = s + array[i];
        }
        return s;
    }

    function sumOfArrays (args) {
        var a = new Array(args[0].length);
        for ( var i = 0; i < a.length; i++) {
            a[i] = sumAtIndex(args, i);
        }
        return a;

        function sumAtIndex(args, i) {
            var s = 0;
            for (var j = 0; j < args.length; j++) {
                s = s + atOrDefault(args[j], i);
            }
            return s;
        }
    }

    function atOrDefault(array, i, defaultValue) {
        if (isUndefined(defaultValue)) { defaultValue = 0; }
        if (i < 0 || i >= array.length) { return defaultValue; }
        return array[i];
    }

    // calculates the max value of an array.
    function max (array) {
        if (!array || array.length === 0) { return -Infinity; }
        var s = array[0];
        for ( var i = 0; i < array.length; i++) {
            s = Math.max(s, array[i]);
        }
        return s;
    }

    // calculates the min value of an array.
    function min (array) {
        if (!array || array.length === 0) { return Infinity; }
        var s = array[0];
        for ( var i = 0; i < array.length; i++) {
            s = Math.min(s, array[i]);
        }
        return s;
    }

    // calculates the arithmetic mean of a numeric set
    function mean (array) {
        if(!array || array.length === 0) { return 0;}
        return sum(array) / array.length;
    }

    // calculates the weighted mean of a numeric set
    function wMean (array, weights) {
        var c = dTimes(array, weights);
        return mean(c);
    }

    /**
     * Multiplies an array b by a constant a
     * @param a
     * @param b
     * @returns {Array}
     */
    function times (a, b) {
        var c = new Array(b.length);
        for ( var i = 0; i < b.length; i++ ) {
            c[i] = a * b[i];
        }
        return c;
    }

    /**
     * Multiplies element by element two arrays
     * @param a
     * @param b
     */
    function dTimes (a, b) {
        var c = new Array(a.length);
        for ( var i = 0; i < a.length; i++ ) {
            c[i] = a[i] * b[i];
        }
        return c;
    }

    /**
     * Returns an array with the N + 1 quantile values of a given array
     * @param a
     * @param N
     */
    function nTiles (a, N) {
        var b = sort(a);
        if(b.length === 0) return [];
        var c = new Array(N + 1);
        c[0] = b[0];
        for(var i=1; i<=N; i++){
            c[i] = b[Math.ceil((b.length * i)/N)-1];
        }
        return c;
    }

    function createCarena () {
        var carena = {};
        carena.isArray = isArray;
        carena.zeroes = zeroes;
        carena.ones = ones;
        carena.range = range;
        carena.min = min;
        carena.max = max;
        carena.sum = sum;
        carena.times = times;
        carena.mean = mean;
        carena.fill = fill;
        carena.wMean = wMean;
        carena.dTimes = dTimes;
        carena.nTiles = nTiles;
        carena.sort = sort;
        return carena;
    }

    /*--------------------------------------------------------------------------*/

    // export Carena

    var carena = createCarena();

    // Verify if define is present as a function.
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(function() {
            return carena;
        });
    }
    else if (typeof module !== "undefined" && module !== null) {
        module.exports = carena;
    }
    else if ( typeof angular !== "undefined" && angular !== null ) {
        angular.module('carena.js', []).factory('carena', function () { return carena; });
    }
}.call(this));