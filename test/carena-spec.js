'use strict';

define(['src/carena'], function (carena) {
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
            var a = carena.range(1, 1000);
            expect(Array.isArray(a)).toBeTruthy();
            expect(a.length).toBe(1000);
            for(var i = 0; i < 1000; i++) {
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
    });

    describe('Max', function () {
        it('Returns the minimum value of a numeric array', function () {
            var a = carena.range(1, 1000);
            var m = carena.max(a);
            expect(m).toBe(1000);
        });
    });

    describe('sum', function () {
        it('Sum of a numeric array', function () {
            var count = 1000;
            var a = carena.sum(carena.ones(count));
            expect(a).toBe(count);
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

        it('Arithmetic weighted mean of a numeric array', function () {
            var a = carena.range(1, 1000);
            var w = carena.times(2, carena.ones(1000));
            var m = carena.wMean(a, w);
            expect(m).toBe(1001);
        });
    });
});