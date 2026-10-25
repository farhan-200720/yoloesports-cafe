'use client'; // This tells Next.js this is a frontend component
import { useState } from 'react';

export default function PaymentButton({ amount, passName }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Ask our backend to create a secure order
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount, passName: passName }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // 2. Configure the Razorpay Popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'YOLO Esports Cafe',
        description: passName,
        order_id: data.orderId,
        handler: function (response) {
          // 3. Payment Successful!
          alert('Payment Successful! ID: ' + response.razorpay_payment_id);
          
          // Redirect to WhatsApp with the Payment ID so you can verify it
          const message = `Hi, I just paid for the ${passName} (₹${amount}). My Payment ID is ${response.razorpay_payment_id}. Please confirm my slot!`;
          window.location.href = `https://wa.me/918169913338?text=${encodeURIComponent(message)}`;
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#8b5cf6', // Matches your YOLO Purple brand color!
        },
      };

      // 4. Open the popup
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      alert('Payment failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading}
      className="w-full text-center bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-bold py-3.5 rounded-full hover:shadow-[0_0_40px_rgba(217,70,239,0.3)] transition-all uppercase tracking-wider text-sm disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Pay & Book Now'}
    </button>
  );
}