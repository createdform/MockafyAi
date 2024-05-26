class Utility {
    async init() {
        const { default: chalk } = await import('chalk');
        const { default: inquirer } = await import('inquirer');
        this.inquirer = inquirer;
        this.chalk = chalk;
    }

    welcome() {
        const welcomeMessage = `
            ███    ███  ██████   ██████ ██   ██  █████  ███████ ██    ██      ██████ ██      ██ 
            ████  ████ ██    ██ ██      ██  ██  ██   ██ ██       ██  ██      ██      ██      ██ 
            ██ ████ ██ ██    ██ ██      █████   ███████ █████     ████       ██      ██      ██ 
            ██  ██  ██ ██    ██ ██      ██  ██  ██   ██ ██         ██        ██      ██      ██ 
            ██      ██  ██████   ██████ ██   ██ ██   ██ ██         ██         ██████ ███████ ██                                                                                                                                               
        `;


        this.outputMessage(welcomeMessage, 'green');
        this.outputLineSpace(2);
        this.outputMessage('Generate mock data files and service worker for your project', 'red');
        this.outputLineSpace(2);
    }


    askUserOpenAiKeys() {
        this.inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'apiKeys',
                    message: 'Are you happy with the default data model? / if no we can use AI to generate some mock data',
                    default: true
                }
            ])
            .then(answers => {
                if (answers.generateMockData) {
                    return true
                }
                else {
                    return false
                }
            });
        this.outputLineSpace(4)
    }

    askUserIfHappyWithDefault() {
       return this.inquirer
            .prompt([
                {
                    type: 'confirm',
                    name: 'generateMockData',
                    message: 'Are you happy with the default data model? / if no we can use AI to generate some mock data',
                    default: true
                }
            ])
            .then(answers => {
                if (answers.generateMockData) {
                    return true
                }
                else {
                    return false
                }
            });
    }

    outputMessage(message, colour) {
        console.log(this.chalk[colour](message));
    }

    outputLineSpace(lines = 1) {
        for (let i = 0; i < lines; i++) {
            console.log();
        }
    }
}

module.exports = Utility;
