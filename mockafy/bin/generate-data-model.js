const Utility = require('./utility');
const fs = require('fs');
const path = require('path');

class GenerateDataModel {
    apiKey = '';
    prompt = '';

    constructor() {
        this.init();
    }

    async init() {
        this.utility = new Utility();
        const { default: openai } = await import('openai');
        await this.utility.init();
        this.openai = openai;
    }

    model() {
        this.utility.askUserOpenAiApiKey().then((apiKey) => {
            if (apiKey) {
                this.apiKey = apiKey;
                this.seedPrompt();
            } else {
                this.utility.outputMessage('No API key provided, exiting...', 'red');
                process.exit(1);
            }
        });
    }

    seedPrompt() {
        this.utility.askUserOpenAiPrompt().then((prompt) => {
            if (prompt) {
                this.prompt = prompt;
                this.generateMockData().then(() => {
                    this.utility.outputMessage('Mock data generated successfully!', 'green');
                    process.exit(0);
                })
            } else {
                this.utility.outputMessage('No prompt provided, exiting...', 'red');
                process.exit(1);
            }
        });
    }

    async generateMockData() {
        // Read the existing files
        const products = fs.readFileSync(path.join(__dirname, '../demo-data/products.json'), 'utf-8');
        const cart = fs.readFileSync(path.join(__dirname, '../demo-data/cart.json'), 'utf-8');
        const users = fs.readFileSync(path.join(__dirname, '../demo-data/users.json'), 'utf-8');

        // Initialize OpenAI client
        const ai = new this.openai({
            apiKey: this.apiKey
        });

        // Create the prompt
        const textPrompt = `
        Generate mock data that matches the uploaded file data structure for a business model of a ${this.prompt}.
        - Users: ${users}
        - Products: ${products}
        - Cart: ${cart}
          the data needs to match the business model, for example, if the business model is an event management system,
          users are attendees with each record having an id, and the id in bookings becomes attendeeId.
          The products need to match the business model description as well, so for events the products could be types of tickets.
          change the name of each entity to match the business model of a ${this.prompt} return as json formatted data 
          that can be parsed immediately and called by my code
        `;

        // Call OpenAI API
        try {
            this.utility.loadingSpinner().start();
            const response = await ai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: textPrompt }]
            });

            const generatedData = response.choices[0].message.content;
            // Parse the generated data and write to files
            const data = JSON.parse(generatedData);
            const demoDataDir = path.join(__dirname, '../generated-data');
            if (!fs.existsSync(demoDataDir)) {
                fs.mkdirSync(demoDataDir);
            }
            const entities = []
            for (const [entity, content] of Object.entries(data)) {
                entities.push(entity);
                fs.writeFileSync(path.join(demoDataDir, `${entity}.json`), JSON.stringify(content, null, 2));
            }
            this.utility.generateServiceWorker(entities);
            this.utility.loadingSpinner().stop();
        } catch (error) {
            this.utility.loadingSpinner().stop();
            console.error('Error generating mock data:', error);
        }
    }
}



module.exports =  GenerateDataModel;
