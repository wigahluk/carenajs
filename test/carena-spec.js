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
});