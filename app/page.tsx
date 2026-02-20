// app/page.tsx
import { supabase } from '../lib/supabase'; // Memanggil "jambatan" Supabase yang kita buat tadi
import CheckoutButton from '../components/CheckoutButton'; // Tambah baris ini

// Fungsi ini akan mengambil data dari jadual 'products' di Supabase
async function getProducts() {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Ralat mengambil data:', error);
    return [];
  }

  return data;
}

export default async function Home() {
  const products = await getProducts(); // Jalankan fungsi ambil data

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Bahagian Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Katalog Perfume Mewah</h1>
          <p className="text-gray-600">Pilih wangian kegemaran anda dari koleksi eksklusif kami.</p>
        </header>

        {/* Bahagian Paparan Produk (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Gambar Produk */}
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              {/* Maklumat Produk */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-[#006600]">RM {product.price.toFixed(2)}</span>
                  <CheckoutButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Jika tiada produk dijumpai */}
        {products.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            Tiada produk dijumpai buat masa ini.
          </div>
        )}

      </div>
    </main>
  );
}