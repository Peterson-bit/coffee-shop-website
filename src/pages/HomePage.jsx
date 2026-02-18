import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TiArrowRight } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSwipeable } from "react-swipeable"; // <-- NOWY IMPORT

gsap.registerPlugin(ScrollTrigger);

import { BentoTilt } from "../components/Features";
import { BentoCard as BentoVideoCard } from "../pages/menu";
import { BentoCard as BentoImageCard } from "../pages/galeria";

const ElegantButton = ({ to, children }) => (
  <Link to={to} className="group relative mt-8 inline-flex items-center gap-3 text-lg font-semibold text-yellow-600 transition-colors duration-300 hover:text-white">
    <span className="relative z-10">{children}</span>
    <TiArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
    <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-yellow-600 transition-transform duration-300 group-hover:scale-x-100" />
  </Link>
);

const ValueCard = ({ icon, title, children }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center h-full">
    {/* Zmiana na renderowanie obrazka bezpośrednio */}
    <img src={icon} alt={title} className="w-12 h-12" />
    <h3 className="text-xl sm:text-2xl font-semibold text-yellow-500 mt-4 mb-2">{title}</h3>
    <p className="text-base text-blue-50/70 leading-relaxed">{children}</p>
  </div>
);

const ImageClipBox = ({ src, containerClass, imageClass }) => (
  <div className={containerClass}>
    <img src={src} alt="" className={imageClass} />
  </div>
);


