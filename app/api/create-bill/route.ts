// app/api/create-bill/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const body = await request.json();
    
    // KITA TAMBAH 3 MAKLUMAT BAHARU DI SINI: customerName, customerEmail, customerPhone
    const { productName, price, description, customerName, customerEmail, customerPhone } = body;

    const priceInSen = Math.round(price * 100);

    let safeBillName = `Pesanan: ${productName}`;
    if (safeBillName.length > 30) {
      safeBillName = safeBillName.substring(0, 30);
    }

    let safeDescription = description || 'Pembelian minyak wangi';
    if (safeDescription.length > 100) {
      safeDescription = safeDescription.substring(0, 97) + '...';
    }

    const formData = new URLSearchParams();
    formData.append('userSecretKey', process.env.TOYYIBPAY_SECRET_KEY!);
    formData.append('categoryCode', process.env.TOYYIBPAY_CATEGORY_CODE!);
    formData.append('billName', safeBillName);
    formData.append('billDescription', safeDescription);
    formData.append('billPriceSetting', '1');
    formData.append('billPayorInfo', '1');
    formData.append('billAmount', priceInSen.toString());
    formData.append('billReturnUrl', `${origin}/success`);
    formData.append('billExternalReferenceNo', Date.now().toString());
    
    // MASUKKAN MAKLUMAT PELANGGAN KE DALAM TOYYIBPAY
    formData.append('billTo', customerName || 'Pelanggan');
    formData.append('billEmail', customerEmail || 'tiada@email.com');
    formData.append('billPhone', customerPhone || '0000000000');

    const response = await fetch('https://dev.toyyibpay.com/index.php/api/createBill', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data && data[0] && data[0].BillCode) {
      return NextResponse.json({ billCode: data[0].BillCode });
    } else {
      console.error('Ralat dari server Toyyibpay:', data);
      throw new Error('Gagal mencipta bil Toyyibpay');
    }
  } catch (error) {
    console.error('Ralat API:', error);
    return NextResponse.json({ error: 'Ralat sistem pembayaran' }, { status: 500 });
  }
}