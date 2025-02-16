const { plugin } = require("postcss");

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-chrome-launcher'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        client: {
            jasmine: {},
            clearContext: false
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage'),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ],
            check: {
                global: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80
                }
            }
        },
        browsers:['ChromeHeadless'],
        singleRun: true,
        restartOnFileChanges: true
    });
}