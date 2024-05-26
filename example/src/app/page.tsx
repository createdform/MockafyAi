import React from 'react';
import styles from "./page.module.css";
import dynamic from 'next/dynamic';

const MockedBackEnd = dynamic<{run: boolean}>(() =>
    import('mockafy/src/worker/MockAfyWorker').then((mod) => mod.default), { ssr: false });

export default function Home() {
    const run = true;
    return (
        <main className={styles.main}>
            <h1>hello</h1>
            <MockedBackEnd run={run} />
        </main>
    );
}
