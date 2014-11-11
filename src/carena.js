;(function () {
    'use strict';

    // Creates an array of a given size where all elements are zero.
    function zeroes (sizex, sizey) {
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

    // sum all the elements of an array.
    function sum (array) {
        var s = 0;
        for ( var i = 0; i < array.length; i++) {
            s = s + array[i];
        }
        return s;
    }

    function createCarena () {
        var carena = {};
        carena.zeroes = zeroes;
        carena.ones = ones;
        carena.sum = sum;
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