'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, Product } from '../lib/types';

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variantLabel?: string) => void;
  removeItem: (productId: string, variantLabel?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantLabel?: string) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'fiora_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (product: Product, quantity = 1, variantLabel = '') => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && (item.variantLabel || '') === variantLabel);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && (item.variantLabel || '') === variantLabel
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, variantLabel }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, variantLabel = '') => {
    setItems((prev) => prev.filter((item) => !(item.id === productId && (item.variantLabel || '') === variantLabel)));
  };

  const updateQuantity = (productId: string, quantity: number, variantLabel = '') => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === productId && (item.variantLabel || '') === variantLabel
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
        itemCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return ctx;
}
