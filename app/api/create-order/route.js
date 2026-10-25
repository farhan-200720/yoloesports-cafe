import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

// This connects to Razorpay using the secret keys we just saved
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    // Get the amount and name sent from the website
    const { amount, passName } = await request.json();

    // Tell Razorpay to create an order
    const options = {
      amount: amount * 100, // Razorpay wants the amount in 'paise' (so 80 rupees becomes 8000)
      currency: 'INR',
      receipt: `yolo_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Send the order ID back to the website
    return NextResponse.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency 
    });

  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}