// app/success/page.tsx
import Link from 'next/link';

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">

                {/* Ikon Tick Berjaya */}
                <div className="w-20 h-20 bg-[#E6F0E6] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-[#006600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">Pembayaran Berjaya!</h1>
                <p className="text-gray-600 mb-8">
                    Terima kasih! Bayaran anda telah diterima. Pesanan minyak wangi anda sedang diproses dan akan dihantar tidak lama lagi.
                </p>

                {/* Butang kembali ke Home */}
                <Link
                    href="/"
                    className="bg-[#006600] text-white px-6 py-3 rounded-md hover:bg-[#004D00] transition-colors duration-200 font-medium inline-block w-full"
                >
                    Kembali ke Halaman Utama
                </Link>
            </div>
        </main>
    );
}