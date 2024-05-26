"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Product} from '@/app/ProductList/types';



const ProductList = () => {
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('/products') // Ensure this endpoint is correct
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Products</h1>
            <div style={styles.listContainer}>
                <ul style={styles.list}>
                    {data.map((product: Product) => (
                        <Link href={`ProductList/${product.id}`}>
                            <li key={product.id} style={styles.listItem}>
                                <div style={styles.userInfo}>
                                    <span style={styles.name}>{product.title}</span>
                                    <span style={styles.email}>${product.price}</span>
                                    <Image src={product.image} alt={product.title} width={100} height={100}/>
                                    <span style={styles.username}>{product.description}</span>
                                </div>
                            </li>
                        </Link>

                    ))}
                </ul>
            </div>

        </div>
    );
}

export default ProductList;

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
