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
});