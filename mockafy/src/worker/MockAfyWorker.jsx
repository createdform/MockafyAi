"use server";
import MockAfyClient from './MockAfyClient.jsx';


const MockAfyWorker = (run) => {
    return <MockAfyClient run={run} />
};

export default MockAfyWorker;
