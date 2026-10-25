'use client';
import { useEffect } from 'react';
import PaymentButton from "@/components/PaymentButton";

export default function Home() {
  
  // Smooth scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#050508] text-white min-h-screen overflow-x-hidden font-sans">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex-shrink-0 w-28 h-10 flex items-center">
              <img 
                src="/images/yolo-logo.png" 
                alt="YOLO Esports Cafe" 
                className="w-full h-full object-contain"
                style={{ maxWidth: '112px', maxHeight: '40px' }}
              />
            </a>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-xs font-semibold uppercase text-gray-400 hover:text-white transition-colors tracking-wider">Home</a>
              <a href="#arena" className="text-xs font-semibold uppercase text-gray-400 hover:text-white transition-colors tracking-wider">Arena</a>
              <a href="#gallery" className="text-xs font-semibold uppercase text-gray-400 hover:text-white transition-colors tracking-wider">Gallery</a>
              <a href="#pricing" className="text-xs font-semibold uppercase text-gray-400 hover:text-white transition-colors tracking-wider">Pricing</a>
   <a href="#shop" className="text-xs font-semibold uppercase text-gray-400 hover:text-white transition-colors tracking-wider">Shop</a>
              <a href="#contact" className="text-xs font-semibold uppercase text-gray-400 hover:text-white transition-colors tracking-wider">Contact</a>
            </div>
            <a href="#pricing" className="hidden md:block btn-shine bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-bold py-2 px-5 rounded-full uppercase tracking-wider text-[10px]">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* NEW HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0a12]"></div>
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          ></div>
          {/* Center Purple Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6]/20 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto reveal">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white font-semibold tracking-wider text-xs uppercase">Now Live in Seawoods • Open 24/7</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-black text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] tracking-tight">
            <span className="block text-white">Navi Mumbai's</span>
            <span className="block bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Ultimate Arena.</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience zero lag and pure adrenaline. High-performance RTX 4060 rigs, 360Hz displays, and luxury PS5 lounges engineered for the elite gamer.
          </p>
          
          {/* Two Buttons Side by Side */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#pricing" className="btn-shine flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold py-4 px-8 rounded-xl transition-all uppercase tracking-wider text-sm">
              <i className="fab fa-whatsapp text-lg"></i> Pay Now
            </a>
            <a href="#pricing" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all uppercase tracking-wider text-sm">
              View Pricing <span className="text-lg">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* MOVING GAMES MARQUEE */}
      <div className="w-full bg-[#08080c] border-y border-white/5 py-5 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {["CS2", "DOTA 2", "APEX LEGENDS", "LEAGUE OF LEGENDS", "GTA V / FIVEM", "EA FC 26", "CALL OF DUTY", "VALORANT"].map((game, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-500 hover:text-[#d946ef] transition-all duration-300 cursor-pointer group">
                  <span className="text-[#8b5cf6] text-lg group-hover:scale-125 transition-transform"></span>
                  <span className="font-bold text-xs md:text-sm tracking-[0.2em] uppercase">{game}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Premium Fade Edges */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#08080c] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#08080c] to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* GAMING ARENA */}
      <section id="arena" className="py-24 bg-[#050508] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-[#8b5cf6] font-bold tracking-widest text-xs uppercase mb-2 block">Infrastructure</span>
            <h2 className="font-black text-4xl md:text-6xl uppercase">The Gaming <span className="text-gradient">Arena</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="reveal glass glass-hover p-8 rounded-2xl">
              <h3 className="font-bold text-2xl text-white mb-6 uppercase flex items-center gap-3">
                <span className="text-3xl">️</span> Elite 360Hz Rigs
              </h3>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li className="flex items-center gap-3"><span className="text-[#8b5cf6]">▸</span> AMD Ryzen 5 7600X</li>
                <li className="flex items-center gap-3"><span className="text-[#8b5cf6]">▸</span> NVIDIA RTX 4060</li>
                <li className="flex items-center gap-3"><span className="text-[#8b5cf6]">▸</span> 360Hz AOC Monitor</li>
                <li className="flex items-center gap-3"><span className="text-[#8b5cf6]"></span> Pro Mechanical Gear</li>
              </ul>
            </div>

            <div className="reveal glass glass-hover p-8 rounded-2xl" style={{transitionDelay: '0.1s'}}>
              <h3 className="font-bold text-2xl text-white mb-6 uppercase flex items-center gap-3">
                <span className="text-3xl">🎮</span> PS5 Luxury Lounge
              </h3>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li className="flex items-center gap-3"><span className="text-[#d946ef]">▸</span> PlayStation 5 Console</li>
                <li className="flex items-center gap-3"><span className="text-[#d946ef]">▸</span> 4K 120Hz Display</li>
                <li className="flex items-center gap-3"><span className="text-[#d946ef]">▸</span> Premium Couch Seating</li>
                <li className="flex items-center gap-3"><span className="text-[#d946ef]">▸</span> 4x DualSense Controllers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-[#0c0c14] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-[#d946ef] font-bold tracking-widest text-xs uppercase mb-2 block">Visuals</span>
            <h2 className="font-black text-4xl md:text-6xl uppercase">Cafe <span className="text-gradient">Vibes</span></h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo2.jpg'].map((img, index) => (
              <div key={index} className="reveal overflow-hidden rounded-xl border border-white/10 group">
                <img src={`/images/${img}`} alt="Cafe" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 bg-[#050508] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-[#8b5cf6] font-bold tracking-widest text-xs uppercase mb-2 block">Access Plans</span>
            <h2 className="font-black text-4xl md:text-6xl uppercase">Gaming <span className="text-gradient">Passes</span></h2>
          </div>

          <h3 className="font-bold text-xl text-white mb-8 uppercase tracking-wider reveal">🖥️ PC Gaming Arena</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="reveal glass glass-hover p-6 rounded-2xl flex flex-col">
              <h3 className="font-bold text-lg text-white mb-2 uppercase">1 Hour Pass</h3>
              <div className="text-4xl font-black text-white mb-4">₹80</div>
              <ul className="space-y-2 text-gray-400 mb-6 flex-grow text-sm">
                <li className="flex items-center gap-2"><span className="text-[#8b5cf6]">✓</span> 360Hz Monitor</li>
              </ul>
              <PaymentButton amount={80} passName="1 Hour PC Pass" />
            </div>

            <div className="reveal glass glass-hover p-6 rounded-2xl flex flex-col" style={{transitionDelay: '0.1s'}}>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">3 Hour Pass</h3>
              <div className="text-4xl font-black text-white mb-4">₹220</div>
              <ul className="space-y-2 text-gray-400 mb-6 flex-grow text-sm">
                <li className="flex items-center gap-2"><span className="text-[#8b5cf6]">✓</span> Quick Session</li>
              </ul>
              <PaymentButton amount={220} passName="3 Hour PC Pass" />
            </div>

            <div className="reveal glass glass-hover p-6 rounded-2xl flex flex-col" style={{transitionDelay: '0.2s'}}>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">6 Hour Pass</h3>
              <div className="text-4xl font-black text-white mb-4">₹430</div>
              <ul className="space-y-2 text-gray-400 mb-6 flex-grow text-sm">
                <li className="flex items-center gap-2"><span className="text-[#8b5cf6]">✓</span> Pro Gear</li>
              </ul>
              <PaymentButton amount={430} passName="6 Hour PC Pass" />
            </div>

            <div className="reveal glass glass-hover p-6 rounded-2xl flex flex-col">
              <h3 className="font-bold text-lg text-white mb-2 uppercase">10 Hour Pass</h3>
              <div className="text-4xl font-black text-white mb-4">₹700</div>
              <ul className="space-y-2 text-gray-400 mb-6 flex-grow text-sm">
                <li className="flex items-center gap-2"><span className="text-[#8b5cf6]">✓</span> Extended Session</li>
              </ul>
              <PaymentButton amount={700} passName="10 Hour PC Pass" />
            </div>

            <div className="reveal glass p-6 rounded-2xl border-2 border-[#d946ef] bg-[#d946ef]/5 flex flex-col relative" style={{transitionDelay: '0.1s'}}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-bold text-[10px] px-4 py-1 rounded-full uppercase">Most Popular</div>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">Full Day Pass</h3>
              <div className="text-4xl font-black text-white mb-4">₹649</div>
              <ul className="space-y-2 text-gray-300 mb-6 flex-grow text-sm">
                <li className="flex items-center gap-2"><span className="text-[#d946ef]">✓</span> Unlimited Time</li>
              </ul>
              <PaymentButton amount={649} passName="Full Day PC Pass" />
            </div>

            <div className="reveal glass glass-hover p-6 rounded-2xl flex flex-col" style={{transitionDelay: '0.2s'}}>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">Night Pass</h3>
              <div className="text-4xl font-black text-white mb-4">₹499</div>
              <ul className="space-y-2 text-gray-400 mb-6 flex-grow text-sm">
                <li className="flex items-center gap-2"><span className="text-[#8b5cf6]">✓</span> Overnight Gaming</li>
              </ul>
              <PaymentButton amount={499} passName="Night PC Pass" />
            </div>
          </div>

          <h3 className="font-bold text-xl text-white mb-8 uppercase tracking-wider reveal">🎮 PS5 Lounge (Per Hour)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="reveal glass glass-hover p-6 rounded-2xl flex flex-col">
              <h3 className="font-bold text-lg text-white mb-2 uppercase">1 Controller</h3>
              <div className="text-3xl font-black text-white mb-4">₹100<span className="text-sm text-gray-500">/hr</span></div>
              <PaymentButton amount={100} passName="PS5 - 1 Controller" />
            </div>
            <div className="reveal glass glass-hover p-6 rounded-2xl flex flex-col" style={{transitionDelay: '0.1s'}}>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">2 Controllers</h3>
              <div className="text-3xl font-black text-white mb-4">150<span className="text-sm text-gray-500">/hr</span></div>
              <PaymentButton amount={150} passName="PS5 - 2 Controllers" />
            </div>
            <div className="reveal glass glass-hover p-6 rounded-2xl flex flex-col" style={{transitionDelay: '0.2s'}}>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">3 Controllers</h3>
              <div className="text-3xl font-black text-white mb-4">₹200<span className="text-sm text-gray-500">/hr</span></div>
              <PaymentButton amount={200} passName="PS5 - 3 Controllers" />
            </div>
            <div className="reveal glass p-6 rounded-2xl border-2 border-[#d946ef] bg-[#d946ef]/5 flex flex-col relative" style={{transitionDelay: '0.3s'}}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-bold text-[10px] px-4 py-1 rounded-full uppercase">Best For Groups</div>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">4 Controllers</h3>
              <div className="text-3xl font-black text-white mb-4">₹250<span className="text-sm text-gray-500">/hr</span></div>
              <PaymentButton amount={250} passName="PS5 - 4 Controllers" />
            </div>
          </div>
        </div>
      </section>
      {/* YOLO SHOP COMING SOON */}
      <section id="shop" className="py-24 bg-[#050508] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-[150px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal glass p-12 md:p-16 rounded-3xl border border-[#8b5cf6]/20 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-[#d946ef]/30 rounded-full bg-[#d946ef]/10 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#d946ef] rounded-full animate-pulse"></span>
              <span className="text-[#d946ef] font-bold tracking-[0.2em] text-xs uppercase">Coming Soon</span>
            </div>
            
            <h2 className="font-black text-4xl md:text-6xl mb-6 tracking-tight uppercase">
              YOLO <span className="text-gradient">SHOP</span>
            </h2>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Level up your setup and rep the squad. Premium gaming peripherals, custom jerseys, and exclusive merch dropping soon.
            </p>
            
            <a 
              href="https://wa.me/918169913338?text=Hi,%20I%20want%20to%20join%20the%20YOLO%20Shop%20waitlist!" 
              target="_blank" 
              className="btn-shine inline-block bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-bold py-4 px-10 rounded-xl hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all uppercase tracking-widest text-sm"
            >
              Join Waitlist
            </a>

          </div>
        </div>
      </section>
      {/* CONTACT */}
      <section id="contact" className="py-24 bg-[#0c0c14] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-[#8b5cf6] font-bold tracking-widest text-xs uppercase mb-2 block">Location</span>
            <h2 className="font-black text-4xl md:text-6xl uppercase">Visit The <span className="text-gradient">Cafe</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="reveal glass glass-hover p-6 rounded-2xl flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1 uppercase">Address</h4>
                  <p className="text-gray-400 text-sm">CHS, Plot no. 30-31, Seawoods West, Sector 44A, Navi Mumbai 400706</p>
                </div>
              </div>
              <div className="reveal glass glass-hover p-6 rounded-2xl flex items-start gap-4" style={{transitionDelay: '0.1s'}}>
                <div className="text-2xl">💬</div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1 uppercase">WhatsApp</h4>
                  <p className="text-gray-400 text-sm mb-2">+91 81699 13338</p>
                  <a href="https://wa.me/918169913338" target="_blank" className="inline-block bg-green-600 text-white font-bold py-2 px-4 rounded-full text-xs uppercase">Chat Now</a>
                </div>
              </div>
              <div className="reveal glass glass-hover p-6 rounded-2xl flex items-start gap-4" style={{transitionDelay: '0.2s'}}>
                <div className="text-2xl"></div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1 uppercase">Hours</h4>
                  <p className="text-green-400 font-bold text-sm uppercase">Open 24 Hours</p>
                </div>
              </div>
            </div>

            <div className="reveal glass p-2 rounded-2xl h-[400px] overflow-hidden" style={{transitionDelay: '0.2s'}}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.163034309376!2d73.00875057582883!3d19.012536253960448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c31302abfc0b%3A0x7c40305920708e26!2sYOLO%20Esports%20Cafe!5e0!3m2!1sen!2sin!4v1790103712168!5m2!1sen!2sin" 
                className="w-full h-full rounded-xl"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#020204] border-t border-white/5 py-8 text-center">
        <p className="text-gray-500 text-xs uppercase tracking-wider">&copy; 2024 YOLO Esports Cafe. All rights reserved.</p>
      </footer>

    </main>
  );
}