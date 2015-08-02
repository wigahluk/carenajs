'use strict';

define(['src/carena'], function (carena) {
    it('is array', function () {
        expect(carena.isArray(undefined)).toBeFalsy();
        expect(carena.isArray(NaN)).toBeFalsy();
        expect(carena.isArray(8)).toBeFalsy();
        expect(carena.isArray('is array')).toBeFalsy();
        expect(carena.isArray({})).toBeFalsy();
        expect(carena.isArray({ length: 1 })).toBeFalsy();
        expect(carena.isArray([])).toBeTruthy();
    });

    describe('zeroes', function () {
        it('Creating a simple array', function () {
            var a = carena.zeroes(10);
            expect(Array.isArray(a)).toBeTruthy();
            expect(a.length).toBe(10);
            a.forEach(function (i) {
                expect(i).toBe(0);
            })
        });
    });

    describe('ones', function () {
        it('Creating a simple array', function () {
            var a = carena.ones(10);
            expect(Array.isArray(a)).toBeTruthy();
            expect(a.length).toBe(10);
            a.forEach(function (i) {
                expect(i).toBe(1);
            })
        });
    });

    describe('range', function () {
        it('Creating a simple array', function () {
            var a = carena.range(1, 100);
            expect(Array.isArray(a)).toBeTruthy();
            expect(a.length).toBe(100);
            for(var i = 0; i < 100; i++) {
                expect(a[i]).toBe(i + 1);
            }
        });
    });

    describe('filling arrays', function () {
        it('Filling with zeroes an array with undefined values', function () {
            var a = carena.ones(1000);
            for(var i = 0; i < 500; i++) {
                a[i*2] = undefined;
            }
            expect(a[20]).toBeUndefined();
            var b = carena.fill(a);
            expect(a[20]).toBeUndefined(); // carena should not alter the original array
            expect(b[20]).toBe(0);
        });

        it('Filling with a given value an array with undefined values', function () {
            var a = carena.ones(1000);
            for(var i = 0; i < 500; i++) {
                a[i*2] = undefined;
            }
            expect(a[20]).toBeUndefined();
            var b = carena.fill(a, 10);
            expect(a[20]).toBeUndefined(); // carena should not alter the original array
            expect(b[20]).toBe(10);
        });
    });

    describe('Min', function () {
        it('Returns the minimum value of a numeric array', function () {
            var a = carena.range(1, 1000);
            var m = carena.min(a);
            expect(m).toBe(1);
        });

        it('Returns the minimum value of an empty array', function () {
            var a = [];
            expect(carena.min(a)).toBe(Infinity);
        });
    });

    describe('Max', function () {
        it('Returns the maximum value of a numeric array', function () {
            var a = carena.range(1, 1000);
            var m = carena.max(a);
            expect(m).toBe(1000);
        });
        it('Returns the maximum value of an empty array', function () {
            var a = [];
            expect(carena.max(a)).toBe(-Infinity);
        });
    });

    describe('sum', function () {
        it('Sum of a numeric array', function () {
            var count = 1000;
            var a = carena.sum(carena.ones(count));
            expect(a).toBe(count);
        });
        it('Sum of an empty array', function () {
            var a = [];
            expect(carena.sum(a)).toBe(0);
        });
        it('If there is more than one argument and they are arrays, ' +
            'it will return the sum element by element of the given arrays', function () {
            var a = carena.ones(1000);
            var b = carena.ones(1000);
            var c = carena.sum(a, b);
            expect(c.length).toBe(1000);
            expect(c[100]).toBe(2);
        });
    });

    describe('times', function () {
        it('Multiply all elements of an array by a constant', function () {
            var a = carena.range(1, 1000);
            var b = 2;
            var c = carena.times(b, a);
            expect(c[9]).toBe(20);
        });
    });

    describe('mean', function () {
        it('Arithmetic mean of a numeric array', function () {
            var a = carena.range(1, 1000);
            var m = carena.mean(a);
            expect(m).toBe(500.5);
        });
        it('Arithmetic mean of an empty array', function () {
            var a = [];
            var m = carena.mean(a);
            expect(m).toBe(0);
        });

        it('Arithmetic weighted mean of a numeric array', function () {
            var a = carena.range(1, 1000);
            var w = carena.times(2, carena.ones(1000));
            var m = carena.wMean(a, w);
            expect(m).toBe(1001);
        });
        it('Arithmetic weighted mean of an empty array', function () {
            var a = [];
            var m = carena.wMean(a);
            expect(m).toBe(0);
        });
    });

    describe('dTimes', function () {
        it('Calculate the element by element square of an array', function () {
            var a = carena.range(1, 1000);
            var b = carena.range(1, 1000);
            var c = carena.dTimes(a, b);
            expect(c[12]).toBe(13*13);
            expect(c[0]).toBe(1);
        });
    });

    describe('sort', function () {
        it('sorting an array', function () {
            var a = carena.range(1, 100).reverse();
            var a2 = carena.sort(a);
            var s = carena.range(1, 100);
            for(var i=0;i<100;i++) {
                expect(a2[i]).toBe(s[i]);
            }
        });
        it('sorting an array with a function (identity)', function () {
            var a = carena.range(1, 100).reverse();
            var a2 = carena.sort(a, function (i) { return i; });
            var s = carena.range(1, 100);
            for(var i=0;i<100;i++) {
                expect(a2[i]).toBe(s[i]);
            }
        });
    });

    describe('sortedIndex', function () {
        it('sorting an array', function () {
            var a = carena.range(1, 100);
            expect(carena.sortedIndex(a, 50)).toBe(50);
        });
    });

    describe('Union', function () {
        it('union of sub array return longest array', function () {
            var a = carena.range(1, 100);
            var b = carena.range(1, 10);
            var u = carena.union(a,b);
            expect(u.length).toBe(100);
            for(var i=0;i<100;i++) {
                expect(u[i]).toBe(a[i]);
            }
        });
    });

    describe('nTiles', function () {
        it('calculates the N quantiles of an array when N is 4 (Quartiles)', function () {
            var a = carena.range(1, 100);
            var ns = carena.nTiles(a, 4);
            expect(ns.length).toBe(5);
            expect(ns[0]).toBe(1);
            expect(ns[1]).toBe(25);
            expect(ns[2]).toBe(50);
            expect(ns[3]).toBe(75);
            expect(ns[4]).toBe(100);
        });
        it('calculates the N quantiles of an array when N is 100 (Percentiles)', function () {
            var a = carena.range(1, 100);
            var ns = carena.nTiles(a, 100);
            expect(ns.length).toBe(101);
            expect(ns[0]).toBe(1);
            for(var i=1;i<101;i++) {
                expect(ns[i]).toBe(i);
            }
        });
        it('Quartiles on a single element array', function () {
            var a = [10];
            var ns = carena.nTiles(a, 4);
            expect(ns.length).toBe(5);
            expect(ns[0]).toBe(10);
            expect(ns[1]).toBe(10);
            expect(ns[2]).toBe(10);
            expect(ns[3]).toBe(10);
            expect(ns[4]).toBe(10);
        });
        it('Quartiles on a reversed array', function () {
            var a = carena.range(1, 100).reverse();
            var ns = carena.nTiles(a, 4);
            expect(ns.length).toBe(5);
            expect(ns[0]).toBe(1);
            expect(ns[1]).toBe(25);
            expect(ns[2]).toBe(50);
            expect(ns[3]).toBe(75);
            expect(ns[4]).toBe(100);
        });
    });

    describe('tSeries', function () {
        it('Create an empty time series', function () {
            var ts = carena.tSeries();
            expect(ts.size).toBe(0);
        });
        it('Create an empty time series and add entries', function () {
            var ts = carena.tSeries();
            expect(ts.size).toBe(0);
            var now = new Date().valueOf();
            ts.set(now+1000, {d1: 'd1', d2: 'd2'}, {m1: 2, m2: 20});
            ts.set(now, {d1: 'd1', d2: 'd2'}, {m1: 1, m2: 10});
            expect(ts.size).toBe(2);

            var tstamps = ts.timeStamps;
            expect(tstamps.length).toBe(2);
            expect(tstamps[0]).toBe(now);
            expect(tstamps[1]).toBe(now+1000);
            expect(ts.data.length).toBe(1);
            // reset one entry
            ts.set(now, {d1: 'd1', d2: 'd2'}, {m1: 1, m2: 12});
            expect(ts.timeStamps.length).toBe(2);
            // add new group of dimensions
            ts.set(now, {d1: 'd1', d2: 'd22'}, {m1: 11, m2: 22});
            expect(ts.timeStamps.length).toBe(2);
            expect(ts.data.length).toBe(2);
        });
//        it('Projection', function () {
//            var ts = carena.tSeries();
//            expect(ts.size).toBe(0);
//            var now = new Date().valueOf();
//            ts.set(now, [{d1: 'd1'},{d2: 'd2'}], [{m1: 1}, {m2: 10}]);
//            ts.set(now+1000, [{d1: 'd1'},{d2: 'd2'}], [{m1: 2}, {m2: 20}]);
//            var ts2 = ts.project(['d1']);
//            expect(ts2.size).toBe(2);
//        });
    });
});