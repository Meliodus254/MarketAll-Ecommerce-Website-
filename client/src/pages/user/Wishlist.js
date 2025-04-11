import React, { useState } from 'react';

const Wishlist = () => {
    // State to manage wishlist items
    const [wishlist, setWishlist] = useState([]);
    const [item, setItem] = useState('');

    // Handler to add a new item to the wishlist
    const addItem = () => {
        if (item.trim() === '') return; // Prevent empty items
        setWishlist([...wishlist, item]);
        setItem(''); // Clear the input
    };

    // Handler to remove an item from the wishlist
    const removeItem = (index) => {
        const updatedWishlist = wishlist.filter((_, i) => i !== index);
        setWishlist(updatedWishlist);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>My Wishlist</h1>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Add a new item"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    style={styles.input}
                />
                <button onClick={addItem} style={styles.addButton}>
                    Add
                </button>
            </div>
            <ul style={styles.list}>
                {wishlist.map((wish, index) => (
                    <li key={index} style={styles.listItem}>
                        <span>{wish}</span>
                        <button onClick={() => removeItem(index)} style={styles.removeButton}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        width: '300px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        fontSize: '24px',
        marginBottom: '16px',
    },
    inputContainer: {
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
    },
    input: {
        flex: 1,
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    addButton: {
        padding: '8px 16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px',
        borderBottom: '1px solid #ddd',
    },
    removeButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
    },
};

export default Wishlist;
