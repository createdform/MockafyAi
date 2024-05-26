class Utility {
    async init() {
        const { default: chalk } = await import('chalk');
        const { default: inquirer } = await import('inquirer');
        const { default: ora } = await import('ora');
        const { default: cliSpinners } = await import('cli-spinners');
        this.ora = ora;
        this.cliSpinners = cliSpinners;
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
    askUserOpenAiPrompt() {
        return this.inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'prompt',
                    message: 'Enter business model i.e. library management system: ',
                }
            ])
            .then(answers => {
                if (answers.prompt) {
                    return answers.prompt
                }
                else {
                    return false
                }
            });
    }

    askUserOpenAiApiKey() {
        return this.inquirer
            .prompt([
                {
                    type: 'password',
                    name: 'apiKey',
                    message: 'Enter Open Ai API Key, key will not be stored: ',
                }
            ])
            .then(answers => {
                if (answers.apiKey) {
                    return answers.apiKey
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

    loadingSpinner() {
        return this.ora({
            text: 'Loading',
            spinner: this.cliSpinners.dots
        })
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
