// app/api/create-bill/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Ambil maklumat produk yang dihantar dari butang 'Beli Sekarang'
    const body = await request.json();
    const { productName, price, description } = body;
    // Dapatkan pautan web semasa (localhost atau Netlify)
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Toyyibpay memerlukan format harga dalam unit Sen (RM1 = 100 sen)
    const priceInSen = Math.round(price * 100);

    // Sediakan borang data untuk dihantar ke Toyyibpay
    const formData = new URLSearchParams();
    formData.append('userSecretKey', process.env.TOYYIBPAY_SECRET_KEY!);
    formData.append('categoryCode', process.env.TOYYIBPAY_CATEGORY_CODE!);
    formData.append('billName', `Pembelian ${productName}`);
    formData.append('billDescription', description || 'Pembelian dari Perfume Store');
    formData.append('billPriceSetting', '1'); // 1 = Harga tetap
    formData.append('billPayorInfo', '1'); // 1 = Pelanggan kena isi nama/email di toyyibpay
    formData.append('billAmount', priceInSen.toString());
    formData.append('billReturnUrl', `${origin}/success`); // Halaman selepas bayar
    formData.append('billExternalReferenceNo', Date.now().toString()); // Nombor rujukan unik
    formData.append('billTo', 'Pelanggan');
    formData.append('billEmail', 'pelanggan@example.com');
    formData.append('billPhone', '0123456789');

    // Hantar request ke Toyyibpay
    const response = await fetch('https://dev.toyyibpay.com/index.php/api/createBill', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // Jika berjaya, Toyyibpay akan pulangkan BillCode
    if (data && data[0] && data[0].BillCode) {
      return NextResponse.json({ billCode: data[0].BillCode });
    } else {
      throw new Error('Gagal mencipta bil Toyyibpay');
    }
  } catch (error) {
    console.error('Ralat Toyyibpay:', error);
    return NextResponse.json({ error: 'Ralat sistem pembayaran' }, { status: 500 });
  }
}