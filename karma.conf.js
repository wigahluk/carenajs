module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/*.js'
        ],
        exclude: [],

        // possible values: 'dots', 'progress'
        reporters: ['progress'],
        port: 8080,
        runnerPort: 9100,
        autoWatch: false,
        browser: ['PhantomJS'],
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        captureTimeout: 15000,
        singleRun: true
    });
};