const Utility = require('./utility');
const fs = require('fs');
const path = require('path');
class DefaultDataModel {


    async init() {
        this.utility = new Utility();
        await this.utility.init();
        const { default: chalk } = await import('chalk');
        const { default: Table } = await import('cli-table3');
        this.chalk = chalk;
        this.table = Table;
    }


    model() {
        this.utility.outputMessage('This is first row of the default data model', 'white');
        this.utility.outputLineSpace(2);

        // Read demo data files into memory using fs
        const products = fs.readFileSync(path.join(__dirname, '../demo-data/products.json'), 'utf-8');
        const cart = fs.readFileSync(path.join(__dirname, '../demo-data/cart.json'), 'utf-8');
        const users = fs.readFileSync(path.join(__dirname, '../demo-data/users.json'), 'utf-8');

        // Parse the data into JSON
        const productsData = JSON.parse(products);
        const cartData = JSON.parse(cart);
        const usersData = JSON.parse(users);

        // Create a table for each data
        const usersTable = new this.table({
            head: ['ID', 'username', 'name', 'address', 'phone'],
        });

        const productsTable = new this.table({
            head: ['ID', 'Title', 'Price', 'Description', 'Category'],
            colWidths: [5, 30, 10, 30, 15]
        });

        const cartTable = new this.table({
            head: ['ID', 'User ID', 'Date', 'Products'],
            colWidths: [5, 10, 30, 50]
        });

        // Populate the tables with the first row of data
        usersTable.push([
            usersData[0].id,
            usersData[0].username,
            `${usersData[0].name.firstname} ${usersData[0].name.lastname}`,
            `${usersData[0].address.street}, ${usersData[0].address.city}, ${usersData[0].address.zipcode}`,
            usersData[0].phone
        ]);

        productsTable.push([
            productsData[0].id,
            productsData[0].title,
            productsData[0].price,
            productsData[0].description,
            productsData[0].category
        ]);

        cartTable.push([
            cartData[0].id,
            cartData[0].userId,
            cartData[0].date,
            cartData[0].products.map(product => `Product ID: ${product.productId}, Quantity: ${product.quantity}`).join('\n')
        ]);

        // Display the tables
        this.utility.outputMessage('Users', 'red');
        console.log(usersTable.toString());
        this.utility.outputMessage('Products', 'blue');
        console.log(productsTable.toString());
        this.utility.outputMessage('Cart', 'green');
        console.log(cartTable.toString());
        this.utility.outputLineSpace();
    }

}

module.exports = DefaultDataModel;
