import { useState, useRef, useEffect } from "react";

// Komponent Modala (powiększone zdjęcie) z animacjami wejścia/wyjścia
const PhotoModal = ({ src, title, open, onClose }) => {
  const [isRendered, setIsRendered] = useState(open);

  useEffect(() => {
    if (open) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${open ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
      style={{ cursor: "zoom-out", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div
        onClick={onClose}
        className={`relative bg-transparent p-4 rounded-xl transition-transform duration-300 ease-in-out ${open ? "scale-100" : "scale-90"}`}
      >
        <img
          src={src}
          alt={title}
          className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
};


// Komponent z efektem 3D przy najechaniu myszką
export const BentoTilt = ({ children, className = "", open }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current || open) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 8;
    const tiltY = (relativeX - 0.5) * -8;
    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => setTransformStyle("");

  // --- KLUCZOWA ZMIANA ---
  // Ten hook obserwuje, czy modal jest otwarty.
  // Jeśli tak, resetuje styl, usuwając efekt powiększenia.
  useEffect(() => {
    if (open) {
      handleMouseLeave();
    }
  }, [open]);

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: "transform 0.2s ease-out" }}
    >
      {children}
    </div>
  );
};


// Komponent pojedynczej karty ze zdjęciem i nowymi efektami
export const BentoCard = ({ src, title, onOpen, isActive }) => {
  return (
    <div
      className="relative w-full h-full cursor-zoom-in rounded-2xl overflow-hidden shadow-lg group"
      onClick={onOpen}
    >
      <img
        src={src}
        alt={title}
        className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 ${
          isActive ? "brightness-100" : "brightness-75 group-hover:brightness-100"
        }`}
      />
      <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)" }} />
    </div>
  );
};

// Główna sekcja z galerią
const Features = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState({ src: "", title: "" });

  const images = [
    { src: "img/galery/galeria-1.jpg", title: "Aromatyczna Kawa", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-2.jpg", title: "Nasze Wnętrze", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-3.jpg", title: "Słodkie Wypieki", className: "col-span-2 row-span-2 md:row-span-2" },
    { src: "img/galery/galeria-4.jpg", title: "Poranna Energia", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-5.jpg", title: "Klimatyczne Miejsce", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-6.jpg", title: "Aromatyczna Kawa", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-7.jpg", title: "Nasze Wnętrze", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-8.jpg", title: "Słodkie Wypieki", className: "col-span-2 row-span-2 md:row-span-2" },
    { src: "img/galery/galeria-9.jpg", title: "Poranna Energia", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-10.jpg", title: "Klimatyczne Miejsce", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-11.jpg", title: "Poranna Energia", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-12.jpg", title: "Klimatyczne Miejsce", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-13.jpg", title: "Aromatyczna Kawa", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-14.jpg", title: "Nasze Wnętrze", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-15.jpg", title: "Słodkie Wypieki", className: "col-span-2 row-span-2 md:row-span-2" },
    { src: "img/galery/galeria-16.jpg", title: "Poranna Energia", className: "col-span-2 row-span-2 md:col-span-1" },
    { src: "img/galery/galeria-17.jpg", title: "Klimatyczne Miejsce", className: "col-span-2 row-span-2 md:col-span-1" },
  ];

  const handleOpenModal = (src, title) => {
    setActiveCard({ src, title });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setActiveCard({ src: "", title: "" }), 300);
  };

  return (
    <section className="bg-black pb-32 pt-16">
      <div className="container mx-auto px-4 md:px-10 py-16">
        <div className="mb-20 flex flex-col items-center justify-center text-center">
          <p className="font-circular-web text-4xl md:text-5xl font-semibold text-blue-50 mb-4 tracking-wide drop-shadow-lg">
            ✨ Chwile uchwycone w kadrze
          </p>
          <p className="max-w-2xl font-circular-web text-xl md:text-2xl text-blue-50 opacity-70 leading-relaxed">
            Każde zdjęcie to historia smaku, aromatu i atmosfery, którą tworzymy codziennie.
          </p>
        </div>

        <div className="grid w-full auto-rows-[200px] grid-cols-2 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <BentoTilt
              key={index}
              className={image.className}
              open={modalOpen}
            >
              <BentoCard
                src={image.src}
                title={image.title}
                onOpen={() => handleOpenModal(image.src, image.title)}
                isActive={activeCard.src === image.src}
              />
            </BentoTilt>
          ))}
        </div>
      </div>
      
      <PhotoModal
        src={activeCard.src}
        title={activeCard.title}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Features;