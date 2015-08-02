/**
 * Convenient methods for manipulating arrays and collections
 * @version v0.1.1 - 2015-08-01
 * @author Oscar Ponce <oscar@opb.mx>
 * @license http://www.apache.org/licenses/LICENSE-2.0
 **/
;(function () {
    'use strict';

    // accessory constants:

    var objProto = Object.prototype;

    // accessory functions not exposed in carena object:

    function atOrDefault(array, i, defaultValue) {
        if (isUndefined(defaultValue)) { defaultValue = 0; }
        if (i < 0 || i >= array.length) { return defaultValue; }
        return array[i];
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

    function reduce(array, f, acc) {
        var idx = -1,
            l = array.length;

        while (++idx < l) {
            acc = f(acc, array[idx], idx, array);
        }
        return acc;
    }

    function union () {
        var idx = 0,
            l = arguments.length;
        var a = [];
        if (l === 0) {
            return a;
        }
        a = arguments[0].slice();
        while (++idx < l) {
            forEach(arguments[idx], function (item) {
                if(a.indexOf(item) < 0) {
                    a.push(item);
                }
            });
        }
        return a;
    }

    function forEach(array, f) {
        var idx = -1,
            l = array.length;

        while (++idx < l) {
            f(array[idx], idx, array);
        }
        return array;
    }

    function map(array, f) {
        var idx = -1,
            l = array.length,
            a = Array(l);

        while (++idx < l) {
            a[idx] = f(array[idx], idx, array);
        }
        return a;
    }

    function keys(object) {
        var obj = Object(object);
        var result = [];

        for (var key in obj) {
            if (objProto.hasOwnProperty.call(obj, key)) {
                result.push(key);
            }
        }
        return result;
    }

    // Methods exposed in carena object:

    function isArray (array) {
        if(Array.isArray) { return Array.isArray(array); }
        if (!array || typeof array != 'object') { return false; }
        if (typeof array.length != 'number') { return false; }
        return true;
    }

    function isUndefined (obj) {
        if (obj === undefined) { return true;}
        if (typeof obj == 'undefined') { return true; }
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

    function sort (array, f) {
        var a = array.slice();
        var c = function (x, y) { return x - y; };
        if(f) { c = function (x, y) { return f(x) - f(y); }}
        a.sort(c);
        return a;
    }

    function binSearch (array, first, last, value, lessThan) {
        if(!lessThan) { lessThan = function (a,b) { return a < b; } }
        while (first < last) {
            var mid = last + ((first - last) >> 1);
            if (lessThan(value, array[mid])) {
                last = mid;
            } else {
                first = mid + 1;
            }
        }
        return first;
    }

    function sortedIndex (array, value) {
        return binSearch(array, 0, array.length - 1, value);
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

    /**
     * Time Series
     */

    function TimeSeries () {
        var ts = this;
        var timeStamps = [];
        var data = {};
        Object.defineProperty(ts, 'size', {
            get: function() { return timeStamps.length; },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(ts, 'timeStamps', {
            get: function() { return timeStamps.slice(); },
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(ts, 'data', {
            get: function() { return dataToArray(); },
            enumerable: true,
            configurable: false
        });
        this.set = function (timestamp, dimensions, metrics) {
            var insertIdx = sortedIndex(timeStamps, timestamp);
            var dataGroup = enforceDimensionGroup(dimensions);
            if(insertIdx > 0 && timeStamps[insertIdx-1] === timestamp) {
                // replace elements
                setInGroupAt(dataGroup, insertIdx-1, metrics);
            } else {
                // insert elements
                insertAt(dataGroup, insertIdx, metrics, timestamp);
            }
        };

        function insertAt (group, index, metrics, timestamp) {
            var ks = keys(data);
            var gr;
            forEach(ks, function (k) {
                gr = data[ks].metrics;
                var ms = keys(gr);
                if (data[ks] === group) {
                    ms = union(ms, keys(metrics));
                }
                forEach(ms, function (mname) {
                    var a = enforceMetric(group, mname);
                    a.values.splice(index, 0, metrics[mname] || 0);
                });
            });
            timeStamps.splice(index, 0, timestamp);
        }

        function setInGroupAt (group, index, metrics) {
            forEach(keys(metrics), function (mn) {
                var a = enforceMetric(group, mn);
                a.values[index] = metrics[mn];
            });
        }

        function dataToArray () {
            var ks = keys(data);
            return map(ks, function (k) {
                return data[k];
            });
        }

        function enforceMetric (group, metric) {
            if(!group.metrics[metric]) {
                group.metrics[metric] = {
                    values: zeroes(ts.size)
                };
            }
            return group.metrics[metric];
        }

        function enforceDimensionGroup (dimensions) {
            var key = toKey(dimensions);
            if(!data[key]) {
                data[key] = { dimensions: dimensions, metrics: {} };
            }
            return data[key];
        }

        function toKey(ks) {
            return map(keys(ks).sort(), function (k) { return k + '->' + ks[k]; }).join('::');
        }
    }

    function tSeries() {
        var ts = new TimeSeries();
        return ts;
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
        carena.tSeries = tSeries;
        carena.sortedIndex = sortedIndex;
        carena.union = union;
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