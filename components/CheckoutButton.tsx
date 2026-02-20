// components/CheckoutButton.tsx
'use client'; // Beritahu Next.js ini adalah komponen yang boleh berinteraksi

import { useState } from 'react';

// Tentukan jenis data (props) yang akan diterima oleh butang ini
interface CheckoutButtonProps {
    product: {
        name: string;
        price: number;
        description: string;
    };
}

export default function CheckoutButton({ product }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Panggil API yang kita buat di Langkah 1
            const response = await fetch('/api/create-bill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: product.name,
                    price: product.price,
                    description: product.description,
                }),
            });

            const data = await response.json();

            if (data.billCode) {
                // Jika berjaya dapat kod, bawa pelanggan ke halaman pembayaran Toyyibpay
                window.location.href = `https://dev.toyyibpay.com/${data.billCode}`;

                // tukar link di atas kepada: `https://toyyibpay.com/${data.billCode}`
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
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={`px-4 py-2 rounded-md font-medium text-white transition-colors duration-200 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#006600] hover:bg-[#004D00]'}`}
        >
            {loading ? 'Sila tunggu...' : 'Beli Sekarang'}
        </button>
    );
}