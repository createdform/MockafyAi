"use client";
import {useEffect} from 'react';

const MockAfyClient = ({run}) => {
    useEffect(() => {
        if (!run) return
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) =>
                console.log(
                    "Service Worker registration successful with scope: ",
                    registration.scope,
                ),
            )
            .catch((err) => console.log("Service Worker registration failed: ", err));
    }, []);

    return <></>;

}

export default MockAfyClient;
