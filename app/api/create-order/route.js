import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount } = body;

    // Initialize Razorpay INSIDE the function (not at the top!)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error('Razorpay Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}