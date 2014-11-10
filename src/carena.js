;(function () {
    'use strict';

    function zeroes (size) {
        var a = new Array(size);
        for ( var i = 0; i < size; i++) {
            a[i] = 0;
        }
        return a;
    }

    function ones (size) {
        var a = new Array(size);
        for ( var i = 0; i < size; i++) {
            a[i] = 1;
        }
        return a;
    }

    function createCarena () {
        var carena = {};
        carena.zeroes = zeroes;
        carena.ones = ones;
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