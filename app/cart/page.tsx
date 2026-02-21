// app/cart/page.tsx
'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  // Fungsi memproses bayaran pukal
  const handleBulkCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    
    try {
      // Gabungkan nama semua barang untuk deskripsi bil Toyyibpay (Contoh: "Oud Al-Layl (x2), Citrus (x1)")
      const productNames = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');

      // Panggil API pencipta bil yang kita bina sebelum ini
      const response = await fetch('/api/create-bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Pesanan Troli Minyak Wangi',
          price: cartTotal,
          description: productNames,
        }),
      });

      const data = await response.json();

      if (data.billCode) {
        window.location.href = `https://dev.toyyibpay.com/${data.billCode}`;
      } else {
        alert('Gagal menjana pautan pembayaran.');
      }
    } catch (error) {
      console.error(error);
      alert('Berlaku ralat sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Troli Membeli-belah</h1>

        {cart.length === 0 ? (
          // Paparan jika troli kosong
          <div className="bg-white p-10 rounded-xl shadow-sm text-center border border-gray-100">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <p className="text-gray-500 mb-6 text-lg">Troli anda masih kosong.</p>
            <Link href="/" className="inline-block bg-[#003300] text-white px-6 py-3 rounded-md hover:bg-[#002200] font-medium transition-colors">
              Teruskan Membeli-belah
            </Link>
          </div>
        ) : (
          // Paparan jika ada barang dalam troli
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Senarai Barang (Kiri) */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Harga: RM {item.price.toFixed(2)}</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">Kuantiti: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#003300] mb-2">RM {(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Buang
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan Bayaran (Kanan) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-3 mb-6 text-gray-600">
                <div className="flex justify-between">
                  <span>Jumlah Kasar:</span>
                  <span>RM {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Penghantaran:</span>
                  <span className="text-green-600 font-medium">Percuma</span>
                </div>
                <hr className="my-2 border-gray-200" />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Jumlah Keseluruhan:</span>
                  <span className="text-[#003300]">RM {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleBulkCheckout}
                disabled={loading}
                className={`w-full py-3 rounded-md font-medium text-white transition-colors duration-200 
                  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#003300] hover:bg-[#002200]'}`}
              >
                {loading ? 'Menyediakan Bil...' : 'Teruskan Pembayaran'}
              </button>
              
              <Link href="/" className="block text-center mt-4 text-sm text-[#003300] hover:underline">
                Tambah barang lain
              </Link>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}