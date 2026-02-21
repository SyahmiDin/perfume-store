// app/api/create-bill/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const body = await request.json();
    const { productName, price, description } = body;

    const priceInSen = Math.round(price * 100);

    // 1. LIMIT NAMA BIL (Maksimum 30 huruf - Syarat ketat Toyyibpay)
    let safeBillName = `Pesanan: ${productName}`;
    if (safeBillName.length > 30) {
      safeBillName = safeBillName.substring(0, 30);
    }

    // 2. LIMIT DESKRIPSI (Maksimum 100 huruf - Syarat ketat Toyyibpay)
    let safeDescription = description || 'Pembelian minyak wangi';
    if (safeDescription.length > 100) {
      safeDescription = safeDescription.substring(0, 97) + '...';
    }

    const formData = new URLSearchParams();
    formData.append('userSecretKey', process.env.TOYYIBPAY_SECRET_KEY!);
    formData.append('categoryCode', process.env.TOYYIBPAY_CATEGORY_CODE!);
    
    // Guna nama dan deskripsi yang dah diselamatkan tadi
    formData.append('billName', safeBillName);
    formData.append('billDescription', safeDescription);
    
    formData.append('billPriceSetting', '1');
    formData.append('billPayorInfo', '1');
    formData.append('billAmount', priceInSen.toString());
    formData.append('billReturnUrl', `${origin}/success`);
    formData.append('billExternalReferenceNo', Date.now().toString());
    formData.append('billTo', 'Pelanggan');
    formData.append('billEmail', 'pelanggan@example.com');
    formData.append('billPhone', '0123456789');

    // Hantar ke server dev.toyyibpay (Testing)
    const response = await fetch('https://dev.toyyibpay.com/index.php/api/createBill', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data && data[0] && data[0].BillCode) {
      return NextResponse.json({ billCode: data[0].BillCode });
    } else {
      // Jika ralat, tunjukkan sebab sebenar dari Toyyibpay di terminal VS Code
      console.error('Ralat dari server Toyyibpay:', data);
      throw new Error('Gagal mencipta bil Toyyibpay');
    }
  } catch (error) {
    console.error('Ralat API:', error);
    return NextResponse.json({ error: 'Ralat sistem pembayaran' }, { status: 500 });
  }
}