// components/AddToCartButton.tsx
'use client';

import { useCart, Product } from '../context/CartContext';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-[#003300] text-white px-4 py-2 rounded-md hover:bg-[#002200] hover:cursor-pointer transition-colors duration-200 text-sm md:text-base font-medium"
    >
      +
    </button>
  );
}