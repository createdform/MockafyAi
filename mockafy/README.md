# MockafyAi

#### Current supports NEXT.js, this could very easily be extended to other js frameworks.

### What does it do?

Standup a backend without actually running a server!

This tool will create a service worker that will act as a backend for your frontend application. This will allow you to quickly mock out a backend for your frontend application.

### Why would I want that?

If you are a frontend focused developer wanting to build a demo site for to sell a customer on your proposal or if you're a building a portfolio website where you would prefer to show off your front end prowess and not have to worry about standing up a server.

### Who is this for?

This is for developers hoping to quickly mock out a backend, without standing up a server.

### How does it work?

This tool uses a very basic nested router to create a mocked backend. You can define your data model in a json file and then run the tool to create a mocked backend.


### How do I use it?

Using yarn

```Bash
 yarn add mockafy 
```

Using npm

```Bash
 npm install mockafy
```

This will move the necessary files for the service worker (mocked backend) to work as well as the mocked data files into your public directory.

You will then need to add the service worker to the entrypoint to your application. This is usually in the pages/_app.js file in a next.js project.

```Javascript
import React from 'react';
import styles from "./page.module.css";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Description from '@/app/_components/Description';

const MockedBackEnd = dynamic<{run: boolean}>(() =>
    import('mockafy/src/worker/MockAfyWorker').then((mod) => mod.default), { ssr: false });



export default function Home() {
    const run = true;
    return (
        <main className={styles.main}>
            <MockedBackEnd run={run} />
        </main>
    );
}

```

Once included you will need to run the included MockafyAi CLI

```Bash
npx mockafy
```

This will run the CLI tool you can use the e-commerce store that comes with the example project or you can create your own data through GPT-3.5 turbo (included as part of the cli).

![https://github.com/createdform/MockafyAi/blob/main/mockafy/..%2Fexample%2Fpublic%2FHomeScreen.png](..%2Fexample%2Fpublic%2FHomeScreen.png)

### Example

There is an example next.js project in the example folder.

### Batteries included data model

Don't want to use AI on this? That's fine. I won't judge you.
You can either manually create your json files in a similar sort of structure, or
there is a demo data model included for a basic ecommerce store. This includes:

- Users
- Products
- Cart

Where users can have many carts and products can be in many carts.

### Limitations

- This currently produces a readonly api for finding a piece of data by id, listing data and getting relational data. This project has a very crude nested router implementation, so feel free to submit a pull request to make it less crude :) 

