'use client';
import { supabase } from '@/lib/supabase';

export default function PaymentButton({ amount, passName }) {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // 1. Load Razorpay
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // 2. Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      alert("Please log in to your YOLO account to earn Loyalty Points!");
      window.location.href = '/login';
      return;
    }

    // 3. Create Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100, // Razorpay expects amount in paise (cents)
      currency: 'INR',
      name: 'YOLO Esports Cafe',
      description: passName,
      handler: async function (response) {
        // 4. Payment successful - now add loyalty points
        try {
          const res = await fetch('/api/add-points', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              amount: amount, 
              token: session.access_token,
              paymentId: response.razorpay_payment_id
            })
          });
          
          const data = await res.json();
          
          if (data.success) {
            const pointsEarned = Math.floor(amount / 10);
            alert(`✅ Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}\n\nYou earned ${pointsEarned} Loyalty Points!\nYour new balance: ${data.newPoints} points.`);
          } else {
            alert(`✅ Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}\n\n(Points update failed, but payment received!)`);
          }
        } catch (error) {
          console.error("Points update failed", error);
          alert(`✅ Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}`);
        }

        // 5. Open WhatsApp to confirm the slot
        const message = `Hi YOLO Esports! I just completed the payment for the ${passName} (₹${amount}). My Payment ID is ${response.razorpay_payment_id}. Please confirm my slot!`;
        window.open(`https://wa.me/918169913338?text=${encodeURIComponent(message)}`, '_blank');
      },
      prefill: {
        name: session.user.email?.split('@')[0] || 'Gamer',
        email: session.user.email || '',
        contact: ''
      },
      theme: {
        color: '#8b5cf6'
      }
    };

    // 6. Open Razorpay payment modal
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button 
      onClick={handlePayment}
      className="btn-shine w-full bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-bold py-3 rounded-xl uppercase tracking-wider hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
    >
      Pay Now
    </button>
  );
}