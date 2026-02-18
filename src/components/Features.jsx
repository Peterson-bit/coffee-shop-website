import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
         <h1 className="text-3xl md:text-5xl font-bold text-shadow special-font">{title}</h1>
            {description && (
              <p className="mt-2 max-w-sm text-base font-light text-white/90 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Nasze Specjały
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Są smaki, które definiują nasze miejsce. To właśnie tutaj zebraliśmy kompozycje, 
          w które wkładamy całe serce i z których jesteśmy najbardziej dumni. Zobacz esencję naszej pasji.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/pokaz-1.mp4"
          title={
            <>
              Słoneczna Beza
            </>
          }
          description="Delikatna beza, ręcznie opalana, skrywa w sobie orzeźwiający sekret cytrusów. Lekka, piękna i zaskakująca."
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/pokaz-2.mp4"
            title={
              <>
                Aksamitne Cappuccino
              </>
            }
            description="Kremowe espresso i idealnie spienione mleko. To nie tylko kawa – to Twój mały, codzienny rytuał."
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/pokaz-3.mp4"
            title={
              <>
                Leśna Muffinka z Czarną Kawą
              </>
            }
            description="Duet prostoty i natury – puszysta muffinka pełna owoców leśnych podana z klasyczną, aromatyczną czarną kawą."
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/pokaz-4.mp4"
            title={
              <>
                Czekoladowe Muffinki z Pudrem
              </>
            }
            description="Miękkie, wilgotne i intensywnie czekoladowe muffinki z delikatną chmurką cukru pudru."
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-yellow-800 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              Stay tuned...
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/pokaz-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
