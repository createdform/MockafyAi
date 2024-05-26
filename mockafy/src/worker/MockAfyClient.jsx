"use client";
import {useEffect} from 'react';

const MockAfyClient = ({run}) => {
    useEffect(() => {
        if (!run) return;

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registration successful with scope:', registration.scope);

                    // Check if there's a waiting service worker
                    if (registration.waiting) {
                        updateReady(registration.waiting);
                        return;
                    }

                    // Track updates to the service worker
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed') {
                                updateReady(newWorker);
                            }
                        });
                    });
                })
                .catch(err => console.log('Service Worker registration failed:', err));

            let refreshing;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (refreshing) return;
                window.location.reload();
                refreshing = true;
            });
        }

        function updateReady(worker) {
            // Prompt the user to refresh the page
            if (confirm('New version available. Do you want to update?')) {
                worker.postMessage({ action: 'skipWaiting' });
            }
        }
    }, [run]);

    return <></>;
}

export default MockAfyClient;