// --- GŁÓWNY KOMPONENT STRONY GŁÓWNEJ ---
const HomePage = () => {
  const mainRef = useRef(null);

  const videoList = ["videos/pokaz-5.mp4", "videos/pokaz-3.mp4", "videos/coffee-1.mp4", "videos/pokaz-8.mp4", "videos/pokaz-7.mp4"];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const historyImageRef = useRef(null);
  const [historyImageStyle, setHistoryImageStyle] = useState({});

  const [activeSlide, setActiveSlide] = useState(0);
  const valueCards = [
    { icon: "/img/kawa.png", title: "Ziarna Najwyższej Jakości", content: "Każda filiżanka zaczyna się od starannie wyselekcjonowanych ziaren speciality, wypalanych z precyzją, by uwolnić pełnię ich aromatu." },
    { icon: "/img/rogal.png", title: "Rzemieślnicze Wypieki", content: "Nasze ciasta i desery powstają na miejscu, z naturalnych składników. To połączenie tradycyjnych receptur z nowoczesną cukierniczą fantazją." },
    { icon: "/img/gwiazdy.png", title: "Niezwykła Atmosfera", content: "Zadbaliśmy o każdy detal – od muzyki po wystrój – by stworzyć miejsce, w którym czas zwalnia, a Ty możesz po prostu być." }
  ];

  // --- NOWA FUNKCJA: Logika do swipowania karuzeli ---
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setActiveSlide((prev) => (prev + 1) % valueCards.length),
    onSwipedRight: () => setActiveSlide((prev) => (prev - 1 + valueCards.length) % valueCards.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    const videoInterval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
    }, 7000);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.animated-section');
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0, y: 50, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
    }, mainRef);

    return () => {
      clearInterval(videoInterval);
      ctx.revert();
    };
  }, [videoList.length]);

  const handleMouseMove = (e) => {
    const { current: el } = historyImageRef;
    if (!el) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = el.getBoundingClientRect();
    const rotateX = gsap.utils.mapRange(0, height, 10, -10, clientY - top);
    const rotateY = gsap.utils.mapRange(0, width, -10, 10, clientX - left);
    setHistoryImageStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.3s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setHistoryImageStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: "transform 0.5s ease-in-out",
    });
  };
  
  const menuTeaserItems = [
    { src: "videos/pokaz-1.mp4", title: "Słoneczna Beza", className: "col-span-2 row-span-2" },
    { src: "videos/pokaz-2.mp4", title: "Aksamitne Cappuccino", className: "sm:col-span-1 row-span-1" },
    { src: "videos/coffee-2.mp4", title: "Czekoladowa Pokusa", className: "sm:col-span-1 row-span-1" },
  ];

  const galleryTeaserImages = [
    { src: "img/galery/galeria-8.jpg", title: "Nasze Wnętrze", className: "col-span-2 row-span-1" },
    { src: "img/galery/galeria-15.jpg", title: "Słodkie Wypieki", className: "col-span-1 row-span-2" },
    { src: "img/galery/galeria-16.jpg", title: "Poranna Energia", className: "sm:col-span-1 row-span-1" },
    { src: "img/galery/galeria-17.jpg", title: "Klimatyczne Miejsce", className: "sm:col-span-1 row-span-1" },
  ];

  return (
    <div ref={mainRef} className="bg-black text-blue-50 font-circular-web">
      {/* --- SEKCJA HERO --- */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center">
        {videoList.map((videoSrc, index) => (
          <video key={videoSrc} src={videoSrc} loop muted autoPlay playsInline className="absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-1000 ease-in-out" style={{ opacity: index === currentVideoIndex ? 0.3 : 0 }}/>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 px-4">
          <h1 className="special-font text-5xl font-black sm:text-6xl md:text-8xl lg:text-[10rem]">Czarny Puls</h1>
          <p className="mt-4 max-w-3xl text-lg text-blue-50/80 sm:text-xl md:text-3xl">Sztuka. Smak. Spokój.</p>
        </div>
      </section>

      {/* --- SEKCJA FILOZOFII --- */}
      <section className="animated-section container mx-auto px-4 md:px-10 py-20 sm:py-32 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-yellow-600 mb-6 tracking-wide">Więcej niż Kawa</h2>
        <p className="mx-auto max-w-3xl text-lg md:text-2xl text-blue-50/70 leading-relaxed">Wierzymy, że kawiarnia to nie tylko miejsce, ale doświadczenie. To przestrzeń, gdzie rzemiosło spotyka się z pasją, a każda chwila nabiera głębszego smaku.</p>
        <div className="gradient-line mx-auto mt-8 h-12 w-px"></div>
      </section>

      {/* --- SEKCJA WARTOŚCI "NASZE CREDO" --- */}
      <section className="animated-section bg-black pb-20 sm:pb-32">
          <div className="container mx-auto px-4 md:px-10">
              <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
                  {valueCards.map((card, index) => (
                      <ValueCard key={index} icon={card.icon} title={card.title}>{card.content}</ValueCard>
                  ))}
              </div>
              <div className="md:hidden">
                  {/* --- MODYFIKACJA: Dodano {...swipeHandlers} --- */}
                  <div {...swipeHandlers} className="relative overflow-hidden">
                      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                          {valueCards.map((card, index) => (
                              <div key={index} className="w-full flex-shrink-0 px-2">
                                  <ValueCard key={index} icon={card.icon} title={card.title}>{card.content}</ValueCard>
                              </div>
                          ))}
                      </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-6">
                      {valueCards.map((_, index) => (
                          <button key={index} onClick={() => setActiveSlide(index)} className={`h-2 w-2 rounded-full transition-colors ${activeSlide === index ? 'bg-yellow-500' : 'bg-gray-700'}`}></button>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* --- SEKCJA MENU (TEASER) --- */}
       <section className="animated-section bg-black py-20 sm:py-32">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-12 max-w-2xl"><h2 className="text-3xl md:text-5xl font-semibold text-yellow-600 mb-4 tracking-wide">Esencja Naszych Smaków</h2><p className="text-lg md:text-2xl text-blue-50/70 leading-relaxed">Każda pozycja w naszym menu to osobna historia. Zobacz zapowiedź tego, co czeka na Ciebie na miejscu.</p></div>
          <div className="grid w-full auto-rows-[250px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {menuTeaserItems.map((item, index) => (<BentoTilt key={index} className={item.className}><BentoVideoCard src={item.src} title={item.title} isComingSoon={false} /></BentoTilt>))}
          </div>
          <div className="mt-12 flex justify-start"><ElegantButton to="/menu">Zobacz pełne menu</ElegantButton></div>
        </div>
      </section>

      {/* --- SEKCJA GALERII --- */}
      <section className="animated-section bg-black py-20 sm:py-32">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-12 flex w-full flex-col items-start sm:items-end text-left sm:text-right"><div className="max-w-2xl"><h2 className="text-3xl md:text-5xl font-semibold text-yellow-600 mb-4 tracking-wide">Uchwycone Momenty</h2><p className="text-lg md:text-2xl text-blue-50/70 leading-relaxed">Nasza przestrzeń żyje dzięki Wam. Każde zdjęcie to zaproszenie do świata, który tworzymy razem każdego dnia.</p></div></div>
          <div className="grid w-full auto-rows-[250px] grid-cols-2 md:grid-cols-3 gap-4">
            {galleryTeaserImages.map((image, index) => (<BentoTilt key={index} className={image.className}><BentoImageCard src={image.src} title={image.title} onOpen={() => {}} isActive={true} /></BentoTilt>))}
          </div>
          <div className="mt-12 flex justify-start sm:justify-end"><ElegantButton to="/galeria">Wejdź do galerii</ElegantButton></div>
        </div>
      </section>
      
      {/* --- SEKCJA HISTORII --- */}
      <section className="animated-section bg-black py-20 sm:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="lg:pr-12">
            <h2 className="text-3xl md:text-5xl font-semibold text-yellow-600 mb-6 tracking-wide">Opowieść Pisana Pasją</h2>
            <p className="text-lg md:text-2xl text-blue-50/70 leading-relaxed mb-4">"Czarny Puls" zrodził się z marzenia o miejscu, które łączy ludzi i celebruje małe rytuały. To historia o determinacji, rzemiośle i kawie, która jest czymś więcej niż napojem.</p>
            <ElegantButton to="/historia">Odkryj naszą historię</ElegantButton>
          </div>
          <div className="relative h-[350px] lg:h-[500px] flex items-center justify-center" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div ref={historyImageRef} style={historyImageStyle} className="relative w-full max-w-md h-[300px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img src="/img/historia.jpg" alt="Założyciele kawiarni" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAŁOWA SEKCJA KONTAKTU --- */}
      <section className="animated-section bg-black py-20 sm:py-40 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-10">
            <div className="relative rounded-lg py-16 sm:py-24 text-blue-50">
                <ImageClipBox src="/img/kontakt-1.jpg" containerClass="absolute -left-32 -top-24 w-64 h-64 sm:-left-20 sm:-top-12 sm:h-full sm:w-72 lg:left-20 lg:w-96 opacity-50 sm:opacity-100" imageClass="contact-clip-path-1" />
                <ImageClipBox src="/img/kontakt-3.jpg" containerClass="absolute -right-24 -bottom-32 w-60 h-60 sm:-top-40 sm:right-0 md:right-10 lg:top-0 lg:w-80 opacity-50 sm:opacity-100" imageClass="sword-man-clip-path" />
                <div className="relative z-10 flex flex-col items-center text-center">
                    <h2 className="text-4xl md:text-7xl font-semibold text-blue-50 mb-6 tracking-wide special-font">Twoje Miejsce. Twoja Chwila.</h2>
                    <p className="mx-auto max-w-2xl text-lg md:text-2xl text-blue-50/70 leading-relaxed mb-12">Czekamy na Ciebie, by podzielić się naszą pasją. Odwiedź nas, by napisać kolejny rozdział tej historii – razem z nami.</p>
                    <Link to="/kontakt" className="group relative inline-block rounded-full bg-yellow-700 px-8 sm:px-10 py-4 text-base sm:text-lg font-bold text-black transition-transform duration-300 hover:scale-105">Znajdź nas lub napisz</Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;