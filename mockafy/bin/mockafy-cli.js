#!/usr/bin/env node

const path = require('path');
const Utility = require('./utility');
const DefaultDataModel = require('./default-data-model');
const GenerateDataModel = require('./generate-data-model');

class MockAfyCLI {
    routePrefix = '';

    constructor() {
        this.init();
    }

    async init() {
        this.utility = new Utility();
        this.defaultDataModel = new DefaultDataModel();
        this.generateDataModel = new GenerateDataModel();

        // Dynamically import fs-extra
        const { default: fs } = await import('fs-extra');

        await this.utility.init();
        await this.defaultDataModel.init();
        await this.generateDataModel.init();
        this.fs = fs;  // Store fs-extra in this instance
        this.welcome()
    }

    welcome() {
        this.utility.welcome();
        this.defaultDataModel.model();
        this.utility.outputLineSpace(2);
        this.utility.askUserIfHappyWithDefault().then((result) => {
            if (result) {
                this.copyDefaultData();
                this.copyServiceWorker();
            } else {
                this.generateDataModel.model();
                this.copyGeneratedData();
            }
        });
    }

    // Copy the entire folder structure for default data
    copyDefaultData() {
        this.copyDirectory('../demo-data', 'public/demo-data', 'Default data copied successfully');
    }

    // Copy the entire folder structure for generated data
    copyGeneratedData() {
        this.copyDirectory('../generated-data', 'public/demo-data', 'Generated data copied successfully');
    }

    copyServiceWorker() {
        this.copyFiles('../dist/service-worker.js', 'public/service-worker.js', 'Service Worker copied successfully');
    }

    copyFiles(sourcePath, destinationPath, message) {
        const source = path.join(__dirname, sourcePath);
        const destination = path.join(process.cwd(), destinationPath);
        this.fs.copyFileSync(source, destination);
        console.log(message);
    }

    copyDirectory(sourcePath, destinationPath, message) {
        const source = path.join(__dirname, sourcePath);
        const destination = path.join(process.cwd(), destinationPath);
        this.fs.copySync(source, destination, { overwrite: true });
        console.log(message);
    }
}

new MockAfyCLI();
