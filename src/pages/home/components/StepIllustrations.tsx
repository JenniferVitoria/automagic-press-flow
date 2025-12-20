import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface IllustrationProps {
  isActive: boolean;
}

// Step 1: WordPress Connection Animation
export const WordPressIllustration = ({ isActive }: IllustrationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const plugRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const tl = gsap.timeline();

    // Animate the connection line drawing
    if (lineRef.current) {
      gsap.set(lineRef.current, { strokeDasharray: 100, strokeDashoffset: 100 });
      tl.to(lineRef.current, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" });
    }

    // Animate the plug connecting
    if (plugRef.current) {
      tl.fromTo(plugRef.current, 
        { x: 30, opacity: 0, rotate: -15 },
        { x: 0, opacity: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      );
    }

    // Spark effect on connection
    if (sparkRef.current) {
      tl.fromTo(sparkRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1.5, opacity: 1, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );
      tl.to(sparkRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    }

    return () => { tl.kill(); };
  }, [isActive]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* WordPress Logo */}
      <div className={`absolute left-4 md:left-8 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#21759b] flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 md:w-7 md:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 19c-4.411 0-8-3.589-8-8 0-1.168.258-2.275.709-3.276l4.7 12.879A8.003 8.003 0 0 0 12 21zm6.878-2.761l-1.854-5.509.702-2.63c.282-1.06.188-1.803-.188-2.365-.376-.563-.939-.844-1.691-.844-.752 0-1.409.281-1.972.844-.563.563-.844 1.315-.844 2.159 0 .094 0 .188.094.281l.469 2.348-3.293 9.896-4.606-13.708c.752-.094 1.409-.188 1.409-.188.563-.094.469-.939-.094-.939 0 0-1.691.188-2.818.188-.188 0-.376 0-.563-.094 1.597-2.442 4.324-4.043 7.426-4.043 2.348 0 4.512.844 6.202 2.253-.188 0-.376-.094-.563-.094-1.034 0-1.784.844-1.784 1.784 0 .658.376 1.221.752 1.878.282.563.563 1.221.563 2.159 0 .658-.188 1.409-.469 2.442l-.658 2.159z"/>
          </svg>
        </div>
      </div>

      {/* Connection Line */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        <path
          ref={lineRef}
          d="M60,40 Q90,40 110,40"
          className="stroke-primary"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
      </svg>

      {/* Spark effect */}
      <div 
        ref={sparkRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary opacity-0"
        style={{ boxShadow: '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))' }}
      />

      {/* Plug Icon */}
      <div 
        ref={plugRef}
        className={`absolute right-4 md:right-8 opacity-0`}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v6m0 8v6M6 8h12M9 8v8M15 8v8" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Step 2: Categories Animation
export const CategoriesIllustration = ({ isActive }: IllustrationProps) => {
  const tagsRef = useRef<(HTMLDivElement | null)[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);

  const tags = ['Tech', 'Blog', 'SEO', 'News'];

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();

    // Animate tags flying in and organizing
    tagsRef.current.forEach((tag, i) => {
      if (tag) {
        gsap.set(tag, { 
          x: (Math.random() - 0.5) * 100, 
          y: (Math.random() - 0.5) * 60,
          rotate: (Math.random() - 0.5) * 30,
          opacity: 0,
          scale: 0.5
        });
        
        tl.to(tag, {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.5)"
        }, i * 0.1);
      }
    });

    // Calendar pulse
    if (calendarRef.current) {
      tl.fromTo(calendarRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
        0.3
      );
    }

    return () => { tl.kill(); };
  }, [isActive]);

  return (
    <div className="relative w-full h-full flex items-center justify-center gap-2 px-2">
      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 flex-1">
        {tags.map((tag, i) => (
          <div
            key={tag}
            ref={el => tagsRef.current[i] = el}
            className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium transition-colors duration-300 ${
              isActive 
                ? 'bg-primary/20 text-primary border border-primary/30' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Calendar Icon */}
      <div 
        ref={calendarRef}
        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
          isActive ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
        }`}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="16" y1="2" x2="16" y2="6" />
        </svg>
      </div>
    </div>
  );
};

// Step 3: AI Writing Animation
export const AIWritingIllustration = ({ isActive }: IllustrationProps) => {
  const brainRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();

    // Brain pulse
    if (brainRef.current) {
      tl.fromTo(brainRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
      
      gsap.to(brainRef.current, {
        boxShadow: '0 0 30px hsl(var(--primary) / 0.5)',
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power2.inOut"
      });
    }

    // Text lines typing effect
    linesRef.current.forEach((line, i) => {
      if (line) {
        gsap.set(line, { scaleX: 0, transformOrigin: "left" });
        tl.to(line, {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0.3 + i * 0.15);
      }
    });

    // Floating particles
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        gsap.fromTo(particle,
          { y: 20, opacity: 0, scale: 0 },
          { 
            y: -20 - i * 10, 
            opacity: 0.6, 
            scale: 1,
            duration: 1,
            delay: 0.5 + i * 0.2,
            ease: "power2.out"
          }
        );
        
        gsap.to(particle, {
          y: `-=${10 + i * 5}`,
          x: (Math.random() - 0.5) * 20,
          repeat: -1,
          yoyo: true,
          duration: 2 + i * 0.5,
          ease: "sine.inOut",
          delay: 1
        });
      }
    });

    return () => { tl.kill(); };
  }, [isActive]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Brain/AI Icon */}
      <div 
        ref={brainRef}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}
        style={{ opacity: 0 }}
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 0 4.92 2.5 2.5 0 0 0 1.98 3 2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 4.96.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 0-4.92 2.5 2.5 0 0 0-1.98-3 2.5 2.5 0 0 0-4.96.46" strokeLinecap="round" />
          <path d="M12 4.5v15" strokeLinecap="round" />
          <path d="M7.5 10h9" strokeLinecap="round" />
        </svg>
      </div>

      {/* Text Lines */}
      <div className="absolute right-2 md:right-4 flex flex-col gap-1.5">
        {[1, 0.8, 0.6].map((width, i) => (
          <div
            key={i}
            ref={el => linesRef.current[i] = el}
            className={`h-1.5 md:h-2 rounded-full transition-colors duration-300 ${
              isActive ? 'bg-primary/40' : 'bg-muted'
            }`}
            style={{ width: `${width * 50}px`, transform: 'scaleX(0)' }}
          />
        ))}
      </div>

      {/* Data Particles */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          className="absolute w-2 h-2 rounded-full bg-primary/60 opacity-0"
          style={{ 
            left: `${30 + i * 15}%`,
            top: '60%'
          }}
        />
      ))}
    </div>
  );
};

