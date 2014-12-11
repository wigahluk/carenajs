;(function () {
    'use strict';

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
        var s = 0;
        for ( var i = 0; i < array.length; i++) {
            s = s + array[i];
        }
        return s;
    }

    // calculates the arithmetic mean of a numeric set
    function mean(array) {
        return sum(array) / array.length;
    }
    // calculates the weighted mean of a numeric set
    function wMean(array, weights) {
        var c = new Array(array.length);
        for ( var i = 0; i < array.length; i++) {
            c[i] = array[i] * weights[i];
        }
        return mean(c);
    }

    // multiply an array by a constant
    function times(a, b) {
        var c = new Array(b.length);
        for ( var i = 0; i < b.length; i++) {
            c[i] = a * b[i];
        }
        return c;
    }

    function createCarena () {
        var carena = {};
        carena.zeroes = zeroes;
        carena.ones = ones;
        carena.range = range;
        carena.sum = sum;
        carena.times = times;
        carena.mean = mean;
        carena.fill = fill;
        carena.wMean = wMean;
        return carena;
    };

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