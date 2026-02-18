import React, { useRef } from 'react';
import { expCards } from '../constants';
import PodswietlanaKarta from '../components/PodswietlanaKarta';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Historia = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const timelineContainer = containerRef.current.querySelector('.timeline-container');

    gsap.to('.timeline-gradient', {
      scaleY: 1, transformOrigin: 'top center', ease: 'none',
      scrollTrigger: {
        trigger: timelineContainer, start: 'top center', end: 'bottom center', scrub: 1,
      }
    });

    // --- ZMIANA: Responsywne animacje z GSAP ---
    gsap.utils.toArray('.timeline-entry').forEach((entry) => {
      const card = entry.querySelector('.timeline-card');
      const text = entry.querySelector('.expText');

      ScrollTrigger.matchMedia({
        // Animacja na desktop (od 1024px wzwyż)
        "(min-width: 1024px)": function() {
          const isReversed = entry.classList.contains('lg:flex-row-reverse');
          gsap.from(card, {
            xPercent: isReversed ? 100 : -100, opacity: 0, duration: 1, ease: 'power2.inOut',
            scrollTrigger: { trigger: entry, start: 'top 80%' }
          });
        },
        // Animacja na mobile (poniżej 1024px)
        "(max-width: 1023px)": function() {
          gsap.from(card, {
            opacity: 0, y: 50, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: entry, start: 'top 90%' }
          });
        }
      });

      gsap.from(text.children, {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: entry, start: 'top 80%' }
      });
    });

  }, { scope: containerRef });
  
  return (
    <section ref={containerRef} id="experience" className='w-full bg-black relative overflow-hidden py-24 sm:py-32'>
      <div className="historia-bg-image" />
      <div className='relative z-10 w-full h-full container mx-auto px-4 md:px-10'>
        <div className="mb-20 flex flex-col items-center justify-center text-center">
          <p className="font-circular-web text-4xl md:text-5xl font-semibold text-blue-50 mb-4 tracking-wide drop-shadow-lg">
            ✨ Historia pisana kawą
          </p>
          <p className="max-w-3xl font-circular-web text-xl md:text-2xl text-blue-50 opacity-70 leading-relaxed">
            Każde wielkie dzieło ma swój początek. Oto opowieść o tym, jak z pasji i marzeń zrodził się „Czarny Puls”.
          </p>
        </div>

        <div className='timeline-container relative mt-16 md:mt-24'>
          {/* --- ZMIANA: Responsywna linia osi czasu --- */}
          <div className="absolute left-6 top-2 h-full w-0.5 bg-white/10 lg:left-1/2 lg:-translate-x-1/2" />
          <div className="timeline-gradient absolute left-6 top-2 h-full w-0.5 bg-gradient-to-b from-yellow-700 via-yellow-600 to-yellow-500 origin-top scale-y-0 lg:left-1/2 lg:-translate-x-1/2" />

          {/* --- ZMIANA: Dodano padding na mobile, aby odsunąć treść od linii --- */}
          <div className='relative z-10 flex flex-col gap-16 lg:gap-12 pl-12 lg:pl-0'>
            {expCards.map((card, index) => (
              // --- ZMIANA: Kluczowa zmiana layoutu - flex-col na mobile, flex-row na desktop ---
              <div key={card.title} className={`timeline-entry relative flex flex-col lg:flex-row lg:items-center w-full ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* --- NOWOŚĆ: Widoczny "węzeł" na osi czasu --- */}
                <div className="absolute -left-12 top-5 h-4 w-4 rounded-full bg-yellow-700 border-2 border-yellow-500 lg:hidden"></div>
                
                <div className='w-full lg:w-1/2 lg:p-4'>
                  <div className="timeline-card group mb-6 lg:mb-0">
                    <PodswietlanaKarta card={card} index={index}>
                      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
                        <img src={card.imgPath} alt={card.title} className="w-full h-auto rounded-2xl transition-all duration-500 ease-in-out blur-sm group-hover:blur-none" />
                      </div>
                    </PodswietlanaKarta>
                  </div>
                </div>

                {/* --- ZMIANA: Inny układ na desktopie dla ikony --- */}
                <div className='w-1/2 hidden lg:flex items-center justify-center'>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-900/50 border-2 border-yellow-700 flex-shrink-0">
                        <img src={card.logoPath} alt="logo" className="w-8 h-8" />
                    </div>
                </div>
                
                <div className={`w-full lg:w-1/2 lg:p-4 flex items-center gap-4 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                  <div className={`expText w-full max-w-md ${index % 2 !== 0 ? 'lg:text-right' : ''}`}>
                    <p className='text-yellow-500 drop-shadow-lg'>📅 {card.date}</p>
                    <h2 className='font-semibold text-3xl text-blue-50 my-2'>{card.title}</h2>
                    <p className='text-blue-50/80 mb-4'>{card.description}</p>
                    <p className='text-yellow-600 italic mb-3'>Kluczowe kroki:</p>
                    <ul className={`flex flex-col gap-2 text-blue-50/90 ${index % 2 !== 0 ? 'lg:items-end' : 'lg:items-start'}`}>
                      {card.responsibilities.map((item) => (
                        <li key={item} className={`flex items-center gap-2 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                          <svg className="w-4 h-4 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-16 flex flex-col items-center justify-center text-center">
            <p className="font-circular-web text-4xl md:text-5xl font-semibold text-blue-50 mb-4 tracking-wide drop-shadow-lg">
                ✨ To dopiero początek.
            </p>
            <p className="max-w-3xl font-circular-web text-xl md:text-2xl text-blue-50 opacity-70 leading-relaxed">
                Nasza historia to nie tylko przeszłość – to fundament, na którym każdego dnia budujemy przyszłość.
            </p>
        </div>
      </div>
    </section>
  )
}

export default Historia;