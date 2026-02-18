import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { IoArrowUndo } from "react-icons/io5";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => setTransformStyle("");

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

export const BentoCard = ({
  src,
  title,
  description,
  isComingSoon,
  subtitle,
  ingredients = [],
  quote = "",
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((f) => !f);

  return (
    <div className="relative size-full perspective-1000">
      <div
        className="transition-transform duration-700 size-full relative rounded-2xl"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "none",
        }}
      >
        {/* === STRONA PRZEDNIA (FRONT) === */}
        <div className="absolute inset-0 backface-hidden z-10 rounded-2xl overflow-hidden">
          <video
            src={src}
            loop
            muted
            autoPlay
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="relative z-10 flex size-full flex-col justify-end p-4 sm:p-6 text-white">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-shadow special-font">{title}</h1>
              {description && (
                <p className="mt-2 max-w-sm text-sm font-light text-white/90 leading-relaxed">{description}</p>
              )}
            </div>
            {isComingSoon && (
              <button
                className="group relative flex w-fit items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-5 py-2 text-xs uppercase text-white/80 mt-6 hover:text-white transition-colors"
                onClick={handleFlip}
              >
                <TiLocationArrow className="relative z-10" />
                <span className="relative z-10">Odkryj sekret</span>
              </button>
            )}
          </div>
        </div>

        {/* === STRONA TYLNA (BACK) - ZMIANY TUTAJ === */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-black rounded-2xl border border-white/10">
          {/* Zmniejszony padding na małych ekranach (p-4), wraca do p-8 od sm wzwyż */}
          <div className="p-4 sm:p-8 text-center w-full h-full flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-500 mb-2">{title}</h2>
            
            {subtitle && <p className="text-white/80 mb-4 tracking-wider text-xs sm:text-sm uppercase">{subtitle}</p>}
            
            {/* Dodano overflow-y-auto dla bezpieczeństwa przy długich listach */}
            {ingredients.length > 0 && (
              <ul className="text-left text-white/70 text-xs sm:text-sm space-y-2 flex-grow overflow-y-auto">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {/* Zmniejszony margines i rozmiar tekstu na małych ekranach */}
            {quote && (
              <blockquote className="italic text-white/60 border-l-2 border-yellow-700 pl-4 my-4 text-xs sm:text-sm sm:my-6">
                {quote}
              </blockquote>
            )}

            <button
              className="group relative flex w-fit items-center gap-2 self-center overflow-hidden rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-5 py-2 text-xs uppercase text-white/80 hover:text-white transition-colors mt-4 sm:mt-0"
              onClick={handleFlip}
            >
              <IoArrowUndo className="relative z-10" />
              <span className="relative z-10">Powrót</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Główna sekcja menu - BEZ ZMIAN W UKŁADZIE SIATKI
const Features = () => (
  <section className="bg-black pb-32">
    <div className="container mx-auto px-4 md:px-10">
      <div className="px-5 py-32">
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <p className="font-circular-web text-4xl md:text-5xl font-semibold text-blue-50 mb-4 tracking-wide drop-shadow-lg">
            ✨ Smaki, które opowiadają
          </p>
          <p className="max-w-2xl font-circular-web text-xl md:text-2xl text-blue-50 opacity-70 leading-relaxed">
            Każde dzieło w naszym menu to chwila, historia i smak, które sprawiają, że zechcesz wrócić po więcej.
          </p>
        </div>
      </div>

      <BentoTilt className="relative mb-7 h-96 w-full md:h-[65vh]">
        <BentoCard
          src="videos/pokaz-1.mp4"
          title="Słoneczna Beza"
          description="Delikatna beza, ręcznie opalana, skrywa w sobie orzeźwiający sekret cytrusów. Lekka, piękna i zaskakująca."
          subtitle="Kompozycja"
          ingredients={[
            "Beza włoska, ręcznie opalana ogniem",
            "Krem cytrusowy z pomarańczy i cytryny sycylijskiej",
            "Nuty karmelizowanego miodu",
            "Suszone plastry pomarańczy",
            "Orzech włoski",
            "Jadalne kwiaty"
          ]}
          quote="„Marzenie o słońcu zamknięte w lekkiej chmurze bezy. Inspiracja? Letni zachód słońca nad śródziemnomorskim ogrodem.”"
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-auto w-full grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-7">
        
        <BentoTilt className="aspect-square">
          <BentoCard
            src="videos/pokaz-2.mp4"
            title="Aksamitne Cappuccino"
            description="Kremowe espresso i idealnie spienione mleko. To nie tylko kawa – to Twój mały, codzienny rytuał."
            subtitle="Kompozycja"
            ingredients={[
              "Podwójne espresso (100% Arabica)",
              "Delikatnie spienione, pełne mleko",
              "Aksamitna pianka o gładkiej strukturze",
              "Szczypta gorzkiego kakao (opcjonalnie)"
            ]}
            quote="„Stworzone z myślą o porankach. To chwila oddechu, na którą zasługujesz. Bo dobra kawa to nie napój. To moment.”"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="aspect-square">
          <BentoCard
            src="videos/coffee-2.mp4"
            title="Czekoladowa Pokusa"
            description="Łączy głębię intensywnego kakao z aksamitnym kremem, tworząc deser idealny na chwilę zapomnienia."
            subtitle="Kompozycja"
            ingredients={[
              "Miękkie biszkopty kakaowe, pieczone na miejscu",
              "Krem maślany o delikatnej waniliowej nucie",
              "Polewa z gorzkiej i mlecznej czekolady",
              "Kruszonka czekoladowa dla dodatkowej tekstury"
            ]}
            quote="„Czekoladowa uczta, której nie da się odmówić. Każda warstwa to balans między słodyczą a głębią kakao – idealna na poprawę nastroju albo świętowanie małych chwil.”"
            isComingSoon
          />
        </BentoTilt>
        
        <BentoTilt className="aspect-square">
            <BentoCard
                src="videos/pokaz-7.mp4"
                title="Leśna Bajka"
                description="Słodka podróż do świata magii i natury, gdzie każdy kęs przypomina o dziecięcej radości."
                subtitle="Kompozycja"
                ingredients={[
                    "Puszysty Biszkopt Czekoladowy i Waniliowy",
                    "Krem Waniliowy na Bazie Śmietanki",
                    "Laski Cynamonu i Anyż Gwiazdkowy",
                    "Dekoracje z Masy Cukrowej w Kształcie Leśnych Zwierząt",
                    "Delikatne Akcenty Ziół i Przypraw"
                ]}
                quote="„Ten tort to hołd dla magii lasu – jego smaki przeplatają się z aromatem przypraw, a urocze figurki przenoszą nas do świata dziecięcych wspomnień i bajkowej radości.”"
                isComingSoon
            />
        </BentoTilt>

        <BentoTilt className="aspect-square">
            <video
                src="videos/pokaz-5.mp4"
                loop
                muted
                autoPlay
                playsInline
                className="size-full object-cover object-center rounded-2xl"
            />
        </BentoTilt>
        
        <BentoTilt className="aspect-square">
          <BentoCard
            src="videos/pokaz-3.mp4"
            title="Leśna Muffinka z Czarną Kawą"
            description="Duet prostoty i natury – puszysta muffinka pełna owoców leśnych podana z klasyczną, aromatyczną czarną kawą."
            subtitle="Kompozycja"
            ingredients={[
              "Puszyste Ciasto Muffinkowe",
              "Jagody, Maliny i Jeżyny",
              "Naturalny Cukier Trzcinowy",
              "Świeże Jajka i Masło",
              "Filiżanka Klasycznej Czarnej Kawy"
            ]}
            quote="„Muffinka z owocami leśnymi i czarna kawa – jak poranna przechadzka po lesie, gdzie każdy kęs i łyk przypomina o prostych, ale najpiękniejszych chwilach.”"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="aspect-square">
          <BentoCard
            src="videos/pokaz-6.mp4"
            title="Puszyste Pancakes z Syropem"
            description="Złociste, lekkie i miękkie placuszki z nutą słodyczy syropu klonowego."
            subtitle="Kompozycja"
            ingredients={[
              "Mąka Pszenna",
              "Świeże Jajka",
              "Masło i Mleko",
              "Syrop Klonowy"
            ]}
            quote="„Te pancakes to smak beztroskiego poranka – lekkie, puszyste i pełne złocistego ciepła, które otula od pierwszego kęsa.”"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="aspect-square">
          <BentoCard
            src="videos/pokaz-4.mp4"
            title="Czekoladowe Muffinki z Pudrem"
            description="Miękkie, wilgotne i intensywnie czekoladowe muffinki z delikatną chmurką cukru pudru."
            subtitle="Kompozycja"
            ingredients={[
              "Kakao Najwyższej Jakości",
              "Kawałki Gorzko-Czekoladowe",
              "Świeże Jajka",
              "Masło i Mleko",
              "Cukier Puder do Ozdoby"
            ]}
            quote="„Te muffinki to kwintesencja czekoladowej przyjemności – miękkie, pachnące i zawsze poprawiające nastrój.”"
            isComingSoon
          />
        </BentoTilt>

         <BentoTilt className="aspect-square bg-gradient-to-br from-yellow-900/80 via-yellow-700/80 to-yellow-900/80 rounded-2xl">
          <div className="flex size-full flex-col justify-between p-6">
            <h2 className="text-3xl font-bold text-shadow text-black max-w-sm special-font">
              Już wkrótce nowe smaki...
            </h2>
            <TiLocationArrow className="text-black/50 scale-[4] self-end" />
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;