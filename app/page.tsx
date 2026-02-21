// app/page.tsx
import { supabase } from '../lib/supabase';
import AddToCartButton from '../components/AddToCartButton';
import HeroCarousel from '../components/HeroCarousel'; 

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
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      
      <div className="w-full">
        {/* Hero Carousel kekal penuh dari hujung ke hujung */}
        <HeroCarousel />

        {/* Ruangan Katalog Produk: Padding lebih kecil di mobile (px-3) supaya tidak bazir ruang */}
        <div className="max-w-7xl mx-auto w-full px-3 md:px-8 py-8 mt-4 md:mt-8">
          
          {/* Bahagian Tajuk Katalog */}
          <div className="mb-8 md:mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Katalog Perfume Mewah</h2>
            {/* Tukar ke warna tema #003300 */}
            <div className="w-24 h-1 bg-[#003300] mx-auto mb-4 rounded-full"></div>
            <p className="text-sm md:text-base text-gray-600">Pilih wangian kegemaran anda dari senarai di bawah.</p>
          </div>

          {/* Bahagian Paparan Produk (Grid ala Shopee) */}
          {/* grid-cols-2 untuk mobile, gap-3 (jarak kecil sikit di mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Bekas gambar menggunakan aspect-square supaya seragam */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Bahagian Info: Padding responsif (p-3 untuk mobile, p-5 untuk desktop) */}
                <div className="p-3 md:p-5 flex flex-col flex-grow">
                  <h2 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 line-clamp-2 leading-snug">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4 line-clamp-1 md:line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  
                  {/* Bahagian Harga & Butang */}
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-50">
                    {/* Warna tema #003300 */}
                    <span className="text-base md:text-xl font-bold text-[#003300]">
                      RM {product.price.toFixed(2)}
                    </span>
                    <div className="w-full xl:w-auto">
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Jika tiada produk dijumpai */}
          {products.length === 0 && (
            <div className="text-center text-gray-500 mt-16 p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
              Tiada produk dijumpai buat masa ini.
            </div>
          )}

        </div>
      </div>

      {/* Bahagian Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-[#001a00] pt-8 pb-8 text-center">
        <p className="text-gray-50 text-sm">
          &copy; {new Date().getFullYear()} Muaz Perfume. Hak Cipta Terpelihara.
        </p>
      </footer>
    </main>
  );
}