// Step 4: Publishing Animation
export const PublishIllustration = ({ isActive }: IllustrationProps) => {
  const postRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();

    // Post card appears
    if (postRef.current) {
      tl.fromTo(postRef.current,
        { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }

    // Trail particles
    trailRef.current.forEach((trail, i) => {
      if (trail) {
        tl.fromTo(trail,
          { y: 0, opacity: 0, scale: 0 },
          { y: -15 - i * 8, opacity: 0.5, scale: 1, duration: 0.3, ease: "power2.out" },
          0.2 + i * 0.1
        );
        tl.to(trail, { opacity: 0, duration: 0.3 }, `>-0.1`);
      }
    });

    // Post flies up
    if (postRef.current) {
      tl.to(postRef.current, {
        y: -25,
        scale: 0.85,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0.5);
    }

    // Cloud receives
    if (cloudRef.current) {
      tl.fromTo(cloudRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        0.3
      );
    }

    // Check appears
    if (checkRef.current) {
      tl.fromTo(checkRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
        0.9
      );
    }

    return () => { tl.kill(); };
  }, [isActive]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Cloud Icon */}
      <div 
        ref={cloudRef}
        className={`absolute top-1 md:top-2 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
          isActive ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
        }`}
        style={{ opacity: 0 }}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      </div>

      {/* Trail particles */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={el => trailRef.current[i] = el}
          className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0"
          style={{ left: `calc(50% + ${(i - 1) * 8}px)` }}
        />
      ))}

      {/* Post Card */}
      <div 
        ref={postRef}
        className={`absolute bottom-2 md:bottom-3 w-12 h-14 md:w-14 md:h-16 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors duration-300 ${
          isActive 
            ? 'bg-card border border-primary/30 shadow-lg shadow-primary/10' 
            : 'bg-muted border border-border'
        }`}
        style={{ opacity: 0 }}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8M16 17H8M10 9H8" />
        </svg>
        <div className="w-6 md:w-8 h-0.5 bg-muted-foreground/30 rounded" />
      </div>

      {/* Check Icon */}
      <div 
        ref={checkRef}
        className="absolute top-1 right-2 md:right-4 w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-500 flex items-center justify-center opacity-0"
      >
        <svg className="w-3 h-3 md:w-4 md:h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

// Step 5: Scale & Monetization Animation
export const ScaleIllustration = ({ isActive }: IllustrationProps) => {
  const graphRef = useRef<SVGPathElement>(null);
  const coinsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();

    // Graph line drawing
    if (graphRef.current) {
      const length = graphRef.current.getTotalLength();
      gsap.set(graphRef.current, { strokeDasharray: length, strokeDashoffset: length });
      tl.to(graphRef.current, { strokeDashoffset: 0, duration: 1, ease: "power2.out" });
    }

    // Bars growing
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        const height = bar.dataset.height || '20';
        gsap.set(bar, { height: 0 });
        tl.to(bar, {
          height: `${height}px`,
          duration: 0.4,
          ease: "back.out(1.5)"
        }, 0.1 + i * 0.1);
      }
    });

    // Coins popping
    coinsRef.current.forEach((coin, i) => {
      if (coin) {
        tl.fromTo(coin,
          { scale: 0, y: 10, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" },
          0.6 + i * 0.15
        );

        // Floating animation
        gsap.to(coin, {
          y: -5,
          repeat: -1,
          yoyo: true,
          duration: 1 + i * 0.2,
          ease: "sine.inOut",
          delay: 1
        });
      }
    });

    return () => { tl.kill(); };
  }, [isActive]);

  return (
    <div className="relative w-full h-full flex items-center justify-center px-3">
      {/* Growing Bars Chart */}
      <div className="flex items-end gap-1 h-14 md:h-16">
        {[12, 18, 14, 24, 20, 30].map((h, i) => (
          <div
            key={i}
            ref={el => barsRef.current[i] = el}
            data-height={h}
            className={`w-2 md:w-2.5 rounded-t transition-colors duration-300 ${
              isActive ? 'bg-primary/70' : 'bg-muted'
            }`}
            style={{ height: 0 }}
          />
        ))}
      </div>

      {/* Graph Line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 60" preserveAspectRatio="none">
        <path
          ref={graphRef}
          d="M10,50 Q30,45 50,35 T90,15 L110,10"
          className="stroke-primary"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Money/Coins */}
      <div className="absolute right-2 md:right-4 top-1 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={el => coinsRef.current[i] = el}
            className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg opacity-0"
          >
            <span className="text-[8px] md:text-[10px] font-bold text-yellow-900">$</span>
          </div>
        ))}
      </div>
    </div>
  );
};
