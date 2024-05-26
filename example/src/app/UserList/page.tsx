"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {User} from '@/app/UserList/types';

const UserList = () => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        axios.get('/users') // Ensure this endpoint is correct
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Users</h1>
            <div style={styles.listContainer}>
                <ul style={styles.list}>
                    {data.map((user: User) => (
                        <Link href={`UserList/${user.id}`}>
                            <li key={user.id} style={styles.listItem}>
                                <div style={styles.userInfo}>
                                    <span style={styles.name}>{user.name.firstname} {user.name.lastname}</span>
                                    <span style={styles.email}>{user.email}</span>
                                    <span style={styles.username}>{user.username}</span>
                                </div>
                                <div style={styles.address}>
                                    <span>{user.address.street}, {user.address.city}, {user.address.zipcode}</span>
                                </div>
                                <div style={styles.phone}>{user.phone}</div>
                            </li>
                        </Link>

                    ))}
                </ul>
            </div>

        </div>
    );
}

export default UserList;

// Inline styles
const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: '20px',
    },
    title: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
    },
    listContainer: {
        height: '50vh',
        overflowY: 'scroll' as const
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
        maxWidth: '600px',
    },
    listItem: {
        backgroundColor: '#fff',
        margin: '10px 0',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start',
        color: '#555',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column' as const,
        marginBottom: '10px',
    },
    name: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    email: {
        fontSize: '0.9rem',
        color: '#666',
    },
    username: {
        fontSize: '0.9rem',
        color: '#666',
    },
    address: {
        fontSize: '0.9rem',
        color: '#666',
        marginBottom: '10px',
    },
    phone: {
        fontSize: '0.9rem',
        color: '#666',
    }
};
