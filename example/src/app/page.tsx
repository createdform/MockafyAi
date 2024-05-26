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
            <Image src="/HomeScreen.png" alt="Mockafy Cli" width='620' height='550' />
            <Description />
        </main>
    );
}
