#!/usr/bin/env node

const fs = require('fs');
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
        await this.utility.init();
        await this.defaultDataModel.init();
        await this.generateDataModel.init();
        this.welcome();
    }

    welcome() {
        this.utility.welcome();
        this.defaultDataModel.model();
        this.utility.outputLineSpace(2);
        this.utility.askUserIfHappyWithDefault().then((result) => {
            if (result) {
                this.copyDefaultData()
                this.copyServiceWorker()
            } else {
                this.generateDataModel.model()
            }
        })

        // if (response) {
        //     this.copyDefaultData()
        // } else {
        //     this.generateDataModel.model()
        // }
        // this.askUserIfHappyWithDefault();
        // this.copyDemoData()
        // this.copyServiceWorker();
    }

    // askUserIfHappyWithDefault() {
    //     this.inquirer
    //         .prompt([
    //             {
    //                 type: 'confirm',
    //                 name: 'generateMockData',
    //                 message: 'Are you happy with the default data model? / if no we can use AI to generate some mock data',
    //                 default: true
    //             }
    //         ])
    //         .then(answers => {
    //             if (answers.generateMockData) {
    //                 this.copyDefaultData()
    //             }
    //             else {
    //                 this.generateMockData()
    //             }
    //         });
    //     this.utility.outputLineSpace(4)
    // }



    copyDefaultData() {
        this.copyFiles('../demo-data/products.json', 'public/demo-data/products.json', 'Products copied successfully');
        this.copyFiles('../demo-data/cart.json', 'public/demo-data/cart.json', 'Cart copied successfully');
        this.copyFiles('../demo-data/users.json', 'public/demo-data/users.json', 'Users copied successfully');
    }

    copyServiceWorker() {
        this.copyFiles('../dist/service-worker.js', 'public/service-worker.js', 'Service Worker copied successfully');
    }

    copyFiles(sourcePath, destinationPath, message) {
        const source = path.join(__dirname, sourcePath);
        const destination = path.join(process.cwd(), destinationPath);
        if (!fs.existsSync(path.dirname(destination))) {
            fs.mkdirSync(path.dirname(destination), { recursive: true });
        }
        fs.copyFileSync(source, destination);
        console.log(message);
    }
}

new MockAfyCLI();
