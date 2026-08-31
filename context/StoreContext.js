'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cloth_store_cart');
      const savedWish = localStorage.getItem('cloth_store_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWish) setWishlist(JSON.parse(savedWish));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cloth_store_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('cloth_store_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const addToCart = (product, size = 'M', color = '#121212', qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += qty;
        return copy;
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    showToast(`Added "${product.name}" to bag`);
  };

  const updateQuantity = (id, size, color, delta) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id && i.selectedSize === size && i.selectedColor === color) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.id === id && i.selectedSize === size && i.selectedColor === color)
      )
    );
    showToast('Removed from bag');
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from favourites');
        return prev.filter((id) => id !== productId);
      }
      showToast('Saved to favourites');
      return [...prev, productId];
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        clearCart,
        cartTotal,
        cartCount,
        toastMessage
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}