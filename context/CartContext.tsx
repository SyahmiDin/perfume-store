// context/CartContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Format data produk dan troli
export interface Product {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string | number) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fungsi tambah ke troli
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Jika produk dah ada, tambah kuantiti
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Jika produk belum ada, masukkan sebagai produk baharu
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} telah ditambah ke troli!`); // Notifikasi ringkas
  };

  // Fungsi buang dari troli
  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Kira jumlah kuantiti dan jumlah harga
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Fungsi pantas untuk komponen lain panggil data troli
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart mesti digunakan di dalam CartProvider');
  return context;
};