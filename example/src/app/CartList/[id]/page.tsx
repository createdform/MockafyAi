"use client";

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {usePathname, useRouter} from 'next/navigation';
import Image from "next/image";
import {Cart} from '@/app/CartList/types';
import {Product} from '@/app/ProductList/types';
const CartShowPage = () => {
    const [cart, setProduct] = useState<Cart[] | null>(null);
    const router = useRouter();
    const pathname = usePathname(); // Get the current pathname
    const pathSegments = pathname.split('/'); // Split the path by '/'
    const userId = pathSegments[pathSegments.length - 1]; // Get the last segment

    useEffect(() => {
        // get last segment of url it is the id
        axios.get(`/users/${userId}/cart`) // Ensure this endpoint is correct
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId]);
    //
    if (!cart) {
        return <div>No cart data</div>;
    }

    return (
        <div style={styles.container}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div><button onClick={() => router.push(`/UserList/${userId}`)}>Back</button></div>
                <h1 style={styles.title}>Carts</h1>
            </div>
            {
                cart.map((product: Cart) => (
                    <div style={styles.userDetails}>
                        <div style={styles.userInfo}>
                            <h2 style={styles.sectionTitle}>Cart information</h2>
                            <p><strong>Cart created:</strong> {product.date}</p>
                            {
                                product.products.map((product: Product) => (
                                    <div>
                                        <p><strong>Product Name:</strong> {product.productId}</p>
                                        <p><strong>Qty: </strong>{product.quantity}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default CartShowPage;

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
