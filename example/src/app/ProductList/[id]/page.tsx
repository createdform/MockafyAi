"use client";

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {usePathname, useRouter} from 'next/navigation';
import {Product} from '@/app/ProductList/types';
import Image from "next/image";
const ProductShowPage = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();
    const pathname = usePathname(); // Get the current pathname
    const pathSegments = pathname.split('/'); // Split the path by '/'
    const userId = pathSegments[pathSegments.length - 1]; // Get the last segment

    useEffect(() => {
        // get last segment of url it is the id
        axios.get(`/products/${userId}`) // Ensure this endpoint is correct
            .then((response) => {
                setProduct(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId]);
        //
    if (!product) {
        return <div>No product data</div>;
    }

    return (
        <div style={styles.container}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div><button onClick={() => router.push('/ProductList')}>Back</button></div>
                <h1 style={styles.title}>Product details</h1>
            </div>
            <div style={styles.userDetails}>
                <div style={styles.userInfo}>
                    <h2 style={styles.sectionTitle}>Product information</h2>
                    <p><strong>Name:</strong> {product.title}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p> <Image src={product.image} alt={product.title} height={80} width={80} /></p>

                </div>
            </div>
        </div>
    );
}

export default ProductShowPage;

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
    },
    addressInfo: {
        marginBottom: '20px',
    },
    geolocation: {
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        color: '#555',
        marginBottom: '10px',
    }
};
