"use client";

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {usePathname, useRouter} from 'next/navigation';
import {User} from '@/app/UserList/types';



const UserShowPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const pathname = usePathname(); // Get the current pathname
    const pathSegments = pathname.split('/'); // Split the path by '/'
    const userId = pathSegments[pathSegments.length - 1]; // Get the last segment

    useEffect(() => {
        // get last segment of url it is the id
        axios.get(`/users/${userId}`) // Ensure this endpoint is correct
            .then((response) => {
                setUser(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId]);
        //
    if (!user) {
        return <div>No user data</div>;
    }

    return (
        <div style={styles.container}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div><button onClick={() => router.push('/UserList')}>Back</button></div>
                <h1 style={styles.title}>User Details</h1>
            </div>
            <div style={styles.userDetails}>
                <div style={styles.userInfo}>
                    <h2 style={styles.sectionTitle}>Personal Information</h2>
                    <p><strong>Name:</strong> {user.name.firstname} {user.name.lastname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                </div>
                <div style={styles.addressInfo}>
                    <h2 style={styles.sectionTitle}>Address</h2>
                    <p>{user.address.number} {user.address.street}</p>
                    <p>{user.address.city}, {user.address.zipcode}</p>
                </div>
                <div style={styles.geolocation}>
                    <h2 style={styles.sectionTitle}>Geolocation</h2>
                    <p><strong>Latitude:</strong> {user.address.geolocation.lat}</p>
                    <p><strong>Longitude:</strong> {user.address.geolocation.long}</p>
                    <div>
                        See cart <div>
                        <button onClick={() => router.push(`/CartList/${userId}`)}>Cart</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserShowPage;

// Inline styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
    },
    title: {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '20px',
    },
    userDetails: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'flex-start',
    },
    userInfo: {
        marginBottom: '20px',
        color: '#333',
    },
    addressInfo: {
        marginBottom: '20px',
        color: '#333',
    },
    geolocation: {
        marginBottom: '20px',
        color: '#333',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        color: '#555',
        marginBottom: '10px',
    }
};
