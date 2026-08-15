import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/scrollTriggers';

export default function StoryAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const bikeRef = useRef<SVGGElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !bikeRef.current) return;

    // We create a timeline tied to the scroll of the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // when top of section hits top of viewport
        end: "+=150%", // scroll for 1.5x the height
        pin: true, // pin the section while scrolling
        scrub: 1, // smooth scrubbing
      }
    });

    // Animate the bike moving across the screen exactly matching scroll
    tl.fromTo(bikeRef.current,
      { x: 50 },
      { x: 1100, duration: 1, ease: "none" }
    );

    // Animate the wheels and pedals spinning exactly matching scroll
    // Positive rotation means it rolls forward (clockwise)
    tl.to(".bike-wheel, .bike-pedals", {
      rotation: 360 * 4, // 4 full rotations across the screen
      duration: 1,
      ease: "none",
      transformOrigin: "center center"
    }, 0); // start at same time (0)

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#111] text-[#E0E0E0] min-h-svh w-full flex flex-col justify-center overflow-hidden relative font-sans"
    >
      <div className="max-w-[1200px] mx-auto w-full px-8 md:px-16 z-10 flex flex-col items-end text-right pt-8">
        <p className="text-[#a0a0a0] text-xs tracking-[0.2em] font-medium uppercase mb-4">
          Sustain . AI Presents
        </p>
        <h2 className="text-[clamp(40px,5vw,72px)] font-bold leading-[1.1] tracking-tight text-white mb-4">
          From the grid<br />to the city.
        </h2>
        <p className="text-[#a0a0a0] font-mono text-sm tracking-wide">
          the energy story of SustainAI — scroll-driven, line-drawn
        </p>
      </div>

      <div className="relative w-full h-[45vh] mt-4 opacity-90">
        <svg 
          viewBox="0 0 1200 400" 
          className="w-full h-full" 
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Base Road Line */}
          <path 
            d="M -100 250 L 1300 250" 
            stroke="#444" 
            strokeWidth="2" 
            fill="none" 
          />

          {/* Road markings (dashed) */}
          <path 
            d="M -100 255 L 1300 255" 
            stroke="#555" 
            strokeWidth="1" 
            strokeDasharray="20 20"
            fill="none" 
          />

          {/* --- Elements --- */}
          
          {/* Wind Turbine 1 */}
          <g transform="translate(200, 250) scale(0.85)">
            <line x1="0" y1="0" x2="0" y2="-120" stroke="#a0a0a0" strokeWidth="1" />
            <g className="origin-[0_-120px] animate-[spin_4s_linear_infinite]">
              <path d="M 0 -120 Q 20 -150 0 -180 Q -10 -150 0 -120" fill="none" stroke="#a0a0a0" strokeWidth="1" />
              <path d="M 0 -120 Q 30 -100 50 -80 Q 20 -90 0 -120" fill="none" stroke="#a0a0a0" strokeWidth="1" />
              <path d="M 0 -120 Q -30 -100 -50 -80 Q -20 -90 0 -120" fill="none" stroke="#a0a0a0" strokeWidth="1" />
              <circle cx="0" cy="-120" r="3" fill="#111" stroke="#a0a0a0" strokeWidth="1.5" />
            </g>
          </g>

          {/* Wind Turbine 2 (Smaller) */}
          <g transform="translate(280, 250) scale(0.65)">
            <line x1="0" y1="0" x2="0" y2="-120" stroke="#a0a0a0" strokeWidth="1" />
            <g className="origin-[0_-120px] animate-[spin_3s_linear_infinite]">
              <path d="M 0 -120 Q 20 -150 0 -180 Q -10 -150 0 -120" fill="none" stroke="#a0a0a0" strokeWidth="1" />
              <path d="M 0 -120 Q 30 -100 50 -80 Q 20 -90 0 -120" fill="none" stroke="#a0a0a0" strokeWidth="1" />
              <path d="M 0 -120 Q -30 -100 -50 -80 Q -20 -90 0 -120" fill="none" stroke="#a0a0a0" strokeWidth="1" />
              <circle cx="0" cy="-120" r="3" fill="#111" stroke="#a0a0a0" strokeWidth="1.5" />
            </g>
          </g>

          {/* Anime Style Flowing Wind Lines */}
          <g opacity="0.3" stroke="#eab308" strokeWidth="1" fill="none" strokeLinecap="round">
            <path className="animate-[dash_3s_linear_infinite]" d="M 50 100 Q 150 80 250 110 T 400 90" strokeDasharray="50 200" strokeDashoffset="0" />
            <path className="animate-[dash_4s_linear_infinite_0.5s]" d="M 100 50 Q 200 30 300 70 T 500 40" strokeDasharray="30 250" strokeDashoffset="0" />
            <path className="animate-[dash_3.5s_linear_infinite_1s]" d="M 150 170 Q 250 150 350 190 T 450 150" strokeDasharray="40 180" strokeDashoffset="0" />
          </g>

          {/* Solar Panel */}
          <g transform="translate(480, 250) scale(0.85)">
            <path d="M 20 0 L 40 -60 L 90 -60 L 70 0 Z" fill="none" stroke="#a0a0a0" strokeWidth="1" strokeLinejoin="round" />
            <line x1="30" y1="-30" x2="80" y2="-30" stroke="#a0a0a0" strokeWidth="1" />
            <line x1="45" y1="0" x2="65" y2="-60" stroke="#a0a0a0" strokeWidth="1" />
            <line x1="60" y1="0" x2="80" y2="-60" stroke="#a0a0a0" strokeWidth="1" />
          </g>

          {/* AI Data Node / Server */}
          <g transform="translate(720, 250) scale(0.85)">
            {/* Base block */}
            <path d="M 0 0 L 80 0 L 80 -40 L 0 -40 Z" fill="none" stroke="#a0a0a0" strokeWidth="1" />
            <path d="M 0 -45 L 80 -45 L 80 -80 L 0 -80 Z" fill="none" stroke="#a0a0a0" strokeWidth="1" />
            {/* Blinking lights */}
            <circle cx="15" cy="-20" r="2" fill="#eab308" className="animate-pulse" />
            <circle cx="25" cy="-20" r="2" fill="#22c55e" className="animate-[pulse_1.5s_infinite]" />
            <circle cx="35" cy="-20" r="2" fill="#3b82f6" className="animate-[pulse_2s_infinite]" />
            <circle cx="15" cy="-62" r="2" fill="#eab308" className="animate-[pulse_1.2s_infinite]" />
            <circle cx="25" cy="-62" r="2" fill="#22c55e" className="animate-pulse" />
            <line x1="50" y1="-20" x2="70" y2="-20" stroke="#a0a0a0" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="50" y1="-62" x2="70" y2="-62" stroke="#a0a0a0" strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* The Candle */}
          <g transform="translate(950, 250) scale(0.85)">
            <path d="M 0 0 L 30 0 L 30 -60 L 0 -60 Z" fill="none" stroke="#a0a0a0" strokeWidth="1" />
            <path d="M 0 -60 Q 15 -55 30 -60" fill="none" stroke="#a0a0a0" strokeWidth="1" />
            <line x1="15" y1="-60" x2="15" y2="-70" stroke="#a0a0a0" strokeWidth="1" />
            {/* Flame */}
            <path 
              d="M 15 -70 Q 22 -85 15 -100 Q 8 -85 15 -70" 
              fill="none" 
              stroke="#eab308" 
              strokeWidth="1.5" 
              className="origin-[15px_-70px] animate-[flicker_0.3s_infinite_alternate]"
            />
            {/* Inner flame */}
            <path 
              d="M 15 -70 Q 19 -80 15 -90 Q 11 -80 15 -70" 
              fill="none" 
              stroke="#eab308" 
              strokeWidth="0.5" 
              className="origin-[15px_-70px] animate-[flicker_0.4s_infinite_alternate_reverse]"
            />
          </g>

          {/* Labels */}
          <text x="200" y="275" fill="#666" fontSize="11" fontFamily="monospace" textAnchor="middle">wind</text>
          <text x="520" y="275" fill="#666" fontSize="11" fontFamily="monospace" textAnchor="middle">solar</text>
          <text x="760" y="275" fill="#666" fontSize="11" fontFamily="monospace" textAnchor="middle">ai nodes</text>
          <text x="965" y="275" fill="#666" fontSize="11" fontFamily="monospace" textAnchor="middle">candle</text>

          {/* --- The Bicycle --- */}
          {/* We animate the entire g container x position with GSAP via bikeRef */}
          <g ref={bikeRef} transform="translate(50, 250)">
            <g transform="scale(0.45) translate(0, -22)"> {/* scale down and lift up so wheels touch the road */}
              
              {/* Back wheel */}
              <g className="bike-wheel origin-center" transform="translate(-35, 0)">
                <circle cx="0" cy="0" r="22" fill="none" stroke="#a0a0a0" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="18" fill="none" stroke="#555" strokeWidth="0.5" strokeDasharray="3 3" />
                {/* Spokes */}
                <line x1="0" y1="-22" x2="0" y2="22" stroke="#777" strokeWidth="0.5" />
                <line x1="-22" y1="0" x2="22" y2="0" stroke="#777" strokeWidth="0.5" />
                <line x1="-15.5" y1="-15.5" x2="15.5" y2="15.5" stroke="#777" strokeWidth="0.5" />
                <line x1="15.5" y1="-15.5" x2="-15.5" y2="15.5" stroke="#777" strokeWidth="0.5" />
                <line x1="-8.4" y1="-20.3" x2="8.4" y2="20.3" stroke="#777" strokeWidth="0.5" />
                <line x1="8.4" y1="-20.3" x2="-8.4" y2="20.3" stroke="#777" strokeWidth="0.5" />
                <line x1="-20.3" y1="-8.4" x2="20.3" y2="8.4" stroke="#777" strokeWidth="0.5" />
                <line x1="20.3" y1="-8.4" x2="-20.3" y2="8.4" stroke="#777" strokeWidth="0.5" />
                {/* Hub */}
                <circle cx="0" cy="0" r="4" fill="#222" stroke="#eab308" strokeWidth="1" />
              </g>
              
              {/* Front wheel */}
              <g className="bike-wheel origin-center" transform="translate(35, 0)">
                <circle cx="0" cy="0" r="22" fill="none" stroke="#a0a0a0" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="18" fill="none" stroke="#555" strokeWidth="0.5" strokeDasharray="3 3" />
                {/* Spokes */}
                <line x1="0" y1="-22" x2="0" y2="22" stroke="#777" strokeWidth="0.5" />
                <line x1="-22" y1="0" x2="22" y2="0" stroke="#777" strokeWidth="0.5" />
                <line x1="-15.5" y1="-15.5" x2="15.5" y2="15.5" stroke="#777" strokeWidth="0.5" />
                <line x1="15.5" y1="-15.5" x2="-15.5" y2="15.5" stroke="#777" strokeWidth="0.5" />
                <line x1="-8.4" y1="-20.3" x2="8.4" y2="20.3" stroke="#777" strokeWidth="0.5" />
                <line x1="8.4" y1="-20.3" x2="-8.4" y2="20.3" stroke="#777" strokeWidth="0.5" />
                <line x1="-20.3" y1="-8.4" x2="20.3" y2="8.4" stroke="#777" strokeWidth="0.5" />
                <line x1="20.3" y1="-8.4" x2="-20.3" y2="8.4" stroke="#777" strokeWidth="0.5" />
                {/* Hub */}
                <circle cx="0" cy="0" r="4" fill="#222" stroke="#eab308" strokeWidth="1" />
              </g>

              {/* Frame (Yellow & sleek) */}
              <path d="M -35 0 L -15 -40 L 25 -40 L 35 0" fill="none" stroke="#eab308" strokeWidth="3.5" strokeLinejoin="round" />
              <path d="M -35 0 L 0 -5 L 25 -40" fill="none" stroke="#eab308" strokeWidth="3.5" strokeLinejoin="round" />
              <line x1="0" y1="-5" x2="20" y2="0" stroke="#a0a0a0" strokeWidth="2" /> {/* Chainstay */}
              
              {/* Front Fork */}
              <line x1="35" y1="0" x2="23" y2="-50" stroke="#eab308" strokeWidth="3" />
              
              {/* Seat tube */}
              <line x1="-15" y1="-40" x2="-22" y2="-55" stroke="#a0a0a0" strokeWidth="3" />
              {/* Seat */}
              <path d="M -30 -55 Q -22 -60 -12 -55 Z" fill="#fff" />

              {/* Handlebars */}
              <line x1="23" y1="-50" x2="21" y2="-60" stroke="#a0a0a0" strokeWidth="3" />
              <path d="M 12 -60 Q 21 -68 28 -55" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              
              {/* Pedals (animated with GSAP) */}
              <g className="bike-pedals origin-center" transform="translate(0, -5)">
                <circle cx="0" cy="0" r="8" fill="#111" stroke="#a0a0a0" strokeWidth="2" />
                <line x1="0" y1="0" x2="0" y2="16" stroke="#a0a0a0" strokeWidth="2.5" />
                <line x1="0" y1="0" x2="0" y2="-16" stroke="#a0a0a0" strokeWidth="2.5" />
                <line x1="-6" y1="16" x2="6" y2="16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <line x1="-6" y1="-16" x2="6" y2="-16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              </g>

            </g>
          </g>
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -250;
          }
        }
        @keyframes flicker {
          0% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
          20% { transform: scale(1.05) rotate(2deg); opacity: 1; }
          40% { transform: scale(0.95) rotate(-1deg); opacity: 0.8; }
          60% { transform: scale(1.02) rotate(1deg); opacity: 0.95; }
          80% { transform: scale(0.98) rotate(-3deg); opacity: 0.85; }
          100% { transform: scale(1) rotate(2deg); opacity: 1; }
        }
      `}} />
    </section>
  );
}
